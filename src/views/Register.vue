<template>
  <div class="home">
    <div class="sign">
      <div class="container">
        <div class="position-center panel">
          <h2>新規登録</h2>
          <p>お名前</p>
          <input type="text" />
          <p>メールアドレス</p>
          <input type="text" v-model="email" />
          <p>パスワード</p>
          <input type="text" v-model="password" /><br />
          <button class="main-btn" @click="signIn()">登録する</button>
          <a href="/">トップ画面に戻る</a>
        </div>
      </div>
    </div>
    <div>
      <ul class="flow">
        <li>
          <span class="icon">01</span>
          <dl>
            <dt>本を検索</dt>
            <dd>エントリーフォームに入力のうえ、ご応募ください。</dd>
          </dl>
        </li>

        <li>
          <span class="icon">02</span>
          <dl>
            <dt>レビューを投稿</dt>
            <dd>書類選考を通過した方には、追ってご連絡いたします。</dd>
          </dl>
        </li>

        <li>
          <span class="icon">03</span>
          <dl>
            <dt>本棚が完成</dt>
            <dd>人事または事業部責任者との面接を行います。</dd>
          </dl>
        </li>
      </ul>
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
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('新規登録が完了しました！');
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
.flow {
  display: flex;
  justify-content: space-between;
  li {
    flex-basis: 22%;
  }
  .icon {
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    line-height: 40px;
    width: 40px;
    color: #fff;
    background: rgb(107, 144, 219);
    margin: 0 auto 10px;
    display: block;
    border-radius: 50%;
    text-align: center;
    position: relative;
    letter-spacing: 2px;
    ::before {
      content: '';
      border: solid transparent;
      border-width: 8px;
      border-top-color: rgb(107, 144, 219);
      position: absolute;
      top: calc(100% - 2px);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.flow > li dl {
  width: 250px;
  padding: 20px 20px;
  margin: 0;
  border: 3px solid rgb(107, 144, 219);
  position: relative;
}
.flow > li:not(:last-child) dl::before {
  content: '';
  width: 14px;
  height: 14px;
  margin-right: 10px;
  display: inline-block;
  border-top: 4px solid rgb(102, 213, 233);
  border-right: 4px solid rgb(102, 213, 233);
  position: absolute;
  top: calc(50% - 14px);
  left: 104%;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.flow > li dl dt {
  font-size: 20px;
  font-weight: 600;
  color: rgb(107, 144, 219);
  -ms-flex-preferred-size: 20%;
  flex-basis: 20%;
  margin-bottom: 1vh;
  text-align: center;
}
</style>
