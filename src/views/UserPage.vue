<template>
  <div>
    <Edit
      v-show="showEdit"
      @from-child="closeEdit"
      :edit_date="this.editDate"
      :edit_text="this.editText"
      :book="this.book"
    />
    <Header />
    <p>{{ getUid }}</p>
    <div class="details">
      <div class="details__left">
        <div class="details__image">
          <p>ユーザー名</p>
          <img width="100px" src="../assets/bookicon.png" alt="" />
        </div>
        <div class="bookcount">
          読んだ本<span class="bookNum">{{ bookShelf.length }}</span>
        </div>
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import { bookModule } from '@/store/modules/book';
import Header from '@/components/molecules/header.vue';
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
    Header,
    Edit,
  },
})
export default class UserPage extends Vue {
  bookShelf: BookShelfType[] = [];
  editDate = '';
  editText = '';
  book: any = {};
  showEdit = false;

  get getUid() {
    return authModule.uid;
  }

  created() {
    if (this.getUid !== null) {
      return true;
    } else {
      this.$router.push('/');
    }
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
    console.log(`削除されるidは${bookId}です`);
    let book: any = this.bookShelf.find((book) => book.bookId === bookId);
    let index = this.bookShelf.indexOf(book);
    this.bookShelf.splice(index, 1);
    firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .doc(bookId)
      .delete()
      .then(() => {
        console.log(`${bookId}の削除に成功しました`);
      });
  }

  editReview(book: BookShelfType) {
    this.editDate = book.bookReview[0].reviewDate;
    this.editText = book.bookReview[0].reviewText;
    this.book = book;
    this.openEdit();
  }

  fetchBooks() {
    firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .orderBy('bookDate', 'desc')
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let book: any = doc.data();
          this.bookShelf.push(book);
        });
      });
  }
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
    width: 100%;
    position: relative;
    .bookReview {
      &__date {
        border-bottom: 1px solid #bbb;
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
</style>
