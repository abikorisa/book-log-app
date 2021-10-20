<template>
  <div>
    <div class="details">
      <div class="details__left">
        <div class="details__image">
          <img :src="this.bookInfo.largeImageUrl" alt="" />
          <p>{{ this.bookInfo.title }}</p>
          <p>{{ this.bookInfo.author }}</p>
        </div>
        <button v-if="getUid" @click="openModal" class="btn__contents">
          <i class="fas fa-book-open"></i>本棚に追加する
        </button>
      </div>
      <div class="details__right">
        <table class="table">
          <caption>
            本の詳細
          </caption>
          <tr class="table__row">
            <th class="table__head">タイトル</th>
            <td class="table__body">{{ this.bookInfo.title }}</td>
          </tr>
          <tr class="table__row">
            <th class="table__head">著者名</th>
            <td class="table__body">{{ this.bookInfo.author }}</td>
          </tr>
          <tr class="table__row">
            <th class="table__head">出版社</th>
            <td class="table__body">
              {{ this.bookInfo.publisherName }}
            </td>
          </tr>
          <tr class="table__row">
            <th class="table__head">発売日</th>
            <td class="table__body">{{ this.bookInfo.salesDate }}</td>
          </tr>
          <tr class="table__row">
            <th class="table__head">価格</th>
            <td class="table__body">
              {{ this.bookInfo.itemPrice.toLocaleString('ja-JP') }}円(税込)
            </td>
          </tr>
          <tr class="table__row last">
            <th class="table__head">あらすじ</th>
            <td class="table__body">{{ this.bookInfo.itemCaption }}</td>
          </tr>
        </table>
      </div>
    </div>
    <Modal
      v-show="showContent"
      @from-child="closeModal"
      :book_title="this.bookInfo.title"
      :book_author="this.bookInfo.author"
      :book_image="this.bookInfo.mediumImageUrl"
      :book_image2="this.bookInfo.largeImageUrl"
    />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { authModule } from '@/store/modules/auth'
import { bookModule } from '@/store/modules/book'
import Modal from '@/components/molecules/modal.vue'

export type ParamsType = {
  bookInfo: any
  id: string
}

@Component({
  components: {
    Modal,
  },
})
export default class Detail extends Vue {
  bookInfo: ParamsType = {
    bookInfo: {},
    id: '',
  }
  showContent = false
  //selectedBooksId = 0

  get getUid(): string | null {
    return authModule.uid
  }

  get getParams() {
    return bookModule.params
  }

  created() {
    console.log('ページが開きました')
    if (this.$route.params.id) {
      let bookInfo = this.$route.params
      bookModule.setParams(bookInfo)
      let books = bookModule.params
      this.bookInfo = books.bookInfo
      this.setParams()
    } else {
      console.log('パラムスが空です')
    }
    /* if (!this.getUid) {
      this.$router.push('/')
    } */
  }

  setParams(): void {
    sessionStorage.setItem('catch-params', JSON.stringify(this.bookInfo))
  }

  openModal(): void {
    this.showContent = true
  }
  closeModal(): void {
    this.showContent = false
  }
}
</script>

<style lang="scss" scoped>
.details__image {
  background-color: #fff;
  width: 220px;
  margin: 0 auto 10px auto;
  padding-top: 10px;
  border-radius: 5px;
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

// 本詳細のtable
.table {
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0;
  max-width: 1117px;
  width: 80%;
  table-layout: auto;
  color: #000;
  &__row {
    background-color: #fff;
    padding: 0.35em;
    border-bottom: 1px solid #bbb;
    &:last-child {
      border-bottom: none;
    }
  }
  &__head {
    padding: 1em 10px 1em 1em;
    border-right: 1px dashed #bbb;
    white-space: nowrap;
    &:last-child {
      border: none;
    }
  }
  &__body {
    padding: 1em 10px 1em 1em;
    border-right: 1px solid #bbb;
    &:last-child {
      border: none;
    }
  }
}

@media screen and (max-width: 480px) {
  .last td:last-child {
    width: 100%;
  }
  .table {
    width: 100%;
    &__head {
      background-color: #eee;
      border-right: none;
      height: 30px;
      padding: 5px 10px 5px 10px;
      white-space: nowrap;
      &:last-child {
        border: none;
      }
    }
    &__body {
      font-size: 13px;
    }
    &__row {
      border-bottom: none;
    }
  }
  .table th,
  .table td {
    border-bottom: none;
    display: block;
    width: 100%;
  }

  caption {
    display: none;
  }
}

caption {
  background-color: #e5e5e5;
  height: 50px;
  padding: 10px;
  vertical-align: middle;
  text-align: left;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.btn__contents {
  background-color: #fcbd4c;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 8px;
  font-weight: 700;
  font-size: 15px;
  width: 220px;
  text-align: left;
  transition: all 0.3s;
  > i {
    padding-right: 10px;
    color: #fff;
  }
  &:hover {
    background-color: #e5e5e5;
    color: #fcbd4c;

    > i {
      color: #fcbd4c;
    }
  }
}

@media screen and (max-width: 480px) {
  .btn__contents {
    max-width: 480px;
    width: 80%;
    text-align: center;
  }
}

@media screen and (max-width: 480px) {
  .details {
    max-width: 480px;
    width: 80%;
    margin: 30px auto;
    display: block;
    &__left {
      width: 100%;
    }
    &__image {
      background-color: #fff;
      width: 100%;
      margin: 0 auto 10px auto;
      padding: 20px 0;
      border-radius: 5px;
      > p {
        font-size: 13px;
      }
    }
    &__right {
      width: 100%;
    }
  }
}
</style>
