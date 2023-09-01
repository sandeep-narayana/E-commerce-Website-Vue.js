import { createStore } from "vuex";
import axios, { AxiosRequestConfig } from "axios"; // Import AxiosRequestConfig

const store = createStore({
  state: {
    test: "Hello i am test ",
    user: null as object | null, // Initialize user as null
    //user: "Sandeep",
    category: [] as Array<any>,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async registerUser(context, data: userSignUp) {
      const res = await axios.post(`http://localhost:3000/users`, data);
      return res;
    },

    async userLogin(context, data: UserLogin) {
      // Provide the correct AxiosRequestConfig
      const config: AxiosRequestConfig = {
        params: data, // Use 'params' to send data as query parameters
      };
      const res = await axios.get(`http://localhost:3000/users`, config);
      context.commit("setUser", res.data);
      return res;
    },
  },
  getters: {
    currentUser: (state) => state.user,
    // returns true if there is a user object in the state
    isLoggedIn: (state) => !!state.user,
  },
});

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
export default store;
