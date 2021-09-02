<template>
  <div class="home">
    <div class="sign">
      <div class="container">
        <div class="position-center panel">
          <h2>新規登録</h2>
          <p>お名前</p>
          <input type="text" />
          <p>メールアドレス</p>
          <input type="text" />
          <p>パスワード</p>
          <input type="text" /><br />
          <button class="main-btn">登録する</button>
          <a href="/">トップ画面に戻る</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Register extends Vue {}
</script>
