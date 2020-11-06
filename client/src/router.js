import Vue from 'vue';
import Router from 'vue-router';
import SearchHistory from './components/SearchHistory'
import SearchBar from './components/Searchbar'
import { store } from './store'

Vue.use(Router);

const routes = [
{
    path: "/",
    name: "homepage",
    beforeEnter: (to, from, next) => {
        if (store.getters.loginState){
            next( { path: 'dashboard' })
        }
        else next()
    }
},
{
    path: "/dashboard",
    name: "dashboard",
    component: SearchBar,
    meta: { requiresAuth: true }
},
{
    path: "/dashboard/search-history",
    name: "search-history",
    component: SearchHistory,
    meta: { requiresAuth: true }
},
{
    path: "/login",
    name: "login",
    redirect: () => {
        if (!store.getters.loginState){
            window.location.href = `${process.env.VUE_APP_BACKEND_URI}/auth/login`;
            return '/redirect';
        }
        return { path: "dashboard "}
    }
}
]
const router = new Router({
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.loginState){
        next({
            path: 'login',
        })
      }
      else {
          next()
      }
    }
    else {
        next()
    }
});


export default router;