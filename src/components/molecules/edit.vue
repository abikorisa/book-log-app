<template>
  <div id="overlay" @click="clickEvent">
    <div class="modal" @click="stopEvent">
      <div class="modal__header">
        <p class="modal__title">感想を編集する</p>
      </div>
      <p class="modal__bookTitle">{{ book.bookTitle }}</p>

      <div class="modal__review">
        <div class="modal__left">
          <img :src="book.bookImage" alt="" />
          <p>{{ book.bookAuthor }}</p>
        </div>
        <div class="modal__right">
          <div class="modal__form">
            <p>読み終わった日<span class="must">必須</span></p>
            <input v-model="editDate" class="modal__input" type="date" />
          </div>
          <div class="modal__form">
            <p>感想・レビュー<span class="must">必須</span></p>
            <textarea
              v-model="editText"
              class="modal__input"
              name="rea"
              id=""
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="editBtn">
        <button class="editBtn__add" @click="updateReview(book)">
          更新する
        </button>
        <button class="editBtn__back" @click="clickEvent">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import BookShelfType from '@/views/UserPage.vue';
import firebase from 'firebase';

interface reviewDate {
  reviewDate: string;
  reviewText: string;
}

@Component
export default class Edit extends Vue {
  review: reviewDate = {
    reviewDate: '',
    reviewText: '',
  };
  editDate = '';
  editText = '';

  @Prop({ default: '' })
  book!: BookShelfType;

  get getUid(): string | null {
    return authModule.uid;
  }

  updateReview(book: any) {
    let id = book.bookId;
    book.bookReview[0].reviewDate = this.editDate;
    book.bookReview[0].reviewText = this.editText;
    firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .doc(id)
      .update(book)
      .then(() => {
        console.log('更新が完了しました！');
        this.editDate = '';
        this.editText = '';
        this.clickEvent();
      });
  }

  clickEvent(): void {
    this.$emit('from-child');
  }
  // closeボタン意外の余白を押してもモーダルが消える
  stopEvent(event: Event): void {
    event.stopPropagation();
  }
}
</script>

<style lang="scss">
.editBtn {
  &__add {
    background-color: #fcbd4c;
    border-radius: 15px;
    padding: 5px 20px;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    transition: all 0.3s;
    &:hover {
      background-color: #e5e5e5;
      box-sizing: border-box;
      border-radius: 15px;
      color: #fcbd4c;
    }
  }
  &__back {
    color: #bbb;
    font-size: 15px;
    padding: 5px 10px;
  }
}
</style>
