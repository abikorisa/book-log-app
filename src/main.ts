import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store/store'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: '1:537348921004:web:5cce23c453d32835c33109'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false

new Vue({
  router,
  //store,
  render: h => h(App)
}).$mount('#app')

/*
import Vue from 'vue'
import App from './App.vue'
import { AppStore } from './store/'

Vue.config.productionTip = false

Vue.prototype.$store = new AppStore({
  count: 0
})

new Vue({
  render: h => h(App)
}).$mount('#app') */