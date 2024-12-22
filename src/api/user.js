import apiClient from '@/api/axios';
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