import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store/store'
import firebase from 'firebase'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyC_ULNkGOX_437In6cNSWx1hGEHHBkxsXY",
  authDomain: "book-log-app-1cebd.firebaseapp.com",
  projectId: "book-log-app-1cebd",
  storageBucket: "book-log-app-1cebd.appspot.com",
  messagingSenderId: "537348921004",
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
