<template>
  <div>
    <div class="serchFrom">
      <p v-if="this.serchFlg">
        本が見つかりませんでした。別のキーワードも検索してみましょう。
      </p>
      <input class="serchFrom__input" type="text" v-model="keyword" />
      <button class="serchFrom__button" @click="serchBook()">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="list">
      <div class="display--flex">
        <ul v-for="book in books" :key="book.index">
          <router-link
            :to="{
              name: 'Detail',
              params: {
                bookInfo: book.Item,
                id: book.Item.isbn,
              },
            }"
          >
            <li class="books">
              <table>
                <tr>
                  <td height="150">
                    <img :src="book.Item.largeImageUrl" />
                  </td>
                </tr>
                <tr>
                  <td width="250" height="1em">
                    {{ book.Item.title }}
                  </td>
                </tr>
                <tr>
                  <td height="1em">{{ book.Item.author }}</td>
                </tr>
                <tr>
                  <td height="1em">
                    {{ book.Item.itemPrice.toLocaleString('ja-JP') }}円
                  </td>
                </tr>
              </table>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import axios from 'axios';

@Component
export default class Home extends Vue {
  keyword = 'Vue.js';
  books = [];
  selectedBooksId = 0;
  serchFlg = false;

  get getUid(): string | null {
    return authModule.uid;
  }

  created(): void {
    if (!this.getUid) {
      this.$router.push('/');
    }
  }

  //axiosで検索結果を取得
  getBooks(): void {
    axios
      .get('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404', {
        params: {
          applicationId: '1027306809265886299',
          title: this.keyword,
          //author: this.keyword,
        },
      })
      .then((res) => {
        this.books = [];
        if (res.data.Items.length === 0) {
          this.serchFlg = true;
          console.log('検索結果０');
          //下記処理の見直し
          if (this.keyword === '') {
            console.log('空の検索ワード');
          }
        } else {
          this.serchFlg = false;
          this.books = res.data.Items;
        }
      });
  }

  //sessionStorageへ保存
  serchBook(): void {
    sessionStorage.setItem('search-params', this.keyword);
    this.getBooks();
  }

  mounted() {
    if (sessionStorage.hasOwnProperty.call(sessionStorage, 'search-params')) {
      let keyword = sessionStorage.getItem('search-params');
      if (keyword != null) {
        this.keyword = keyword;
      }
    }
    this.getBooks();
  }
}
</script>

<style lang="scss">
.list {
  margin: 10px auto;
  max-width: 1117px;
  width: 100%;
  .display--flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .books {
      margin: 10px 10px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);
      transition: 0.3s;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}

.serchFrom {
  padding-top: 20px;
  &__input {
    outline: 0;
    padding: 10px;
    height: 2.2rem;
    margin: 0 -10px;
    max-width: 270px;
    border-radius: 10px;
    background: #fff;
    vertical-align: top;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  &__button {
    width: 40px;
    height: 2.2rem;
    border-radius: 0 10px 10px 0;
    background: #fcbd4c;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: none;
    vertical-align: top;
    &:hover {
      background: #eee;
      color: #fcbd4c;
    }
  }
}
</style>
