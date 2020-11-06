import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import axios from 'axios'
import VueAxios from 'vue-axios';
import {store} from './store'
import vuetify from '@/plugins/vuetify' 

Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

Vue.config.productionTip = false

require('dotenv').config();


axios.defaults = Object.assign(axios.defaults, {
  baseURL: process.env.VUE_APP_BACKEND_URI,
  headers: {
    "Content-type": "application/json",
    
  },
  withCredentials: true
});

axios.get('/auth/user')
  .then(res => { store.dispatch('loginState', true), 
    store.dispatch( 'user', { userName: res.data.userName, userId: res.data.userId } )
    console.log(' user authenticated ')
    console.log(store.getters.loginState)
  })
  .catch(() => store.dispatch('loginState', false))
  .finally(() => {

    axios.interceptors.response.use(
      res => { return res },
      error => {
        if (error.response.status === 401) {
          store.dispatch('loginState', false);
          router.push('/login');
        }
        return Promise.reject(error);
      });

    Vue.use(VueAxios, axios);
    new Vue({
      vuetify,
      router,
      store,
      render: h => h(App),
    }).$mount('#app')

});