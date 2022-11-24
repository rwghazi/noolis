<template>
    <div class="side-bar">
        <div class="logo">
            <RouterLink to="/">
                <img src="../assets/logo.png" alt="">
            </RouterLink>
        </div>
        <div class="center-menu">
            <div class="write">
                <RouterLink to="/write-article">
                    <img src="../assets/ic_write.png" alt="">
                </RouterLink>
            </div>
            <div class="draft">
                <RouterLink to="/drafts">
                    <img src="../assets/ic_draft.png" alt="">
                </RouterLink>
            </div>
            <div class="timeline">
                <RouterLink to="/timeline">
                    <img src="../assets/ic_timeline.png" alt="">
                </RouterLink>
            </div>
        </div>

        <div v-if="!isAuthenticated" class="login-btn">
            <RouterLink to="/login">
                <img src="../assets/ic_login.png" alt="">
            </RouterLink>
        </div>

        <div v-if="isAuthenticated" class="login-btn">
            <div class="profile-img">
                <img src="../assets/john.png" alt="">
            </div>
        </div>
    </div>

</template>

<script setup>
let isAuthenticated = false;

localStorage.getItem('token') ? isAuthenticated = true : false;




</script>

<style scoped>
.side-bar {
    background-color: #F7F7F7;
    height: 100%;
    width: 72px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    padding-top: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.dis {
    background-color: aqua;
}

.logo {
    width: 70%;
    padding-bottom: 12px;
    border-bottom: 2px solid #929292;
}

.logo img {
    width: 50px;
}

.login-btn {
    height: 10%;
    width: 70%;
    border-top: 2px solid #929292;
    padding-top: 16px;
}

.center-menu {
    display: flex;
    flex-direction: column;
}

.center-menu img {
    margin-bottom: 32px;
}

.timeline img,
.write img,
.login-btn img,
.draft img {
    width: 30px;
}
</style>