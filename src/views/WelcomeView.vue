<template>
    <div class="jumbotron">
        <div class="image" />
    </div>
    <div class="articles">
        <h1>Newest Articles</h1>
        <div v-if="data">
            <CardArticle :articles="data" />
        </div>
        <div v-else>
            <PulseLoader color="#000" size="14px" />
        </div>
    </div>
    <div class="right">
        <h2 v-if="email">{{ email }}</h2>
    </div>

</template>

<script setup>

import "@fontsource/playfair-display";
import CardArticle from '../components/CardArticle.vue';
import { supabase } from "../supabase/init";
import { ref } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


let data = ref(null)
let email = ref(null)

email.value = JSON.parse(localStorage.getItem('sb-sbvkyaygchjgseagabwl-auth-token'))?.user.email

async function getArticles() {
    let { data: articles, error } = await supabase
        .from('articles')
        .select('*')
        .order('id', { ascending: false })
        .filter('is_draft', 'eq', 'false')
        .limit(6)
    if (error) {
        console.log(error)
    } else {
        data.value = articles
    }
}

getArticles()

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
    right: 0%;
    margin: 16px;
    color: #959595;
}

.right h2 {
    font-weight: 400;
    font-size: 12px;
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
        margin: 48px 16px 16px 16px;
    }
}
</style>