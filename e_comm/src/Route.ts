import {createRouter,createWebHistory} from 'vue-router'
import Login from "./components/login.vue"
import Home from "./components/Home.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        name: "Login",
        component: Login,
        path: "/login",
    },
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;