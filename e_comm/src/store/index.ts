import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state:{
        test:"Hello i am test "
    },
    getters:{},
    actions:{
        async registerUser(context, data:UserLogin){
            const res = await axios.post(`http://localhost:3000/users`,data);
            return res.data;
        }
    },
    mutations:{}
})


export interface UserLogin {
    first_name: string,
    last_name:string,
    email:string,
    password:string
  }

export default store; 