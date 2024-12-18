<template>
    <Header></Header>
    <div class="content">
        <template v-if="userRole === 1">
            <!-- 教师页面内容 -->
            <h1>教师主页</h1>
            <p>欢迎，{{ username }} 老师！</p>
            <!-- 其他教师特定内容 -->
        </template>
        <template v-else-if="userRole === 0">
            <!-- 学生页面内容 -->
            <h1>学生主页</h1>
            <p>欢迎，{{ username }} 同学！</p>
            <!-- 其他学生特定内容 -->
        </template>
    </div>
    <Footer></Footer>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Header from '@/components/Index/index-header.vue';
import Footer from '@/components/Index/index-footer.vue';

const userStore = useUserStore();

// 使用 computed 属性从 Pinia Store 中获取 userRole 和 username 状态
const userRole = computed(() => userStore.userRole);
const username = computed(() => userStore.username);
</script>

<style scoped>
.content {
    padding: 20px;
}
</style>