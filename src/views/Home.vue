<template>
  <div>
    <Header />
    <p>{{ getUid }}</p>
    <div class="serchFrom">
      <input class="serchFrom__input" type="text" v-model="keyword" />
      <button class="serchFrom__button" @click="serchBook()">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="display--flex">
      <ul v-for="book in books" :key="book.index">
        <router-link
          :to="{
            name: 'Detail',
            params: {
              book_title: book.Item.title,
              book_author: book.Item.author,
              book_publisherName: book.Item.publisherName,
              book_salesDate: book.Item.salesDate,
              book_price: book.Item.itemPrice,
              book_image: book.Item.mediumImageUrl,
              book_image2: book.Item.largeImageUrl,
              book_caption: book.Item.itemCaption,
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
                  <a href="book.Item.itemUrl" target="_blank">{{
                    book.Item.title
                  }}</a>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import { bookModule } from '@/store/modules/book';
import axios from 'axios';
import Header from '@/components/molecules/header.vue';

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {
  keyword = bookModule.keyword;
  books = [];

  get getUid() {
    return authModule.uid;
  }

  //一応キーワードを保持している
  get getKeyword() {
    return bookModule.keyword;
  }

  /* created() {
    //2回やらないと遷移されない
    if (!this.getUid) {
      this.$router.push('/');
    } else {
      console.log('画面遷移成功');
    }
  } */

  serchBook(): void {
    console.log(this.keyword);
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
        this.books = res.data.Items;
        bookModule.setKeyword(this.keyword);
        console.log(this.books);
      });
  }
}
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

.serchFrom__input {
  outline: 0;
  height: 2.2rem;
  margin: 0 -10px;
  max-width: 270px;
  border-radius: 10px;
  background: #fff;
  vertical-align: top;
}
.serchFrom__button {
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
</style>
