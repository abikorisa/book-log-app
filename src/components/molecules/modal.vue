<template>
  <div id="overlay" @click="clickEvent">
    <div class="modal" @click="stopEvent">
      <div class="modal__header">
        <p class="modal__title">本棚に追加</p>
      </div>
      <p class="modal__bookTitle">{{ book_title }}</p>
      <div class="modal__review">
        <div class="modal__left">
          <img :src="book_image" alt="" />
          <p>{{ book_author }}</p>
        </div>
        <div class="modal__right">
          <div class="modal__form">
            <p>読み終わった日</p>
            <input
              v-model="review.reviewDate"
              class="modal__input"
              type="date"
            />
          </div>
          <div class="modal__form">
            <p>感想・レビュー</p>
            <textarea
              v-model="review.reviewText"
              class="modal__input"
              name="rea"
              id=""
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="editBtn">
        <button class="editBtn__add" @click="addBookShelf()">
          <i class="fas fa-bookmark"></i>追加する
        </button>
        <button class="editBtn__back" @click="clickEvent">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { authModule } from '@/store/modules/auth'
import { bookModule } from '@/store/modules/book'
import firebase from 'firebase'

interface reviewDate {
  reviewDate: string
  reviewText: string
}

@Component
export default class Modal extends Vue {
  review: reviewDate = {
    reviewDate: '',
    reviewText: '',
  }

  @Prop({ default: '' })
  book_title!: string

  @Prop({ default: '' })
  book_image!: string

  @Prop({ default: '' })
  book_image2!: string

  @Prop({ default: '' })
  book_author!: string

  get getUid(): string | null {
    return authModule.uid
  }

  addBookShelf(): void {
    let book = {
      bookTitle: this.book_title,
      bookAuthor: this.book_author,
      bookImage: this.book_image,
      bookReview: [this.review],
      bookId: '',
    }
    firebase
      .firestore()
      .collection(`users/${this.getUid}/bookShelf`)
      .add(book)
      .then((doc) => {
        console.log('処理が通りました٩( ᐛ )وいえい')
        let id: any = doc.id
        let date = new Date()
        firebase
          .firestore()
          .collection(`users/${this.getUid}/bookShelf`)
          .doc(id)
          .update({ bookId: id, bookDate: date })
        bookModule.addBookShelfId(id)
        this.clickEvent()
        alert(`本棚に「${this.book_title}」を追加しました。`)
      })
  }

  clickEvent(): void {
    this.$emit('from-child')
  }
  // closeボタン意外の余白を押してもモーダルが消える
  stopEvent(event: Event): void {
    event.stopPropagation()
  }
}
</script>

<style lang="scss">
.modal {
  z-index: 2;
  width: 720px;
  padding: 1em;
  background: #fff;
  border-radius: 10px;
  &__header {
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid #bbb;
  }
  &__title {
    font-size: 20px;
    text-align: left;
  }
  &__bookTitle {
    font-size: 20px;
    text-align: left;
    font-weight: 700;
    margin-bottom: 20px;
  }
  &__input {
    border: 1px solid #bbb;
    border-radius: 5px;
    margin-bottom: 30px;
    padding: 10px;
    width: 300px;
  }
}
.modal__form {
  display: flex;
  justify-content: center;
  padding-top: 10px;
  border-bottom: 1px solid #bbb;
  > p {
    padding-right: 20px;
  }
}

.modal__review {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .modal__left {
    width: 20%;
    // border-right: 1px dashed #bbb;
  }
  .modal__right {
    margin: 0 20px;
    width: 80%;
    .must {
      font-size: 10px;
      font-weight: 900;
      padding: 3px 5px;
      margin-left: 5px;
      border-radius: 5px;
      color: #fff;
      background-color: red;
      display: inline-block;
      vertical-align: top;
    }
  }
}
</style>
