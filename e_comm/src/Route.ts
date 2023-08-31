import {createRouter,createWebHistory} from 'vue-router'
import Login from "./components/login.vue"
import Home from "./components/Home.vue"
import Dashboard from "./components/Dashboard.vue"

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
    {
        name: "Dashboard",
        component: Dashboard,
        path: "/dashboard",
    },
]

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;