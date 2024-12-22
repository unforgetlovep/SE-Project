<template>
    <div class="learning-courses">
        <!-- 课程表格 -->
        <el-table :data="courses" style="width: 100%">
            <el-table-column prop="title" label="课程名称" width="180"></el-table-column>
            <el-table-column prop="cover" label="预览图" width="180">
                <template #default="scope">
                    <img :src="scope.row.cover" alt="预览图" class="preview-img" />
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCourseStudents } from '@/api/course'; // 导入获取课程学生的 API 函数
import { useUserStore } from '@/stores/user'; // 导入 Pinia Store
import { ElMessage } from 'element-plus';

const userStore = useUserStore();
const courses = ref([]);

// 获取学生正在学习的课程
const fetchCourses = async () => {
    try {
        const response = await getCourseStudents(userStore.userEmail);
        courses.value = response.data.courses;
    } catch (error) {
        console.error('获取课程失败:', error);
        ElMessage.error('获取课程失败');
    }
};

onMounted(fetchCourses);
</script>

<style scoped>
.preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>