<template>
    <Header></Header>
    <div class="content">
        <template v-if="userRole === 1">
            <!-- 教师页面内容 -->
            <teacherContent/>
        </template>
        <template v-else-if="userRole === 0">
            <!-- 学生页面内容 -->
            <studentContent/>
        </template>
    </div>
    <Footer></Footer>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import Header from '@/components/Index/index-header.vue';
import Footer from '@/components/Index/index-footer.vue';
import teacherContent from '@/components/User/teacher-content.vue';
import studentContent from '@/components/User/student-content.vue';

const userStore = useUserStore();

// 使用 computed 属性从 Pinia Store 中获取 userRole 和 username 状态
const userRole = computed(() => userStore.userRole);
</script>

<style scoped>
.content {
    padding: 20px;
    height: 600px;
}

Footer{
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>