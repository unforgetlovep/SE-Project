<template>
    <nav>
        <!--头部导航-->
        <div class="container wrap">
            <div class="nav-logo">
                <img src="/bg-pic/logo.jpg" alt="">
            </div>
            <div class="head-nav ">
                <ul class="container">
                    <li>
                        <router-link to="/">首页</router-link>
                    </li>
                    <li>
                        <a href="https://auth.sztu.edu.cn/idp/authcenter/ActionAuthChain?entityId=jiaowu">教务系统</a>
                    </li>
                    <li>
                        <router-link to="/user">我的</router-link>
                    </li>
                    <li>
                        <router-link to="/course">课程中心</router-link>
                    </li>
                </ul>
            </div>
            <div class="login-box">
                <template v-if="isLoggedIn">
                    <span style="margin-right: 10px;">欢迎您！{{ username }}</span>
                    <el-button type="primary" @click="logout">退出</el-button>
                </template>
                <template v-else>
                    <router-link to="/login">登录</router-link>
                    <span style="margin: 0 5px;">|</span>
                    <router-link to="/register">注册</router-link>
                </template>
            </div>
        </div>
    </nav>
</template>


<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.isLoggedIn);
const username = computed(() => userStore.username);

const logout = () => {
    userStore.logout();
    router.push('/');
};
</script>

<style scoped>
nav {
    height: 75px;
    background-color: #fff;
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
</style>