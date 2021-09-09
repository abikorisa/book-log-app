<template>
  <div>
    <Header />
    <p>{{ getUid }}</p>
    <div class="serchFrom">
      <input class="serchFrom__input" type="text" v-model="keyword" />
      <button class="serchFrom__button" @click="serchBook()">
        検索
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
import axios from 'axios';
import Header from '@/components/molecules/header.vue';

@Component({
  components: {
    Header,
  },
})
export default class Home extends Vue {
  keyword = '';
  books = [];

  get getUid() {
    return authModule.uid;
  }

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
        this.keyword = '';
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
  height: 2.5rem;
  margin: 0 10px;
  max-width: 270px;
  border-radius: 2px;
  background: #fff;
  vertical-align: top;
}
.serchFrom__button {
  width: 70px;
  height: 2.5rem;
  border-radius: 2px;
  background: #7fbfff;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border: none;
  vertical-align: top;
  &:hover {
    background: #eee;
    color: #7fbfff;
  }
}
</style>
