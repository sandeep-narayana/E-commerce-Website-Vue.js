<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store"

export default defineComponent({
  name: "App",
  components: {},
  async mounted(){
    // load all categories 
    await store.dispatch('getAllCategories');
    // load all products
    await store.dispatch('getAllProducts')
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
