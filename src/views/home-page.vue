<template>
    <nav>
        <!--头部导航-->
        <div class="container wrap">
            <div class="nav-logo">
                <img src="https://jwxt.sztu.edu.cn/jsxsd/assets/images/logo.png" alt="">
            </div>
            <div class="head-nav ">
                <ul class="container">
                    <li>
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                相关课程
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>计算机科学与技术</el-dropdown-item>
                                    <el-dropdown-item>人工智能</el-dropdown-item>
                                    <el-dropdown-item>大数据科学</el-dropdown-item>
                                    <el-dropdown-item disabled>敬请期待</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </li>
                    <li>
                        <a href="">教务系统</a>
                    </li>
                    <li>
                        <a href="">我的</a>
                    </li>
                </ul>
            </div>
            <div class="login-box">
                <a href="">
                    登录
                    <span>|</span>
                    注册
                </a>
            </div>
        </div>
    </nav>
    <main>
        <div class="wrap main-area">
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
            <!--推荐主区域-->
            <div>

            </div>
        </div>


    </main>
    <footer>

    </footer>

</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { ElCarousel, ElCarouselItem, ElAvatar } from 'element-plus';
import { ref } from 'vue';

const images = ref([
    '/images/lunbo1.png',
    '/images/lunbo2.png',
    '/images/lunbo3.png',
])
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
    color: black;
}

ul,
li {
    list-style: none;
}

nav {
    height: 75px;
    background-color: #fff;
}

main {
    height: auto;
    margin-bottom: 10px;
}

footer {
    height: 300px;
    border: 1px solid black;
}

.container {
    display: flex;
    position: relative;
}

.wrap {
    width: 1296px;
    margin: 0 auto;
}

.nav-logo {
    width: 250px;
    height: 100%;
    margin-right: 200px;
}

.nav-logo img {
    width: 100%;
    height: 100%;
}

.head-nav {
    line-height: 75px;
}

.login-box {
    position: absolute;
    right: 0;
    line-height: 75px;
    font-size: 20px;
}


.login-box a:hover {
    color: #409EFF;
}

.head-nav span {
    line-height: 75px;
}

.head-nav li {
    font-size: 22px;
    font-weight: 600;
    margin-right: 50px;
}


.el-icon--right {
    position: relative;
    top: 3px;
}

.el-dropdown-link {
    cursor: pointer;
    color: black;
    font-size: 22px;
}

.main-area {
    height: 100%;
    margin-top: 10px;
    border-radius: 8px;
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