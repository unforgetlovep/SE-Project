<template>
    <div class="course-manage">
        <!-- 新增课程按钮 -->
        <el-button type="primary" @click="openAddDialog" class="mb-20">新增课程</el-button>

        <!-- 课程表格 -->
        <el-table :data="courses" style="width: 100%">
            <el-table-column prop="title" label="课程名称" min-width="180"></el-table-column>
            <el-table-column prop="preview" label="预览图" min-width="180">
                <template #default="scope">
                    <img :src="scope.row.cover" alt="预览图" class="preview-img" />
                </template>
            </el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column label="操作" min-width="180">
                <template #default="scope">
                    <el-button @click="deleteCourse(scope.row.courseId)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增课程对话框 -->
        <el-dialog v-model="addDialogVisible" title="新增课程">
            <div class="tree-container">
                <!-- 课程名称 -->
                <el-input v-model="addForm.name" placeholder="请输入课程名称" class="mb-20" />

                <!-- 课程预览图 -->
                <div class="mb-20">
                    <span>课程预览图：</span>
                    <el-upload
                        class="upload-demo"
                        :http-request="handlePreviewUpload"
                        :show-file-list="false"
                        accept="image/*"
                    >
                        <el-button size="small" type="primary">上传图片</el-button>
                        <span v-if="addForm.preview" class="preview-url">已上传</span>
                    </el-upload>
                </div>

                <!-- 课程描述 -->
                <el-input
                    type="textarea"
                    v-model="addForm.description"
                    placeholder="请输入课程描述"
                    class="mb-20"
                    rows="3"
                />

                <!-- 树形章节 -->
                <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    node-key="id"
                    class="custom-tree"
                >
                    <template #default="{ node, data }">
                        <div class="tree-node">
                            <!-- 章节输入框 -->
                            <el-input
                                v-model="data.label"
                                placeholder="章节标题"
                                class="chapter-input"
                                style="margin: 15px 0;"
                            />
                            <!-- 上传视频按钮 -->
                            <el-upload
                                class="upload-demo"
                                :http-request="(options) => handleVideoUpload(options, data)"
                                :show-file-list="false"
                                accept="video/*"
                            >
                                <el-button size="small" type="primary">上传视频</el-button>
                            </el-upload>
                            <span v-if="data.video" class="video-uploaded">已上传</span>

                            <!-- 删除章节按钮 -->
                            <el-button size="small" type="danger" @click="removeNode(node, data)">
                                删除
                            </el-button>
                            <!-- 新增小章节按钮 -->
                            <el-button size="small" type="primary" @click="addSubChapter(node, data)">
                                新增小章节
                            </el-button>
                        </div>
                    </template>
                </el-tree>

                <!-- 新增大章节按钮 -->
                <el-button type="primary" @click="addChapter" class="mt-20">
                    新增大章节
                </el-button>
            </div>

            <template #footer>
                <el-button @click="addDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addCourse">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { getMycourses, addCourseBydata, deleteCourseById } from '@/api/course';
import { uploadImage, uploadVideo } from '@/api/video'; // 导入上传函数

const userStore = useUserStore();
const courses = ref([]);
const addDialogVisible = ref(false);
const addForm = ref({
    name: '',
    preview: '',
    description: '',
    chapters: []
});

// 树形数据配置
const treeData = ref([]);
const defaultProps = { children: 'children', label: 'label' };

// 获取课程列表
const fetchCourses = async () => {
    try {
        const response = await getMycourses(userStore.userEmail);
        courses.value = response.data.courses;
    } catch (error) {
        console.error('获取课程失败:', error);
    }
};

// 打开新增课程对话框
const openAddDialog = () => {
    addForm.value = { name: '', preview: '', description: '', chapters: [] };
    treeData.value = [];
    addDialogVisible.value = true;
};

// 新增大章节
const addChapter = () => {
    treeData.value.push({ id: Date.now(), label: '新章节', children: [], video: '' });
};

// 新增小章节
const addSubChapter = (node, data) => {
    data.children = data.children || [];
    data.children.push({ id: Date.now(), label: '小章节', video: '' });
    node.expand();
};

// 删除节点
const removeNode = (node, data) => {
    const parent = node.parent;
    const children = parent.data.children || parent.data;
    const index = children.findIndex(item => item.id === data.id);
    if (index > -1) children.splice(index, 1);
};

// 处理预览图上传
const handlePreviewUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    try {
        const url = await uploadImage(file);
        addForm.value.preview = url;
        onSuccess(url);
    } catch (error) {
        console.error('预览图上传失败:', error);
        onError(error);
    }
};

// 处理视频上传
const handleVideoUpload = async (options, data) => {
    const { file, onSuccess, onError } = options;
    try {
        const url = await uploadVideo(file);
        if (data) {
            data.video = url;
        }
        onSuccess(url);
    } catch (error) {
        console.error('视频上传失败:', error);
        onError(error);
    }
};

const addCourse = async () => {
    try {
        // 检查必要的字段是否存在
        if (!addForm.value.name || !addForm.value.preview || !userStore.userEmail) {
            let missingFields = [];
            if (!addForm.value.name) missingFields.push('课程名称');
            if (!addForm.value.preview) missingFields.push('课程预览图');
            if (!userStore.userEmail) missingFields.push('发布者');
            alert(`缺少必要的课程信息: ${missingFields.join(', ')}`);
            return;
        }

        addForm.value.chapters = treeData.value;
        console.log('新增课程:', addForm.value);
        console.log('章节信息', treeData.value);
        await addCourseBydata({ ...addForm.value, publisher: userStore.userEmail });
        addDialogVisible.value = false;
        fetchCourses();
    } catch (error) {
        console.error('新增课程失败:', error);
    }
};

// 删除课程
const deleteCourse = async (courseId) => {
    try {
        console.log('删除课程:', courseId);
        await deleteCourseById(courseId);
        fetchCourses();
    } catch (error) {
        console.error('删除课程失败:', error);
    }
};

// 初始化加载课程
onMounted(fetchCourses);
</script>

<style scoped>
.preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
.mb-20 {
    margin-bottom: 20px;
}
.mt-20 {
    margin-top: 20px;
}
.tree-node {
    display: flex;
    align-items: center;
    gap: 10px;
}
.chapter-input {
    flex: 1;
}
.custom-tree {
    margin-bottom: 20px;
    border: 1px solid #ebeef5;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
}
.tree-container {
    padding: 20px;
}
.video-uploaded {
    color: #67c23a;
    margin-left: 10px;
}

.el-tree-node{
    margin: 15px 0;
}
</style>