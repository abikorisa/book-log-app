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
      <button @click="updateReview(book)">更新する</button>
      <button @click="clickEvent">close</button>
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
