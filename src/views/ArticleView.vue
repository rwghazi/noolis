<template>
    <div>
        <div class="container">
            <div class="article">
                <div class="title">
                    <h2>{{data.data.title}}</h2>
                </div>
                <div class="author">
                    <img src="../assets/john.png" alt="">
                    <p>{{data.data.user_id}}</p>&nbsp; • &nbsp;<p>{{moment(data.createdAt).format('MMMM D, YYYY')}}</p>
                </div>
                <div class="content">
                    <div class="cover">
                        <img :src=data.data.image alt="">
                    </div>
                    <p>
                        {{data.data.content}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useFetch } from '../utils/fetch.js';
import moment from 'moment';

const route = useRoute()
let id = route.params.articleId

const { data } = useFetch('http://localhost:8000/articles/' + id);


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