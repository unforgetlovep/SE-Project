<template>
    <div class="video-page">
        <!-- 左侧视频播放器 -->
        <div class="video-container">
            <el-card shadow="hover" class="video-card">
                <video controls :src="currentVideo.url" class="video-player">
                    您的浏览器不支持播放视频。
                </video>
                <h3 class="video-title">{{ currentVideo.title }}</h3>
            </el-card>
        </div>

        <!-- 右侧课程目录 -->
        <div class="directory-container">
            <el-card shadow="hover" class="directory-card">
                <h2 v-if="course">{{ course.title }}</h2>
                <p v-if="course" class="description">{{ course.description }}</p>
                <el-collapse v-if="course" v-model="expandedChapters">
                    <el-collapse-item v-for="chapter in course.chapters" :key="chapter.chapterId" :title="chapter.title"
                        :name="chapter.chapterId">
                        <ul class="subchapter-list">
                            <li v-for="subChapter in chapter.subChapters" :key="subChapter.subChapterId"
                                class="subchapter-item" @click="playVideo(subChapter)">
                                {{ subChapter.title }}
                            </li>
                        </ul>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { courseInfo } from "@/api/video";

const course = ref(null); // 课程数据
const currentVideo = ref({}); // 当前视频数据
const expandedChapters = ref([]); // 展开的章节 ID 列表

// 切换视频
const playVideo = (video) => {
    currentVideo.value = video;
    ElMessage({
        message: `正在播放: ${video.title}`,
        type: "info",
        duration: 2000,
    });
};

// 获取课程数据
const fetchCourseData = async () => {
    try {
        const courseId = "CS_GO_001"; // 示例 courseId
        const response = await courseInfo(courseId);
        course.value = response.data.course; // 确保获取到正确的数据结构

        if (course.value && course.value.chapters && course.value.chapters.length > 0) {
            // 默认播放第一个章节的第一个视频
            const firstSubChapter = course.value.chapters[0].subChapters[0];
            currentVideo.value = firstSubChapter;
        }
    } catch (error) {
        console.error("获取课程数据失败:", error);
        ElMessage.error("加载课程信息失败，请稍后再试！");
    }
};

onMounted(() => {
    fetchCourseData();
});
</script>

<style scoped>
.video-page {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    padding: 20px;
}

.video-container {
    flex: 2;
}

.video-card {
    padding: 20px;
}

.video-player {
    width: 100%; /* 固定视频播放器的宽度 */
    height: 100%; /* 固定视频播放器的高度 */
    object-fit: cover; /* 确保视频内容适应播放器大小 */
}

.video-title {
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.directory-container {
    flex: 1;
}

.directory-card {
    padding: 20px;
}

.description {
    margin-bottom: 20px;
    color: #666;
}

.subchapter-list {
    list-style-type: none;
    padding-left: 10px;
}

.subchapter-item {
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
}

.subchapter-item:hover {
    background-color: #f2f2f2;
    color: #409eff;
}
</style>