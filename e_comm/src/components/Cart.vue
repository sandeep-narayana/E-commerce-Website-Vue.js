<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3>"Hello, friend! Your wishlist is waiting for you."</h3>
      </div>
      <div class="row">
        <div
          v-for="product in this.Products"
          :key="product.id"
          class="col-xl-3 col-md-4 col-12 pt-3 d-flex"
        >
          <ProductBox :product="product"  />
        </div>
      </div>
    </div>
    <!-- Display Total Amount and Price -->
    <div class="row mt-4">
      <div class="col-12 text-center">
        <h4>Total Amount: ${{ getTotalAmount() }}</h4>
      </div>
    </div>

    <!-- "Buy Now" Button -->
    <div class="row mt-4">
      <div class="col-12 text-center">
        <!-- <router-link :to="{ name: 'PurchasePage', query: { cartItems: JSON.stringify(cart) } }">
          <router-link :to="{ name: 'PurchasePage', query: { cartItems: JSON.stringify(cart) } }">
          <button class="btn btn-primary">Buy Now</button>
        </router-link> -->
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>
  </div>
</template>
<script>
import ProductBox from "./Product/ProductBox.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartComponet",
  data() {
    return {
      Products: null,
    };
  },
  components: {
    ProductBox,
  },
  computed: {
    ...mapGetters(["currentUser"]), // Map the user and cart getters from Vuex
  },
  methods: {
    async fetchData() {
      try {
        this.Products = this.currentUser[0].cart
        console.log(this.Products);
      } catch (error) {
        console.log(error);
      }
    },
    getTotalAmount(){
        return 10000;
    }

  },
  mounted() {
    //mount data on page load
    this.fetchData();
  },
};
</script>
