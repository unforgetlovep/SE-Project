<template>
    <el-card class="login-card">
        <p class="title">账号登录</p>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha" class="captcha-item">
                <el-input v-model="form.captcha" placeholder="请输入验证码" class="captcha-input"></el-input>
                <img :src="captchaSrc" alt="验证码" @click="refreshCaptcha" class="captcha-image" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { loginUser } from '@/api/user'; // 导入登录 API
import { useUserStore } from '@/stores/user'; // 导入 Pinia Store

const router = useRouter();
const userStore = useUserStore();
const formRef = ref(null);
const form = ref({
    email: '',
    password: '',
    captcha: ''
});

const rules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
};

const captchaSrc = ref('/path/to/captcha'); // 替换为实际的验证码图片路径

const refreshCaptcha = () => {
    // 刷新验证码图片的逻辑
    captchaSrc.value = `/path/to/captcha?${Date.now()}`;
};

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            // 发送登录请求到后端
            loginUser(form.value)
                .then(response => {
                    console.log(response);
                    userStore.login(response.data.user); // 更新 Pinia Store 中的登录状态
                    ElMessage.success('登录成功！');
                    router.push('/'); // 登录成功后跳转到首页
                })
                .catch(error => {
                    ElMessage.error('登录失败: ' + (error.response?.data?.message || '未知错误'));
                });
        } else {
            ElMessage.error('请修正表单中的错误');
            return false;
        }
    });
};

const onReset = () => {
    formRef.value.resetFields();
};
</script>

<style scoped>
.login-card {
    width: 450px;
    height: 400px;
}

.title {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: bold;
}

.captcha-item {
    display: flex;
}

.captcha-input {
    margin-right: 10px;
    width: 200px; 
}

.captcha-image {
    cursor: pointer;
    height: 40px; 
}
</style>