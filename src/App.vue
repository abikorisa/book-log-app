<template>
  <div id="app">
    <Header v-if="getFlg" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/molecules/header.vue';
import Login from './views/Login.vue';
import { authModule } from './store/modules/auth';

@Component({
  components: {
    Login,
    Header,
  },
})
export default class App extends Vue {
  headerFlg = authModule.headerFlg;

  get getFlg(): boolean {
    return authModule.headerFlg;
  }
}
</script>

<style lang="scss">
@import 'https://use.fontawesome.com/releases/v5.13.0/css/all.css';
@import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Kosugi Maru', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(235, 248, 243);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  font-size: 100%;
  font-family: heisei-maru-gothic-std, sans-serif;
  font-style: normal;
  line-height: 1.7;
  letter-spacing: 1px;
}

body {
  margin: 0;
  background-color: rgb(255, 221, 220, 0.25);
  color: #24285b;
  height: 100%;
  background: rgb(235, 248, 243);
}

ul,
li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

a {
  display: block;
  text-decoration: none;
  color: #2d3133;
  font-size: 14px;
}

a:hover {
  transition: all 0.3s ease;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
p {
  margin: 0;
}

h1 {
  font-weight: 600;
}

input {
  font-family: inherit;
  font-size: 100%;
}

input,
button,
select,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: transparent;
  border: none;
  border-radius: 0;
  font: inherit;
  outline: none;
}

textarea {
  resize: vertical;
}

input[type='checkbox'],
input[type='radio'] {
  display: none;
}

input[type='submit'],
input[type='button'],
label,
button,
select {
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

.wrapper {
  width: 80%;
  max-width: 1170px;
  margin: 0 auto;
}
</style>
