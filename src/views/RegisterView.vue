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
                <input type="password" placeholder="Confirm Password" v-model="form.confirmPassword" />
            </div>
            <div class="button">
                <button @click="register">Register</button>
            </div>
        </form>
        <p> already have an account?
            <router-link to="/login">Login</router-link>
        </p>
        <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase/init";

// let idUser = Date.now() + Math.random()

const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
});

let errMsg = ref('');

async function registerUser() {

    if (form.value.name == '') {
        errMsg.value = "Name can't be empty"
        return
    }

    if (form.value.email == '') {
        errMsg.value = "Email can't be empty"
        return
    }

    if(!form.value.email.includes('@')){
        errMsg.value = "Email must be valid"
        return
    }

    if (form.value.password == '') {
        errMsg.value = "Password can't be empty"
        return
    }

    if (form.value.password.length < 6) {
        errMsg.value = "Password must be at least 6 characters"
        return
    }

    if (form.value.password !== form.value.confirmPassword) {
        errMsg.value = "Password doesn't match"
        return
    }

    const {error} = await supabase.auth.signUp({
        email: form.value.email,
        password: form.value.password,
    })

    if (error) {
        console.log('error', error)
    } else {
        console.log('success')
        window.location.href = '/login'
    }
}


//submit form
const register = () => {
    registerUser()
        .then(res => {
            console.log(res)
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

.errMsg {
    color: red;
    margin: 0;
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