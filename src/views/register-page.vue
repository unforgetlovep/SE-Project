<template>
    <div class="page-container">
        <Header/>
        <div class="content">
            <Register/>
        </div>
        <Footer/>
    </div>
</template>

<script setup>
import Header from '@/components/Index/index-header.vue';
import Footer from '@/components/Index/index-footer.vue';
import Register from '@/components/Account/register-content.vue';
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
    background-image: url('/public/bg-pic/c5.jpg'); /* 替换为实际的背景图路径 */
    background-size: cover; /* 确保背景图覆盖整个容器 */
    background-position: center; /* 背景图居中 */
}

footer {
    margin-top: auto;
}
</style>