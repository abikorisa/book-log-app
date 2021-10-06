<template>
  <div class="wrapper">
    <div class="resister__form">
      <div class="signIn">
        <h2 class="signIn__title">新規登録</h2>

        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <p class="signIn__subTitle">お名前</p>
          <validation-provider
            v-slot="{ errors }"
            name="お名前"
            rules="required"
          >
            <input class="signIn__input" type="text" v-model="name" />
            <div class="signIn__error">
              <p>
                {{ errors[0] }}
              </p>
            </div>
          </validation-provider>

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
              <template v-if="errorFlg"
                ><p>※このメールアドレスは既に使用されています</p></template
              >
            </div>
          </validation-provider>

          <p class="signIn__subTitle">パスワード</p>
          <validation-provider
            v-slot="{ errors }"
            name="パスワード"
            rules="required"
          >
            <input class="signIn__input" type="password" v-model="password" />
            <div class="signIn__error">
              <p>
                {{ errors[0] }}
              </p>
            </div>
          </validation-provider>
          <button class="main-btn" :disabled="invalid" @click="signIn()">
            登録する
          </button>
          <router-link to="/">トップ画面に戻る</router-link>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import firebase from 'firebase';

//validate
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
extend('email', {
  ...email,
  message: '※入力形式が正しくありません',
});
extend('required', {
  ...required,
  message: '※{_field_}は必須項目です',
});

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class Register extends Vue {
  email = '';
  password = '';
  name = '';
  errorFlg = false;
  uid: string | null = null;

  get getUid(): string | null {
    return authModule.uid;
  }

  signIn(): void {
    let email = this.email;
    let password = this.password;
    let name = this.name;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authModule.setLoginUser(user);
        authModule.changeFlgTrue();
      })
      .then(() => {
        if (this.getUid) {
          firebase
            .firestore()
            .collection(`users/${this.getUid}/userInfo`)
            .add({ name })
            .then(() => {
              this.$router.push('/home');
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          this.errorFlg = true;
        }
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
