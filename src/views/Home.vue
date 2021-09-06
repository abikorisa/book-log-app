<template>
  <div>
    <Header />
    <input type="text" v-model="keyword" /><button @click="serchBook()">
      検索
    </button>
    <div class="display--flex">
      <ul v-for="book in books" :key="book.index">
        <li class="books">
          <table>
            <tr>
              <td height="150">
                <img :src="book.Item.mediumImageUrl" />
              </td>
            </tr>
            <tr>
              <td width="250" height="1em">
                <a href="book.Item.itemUrl" target="_blank">{{
                  book.Item.title
                }}</a>
              </td>
            </tr>
            <tr>
              <td height="1em">{{ book.Item.itemPrice }}円</td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Header from '@/components/molecules/header.vue';

export default Vue.extend({
  name: 'Home',
  components: { Header },
  props: {},
  data() {
    return {
      keyword: '',
      books: [],
      pageSize: 9,
    };
  },
  computed: {},
  methods: {
    serchBook() {
      console.log(this.keyword);
      axios
        .get(
          'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404',
          {
            params: {
              applicationId: '1027306809265886299',
              title: this.keyword,
            },
          }
        )
        .then((res) => {
          this.books = [];
          this.books = res.data.Items;
          this.keyword = '';
          console.log(this.books);
        });
    },
  },
  created() {
    console.log('CLICK!!!'); // eslint-disable-line
  },
});
</script>

<style lang="scss">
.display--flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .books {
    margin: 10px 10px;
    background-color: #ffffff;
  }
}
</style>
