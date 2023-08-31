import {createRouter,createWebHistory} from 'vue-router'
import SignUpComponent from "./components/SignUp.vue"
import Home from "./components/Home.vue"
import Dashboard from "./components/Dashboard.vue"
import Login from "./components/login.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        name: "SignUpComponent",
        component: SignUpComponent,
        path: "/sign-Up",
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