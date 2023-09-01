import { createStore } from "vuex";
import axios, { AxiosRequestConfig } from "axios"; // Import AxiosRequestConfig

const store = createStore({
  state: {
    test: "Hello i am test ",
    user: null as object | null, // Initialize user as null
    categories: [] as categories[],
    products: [] as products[],
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(user));
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setProducts(state, products) {
      state.products = products;
    },
  },

  actions: {
    // User Registration
    async registerUser(context, data: userSignUp) {
      const res = await axios.post(`http://localhost:3000/users`, data);
      return res;
    },

    // User Login
    async userLogin(context, data: UserLogin) {
      // Provide the correct AxiosRequestConfig
      const config: AxiosRequestConfig = {
        params: data, // Use 'params' to send data as query parameters
      };
      const res = await axios.get(`http://localhost:3000/users`, config);
      context.commit("setUser", res.data);
      return res;
    },

    // get All Categories
    async getAllCategories(context) {
      const res = await axios.get(`http://localhost:3000/categories`);
      context.commit("setCategories", res.data);
    },

    // get All products
    async getAllProducts(context) {
      const res = await axios.get(`http://localhost:3000/categories`);
      // Collect all products from categories
      const categories = res.data;
      const products = categories
        .map((category: categories) => category.products)
        .flat();
      context.commit("setProducts", products);
    },
  },

  getters: {
    currentUser: (state) => state.user,
    // returns true if there is a user object in the state
    isLoggedIn: (state) => !!state.user,
    allCategories: (state) => state.categories,
    allproducts: (state) => state.products,
  },
});

// Initialize the user data from localStorage during store creation
const savedUser = localStorage.getItem("user");
if (savedUser) {
  store.commit("setUser", JSON.parse(savedUser));
}

export interface userSignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface categories {
  name: string;
  description: string;
  image: string;
  id: number;
  products: products[];
}

export interface products {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

export default store;
