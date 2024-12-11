<template>
    <div class="page-container">
        <Header/>
        <div class="content">
            <Login/>
        </div>
        <Footer/>
    </div>
</template>

<script setup>
import Header from '@/components/Index/head-nav.vue';
import Footer from '@/components/Index/index-footer.vue';
import Login from '@/components/Account/login-content.vue';
</script>

<style scoped>
.page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/public/bg-pic/library.jpg'); /* 替换为实际的背景图路径 */
    background-size: cover; /* 确保背景图覆盖整个容器 */
    background-position: center; /* 背景图居中 */
}

footer {
    margin-top: auto;
}
</style>