<template>
  <div class="main__form">
    <div class="signIn">
      <h2 class="signIn__title">新規登録</h2>
      <p class="signIn__subTitle">お名前</p>
      <input class="signIn__input" type="text" />
      <p class="signIn__subTitle">メールアドレス</p>
      <input class="signIn__input" type="text" v-model="email" />
      <p class="signIn__subTitle">パスワード</p>
      <input class="signIn__input" type="text" v-model="password" /><br />
      <button class="main-btn" @click="signIn()">登録する</button>
      <a href="/">トップ画面に戻る</a>
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
      });
    console.log('新規登録が完了しました！');
    this.$router.push('/home');
  }
}
</script>

<style lang="scss">
.main__form {
  margin: 60px 0;
  .signIn {
    margin: 0 auto;
    padding: 30px;
    width: 600px;
    border-radius: 10px;
    background-color: #ffffff;
    a {
      color: #8491a5;
    }
    &__title {
      color: #fcbd4c;
      font-size: 40px;
      padding-bottom: 20px;
    }
    &__subtitle {
      margin-top: 36px;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
    }
    &__input {
      padding: 10px 20px;
      width: 50%;
      border: 1px solid #fcbd4c;
      border-radius: 10px;
      margin-bottom: 30px;
    }
  }
}
</style>
