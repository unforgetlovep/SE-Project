<template>
    <el-dialog :visible.sync="visible" title="个人信息">
        <el-form :model="form" label-width="100px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <!-- 其他个人信息字段 -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确认</el-button>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { changeUserInfo } from '@/api/user'; // 导入 changeUserInfo 函数

const userStore = useUserStore();

const form = ref({
    username: '',
    email: ''
});

onMounted(() => {
    form.value.username = userStore.username;
    form.value.email = userStore.userEmail;
});

const props = defineProps({
    visible: Boolean
});

const emit = defineEmits(['update:visible', 'confirm']);

const handleConfirm = async () => {
    try {
        await changeUserInfo(form.value);
        emit('confirm', form.value);
        emit('update:visible', false);
        // 更新用户信息到 store
        userStore.username = form.value.username;
        userStore.userEmail = form.value.email;
    } catch (error) {
        console.error('更新用户信息失败:', error);
        // 可以在这里添加错误处理逻辑，例如显示错误消息
    }
};

const handleCancel = () => {
    emit('update:visible', false);
};
</script>

<style scoped>
.dialog-footer {
    text-align: right;
}
</style>