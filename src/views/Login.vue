<template>
  <div class="wrapper">
    <div class="home">
      <div class="login__form">
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
          authModule.setLoginUser(user);
          authModule.changeFlgTrue();
          console.log('ログインが完了しました！');
          this.$router.push('/home');
        });
    },
  },
});
</script>

<style lang="scss">
//flex(よりわかりやすい名前に置き換える)
.home {
  width: 60%;
  margin: 0 auto;
  display: flex;
}

//ログインページ
.login__form {
  margin: 60px auto;
  width: 450px;
}

.signIn {
  padding: 30px;
  border-radius: 10px;
  background-color: #ffffff;
  a {
    font-size: 14px;
    color: #8491a5;
  }
  &__title {
    margin-bottom: 20px;
    color: #fcbd4c;
    font-size: 40px;
  }
  &__subTitle {
    font-size: 15px;
  }
  &__input {
    padding: 10px 20px;
    margin-bottom: 30px;
    width: 230px;
    border: 1px solid #fcbd4c;
    border-radius: 10px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
}

.home__img {
  //この幅を絶対値へ
  width: 40%;
  position: relative;
  .home__img__1 {
    position: absolute;
    top: -10px;
    left: 90px;
    width: 350px;
  }
  .home__img__2 {
    position: absolute;
    top: 130px;
    left: -100px;
  }
}

//ログイン・新規登録画面で使用
.main-btn {
  display: inline-block;
  padding: 13px 30px;
  border-radius: 15px;
  font-size: 15pt;
  cursor: pointer;
  background: #fcbd4c;
  color: #ffffff;
  line-height: 1em;
  font-weight: 700;
  transition: 0.3s;
  &:hover {
    background-color: #e5e5e5;
    color: #fcbd4c;
  }
}
</style>
