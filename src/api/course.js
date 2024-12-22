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

export const getAllCourses = () => {
    return apiClient.get('/course/all');
}

export const getMycourses = (email) => {
    return apiClient.get('/mycourse', {
        params: { email }
    });
}

export const changeCourse = (courseData) => {
    return apiClient.post('/course/edit', courseData);
}

export const deleteCourseById = (courseId) => {
    return apiClient.post('/course/delete', { courseId });
}

export const addCourseBydata = (courseData) => {
    return apiClient.post('/course/add', courseData);
}

export const getCourseById = (courseId) => {
    return apiClient.get(`/courses/${courseId}`);
}

export const joinCourse = (courseId,email) => {
    return apiClient.post(`/course/${courseId}/join`, { email });
}

export const getCourseStudents = (email) => {
    return apiClient.get('/course/students', {
        params: { email }
    });
};

export const commentCourse = (courseId, commentData) => {
    return apiClient.post(`/course/${courseId}/comment`, commentData);
}