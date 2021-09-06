<template>
  <header class="site-header">
    <div class="site-header__wrapper">
      <a href="/"><span class="brand">書籍管理アプリ</span></a>
      <nav class="nav">
        <div class="nav__wrapper">
          <span @click="checkUser">マイページ</span>
          <span>ログアウト</span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header',
  components: {},
  props: {},
  data() {
  },
  computed: {},
  methods: {
    checkUser():void{
      console.log('user')
    }
  },
  created() {
  },
});
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
  padding: 2rem 3rem;
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
</style>
