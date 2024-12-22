import apiClient from '@/api/axios';

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