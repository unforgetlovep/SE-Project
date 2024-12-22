import axios from 'axios';

//Axios 实例
const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // 后端服务器的基础 URL
    withCredentials: false, // 这表示跨域请求时是否需要使用凭证
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

// 注册用户
export const registerUser = (userData) => {
    return apiClient.post('/register', userData);
};

// 登录用户
export const loginUser = (userData) => {
    return apiClient.post('/login', userData);
};

export const updateUserInfo = (userData) => {
    return apiClient.post('/user/update', userData);
}