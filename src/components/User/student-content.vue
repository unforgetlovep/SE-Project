<template>
    <div class="student-content">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    :default-active="activeMenu"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                >
                    <el-menu-item index="learning-courses">
                        <i class="el-icon-notebook-1"></i>
                        <template #title>正在学习课程</template>
                    </el-menu-item>
                    <el-menu-item index="personal-info">
                        <i class="el-icon-user"></i>
                        <template #title>个人信息</template>
                    </el-menu-item>
                    <el-menu-item index="materials">
                        <i class="el-icon-document"></i>
                        <template #title>资料</template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main-content">
                <component :is="currentComponent"></component>
            </el-main>
        </el-container>

        <el-dialog v-model="personalInfoDialogVisible" title="个人信息">
            <el-form :model="personalInfoForm" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="personalInfoForm.username"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="personalInfoForm.email" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="personalInfoForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="personalInfoForm.address"></el-input>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" v-model="personalInfoForm.bio"></el-input>
                </el-form-item>
                <!-- 其他个人信息字段 -->
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="personalInfoDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handlePersonalInfoConfirm">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { updateUserInfo } from '@/api/user'; // 导入更新用户信息的 API 函数
import { ElMessage } from 'element-plus';
import LearningCourses from '@/components/User/learning-course.vue'; // 导入正在学习课程组件
import Materials from '@/components/User/student-homework.vue'; // 导入资料页面组件

const userStore = useUserStore();
const activeMenu = ref('learning-courses');
const currentComponent = ref(LearningCourses); // 设置默认显示的组件
const personalInfoDialogVisible = ref(false);
const personalInfoForm = ref({
    username: userStore.username,
    email: userStore.userEmail,
    phone: userStore.userPhone,
    address: userStore.userAddress,
    bio: userStore.userBio
});
const originalPersonalInfo = ref({ ...personalInfoForm.value });

const handleSelect = (key) => {
    activeMenu.value = key;
    switch (key) {
        case 'learning-courses':
            currentComponent.value = LearningCourses;
            break;
        case 'personal-info':
            personalInfoDialogVisible.value = true;
            break;
        case 'materials':
            currentComponent.value = Materials;
            break;
    }
};

const handlePersonalInfoConfirm = async () => {
    // 检查用户信息是否发生变化
    if (JSON.stringify(personalInfoForm.value) !== JSON.stringify(originalPersonalInfo.value)) {
        try {
            // 发送请求更新数据库的信息
            console.log('更新用户信息:', personalInfoForm.value);
            await updateUserInfo(personalInfoForm.value);
            // 更新 store 中的用户信息
            userStore.username = personalInfoForm.value.username;
            // 更新原始信息
            originalPersonalInfo.value = { ...personalInfoForm.value };
            ElMessage.success('更新用户信息成功');
        } catch (error) {
            console.error('更新用户信息失败:', error);
        }
    }
    personalInfoDialogVisible.value = false;
};
</script>

<style scoped>
.student-content {
    display: flex;
    height: 300px;
}

.el-menu-vertical-demo {
    height: 100%;
    border-right: 1px solid #ebeef5;
}

.dialog-footer {
    text-align: right;
}

.main-content {
    min-height: 80vh; /* 设置最小高度为视口高度的 80% */
    padding: 20px; /* 可选：添加一些内边距 */
    box-sizing: border-box; /* 确保内边距包含在高度内 */
}
</style>