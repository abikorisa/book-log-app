<template>
  <div>
    <Edit
      v-show="showEdit"
      @from-child="closeEdit"
      :edit_date="this.editDate"
      :edit_text="this.editText"
      :book="this.book"
    />
    <div class="details">
      <div class="details__left">
        <div class="details__image">
          <p>あなたの本棚</p>
          <img width="100px" src="../assets/bookicon.png" alt="" />
        </div>
        <div class="bookcount">
          <span><i class="fas fa-book"></i>読んだ本</span
          ><span class="bookNum">{{ bookShelf.length }}冊</span>
        </div>
      </div>
      <div v-if="this.showShelf" class="details__right">
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
                <div class="bookReview"></div>
                <p class="bookReview__date">
                  {{ book.bookReview[0].reviewDate }}
                </p>
                <p class="bookReview__text">
                  {{ book.bookReview[0].reviewText }}
                </p>
                <div class="bookReview__button">
                  <button @click="editReview(book)">
                    <i class="fas fa-pencil-alt icon"></i>
                  </button>
                  <button @click="deleteReview(book.bookId)">
                    <i class="far fa-trash-alt icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="caption">読んだ本の感想／編集</div>
        <ul>
          <li class="books">追加された本はありません</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import { bookModule } from '@/store/modules/book';
import Edit from '@/components/molecules/edit.vue';
import firebase from 'firebase';

export type reviewType = {
  reviewDate: string;
  reviewText: string;
};

export type BookShelfType = {
  bookAuthor: string;
  bookImage: string;
  bookTitle: string;
  bookReview: reviewType[];
  bookId: string;
};

@Component({
  components: {
    Edit,
  },
})
export default class UserPage extends Vue {
  bookShelf: BookShelfType[] = [];
  editDate = '';
  editText = '';
  book: any = {};
  showEdit = false;
  showShelf = true;

  get getUid() {
    return authModule.uid;
  }

  get getBookShelf() {
    return bookModule.bookShelf;
  }

  created() {
    if (!this.getUid) {
      this.$router.push('/');
    }
    //firestoreからデータを取得
    firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .orderBy('bookDate', 'desc')
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let book: any = doc.data();
          bookModule.fetchBookShelf(book);
          this.bookShelf = bookModule.bookShelf;
          if (this.bookShelf.length >= 1) {
            this.showShelf = true;
          } else {
            this.showShelf = false;
          }
        });
      });
    console.log(bookModule.bookShelf);
  }

  get getBookShelfId() {
    return bookModule.bookShelfId;
  }

  closeEdit() {
    this.showEdit = false;
  }

  openEdit() {
    this.showEdit = true;
  }

  deleteReview(bookId: string) {
    bookModule.deleteReview(bookId);
    firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .doc(bookId)
      .delete()
      .then(() => {
        console.log(`${bookId}の削除に成功しました`);
        console.log(bookModule.bookShelf);
        console.log(this.bookShelf);
        if (this.bookShelf.length === 0) {
          this.showShelf = false;
        }
      });
  }

  editReview(book: BookShelfType) {
    this.editDate = book.bookReview[0].reviewDate;
    this.editText = book.bookReview[0].reviewText;
    this.book = book;
    this.openEdit();
  }

  destroyed() {
    bookModule.resetBookShelf();
    this.bookShelf = [];
  }
}
</script>

<style lang="scss">
.details {
  max-width: 1117px;
  width: 60%;
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
    width: 100%;
    position: relative;
    .bookReview {
      &__date {
        text-align: left;
        padding-left: 20px;
      }
      &__text {
        padding: 10px 20px;
        text-align: left;
        font-size: 0.8rem;
      }
      &__button {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 1rem;
        .icon {
          color: #bbb;
        }
      }
    }
  }
  &__bookTitle {
    font-size: 10px;
    font-weight: bold;
    padding-bottom: 5px;
  }
  &__bookAuthor {
    padding-top: 5px;
    font-size: 10px;
  }
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
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

.bookcount {
  display: flex;
  background-color: #fff;
  padding: 10px 20px;
  margin: 0 auto;
  width: 216px;
  border-radius: 5px;
  justify-content: space-between;
  span > i {
    padding-right: 5px;
  }
}
</style>
