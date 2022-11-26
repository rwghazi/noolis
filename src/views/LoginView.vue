<template>
    <div class="jumbotron">
        <div class="image" />
    </div>
    <div class="login-form">
        <h1 class="title">Noolis</h1>
        <form v-on:submit.prevent="submitForm">
            <h1>Login</h1>
            <div class="input">
                <input type="text" placeholder="Email" v-model="form.email" />
            </div>
            <div class="input">
                <input type="password" placeholder="Password" v-model="form.password" />
            </div>
            <div class="button">
                <button @click="login">Login</button>
            </div>
        </form>
        <p> don't have an account yet?
            <router-link to="/register">Register</router-link>
        </p>
        <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase/init";

const form = ref({
    email: '',
    password: '',
});

let errMsg = ref('');

async function loginUser() {
    const { error } = await supabase.auth.signInWithPassword({
        email: form.value.email,
        password: form.value.password,
    })
    if (error) {
        console.log('error', error)
        error == "AuthApiError: Email not confirmed" ? errMsg.value = "Email not confirmed yet" : errMsg.value = "Wrong email or password"
    } else {
        console.log('success')
        window.location.href = '/'
    }
}

const login = () => {
    loginUser()
}


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

.title {
    font-family: "Playfair Display";
    letter-spacing: 1px;
    margin-bottom: 16px;
}

.login-form {
    position: absolute;
    top: 25%;
    left: 50%;
    margin: 16px;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    font-family: "Poppins";
    letter-spacing: 0.5px;
    margin-bottom: 16px;
}

input {
    width: 520px;
    height: 50px;
    font-size: 20px;
    padding: 16px;
    margin-bottom: 16px;
    font-family: "Poppins";
}

button {
    width: 520px;
    height: 50px;
    font-size: 20px;
    border: none;
    outline: none;
    resize: none;
    padding: 0px;
    margin: 0px;
    font-family: "Poppins";
    background-color: #000;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #333;
}

p {
    font-family: "Poppins";
    letter-spacing: 0.5px;
    margin: 32px;
}

a {
    text-decoration: none;
    color: black;
    font-weight: bold;
}

.errMsg {
    color: red;
}

@media screen and (max-width: 768px) {
    .jumbotron .image {
        display: none;
    }

    .login-form {
        top: 20%;
        left: 15%;
        margin: 16px;
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        width: 100%;
        height: 50px;
        font-size: 20px;
        padding: 16px;
        margin-bottom: 16px;
        font-family: "Poppins";
    }

    button {
        width: 100%;
        height: 50px;
        font-size: 20px;
        border: none;
        outline: none;
        resize: none;
        padding: 0px;
        margin: 0px;
        font-family: "Poppins";
        background-color: #000;
        color: white;
        cursor: pointer;
    }

    button:hover {
        background-color: #333;
    }
}
</style>