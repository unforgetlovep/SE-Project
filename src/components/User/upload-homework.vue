<template>
    <div>
        <el-upload
            class="upload-demo"
            drag
            :http-request="uploadFile"
            :on-success="handleUploadSuccess"
            :file-list="fileList"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">只能上传ppt、word等文件，且不超过10MB</div>
            </template>
        </el-upload>
        <el-table :data="uploadedFiles" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="name" label="文件名称" width="500"></el-table-column>
            <el-table-column prop="url" label="文件链接" width="900">
                <template #default="scope">
                    <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button @click="deleteFile(scope.row.name)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFileList,uploadMeans,saveFile, deleteFileByName } from '@/api/video'; // 导入获取已上传文件的 API 函数
import { ElMessage } from 'element-plus';

const fileList = ref([]);
const uploadedFiles = ref([]);

// 获取已上传文件列表
const fetchUploadedFiles = async () => {
    try {
        const response = await getFileList();
        uploadedFiles.value = response.data.files;
    } catch (error) {
        console.error('获取已上传文件失败:', error);
        ElMessage.error('获取已上传文件失败');
    }
};

// 上传文件
const uploadFile = async ({ file }) => {
    console.log('上传文件:', file);
    try {
        // 上传文件到 OSS
        const url = await uploadMeans(file);
        // 保存文件信息到 MongoDB
        await saveFile(url, file.name);
    } catch (error) {
        console.error('上传文件失败:', error);
        ElMessage.error('上传文件失败');
    }
};

// 处理上传成功
const handleUploadSuccess = (response, file) => {
    ElMessage.success('文件上传成功');
    uploadedFiles.value.push({
        name: file.name,
        url: response
    });
};

// 删除文件
const deleteFile = async (filename) => {
    try {
        await deleteFileByName(filename);
        ElMessage.success('文件删除成功');
        fetchUploadedFiles();
    } catch (error) {
        console.error('文件删除失败:', error);
        ElMessage.error('文件删除失败');
    }
};

onMounted(fetchUploadedFiles);
</script>

<style scoped>
.upload-demo {
    margin-top: 20px;
}

.preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
</style>