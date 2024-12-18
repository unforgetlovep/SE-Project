import axios from 'axios';

// Axios 实例
const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // 后端服务器的基础 URL
    withCredentials: false, // 这表示跨域请求时是否需要使用凭证
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export const courseInfo = (courseId) => {
    return apiClient.get(`/courses/${courseId}`);
};