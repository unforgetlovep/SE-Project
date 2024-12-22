<template>
    <div>
        <el-table :data="uploadedFiles" style="width: 100%; margin-top: 20px;">
            <el-table-column prop="name" label="文件名称" width="500"></el-table-column>
            <el-table-column prop="url" label="文件链接" width="900">
                <template #default="scope">
                    <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button @click="downloadFile(scope.row.url)" type="primary" size="small">下载</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFileList } from '@/api/video'; // 导入获取已上传文件的 API 函数
import { ElMessage } from 'element-plus';

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

// 下载文件
const downloadFile = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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