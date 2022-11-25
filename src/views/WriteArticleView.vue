<template>
    <div class="wrapper">
        <form v-on:submit.prevent="submitForm">
            <div class="container">
                <h2>New Post</h2>
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
import axios from 'axios';
import { ref } from "vue";
import { supabase } from "../supabase/init";

let idArticle = Date.now() + Math.random()

let idUser = JSON.parse(localStorage.getItem('sb-sbvkyaygchjgseagabwl-auth-token')).user.id
let author = JSON.parse(localStorage.getItem('sb-sbvkyaygchjgseagabwl-auth-token')).user.email

let title = ref('')
let content = ref('')
let image = ref('')

const onAddImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        image.value = reader.result;
    };
};

async function postArticle() {
    const { error } = await supabase
        .from('articles')
        .insert([
            { id: idArticle, title: title.value, content: content.value, image: image.value, user_id: idUser, is_draft: 'false', author: author  },
        ])

    if (error) {
        console.log('zzz', error)
    } else {
        console.log('success')
    }
}

async function postDraft() {
    const { error } = await supabase
        .from('articles')
        .insert([
            { id: idArticle, title: title.value, content: content.value, image: image.value, user_id: idUser, is_draft: 'true', author: author  },
        ])

    if (error) {
        console.log('zzz', error)
    } else {
        console.log('success')
    }
}

const submit = () => {
    const data = new FormData()
    data.append("file", image.value)
    data.append("upload_preset", "lw7i8fyd")
    data.append("cloud_name", "chcpyto")
    axios.post(`https://api.cloudinary.com/v1_1/chcpyto/image/upload`, data)
        .then(res => {
            image.value = res.data.url
            console.log("ss", image.value)
        })
        .then(
            postArticle()
                .then(res => {
                    console.log(res)
                    window.location.href = '/'
                })
        )
        .catch(err => {
            console.log(err)
        })
}

const submitdraft = () => {
    const data = new FormData()
    data.append("file", image.value)
    data.append("upload_preset", "lw7i8fyd")
    data.append("cloud_name", "chcpyto")
    axios.post(`https://api.cloudinary.com/v1_1/chcpyto/image/upload`, data)
        .then(res => {
            image = res.data.url
            console.log("image >>", image)
        })
        .then(
            postDraft()
                .then(res => {
                    console.log(res)
                    window.location.href = '/'
                })
                .catch(err => {
                    console.log(err)
                })
        )
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