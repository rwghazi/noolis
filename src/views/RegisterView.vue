<template>
    <div class="jumbotron">
        <div class="image" />
    </div>
    <div class="login-form">
        <h1 class="title">Noolis</h1>
        <form v-on:submit.prevent="submitForm">
            <h1>Register</h1>
            <div class="input">
                <input type="text" placeholder="Full Name" v-model="form.name" />
            </div>
            <div class="input">
                <input type="text" placeholder="Email" v-model="form.email" />
            </div>
            <div class="input">
                <input type="password" placeholder="Password" v-model="form.password" />
            </div>
            <div class="input">
                <input type="password" placeholder="Confirm Password" v-model="form.password" />
            </div>
            <div class="button">
                <button @click="register">Register</button>
            </div>
        </form>
        <p> already have an account?
            <router-link to="/login">Login</router-link>
        </p>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from "vue";

const form = ref({
    name: '',
    email: '',
    password: '',
});


//submit form
const register = () => {
    axios.post('http://localhost:8000/register', form.value)
        .then(res => {
            console.log(res)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('name', res.data.data.name)
            localStorage.setItem('userId', res.data.data.id)

            window.location.href = '/'
        })
        .catch(err => {
            console.log(err)
        })
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

.login-form {
    position: absolute;
    top: 20%;
    left: 50%;
    margin: 16px;
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title {
    font-family: "Playfair Display";
    letter-spacing: 1px;
    margin-bottom: 16px;
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