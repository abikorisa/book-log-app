import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_ULNkGOX_437In6cNSWx1hGEHHBkxsXY",
  authDomain: "book-log-app-1cebd.firebaseapp.com",
  projectId: "book-log-app-1cebd",
  storageBucket: "book-log-app-1cebd.appspot.com",
  messagingSenderId: "537348921004",
  appId: "1:537348921004:web:5cce23c453d32835c33109"
};

const app = initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
