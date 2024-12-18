<template>
    <Header></Header>
    <div class="course-page">
        <a href="" class="course-card" v-for="(course, index) in courses" :key="index">
            <el-card shadow="hover" :body-style="{padding:'0px'}" style="margin-bottom: 20px;">
                <img :src="course.cover" :alt="course.title" class="course-image" />
                <template #footer>
                    <div class="course-footer">
                        <span class="course-title">{{ course.title }}</span>
                        <span class="course-price">{{ course.price }}</span>
                    </div>
                </template>
            </el-card>
        </a>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Header from '@/components/Index/index-header.vue';
import Footer from '@/components/Index/index-footer.vue';
import { ref, onMounted } from 'vue';
import { getAllCourses } from '@/api/course'; // 导入获取所有课程的 API 函数

const courses = ref([]);

// 获取所有课程
const fetchCourses = async () => {
    try {
        const response = await getAllCourses();
        console.log('获取课程成功:', response);
        courses.value = response.data.courses;
    } catch (error) {
        console.error('获取课程失败:', error);
    }
};

onMounted(() => {
    fetchCourses();
});
</script>

<style scoped>
.course-page {
    margin: 0 auto;
    width: 1290px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

.course-card {
    width: 300px;
    text-decoration: none;
    margin: 10px; /* 调整卡片之间的间距 */
}

.course-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.course-footer {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.course-title {
    font-size: 16px;
    font-weight: bold;
}

.course-price {
    font-size: 14px;
    color: #f56c6c;
}
</style>