import { createStore } from "vuex";
import axios, { AxiosRequestConfig } from "axios"; // Import AxiosRequestConfig

const store = createStore({
  state: {
    test: "Hello i am test ",
  },
  getters: {},
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
      return res;
    },
  },
  mutations: {},
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
