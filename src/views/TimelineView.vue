<template>
    <div class="container" v-if="article">
        <h2>Timeline</h2>
        <div class="article" v-for="article in article || [] " :key="article.id">
            <div class="title">
                <hr>
                <RouterLink :to="{name: 'article',  params: { articleId: article.id }}">
                    <h2>{{article.title}}</h2>
                </RouterLink>
            </div>
            <div class="author">
                <img src="../assets/john.png" alt="">
                <p>{{article.author}}&nbsp; • &nbsp;{{moment(article.createdAt).format('MMMM D, YYYY')}}</p>
            </div>
            <div class="content">
                <p>{{article.content}}</p>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <h2>Timeline</h2>
        <PulseLoader color="#000" size="14px"/>
    </div>

</template>

<script setup>

import "@fontsource/poppins";
import { supabase } from "../supabase/init";
import { ref } from 'vue'
import moment from 'moment';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'


let article = ref(null)

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
        article.value = articles
    }
}

getArticles()

</script>

<style scoped>
h2 {
    font-family: "Poppins";
    font-size: 32px;
    letter-spacing: 1.5px;
    margin: 14px 0;
}

.container {
    position: absolute;
    top: 0%;
    left: 10%;
    margin: 16px;
    width: 62%;
    padding-right: 24px;
    border-right: 2px solid #C0C0C0;
}


.article {
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 16px;
    margin-bottom: 50px;
}

.content p {
    font-size: 18px;
    font-family: "Poppins";
    text-align: justify;
}

.title h2 {
    font-size: 24px;
    letter-spacing: 1.5px;
    font-family: "poppins";
    margin: 16px 0;
}

.author {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 16px 0;
}

.author img {
    margin-right: 16px;
}

.author p {
    font-size: 14px;
    font-family: "Poppins";
    color: #929292;
}

.content p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}

.content span {
    color: #000;
    font-weight: normal;
    cursor: pointer;
}

a {
    text-decoration: none;
    color: #000;
}

@media screen and (max-width: 768px) {
    .container {
        width: 80%;
        padding-right: 0;
        border-right: none;
        padding-left: 32px;
        padding-right: 24px;
    }

    .content p {
        -webkit-line-clamp: 5;
        line-height: 1.5;
        font-size: 14px;
    }

    .title h2 {
        font-size: 18px;
        margin: 12px 0;
    }

    .author p {
        font-size: 12px;
    }

    .author img {
        margin-right: 12px;
        width: 24px;
    }


}
</style>