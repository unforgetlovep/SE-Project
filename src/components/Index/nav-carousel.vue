<template>
    <div class="container">
        <!--左侧导航-->
        <div class="recommend-box">
            <ul>
                <li>计算机/大数据科学/计算机视觉</li>
                <li>高等数学/线性代数/概率论</li>
                <li>期末复习/考试技巧/重点难点</li>
                <li>考证培训/职业规划/技能提升</li>
                <li>考研冲刺/复习资料/模拟试题</li>
                <li>编程入门/算法基础/项目实战</li>
                <li>网络安全/信息安全/密码学</li>
                <li>机器学习/深度学习/神经网络</li>
                <li>数据结构/算法设计/编程实践</li>
            </ul>
        </div>
        <!--轮播图-->
        <el-carousel height="360px">
            <el-carousel-item v-for="item in images" :key="item">
                <img :src="item" alt="轮播图{{item}}" />
            </el-carousel-item>
        </el-carousel>
        <!--个人信息-->
        <div class="person-box">
            <p class="short-txt">您可在本网站免费学习</p>
            <el-avatar size="large" src='https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                class="avatar"></el-avatar>
            <el-button type="success">登录或注册</el-button>
        </div>
    </div>
</template>

<script setup>
import { ElCarousel, ElCarouselItem, ElAvatar } from 'element-plus';
import { ref } from 'vue';
const images = ref([
    '/images/lunbo1.png',
    '/images/lunbo2.png',
    '/images/lunbo3.png',
])
</script>

<style scoped>
.wrap {
    width: 1296px;
    margin: 0 auto;
}

.container {
    display: flex;
    position: relative;
}

.recommend-box {
    width: 225px;
    height: 360px;
    display: flex;
    margin-top: 8px;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 8px;
}

.recommend-box ul {
    height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    margin: 0;
}

.recommend-box li {
    height: auto;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0;
    padding-left: 10px;
}

.el-carousel {
    margin-top: 8px;
    width: 776px;
    height: 360px;
    margin-left: 15px;
    border-radius: 8px;
}

.el-carousel img {
    width: 100%;
    height: 100%;
}

.person-box {
    margin-left: 15px;
    width: 200px;
    height: 360px;
    margin-top: 8px;
    background-color: #fff;
    border-radius: 8px;
    position: relative;
}

.person-box .short-txt {
    margin-top: 20px;
    text-align: center;
}

.person-box .avatar {
    position: absolute;
    bottom: 150px;
    right: 50px;
    transform: translate(-50%, -50%);
}

.person-box .el-button {
    position: absolute;
    bottom: 50px;
    right: 0;
    transform: translate(-50%, -50%);
}
</style>