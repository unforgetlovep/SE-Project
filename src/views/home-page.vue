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
            <div>
                <div class="recommend-box">
                    <ul>
                        <li>推荐课程</li>
                        <li>推荐老师</li>
                    </ul>
                </div>
                <el-carousel height="360px">
                    <el-carousel-item v-for="item in images" :key="item">
                        <img :src="item" alt="轮播图{{item}}" style="width: 776px; height: 360px;" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--轮播图和导航-->
            
            
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
import { ElCarousel, ElCarouselItem } from 'element-plus';
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

main {
    background-color: #eee;
}

ul,
li {
    list-style: none;
}

nav {
    border: 1px solid black;
    height: 75px;
}

main {
    border: 1px solid black;
    height: 500px;
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
    background-color: #fff;
    height: 100%;
    margin-top: 10px;
    border-radius: 8px;
}

.recommend-box li {
    height: 250px;
    width: 100px;
    text-align: center
}


.recommend-box {
  display: flex;
  margin-top: 20px;
}

.recommend-box ul {
  display: flex;
}

.recommend-box li {
  margin-right: 20px;
  font-size: 18px;
  cursor: pointer;
}
</style>