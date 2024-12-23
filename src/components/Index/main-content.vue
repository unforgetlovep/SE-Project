<template>
    <div class="course-box">
        <div class="content-title">
            <span id="blue-col-bar"></span>
            <span class="big-text">计算机基础课程</span>
            <span class="small-text">为您学习助力</span>
        </div>
        <a href="" class="course-card" v-for="(course,index) in computerCourses" :key="index">
            <el-card shadow="hover" :body-style="{padding:'0px'}" style="margin-bottom: 20px;">
                <img :src="course.image" :alt="course.title" class="course-image" />
                <template #footer>
                    <div class="course-footer">
                        <span class="course-title">{{course.title}}</span>
                        <span class="course-price">{{course.price}}</span>
                    </div>
                </template>
            </el-card>
        </a>
    </div>
    <div class="course-box">
        <div class="content-title">
            <span id="blue-col-bar"></span>
            <span class="big-text">其他课程</span>
            <span class="small-text">培养兴趣</span>
        </div>
        <a href="" class="course-card" v-for="(course,index) in lifeCourses" :key="index">
            <el-card shadow="hover" :body-style="{padding:'0px'}" style="margin-bottom: 20px;">
                <img :src="course.image" :alt="course.title" class="course-image" />
                <template #footer>
                    <div class="course-footer">
                        <span class="course-title">{{course.title}}</span>
                        <span class="course-price">{{course.price}}</span>
                    </div>
                </template>
            </el-card>
        </a>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const computerCourses = ref([
    {
        title: '操作系统',
        price: '免费',
        image: '/course/image.jpg'
    },
    {
        title: '计算机网络',
        price: '免费',
        image: '/course/image1.jpg'
    },
    {
        title:'计算机组成原理',
        price: '免费',
        image: '/course/image2.jpg'
    },
    {
        title: 'Python编程',
        price: '免费',
        image: '/course/image3.jpg'
    },
    {
        title: '数据结构',
        price: '免费',
        image: '/course/image4.jpg'
    },
    {
        title: 'C++编程',
        price: '免费',
        image: '/course/image10.jpg'
    },
    {
        title: '编译原理',
        price: '免费',
        image: '/course/image9.jpg'
    },
    {
        title: '神经网络',
        price: '免费',
        image: '/course/image7.jpg'
    }
]);

const lifeCourses = ref([
    {
        title: 'Pr剪辑入门教学',
        price: '免费',
        image: '/course/image5.jpg'
    },
    {
        title: '摄影入门教学',
        price: '免费',
        image: '/course/image6.jpg'
    },
    {
        title: '中国哲学史',
        price: '免费',
        image: '/course/image8.jpg'
    },
    {
        title: '金融经济学',
        price: '免费',
        image: '/course/image11.jpg'
    }
]);
</script>

<style scoped>
#blue-col-bar {
    background: #00f;
    display: inline-block;
    height: 24px;
    width: 4px;
    position: relative;
    top: 4px;
}

.content-title {
    margin-top: 50px;
    margin-bottom: 10px;
}

.big-text{
    font-size: 24px;
    font-weight: bold;
    margin-left: 5px;
}

.small-text{
    font-size: 14px;
    color: #999;
    margin-left: 15px;
}

.course-card {
    width: 288px;
    height: 200px;
    display: inline-block;
    margin-right: 26px;
}

.course-image {
    width: 100%;
    height: 100%;
}

.course-title {
    font-size: 16px;
    font-weight: bold;
}

.course-price {
    color: green;
    font-size: 14px;
    margin-left: 100px;
}
</style>