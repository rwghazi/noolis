<template>
    <div class="jumbotron">
        <div class="image" />
    </div>
    <div class="articles">
        <h1>Newest Articles</h1>

        <CardArticle :articles="data?.data" />
    </div>
    <div class="right">
        <h2 v-if="name">Hi,&nbsp;{{name}}!</h2>
    </div>
</template>

<script setup>

import "@fontsource/playfair-display";
import CardArticle from '../components/CardArticle.vue';
import { useFetch } from '../utils/fetch.js';
let name = localStorage.getItem('name')
const { data } = useFetch('https://63462f7c9eb7f8c0f875ffd3.mockapi.io/articles');

</script>

<style scoped>
.jumbotron .image {
    height: 93vh;
    width: 43%;
    left: 6%;
    top: 3%;
    background-image: url('../assets/jumbotron.png');
    background-size: cover;
    position: fixed;
}

.articles {
    position: absolute;
    top: 0%;
    left: 50%;
    margin: 16px;
}

.right {
    position: absolute;
    top: 0%;
    left: 92%;
    margin: 16px;
}

h1,
h3 {
    margin-bottom: 16px;
    font-family: "Poppins";
    letter-spacing: 0.5px;
}

a {
    text-decoration: none;
    color: black;
}



.right h2 {
    font-size: 16px;
    font-family: "Poppins";
    letter-spacing: 1.5px;
    margin-bottom: 16px;
}

/* responsiveness for mobile */

@media screen and (max-width: 768px) {
    .jumbotron .image {
        display: none;
    }

    .articles {
        position: relative;
        left: 20%;
        margin: 16px;
    }
}
</style>