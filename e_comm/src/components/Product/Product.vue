<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Our Products</h3>
        <!-- <router-link :to="{ name: 'AddProduct' }"
          ><button class="btn btn-primary">Add products</button>
        </router-link> -->
      </div>
      <div class="row">
        <div
          v-for="product in allproducts"
          :key="product.id"
          class="col-xl-3 col-md-4 col-12 pt-3 d-flex"
        >
          <ProductBox :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductBox from "./ProductBox.vue";
import{mapGetters} from "vuex"
export default {
  name: "ProductComponent",
  components: {
    ProductBox,
  },
  computed:{
    ...mapGetters(['allproducts'])
  },
};
</script>
