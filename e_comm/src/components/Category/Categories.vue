<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-3">Our Categories</h3>
        </div>
      </div>
      <div class="row">
        <div
          v-for="category in allCategories"
          :key="category.id"
          class="col-xl-3 col-md-4 col-12 pt-3 d-flex"
        >
          <Categorybox :categoryData="category" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import Categorybox from "./Categorybox.vue";

export default defineComponent({
  name: "CategoriesComponent",
  computed: {
    ...mapGetters(["allCategories"]),
  },
  mounted() {
    // Access and print the data from the allCategories getter
    console.log(this.allCategories);
  },
  components: {
    Categorybox,
  },
});
</script>
