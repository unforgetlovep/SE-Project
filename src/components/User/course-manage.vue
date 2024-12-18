<template>
    <div class="course-manage">
        <el-table :data="courses" style="width: 100%">
            <el-table-column prop="name" label="课程名称" width="180"></el-table-column>
            <el-table-column prop="preview" label="预览图" width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.preview" alt="预览图" class="preview-img" />
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="editCourse(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="deleteCourse(scope.row.id)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑课程对话框 -->
        <el-dialog :visible.sync="editDialogVisible" title="编辑课程">
            <el-form :model="editForm" label-width="100px">
                <el-form-item label="课程名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="预览图">
                    <el-input v-model="editForm.preview"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="updateCourse">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { getCoursesByUserId, updateCourseById, deleteCourseById } from '@/api/course'; // 导入 API 函数

const userStore = useUserStore();
const courses = ref([]);
const editDialogVisible = ref(false);
const editForm = ref({
    id: '',
    name: '',
    preview: '',
    description: ''
});

// 获取用户发布的课程
const fetchCourses = async () => {
    try {
        const response = await getMycourses(userStore.userId);
        courses.value = response.data.courses;
    } catch (error) {
        console.error('获取课程失败:', error);
    }
};

// 编辑课程
const editCourse = (course) => {
    editForm.value = { ...course };
    editDialogVisible.value = true;
};

// 更新课程
const updateCourse = async () => {
    try {
        await updateCourseById(editForm.value.id, editForm.value);
        editDialogVisible.value = false;
        fetchCourses(); // 更新课程列表
    } catch (error) {
        console.error('更新课程失败:', error);
    }
};

// 删除课程
const deleteCourse = async (courseId) => {
    try {
        await deleteCourseById(courseId); //！！！！！！！！还未完成
        fetchCourses(); // 更新课程列表
    } catch (error) {
        console.error('删除课程失败:', error);
    }
};

onMounted(() => {
    fetchCourses();
});
</script>

<style scoped>
.preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.dialog-footer {
    text-align: right;
}
</style>