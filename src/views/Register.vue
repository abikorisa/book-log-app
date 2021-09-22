<template>
  <div class="wrapper">
    <div class="resister__form">
      <div class="signIn">
        <h2 class="signIn__title">新規登録</h2>
        <p class="signIn__subTitle">メールアドレス</p>
        <input class="signIn__input" type="text" v-model="email" />
        <p class="signIn__subTitle">パスワード</p>
        <input class="signIn__input" type="password" v-model="password" /><br />
        <button class="main-btn" @click="signIn()">登録する</button>
        <router-link to="/">トップ画面に戻る</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import firebase from 'firebase';

@Component
export default class Register extends Vue {
  email = '';
  password = '';
  uid: string | null = null;

  get getUid(): string | null {
    return authModule.uid;
  }

  signIn(): void {
    let email = this.email;
    let password = this.password;
    console.log(`email${email}///pass${password}`);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authModule.setLoginUser(user);
        authModule.changeFlgTrue();
        this.$router.push('/home');
      });
  }
}
</script>

<style lang="scss">

//新規登録ページ
.resister__form {
  margin: 60px auto;
  width: 600px;
}
</style>
