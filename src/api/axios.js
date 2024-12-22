import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://47.236.50.145', // 后端服务器的基础 URL
    withCredentials: false, // 这表示跨域请求时是否需要使用凭证
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default apiClient;