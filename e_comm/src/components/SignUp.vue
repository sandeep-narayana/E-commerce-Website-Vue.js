<template>
  <div class="container">
    <h1 class="title">Sign Up</h1>

    <el-form style="max-width: 460px" label-position="top">
      <!-- First Name -->
      <el-form-item label="First Name">
        <el-input v-model="firstName" placeholder="Enter Your First Name" />
      </el-form-item>
      <!-- Last Name -->
      <el-form-item label="Last Name">
        <el-input v-model="lastName" placeholder="Enter Your Last Name" />
      </el-form-item>
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
  name: "SignUpComponent",
  data() {
    return {
      firstName: null as string | null,
      lastName: null as string | null,
      email: null as string | null,
      password: null as string | null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const param = {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
        };
        var res = await store.dispatch("registerUser", param);
        if (res.status === 201) {
          sweetAlert.fire({
            icon: "success",
            title: "Sign-Up Successful",
            text: "Please login using the credentials",
          });
          // redirect to Login page
          this.$router.push({ name: "Login" });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

<style>
.container {
  max-width: 50vh; /* Adjust the maximum width as needed */
  margin: auto; /* Center the container horizontally */
  padding: 20px; /* Add padding to the container */
  background-color: #fff; /* Set a default background color */
  border: 1px solid #ccc; /* Add a border to the container */
  border-radius: 5px; /* Apply rounded corners */
}
</style>
