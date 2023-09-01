import { createRouter, createWebHistory } from "vue-router";
import SignUpComponent from "./components/SignUp.vue";
import Home from "./components/Home.vue";
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";
import store from "./store";
import CategoriesComponent from "./components/Category/Categories.vue"
import CategoryBox from "./components/Category/Categorybox.vue"

// because of typescript
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    name: "SignUpComponent",
    component: SignUpComponent,
    path: "/sign-up",
    beforeEnter:(to:RouteLocationNormalized, from:RouteLocationNormalized,next:NavigationGuardNext) =>{
        if(store.getters.isLoggedIn){
            next({name:'Home'})
        }else{
            next();
        }
    }

  },
  {
    name: "Login",
    component: Login,
    path: "/login",
    beforeEnter: (to:RouteLocationNormalized, from:RouteLocationNormalized, next:NavigationGuardNext) => {
      // Check if the user is authenticated
      if (store.getters.isLoggedIn) {
        // If authenticated, redirect to the home page
        next({ name: "Home" });
      } else {
        // If not authenticated, allow access to the login page
        next();
      }
    },
  },
  {
    name: "Dashboard",
    component: Dashboard,
    path: "/dashboard",
  },

  // categories
  {
    name: "CategoriesComponent",
    component: CategoriesComponent,
    path: "/categories",
  },
    // categories
    {
      name: "CategoryBox",
      component: CategoryBox,
      path: "/category-box",
    },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
