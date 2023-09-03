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
        <!-- buttons for wishlist -->
        <div
          class="card-footer d-flex justify-content-between"
          v-if="$route.name === 'ProductDetails'"
        >
          <button class="btn btn-primary" v-on:click="AddToCart()">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store, { categories, products } from "@/store";

export default {
  name: "ProductDetails",
  data() {
    return {
      displayProduct: {},
      category: {},
    };
  },

  computed: {
    ...mapGetters({
      allproducts: "allproducts", // Replace with your actual getter name
      allCategories: "allCategories", // Replace with your actual getter name
      currentUser: "currentUser",
    }),
  },

  async mounted() {
    //call the data on mount as computed is not working on refresh
    await store.dispatch("getAllCategories");
    await store.dispatch("getAllProducts");
    await this.loadProductData();
  },

  methods: {
    async loadProductData() {
      if (this.allproducts) {
        this.displayProduct = this.allproducts.find(
          (product) => product.id === parseInt(this.$route.params.id.toString())
        );
      }

      // Find the category that contains the displayProduct
      for (const cat of this.allCategories) {
        const foundProduct = cat.products.find(
          (product) => product.id === parseInt(this.$route.params.id.toString())
        );
        if (foundProduct) {
          this.category = cat;
          break; // Stop searching once the category is found
        }
      }
    },
    AddToCart() {
      const productId = parseInt(this.$route.params.id.toString());
      // Find the product with the given ID in your list of all products
      const productToAdd = this.allproducts.find(
        (product) => product.id === productId
      );
      // Check if the product exists before adding it to the cart
      if (productToAdd) {
        // Dispatch an action to add the product to the cart in your Vuex store
        store.dispatch("addToCart", productToAdd);

      } else {
        console.error("Product not found");
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
