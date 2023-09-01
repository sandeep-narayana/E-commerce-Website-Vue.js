<template>
  <div class="container">
    <h1 class="title">Sign Up</h1>

    <el-form style="max-width: 460px" label-position="top">
      <!-- Email Id -->
      <el-form-item label="Email">
        <el-input v-model="email" placeholder="Enter Your email" />
      </el-form-item>
      <!-- Password -->
      <el-form-item label="Password">
        <el-input
          type="password"
          v-model="password"
          placeholder="Enter Your Password"
        />
      </el-form-item>
      <!-- Submit Button -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // Use defineComponent to define the component
import store from "@/store"; // Update the path to your store
import sweetAlert from "sweetalert2";

export default defineComponent({
  name: "LoginComponent",
  data() {
    return {
      email: null as string | null,
      password: null as string | null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const param = {
          email: this.email,
          password: this.password,
        };
        var res = await store.dispatch("userLogin", param);
        if (res.status === 200) {
          sweetAlert.fire({
            icon: "success",
            title: "Sign-In Successful",
          });
          this.$router.push({ name: "Home" });
        } else {
          sweetAlert.fire({
            icon: "error",
            title: "Authentication Failed",
            text: "Please check your credentials",
          });
          return;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>

</style>
