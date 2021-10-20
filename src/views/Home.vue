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
    <button v-if="pageCount" @click="moreView">もっと見る</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { authModule } from '@/store/modules/auth'
import firebase from 'firebase'
import axios from 'axios'

@Component
export default class Home extends Vue {
  keyword = 'Vue.js'
  books: string[] = []
  //selectedBooksId = 0
  serchFlg = false
  pageCount = false
  totalPages = 0
  currentPage = 1

  get getUid(): string | null {
    return authModule.uid
  }

  created(): void {
    /* if (!this.getUid) {
      this.$router.push('/')
    } */
    if (this.getUid) {
      this.fetchUsername()
    }
    console.log(authModule.uid)
  }

  getBooks(): void {
    if (this.keyword === ' ' || this.keyword === '　') {
      this.keyword = ''
      this.serchFlg = true
    }
    axios
      .get('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404', {
        params: {
          applicationId: '1027306809265886299',
          title: this.keyword,
          hits: 12,
        },
      })
      .then((res) => {
        this.totalPages = res.data.pageCount
        this.books = []
        //検索結果が0の際の処理
        if (res.data.Items.length === 0) {
          this.serchFlg = true
        } else {
          this.serchFlg = false
          this.books = res.data.Items
        }
        //取得情報が30件以上ある際の処理
        if (res.data.pageCount > 1) {
          this.pageCount = true
        } else {
          this.pageCount = false
        }
      })
  }

  //元の検索結果の取得
  serchBook(): void {
    sessionStorage.setItem('search-params', this.keyword)
    this.getBooks()
  }

  fetchUsername(): void {
    firebase
      .firestore()
      .collection(`users/${this.getUid}/userInfo`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let user: any = doc.data()
          authModule.setUserName(user)
        })
      })
  }

  moreView(): void {
    this.currentPage = this.currentPage + 1
    if (this.currentPage <= this.totalPages) {
      axios
        .get(
          'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404',
          {
            params: {
              applicationId: '1027306809265886299',
              title: this.keyword,
              page: this.currentPage,
              hits: 12,
            },
          }
        )
        .then((res) => {
          //検索結果の総件数の表示
          this.totalPages = res.data.pageCount
          if (res.data.Items.length === 0) {
            this.serchFlg = true
          } else {
            this.serchFlg = false
            res.data.Items.forEach((item: any) => {
              this.books.push(item)
            })
            if (this.currentPage === this.totalPages) {
              this.pageCount = false
            }
          }
        })
    }
  }

  //検索情報が保持してた際の処理
  mounted() {
    if (sessionStorage.hasOwnProperty.call(sessionStorage, 'search-params')) {
      let keyword = sessionStorage.getItem('search-params')
      if (keyword != null) {
        this.keyword = keyword
      }
    }
    this.getBooks()
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
