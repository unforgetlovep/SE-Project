<template>
    <el-card class="register-card">
        <p class="title">账号注册</p>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword" placeholder="请确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">注册</el-button>
                <el-button @click="onReset">清空</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { registerUser } from '@/api/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const formRef = ref(null);
const form = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        { validator: (rule, value, callback) => {
            if (value !== form.value.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        }, trigger: 'blur' }
    ]
};

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            // 发送注册请求到后端
            registerUser(form.value)
                .then(() => {
                    ElMessage.success('注册成功！');
                    router.push('/login'); // 登录成功后跳转到首页
                })
                .catch(error => {
                    ElMessage.error('注册失败: ' + (error.response?.data?.message || '未知错误'));
                });
        } else {
            ElMessage.error('输入内容有误!');
            return false;
        }
    });
};

const onReset = () => {
    formRef.value.resetFields();
};
</script>

<style scoped>
.title {
    font-size: 20px;
    margin-bottom: 30px;
    font-weight: bold;
}
.register-card {
    width: 450px;
}
</style>