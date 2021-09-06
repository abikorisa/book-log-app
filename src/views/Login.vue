<template>
  <div class="home">
    <div class="sign">
      <div class="container">
        <div class="position-center panel">
          <h2>書籍管理アプリ</h2>
          <p>メールアドレス</p>
          <input type="text" v-model="email" />
          <p>パスワード</p>
          <input type="password" v-model="password" /><br />
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
        .then(() => {
          console.log('ログインが完了しました！');
          this.$router.push('/home');
        });
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
  .sign {
    align-items: center;
    .container {
      padding: 0 30px;
      .p {
        margin-top: 36px;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
      }
      input {
        padding: 10px 20px;
        border: 1px solid #fcbd4c;
        border-radius: 10px;
        margin-bottom: 30px;
      }
      h2 {
        color: #fcbd4c;
        font-size: 40px;
      }
    }
    width: 50%;
    height: 500px;
    margin: 50px 0;
    border-radius: 10px;
    background-color: #ffffff;
    a {
      color: #8491a5;
    }
  }
  .home__img {
    width: 50%;
    .home__img__1 {
      position: absolute;
      top: -10px;
      left: 680px;
      width: 350px;
    }
    .home__img__2 {
      position: absolute;
      top: 130px;
      left: 500px;
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
