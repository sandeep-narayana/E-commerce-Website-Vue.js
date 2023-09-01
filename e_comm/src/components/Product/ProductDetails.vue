<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-1"></div>
      <!-- display image -->
      <div class="col-md-4 col-12" v-if="displayProduct">
        <img
          :src="displayProduct.image"
          alt=""
          class="img-fluid custom-image"
        />
      </div>
      <!-- Display product Details -->
      <div class="col-md-6 col-12 pt-3 pt-md-0">
        <h4 v-if="displayProduct">{{ displayProduct.name }}</h4>
        <h6 class="category font-italic">{{ category?.name }}</h6>
        <h6 class="font-weight-bold" v-if="displayProduct">
          ₹ {{ displayProduct.price }}
        </h6>
        <p v-if="displayProduct">{{ displayProduct.description }}</p>
        <div class="features pt-3">
          <h5><strong>Features</strong></h5>
          <ul class="list-unstyled">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapState } from "vuex";
import store, { categories, products } from "@/store";

export default {
  name: "ProductDetails",
  data() {
    return {
      displayProduct: null as products | null,
      category: {} as categories | null,
      id: 0, // Initialize id with a default value
    };
  },

  computed: {
    ...mapGetters(["allproducts", "allCategories"]),
  },

  async mounted() {
    //call the data on mount as computed is not working on refresh
    await store.dispatch("getAllCategories");
    await store.dispatch("getAllProducts");

    this.id = parseInt(this.$route.params.id.toString());
    console.log(typeof(this.id));
    await this.loadProductData();
  },

  methods: {
    async loadProductData() {
      if (this.allproducts) {
        this.displayProduct = this.allproducts.find(
          (product: products) => product.id === this.id
        );
      }

      // Find the category that contains the displayProduct
      for (const cat of this.allCategories) {
        const foundProduct = cat.products.find(
          (product: products) => product.id === this.id
        );
        if (foundProduct) {
          this.category = cat;
          break; // Stop searching once the category is found
        }
      }
    },
  },
};
</script>

<style>
.category {
  font-weight: 400;
}
</style>
