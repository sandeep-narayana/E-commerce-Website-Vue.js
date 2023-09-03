<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3" v-if="category">{{ category.name }}</h3>
        <h5 style="font-weight: 300; color: #686868" v-if="category">
          {{ msg }}
        </h5>
        <h5 style="font-weight: 300; color: #686868" v-else>Loading...</h5>
      </div>
      <div class="row" v-if="category">
        <div
          v-for="product in category.products"
          :key="product.id"
          class="col-xl-4 col-md-6 col-12 pt-3 d-flex"
        >
          <ProductBox :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductBox from "../Product/ProductBox.vue";
import store from '@/store'

export default {
  name: "DisplayProducts",
  data() {
    return {
      msg: "",
      category: null,
    };
  },
  components: {
    ProductBox,
  },
  computed: {
    ...mapGetters(["allCategories"]), // Map the allCategories getter from Vuex
  },
  methods: {
    getCategoryById(id) {
      const category = this.allCategories.find((cat) => cat.id === id);
      if (!category) {
        // Handle category not found
        this.msg = "Category not found";
      } else {
        if (category.products.length === 0) {
          this.msg = "No Products Found";
        } else if (category.products.length === 1) {
          this.msg = "Only 1 Product Found";
        } else {
          this.msg = category.products.length + " Products Found";
        }
      }
      return category;
    },
    async fetchData() {
      const categoryId = parseInt(this.$route.params.id);
      this.category = this.getCategoryById(categoryId);
    },
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
  created() {
    // Fetch data when the component is created (initial page load)
    if (!this.allCategories.length) {
      // Fetch categories data only if it hasn't been fetched yet
      store.dispatch("getAllCategories").then(() => {
        // After fetching, call fetchData to set the category
        this.fetchData();
      });
    }
  },
  async mounted(){
      await store.dispatch("getAllCategories");
  }
};
</script>
