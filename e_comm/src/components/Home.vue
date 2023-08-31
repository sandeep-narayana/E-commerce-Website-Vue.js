<template>
  <h1>Home Component</h1>
  <p> {{ test }}</p>
 
</template>
<script>
export default {
  name: "HomeComponent",
  computed: {
    test() {
      return this.$store.state.test;
    },
  },
};
</script>
