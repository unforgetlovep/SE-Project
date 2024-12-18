<template>
    <Header/>
    <main class="wrap main-area">
        <div >
            <RecommendList />
        </div>
        <div >
            <Content />
        </div>
    </main>
    <Footer/>
</template>

<script setup>
import Header from '@/components/Index/index-header.vue';
import RecommendList from '@/components/Index/nav-carousel.vue';
import Content from '@/components/Index/main-content.vue';
import Footer from '@/components/Index/index-footer.vue';
</script>

<style scoped>
.wrap{
    width: 1296px;
    margin: 0 auto;
}

main {
    height: auto;
    margin-bottom: 10px;
}

.main-area {
    height: 100%;
    margin-top: 10px;
    border-radius: 8px;
}
</style>