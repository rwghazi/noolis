<template>
    <div class="wrapper">
        <form v-on:submit.prevent="submitForm">
            <div class="container" v-if="article">
                <h2>Edit Article</h2>
                <input class="title" type="text" placeholder="Write your title here ..." v-model="title">
                <div v-if="!image">
                    <label class="cover-upload">
                        <input type="file" accept="image/jpeg, image/png, image/jpg" v-on:change="onAddImage" />
                        Upload Cover
                    </label>
                </div>
                <div class="cover">
                    <img v-if="image" :src="image" />
                </div>
                <textarea class="content" type="text" placeholder="Write your content here ..."
                    v-model="content"></textarea>
            </div>
            <div class="container" v-else>
                <h2>Edit Article</h2>
                <PulseLoader color="#000" size="14px" />
            </div>
            <div class="aside">
                <button @click="submit" class="primary">
                    Post
                </button>
                <button @click="submitdraft" class="secondary">
                    Save as draft
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>

import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRoute } from 'vue-router'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const route = useRoute()
let idArticle = route.params.articleId


let article = ref(null)

let title = ref(null)
let content = ref(null)
let image = ref(null)

async function getArticle() {
    const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', idArticle)
        .single()
    if (error) {
        console.log('error', error)
    } else {
        console.log('success')
        article.value = data
        title.value = data.title
        content.value = data.content
        image.value = data.image
    }
}

getArticle()

async function postArticle() {
    const { error } = await supabase
        .from('articles')
        .update([
            { id: idArticle, title: title.value, content: content.value, image: image.value, user_id: article.value.user_id, is_draft: 'false', author: article.value.author },
        ])
        .eq('id', idArticle)

    if (error) {
        console.log('zzz', error)
    } else {
        console.log('success')
    }
}

async function postDraft() {
    const { error } = await supabase
        .from('articles')
        .update([
            { id: idArticle, title: title.value, content: content.value, image: image.value, user_id: article.value.user_id, is_draft: 'true', author: article.value.author },
        ])
        .eq('id', idArticle)

    if (error) {
        console.log('zzz', error)
    } else {
        console.log('success')
    }
}

const submit = () => {
    postArticle()
        .then(res => {
            console.log(res)
            window.location.href = '/'
        })
        .catch(err => console.log(err))
}

const submitdraft = () => {

    postDraft()
        .then(res => {
            console.log(res)
            window.location.href = '/drafts'
        })
        .catch(err => console.log(err))
}


</script>

<style scoped>
.container {
    position: absolute;
    top: 0%;
    left: 10%;
    margin: 16px 16px 16px 16px;
    width: 62%;
    padding-right: 24px;
    border-right: 2px solid #C0C0C0;
}

h2 {
    font-family: "Poppins";
    font-size: 32px;
    letter-spacing: 1.5px;
    margin: 14px 0 32px 0;
}


.title {
    width: 100%;
    height: 70px;
    font-size: 36px;
    border: none;
    outline: none;
    resize: none;
    padding: 0px;
    margin: 0px;
    font-weight: bold;
}

.content {
    width: 95%;
    min-height: 65vh;
    font-size: 20px;
    border: none;
    outline: none;
    resize: none;
    padding: 0px;
    margin: 0px;
    font-family: "Poppins";
}

.cover img {
    margin: 16px 0 32px 0;
    max-height: 300px;
    width: 100%;
    object-fit: cover;
}

.wrapper {
    display: flex;
    flex-direction: row;
}

.aside {
    position: fixed;
    right: 0;
    width: 27%;
    float: right;
    margin-top: 24px;
    padding-left: 24px;
    align-items: center;
    justify-content: center;
}

.aside button {
    width: fit-content;
    padding: 0 24px;
    height: 42px;
    font-size: 18px;
    font-weight: bold;
    margin-right: 16px;
    cursor: pointer;
    border-radius: 20px;
}

.primary {
    background-color: #000;
    color: #FFFFFF;
    border: none;
    outline: none;
}

.primary:hover {
    background-color: rgb(54, 53, 53);
    color: #FFFFFF;
    border: none;
    outline: none;
}

.secondary {
    background-color: #FFFFFF;
    color: #000;
    border: 2px solid #000;
    outline: none;
}

.secondary:hover {
    background-color: #f2f2f2;
    color: #000;
    border: 2px solid #000;
    outline: none;
}

input[type="file"] {
    display: none;
}

.cover-upload {
    border: 2px solid #ccc;
    border-style: dashed;
    display: inline-block;
    width: 95%;
    height: 100px;
    cursor: pointer;
    margin: 32px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: "Poppins";
    color: #c8c8c8;
}

@media screen and (max-width: 768px) {

    .wrapper {
        position: relative;
        left: 10%;
    }

    .container {
        width: 80%;
        padding-right: 0px;
        border-right: none;
    }

    .aside {
        position: absolute;
        top: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 24px;
        padding-left: 24px;
        align-items: flex-end;
        justify-content: center;
    }

    .title {
        font-size: 24px;
    }

    .content {
        font-size: 16px;
    }


}
</style>