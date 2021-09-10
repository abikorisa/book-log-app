<template>
  <div>
    <Header />
    <p>{{ getUid }}</p>
    <div class="details">
      <div class="details__left">
        <div class="details__image">
          <p>ユーザー名</p>
          <img width="100px" src="../assets/Killua.png" alt="" />
        </div>
        <div class="bookcount">読んだ本<span class="bookNum">0</span></div>
        <button @click="fetchBooks()">本棚の情報を取得する</button>
      </div>
      <div class="details__right">
        <div class="caption">読んだ本の感想／編集</div>
        <ul v-for="book in bookShelf" :key="book.index">
          <li class="books">
            <div class="review">
              <div class="review__left">
                <img :src="book.bookImage" />
                <p class="review__bookTitle">{{ book.bookTitle }}</p>
                <p class="review__bookAuthor">{{ book.bookAuthor }}</p>
              </div>
              <div class="review__right">
                <p>{{ book.bookReview[0].reviewDate }}</p>
                <p>{{ book.bookReview[0].reviewText }}</p>
                <p>{{ getBookShelfId }}</p>
                <button>編集</button>
                <button>削除</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import { bookModule } from '@/store/modules/book';
import Header from '@/components/molecules/header.vue';
import firebase from 'firebase';

export type ReviewType = [string, string, string];

export type BookShelfType = {
  bookAuthor: string;
  bookImage: string;
  bookTitle: string;
  bookReview: ReviewType[];
};

@Component({
  components: {
    Header,
  },
})
export default class UserPage extends Vue {
  bookShelf: string[] = [];
  get getUid() {
    return authModule.uid;
  }

  get getBookShelfId() {
    return bookModule.bookShelfId;
  }

  fetchBooks() {
    firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let book: any = doc.data();
          this.bookShelf.push(book);
        });
      });
  }
  /* 
   deleteReview() {
     firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .doc()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let book: any = doc.data();
          this.bookShelf.push(book);
        });
      });
   } */
}
</script>

<style lang="scss">
.details {
  max-width: 1117px;
  width: 80%;
  margin: 30px auto;
  display: flex;
  &__left {
    width: 30%;
  }
  &__image {
    background-color: #fff;
    width: 216px;
    margin: 0 auto 10px auto;
    padding-top: 10px;
    border-radius: 5px;
  }
  &__right {
    width: 70%;
  }
}

.review {
  width: 630px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #bbb;
  &__left {
    width: 30%;
    padding: 10px 20px;
    border-right: 1px dashed #bbb;
  }
  &__right {
    width: 70%;
  }
  &__bookTitle {
    font-size: 10px;
    font-weight: bold;
    padding-bottom: 5px;
    //border-bottom: 1px dashed #fcbd4c;
  }
  &__bookAuthor {
    padding-top: 5px;
    font-size: 10px;
  }
}
.caption {
  background-color: #e5e5e5;
  height: 50px;
  margin: 0 auto;
  padding: 10px;
  width: 630px;
  vertical-align: middle;
  text-align: left;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
