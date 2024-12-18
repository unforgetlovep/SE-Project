<template>
    <div class="teacher-content">
        <el-container>
            <el-aside width="200px">
                <el-menu
                    :default-active="activeMenu"
                    class="el-menu-vertical-demo"
                    @select="handleSelect"
                >
                    <el-menu-item index="course-management">
                        <i class="el-icon-notebook-1"></i>
                        <span slot="title">课程管理</span>
                    </el-menu-item>
                    <el-menu-item index="publish-homework">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">发布作业和资料</span>
                    </el-menu-item>
                    <el-menu-item index="personal-info">
                        <i class="el-icon-user"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <component :is="currentComponent"></component>
            </el-main>
        </el-container>

        <!-- 个人信息对话框 -->
        <PersonalInfoDialog
            :visible.sync="personalInfoDialogVisible"
            :form="personalInfoForm"
            @confirm="handlePersonalInfoConfirm"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CourseManagement from '@/components/User/course-manage.vue';
import PublishHomework from '@/components/User/upload-homework.vue';
import PersonalInfoDialog from '@/components/User/person-info.vue';

const activeMenu = ref('course-management');
const currentComponent = ref('CourseManagement');
const personalInfoDialogVisible = ref(false);
const personalInfoForm = ref({
    username: '张老师', // 示例数据
    email: 'zhang@example.com' // 示例数据
});

const handleSelect = (key, keyPath) => {
    activeMenu.value = key;
    switch (key) {
        case 'course-management':
            currentComponent.value = 'CourseManagement';
            break;
        case 'publish-homework':
            currentComponent.value = 'PublishHomework';
            break;
        case 'personal-info':
            personalInfoDialogVisible.value = true;
            break;
    }
};

const handlePersonalInfoConfirm = (form) => {
    // 处理个人信息确认逻辑
    console.log('个人信息已确认:', form);
    personalInfoDialogVisible.value = false;
};
</script>

<style scoped>
.teacher-content {
    display: flex;
    height: 100vh;
}

.el-menu-vertical-demo {
    height: 100%;
    border-right: 1px solid #ebeef5;
}
</style>