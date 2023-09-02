<template>
  <div id="Home">
    <div id="backgroud-div" class="page-holder bg-cover">
    </div>

    <!-- Display loading indicator when data is loading -->
    <div v-if="isLoading" class="text-center">
      <p>Loading...</p>
    </div>

    <!-- Display Top Category and products when data is loaded -->
    <div v-else class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3">Top Category</h2>
        </div>
      </div>
      <!-- // show Category cards -->
      <div class="row">
        <div
          v-for="index in categorySize"
          :key="index"
          class="col-md-6 col-xl-4 col-12 pt-3 justify-content-around d-flex"
        >
          <Categorybox :categoryData="categories[index]" />
        </div>
      </div>

      <div class="row">
        <div class="col-12 text-center">
          <h2 class="pt-3">Top Products</h2>
        </div>
      </div>
      <!-- // show Product cards -->
      <div class="row">
        <div
          v-for="index in productSize"
          :key="index"
          class="col-xl-3 col-md-4 col-12 pt-3 d-flex"
        >
          <ProductBox :product="products[index]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Categorybox from "./Category/Categorybox.vue";
import ProductBox from "./Product/ProductBox.vue";

export default {
  name: "HomeComponent",
  data() {
    return {
      categorySize: 0,
      productSize: 0,
      isLoading: true, // Loading state
    };
  },
  components: {
    Categorybox,
    ProductBox,
  },
  computed: {
    ...mapGetters({
      categories: "allCategories",
      products: "allproducts",
    }),
  },
  beforeRouteEnter(to, from, next) {
    // Fetch data before entering the route
    next((vm) => {
      vm.fetchData(); // Call your data fetching method
    });
  },
  beforeRouteUpdate(to, from, next) {
    // Fetch data when the route is updated (e.g., navigating between products)
    this.fetchData();
    next();
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getAllCategories");
        await this.$store.dispatch("getAllProducts");
        this.categorySize = Math.min(6, this.categories.length);
        this.productSize = Math.min(8, this.products.length);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.page-holder {
  min-height: 100vh;
}
#backgroud-div {
  background: url("https://w0.peakpx.com/wallpaper/805/469/HD-wallpaper-kakashi-naruto-anime-quality-iphone-kakashi-hatake-manga-naruto-menamoto-naruto-uzumaki-nine-taled-fox.jpg");
}
.bg-cover {
  background-size: cover !important;
}

#heading {
  font-weight: 400;
}
</style>
