<template>
  <div class="wrapper">
    <div class="home">
      <div class="login__form">
        <div class="signIn">
          <div class="position-center panel">
            <h2 class="signIn__title">書籍管理アプリ</h2>
            <p class="error-message" v-if="loginError">
              入力に不備があります
            </p>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <p class="signIn__subTitle">メールアドレス</p>
              <validation-provider
                v-slot="{ errors }"
                name="メールアドレス"
                rules="required|email"
              >
                <input class="signIn__input" type="email" v-model="email" />
                <div class="signIn__error">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="パスワード"
                rules="required"
              >
                <p class="signIn__subTitle">パスワード</p>

                <input
                  class="signIn__input"
                  type="password"
                  v-model="password"
                />
                <div class="signIn__error">
                  <p>
                    {{ errors[0] }}
                  </p>
                </div>
              </validation-provider>
              <button class="main-btn" :disabled="invalid" @click="signIn">
                ログイン
              </button>
              <router-link to="/register">新規登録はこちら</router-link>
            </ValidationObserver>
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
import Vue from 'vue'
import { authModule } from '@/store/modules/auth'
import firebase from 'firebase'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
extend('email', {
  ...email,
  message: '※入力形式が正しくありません',
})
extend('required', {
  ...required,
  message: '※{_field_}は必須項目です',
})

export type DataType = {
  email: string
  password: string
  loginError: boolean
}

export default Vue.extend({
  name: 'Login',
  components: { ValidationObserver, ValidationProvider },
  props: {},
  data(): DataType {
    return {
      email: '',
      password: '',
      loginError: false,
    }
  },
  computed: {},
  methods: {
    signIn(): void {
      let email = this.email
      let password = this.password
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.loginError = false
          const user = userCredential.user
          authModule.setLoginUser(user)
          authModule.changeFlgTrue()
          this.$router.replace('/')
        })
        .catch(() => {
          this.loginError = true
          this.email = ''
          this.password = ''
        })
    },
  },
})
</script>

<style lang="scss">
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
  box-shadow: 5px 5px 10px rgba(180, 180, 180, 0.6);
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
    width: 230px;
    border: 1px solid #fcbd4c;
    border-radius: 10px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  &__error {
    margin-bottom: 20px;
    > p {
      font-size: 15px;
      color: #fcbd4c;
    }
  }
}

@media screen and (max-width: 480px) {
  .login__form {
    margin: 60px auto;
    width: 330px;
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

.error-message {
  font-size: 13px;
}
</style>
