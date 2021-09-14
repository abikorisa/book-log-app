<template>
  <div class="home">
    <div class="main__form">
      <div class="signIn">
        <div class="position-center panel">
          <h2 class="signIn__title">書籍管理アプリ</h2>
          <p class="signIn__subTitle">メールアドレス</p>
          <input class="signIn__input" type="text" v-model="email" />
          <p class="signIn__subTitle">パスワード</p>
          <input
            class="signIn__input"
            type="password"
            v-model="password"
          /><br />
          <button class="main-btn" @click="signIn">ログイン</button>
          <router-link to="/register">新規登録はこちら</router-link>
        </div>
      </div>
    </div>
    <div class="home__img">
      <img class="home__img__1" alt="Vue logo" src="../assets/book2.png" />
      <img class="home__img__2" alt="Vue logo" src="../assets/book1.png" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { authModule } from '@/store/modules/auth';
import firebase from 'firebase';

export type DataType = {
  email: string;
  password: string;
};

export default Vue.extend({
  name: 'Login',
  components: {},
  props: {},
  data(): DataType {
    return {
      email: '',
      password: '',
    };
  },
  computed: {},
  methods: {
    signIn(): void {
      let email = this.email;
      let password = this.password;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          authModule.setUser;
          authModule.setLoginUser(user);
        });
      console.log('ログインが完了しました！');
      this.$router.push('/home');
    },
  },
  created() {
    console.log('CLICK!!!'); // eslint-disable-line
  },
});
</script>

<style lang="scss">
.home {
  width: 80%;
  margin: 0 auto;
  display: flex;
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
  .home__img {
    width: 300px;
    position: relative;
    .home__img__1 {
      position: absolute;
      top: -10px;
      left: 130px;
      width: 350px;
    }
    .home__img__2 {
      position: absolute;
      top: 130px;
      left: -100px;
    }
  }
}

.main-btn {
  display: inline-block;
  border-radius: 20px;
  font-size: 16pt;
  text-align: center;
  cursor: pointer;
  padding: 13px 30px;
  background: #fcbd4c;
  color: #ffffff;
  line-height: 1em;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
}
</style>
