// 导入封装好的 axios 实例
import apiClient from '@/api/axios';
import OSS from 'ali-oss';



// 阿里云 OSS 配置
const client = new OSS({
    region: 'oss-ap-southeast-1', // 替换为你的阿里云 OSS 区域
    secure: true, // 使用 HTTPS
    authorizationV4: true,
    accessKeyId: 'LTAI5tLrnEbu3wViWTKnCXVx', // 替换为你的阿里云 OSS AccessKeyId
    accessKeySecret: 'x8FaAqrqdI8k44dMFkbGgfqBcjRQl7', // 替换为你的阿里云 OSS AccessKeySecret
    bucket: 'store-video-zhy' // 替换为你的阿里云 OSS Bucket 名称
});

// 通用文件上传函数
async function uploadFile(client, file, objectName) {
    try {
        const result = await client.put(objectName, file);
        console.log(`文件 ${file.name} 已成功上传至 ${objectName}`);
        return result.url;
    } catch (err) {
        console.error(`上传失败: ${err.message}`);
        throw err;
    }
}


// 上传视频函数
export const uploadVideo = async (file) => {
    return uploadFile(client, file, `videos/${file.name}`);
};

// 上传图片函数
export const uploadImage = async (file) => {
    return uploadFile(client, file, `images/${file.name}`);
};

// 获取课程信息
export const courseInfo = (courseId) => {
    return apiClient.get(`/courses/${courseId}`);
};

export const uploadMeans = async (file) => {
    return uploadFile(client, file, `means/${file.name}`);
};

export const getFileList = async () => {
    return apiClient.get('/file/list');
}

export const saveFile = async (url, name) => {
    return apiClient.post('/file/save', { url, name });
}

// 删除文件函数导出
export const deleteFileByName = async (fileName) => {
    return apiClient.post('/file/delete', { name: fileName });
}