<template>
  <header class="site-header">
    <div class="site-header__wrapper">
      <router-link to="/home"
        ><span class="brand">書籍管理アプリ</span></router-link
      >
      <nav class="nav">
        <div class="nav__wrapper">
          <span><router-link to="/userpage">ユーザー</router-link></span>
          <button @click="logout()"><span>ログアウト</span></button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import firebase from 'firebase';

@Component
export default class Header extends Vue {
  get getUid(): string | null {
    return authModule.uid;
  }

  logout() {
    firebase.auth().signOut();
    authModule.deleteUser();
    authModule.changeFlgFalse();
    console.log(authModule.headerFlg);
    this.$router.push('/');
  }
}
</script>

<style lang="scss">
.brand {
  font-weight: bold;
  font-size: 35px;
  color: #fcbd4c;
}

.site-header {
  position: relative;
  background-color: #daf2e9;
}

.site-header__wrapper {
  padding: 2rem 6rem;
}

.nav__wrapper {
  display: flex;
}

@media (min-width: 600px) {
  .site-header__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
