<template>
    <div>
        <div class="container">
            <div class="article" v-if="article">
                <div class="title">
                    <h2>{{article.title}}</h2>
                </div>
                <div class="author">
                    <img src="../assets/john.png" alt="">
                    <p>{{article.author}}</p>&nbsp; • &nbsp;<p>{{moment(article.createdAt).format('MMMM D, YYYY')}}</p>
                </div>
                <div class="content">
                    <div class="cover">
                        <img :src=article.image alt="">
                    </div>
                    <p>
                        {{article.content}}
                    </p>
                </div>
            </div>
            <div v-else>
                <PulseLoader color="#000" size="14px"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import moment from 'moment';
import { supabase } from "../supabase/init";
import { ref } from 'vue'

let article = ref(null) 

const route = useRoute()
let id = route.params.articleId

async function getArticle() {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()
    if (error) {
        console.log('error', error)
    } else {
        console.log('success')
        article.value = data
    }
}

getArticle()

</script>


<style scoped>
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
    margin: 50px 0;
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

.cover img {
    margin: 16px 0 32px 0;
    max-height: 300px;
    width: 100%;
    object-fit: cover;
}

@media screen and (max-width: 768px) {
    .container {
        position: relative;
        width: 100%;
        padding-left: 32px;
        padding-right: 24px;
        border-right: none;
    }
}
</style>