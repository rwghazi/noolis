<template>
  <SideBar />
  <RouterView />
</template>

<script setup>

import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue';

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
