<template>
    <div class="list">
        <div class="card" v-for="article in articles.articles || []" :key="article.id">
            <img class="cover" :src=article.image alt="">
            <div class="card-content">
                <div class="card-title">
                    <RouterLink :to="{name: 'article',  params: { articleId: article.id }}">
                        <p>{{article.title}}</p>
                    </RouterLink>
                </div>
                <div class="card-subtitle">
                    <div class="card-author">
                        <img src="../assets/john.png" alt="">
                        <p>{{"john"}}</p>
                    </div>
                    <div class="card-date">
                        <p>{{moment(article.createdAt).format('MMMM D, YYYY')}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import "@fontsource/poppins";
import { defineProps } from "vue";
import moment from 'moment';

const articles = defineProps({
    articles: {
        type: Array,
    },
})


</script>

<style scoped>
.card {
    width: 300px;
    min-height: 400px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.card:hover {
    transform: scale(1.05);
}
.cover{
    width: 100%;
    min-height: 400px;
    object-fit: cover;
}

.card-content {
    background-color: white;
    margin-top: -64px;
    width: 85%;
    padding: 16px;
}

.card-subtitle {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #929292;
    margin-bottom: 32px;
}

.card-author {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.card-title p {
    font-family: "Poppins";
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.5px;
}

.card-author img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 8px;
}

.card-subtitle p {
    font-family: "Poppins";
}

a {
    text-decoration: none;
    color: #000;
}

a:hover {
    text-decoration: none;
}
</style>