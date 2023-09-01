<template>
  <Navbar />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import Navbar from "./components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
  },
  async mounted() {
    console.log("I am in App.vue");
    // load all categories
    await store.dispatch("getAllCategories");
    // load all products
    await store.dispatch("getAllProducts");
  },
});
</script>

<style>
.container {
  max-width: 170vh; /* Adjust the maximum width as needed */
  margin: auto; /* Center the container horizontally */
  padding: 20px; /* Add padding to the container */
  background-color: #fff; /* Set a default background color */
  border: 1px solid #ccc; /*Add a border to the container */
  border-radius: 5px; /* Apply rounded corners */
}
</style>
