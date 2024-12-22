<template>
    <Header></Header>
    <div class="wrap">
        <div style="display: flex;">
            <div class="course-image">
                <img :src="course.cover" alt="" />
            </div>
            <div class="course-title">
                <h1>{{ course.title }}</h1>
                <h3 style="margin-top: 20px;">教师：{{ course.publisher }}</h3>
                <p style="margin-top: 10px;">价格：免费</p>
                <div v-if="userRole === 0" style="position: relative; top: 120px;">
                    <router-link v-if="isStudentInCourse" :to="`/courses/${course._id}/videos`">
                        <el-button type="primary" size="large">观看课程</el-button>
                    </router-link>
                    <el-button v-else type="primary" @click="join">加入课程</el-button>
                </div>
                <div v-if="userRole === 1" style="position: relative; top: 120px;">
                    <router-link :to="`/courses/${course._id}/videos`">
                        <el-button type="primary" size="large">观看课程</el-button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="course-content">
            <el-tabs v-model="activeTab" class="course-tabs">
                <el-tab-pane label="课程描述" name="description">
                    <div class="course-detail">
                        <h2>课程介绍</h2>
                        <p>{{ course.description }}</p>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="课程章节" name="chapters">
                    <div class="course-chapters">
                        <h2>课程章节</h2>
                        <ul>
                            <li v-for="(chapter, index) in course.chapters" :key="index" style="margin-top: 10px;">
                                <h3>{{ chapter.title }}</h3>
                                <ul>
                                    <li v-for="(subChapter, subIndex) in chapter.subChapters" :key="subIndex" style="margin-top: 5px;">
                                        {{ subChapter.title }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="课程评论" name="comments">
                    <div class="course-comments">
                        <h2>课程评论</h2>
                        <el-input type="textarea" v-model="newComment" placeholder="请输入评论内容"
                            class="comment-input"></el-input>
                        <el-button type="primary" @click="submitComment">发布评论</el-button>
                        <div class="comment-list">
                            <h3>评论列表</h3>
                            <ul>
                                <li v-for="(comment, index) in course.comments" :key="index" style="margin-top: 10px;">
                                    <p><strong>{{ comment.email }}:</strong> {{ comment.content }}</p>
                                </li>
                            </ul>
                        </div>

                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user'; // 导入 Pinia Store
import Header from '@/components/Index/index-header.vue';
import Footer from '@/components/Index/index-footer.vue';
import { courseInfo } from '@/api/video'; // 导入获取课程详情 API 函数
import { joinCourse } from '@/api/course'; // 导入加入课程的 API 函数
import { commentCourse } from '@/api/course'; // 导入评论课程的 API 函数
import { ElMessage } from 'element-plus';

const route = useRoute();
const userStore = useUserStore();
const course = ref({});
const activeTab = ref('description'); // 默认选中的标签页
const isStudentInCourse = ref(false); // 标记用户是否在课程的学生列表中
const userRole = ref(userStore.userRole); // 获取用户角色
const newComment = ref(''); // 新评论内容

// 获取课程详情
const fetchCourse = async () => {
    try {
        const response = await courseInfo(route.params.courseId);
        console.log('获取课程详情成功:', response);
        course.value = response.data.course;

        // 检查当前用户是否在课程的学生列表中
        isStudentInCourse.value = course.value.students.includes(userStore.userEmail);
    } catch (error) {
        console.error('获取课程详情失败:', error);
    }
};

// 加入课程
const join = async () => {
    try {
        await joinCourse(route.params.courseId, userStore.userEmail);
        ElMessage.success('成功加入课程');
        isStudentInCourse.value = true; // 更新状态为已加入课程
    } catch (error) {
        console.error('加入课程失败:', error);
        ElMessage.error('加入课程失败');
    }
};

// 发布评论
const submitComment = async () => {
    if (!newComment.value) {
        ElMessage.error('评论内容不能为空');
        return;
    }

    const commentData = {
        userId: userStore.userEmail,
        content: newComment.value
    };

    try {
        await commentCourse(route.params.courseId, commentData);
        ElMessage.success('评论发布成功');
        course.value.comments.push(commentData); // 更新本地评论列表
        newComment.value = ''; // 清空评论输入框
    } catch (error) {
        console.error('评论发布失败:', error);
        ElMessage.error('评论发布失败');
    }
};

onMounted(fetchCourse);
</script>

<style scoped>
.wrap {
    margin: 15px auto;
    width: 1290px;
}

.course-image {
    width: 540px;
    height: 280px;
}

.course-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.course-title {
    margin-left: 20px;
}

.course-content {
    margin-top: 20px;
    background-color: #fff;
}

.course-detail {
    margin-top: 20px;
}

.course-chapters {
    margin-top: 20px;
}

.course-tabs {
    padding: 15px;
}

.course-comments {
    margin-top: 20px;
}

.comment-input {
    width: 100%;
    margin-bottom: 10px;
}

.comment-list{
    margin-top: 20px;
}

Footer{
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>