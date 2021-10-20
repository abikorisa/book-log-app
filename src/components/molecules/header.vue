<template>
  <header class="site-header">
    <div class=" site-header__wrapper">
      <router-link to="/"
        ><span class="brand">書籍管理アプリ</span></router-link
      >
      <nav class="nav">
        <div v-if="getUid" class="nav__wrapper">
          <span @click="toUserPage()">{{ getUserName.name }}さんのページ</span>
          <span @click="logout()">ログアウト</span>
        </div>
        <div v-else class="nav__wrapper">
          <span @click="toLoginPage()">ログイン</span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { authModule } from '@/store/modules/auth'
import firebase from 'firebase'

@Component
export default class Header extends Vue {
  get getUid(): string | null {
    return authModule.uid
  }

  get getUserName(): string {
    return authModule.username
  }

  logout(): void {
    firebase.auth().signOut()
    authModule.deleteUser()
    authModule.changeFlgFalse()
    console.log(authModule.headerFlg)
    this.$router.push('/')
  }

  toUserPage(): void {
    this.$router.replace('/userpage')
  }
  toLoginPage(): void {
    this.$router.push('/login')
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
  max-width: 1170px;
  width: 80%;
  margin: 0 auto;
}

.nav__wrapper {
  display: flex;
  span {
    padding-left: 15px;
    cursor: pointer;
  }
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
/* @media (min-width: 600px) {
  .nav__wrapper {
    display: flex;
    span {
      color: #ffffff;
      font-weight: bold;
      padding-left: 15px;
      cursor: pointer;
    }
  }
} */
</style>
