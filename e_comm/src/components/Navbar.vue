<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <!-- Button to toggle the navbar on smaller screens -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <!-- Home -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <!-- About -->
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'About' }">About</router-link>
          </li>
          <!-- Account Dropdown -->
          <li class="nav-item dropdown" v-if="loggedInUser">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="accountDropdown"
              role="button"
              @click="toggleDropdown"
            >
              {{ loggedInUser[0].firstName}} {{ loggedInUser[0].LastName}}
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="accountDropdown"
              :class="{ show: isDropdownOpen }"
            >
              <a class="dropdown-item" href="#" @click="handleLogout">Logout</a>
              <router-link :to="{ name: 'Home' }" class="dropdown-item">
                WishList
              </router-link>
              <router-link :to="{ name: 'Home' }" class="dropdown-item">
                Cart
              </router-link>
            </div>
          </li>
          <li class="nav-item dropdown" v-else>
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="accountDropdown"
              role="button"
              @click="toggleDropdown"
            >
              Account
            </a>
            <div
              class="dropdown-menu"
              aria-labelledby="accountDropdown"
              :class="{ show: isDropdownOpen }"
            >
              <a
                class="dropdown-item"
                href="/wishlist"
                @click="handleOptionClick('Wishlist')"
                >Wishlist</a
              >
              <a
                class="dropdown-item"
                href="/admin"
                @click="handleOptionClick('Admin')"
                >Admin</a
              >
              <div class="dropdown-divider"></div>
              <router-link :to="{ name: 'Login' }" class="dropdown-item">
                Login
              </router-link>
              <router-link :to="{ name: 'SignUp' }" class="dropdown-item">
                Signup
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavbarComponent",
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]), // Map the currentUser getter from Vuex
    loggedInUser() {
      return this.currentUser; // Use currentUser from Vuex
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleOptionClick(option) {
      if (option === "Signup") {
        this.$router.push({ name: "SignUp" });
      } else if (option === "Login") {
        this.$router.push({ name: "Login" });
      }
    },
    handleLogout() {
      // Clear user information from localStorage and refresh the page
      localStorage.removeItem("User-Info");
      this.$store.commit("setUser", null); // Update the Vuex store
      this.$router.push({ name: "Home" }); // Refresh the page
    },
  },
};
</script>

<style scoped></style>
