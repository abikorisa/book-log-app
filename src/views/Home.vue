<template>
  <div>
    <div class="serchFrom">
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
                book_title: book.Item.title,
                book_author: book.Item.author,
                book_publisherName: book.Item.publisherName,
                book_salesDate: book.Item.salesDate,
                book_price: book.Item.itemPrice,
                book_image: book.Item.mediumImageUrl,
                book_image2: book.Item.largeImageUrl,
                book_caption: book.Item.itemCaption,
                book_url: book.Item.itemUrl,
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
import { bookModule } from '@/store/modules/book';
import axios from 'axios';

@Component
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

  created() {
    if (!this.getUid) {
      this.$router.push('/');
      console.log('ログアウト状態なので遷移失敗（ ｉ _ ｉ ）');
    } else {
      console.log('ホーム画面に遷移できました！');
    }
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
        if (res.data.Items.length > 0) {
          this.books = res.data.Items;
          bookModule.setKeyword(this.keyword);
          console.log(this.books);
        } else {
          console.log('検索結果０');
        }
      });
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
    height: 2.2rem;
    margin: 0 -10px;
    max-width: 270px;
    border-radius: 10px;
    background: #fff;
    vertical-align: top;
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
