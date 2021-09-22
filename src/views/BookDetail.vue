<template>
  <div>
    <Modal
      v-show="showContent"
      @from-child="closeModal"
      :book_title="this.$route.params.book_title"
      :book_author="this.$route.params.book_author"
      :book_image="this.$route.params.book_image"
    />
    <div class="details">
      <div class="details__left">
        <div class="details__image">
          <img :src="$route.params.book_image2" alt="" />
          <p>{{ this.$route.params.book_title }}</p>
          <p>{{ this.$route.params.book_author }}</p>
        </div>
        <button @click="openModal" class="btn__contents">
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
            <td class="table__body">{{ this.$route.params.book_title }}</td>
          </tr>
          <tr class="table__row">
            <th class="table__head">著者名</th>
            <td class="table__body">{{ this.$route.params.book_author }}</td>
          </tr>
          <tr class="table__row">
            <th class="table__head">出版社</th>
            <td class="table__body">
              {{ this.$route.params.book_publisherName }}
            </td>
          </tr>
          <tr class="table__row">
            <th class="table__head">発売日</th>
            <td class="table__body">{{ this.$route.params.book_salesDate }}</td>
          </tr>
          <tr class="table__row">
            <th class="table__head">価格</th>
            <td class="table__body">
              {{
                this.$route.params.book_price.toLocaleString('ja-JP')
              }}円(税込)
            </td>
          </tr>
          <tr class="table__row">
            <th class="table__head">あらすじ</th>
            <td class="table__body">{{ this.$route.params.book_caption }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { authModule } from '@/store/modules/auth';
import Modal from '@/components/molecules/modal.vue';

@Component({
  components: {
    Modal,
  },
})
export default class Detail extends Vue {
  bookInfo = this.$route.params;
  showContent = false;

  get getUid(): string | null {
    return authModule.uid;
  }

  openModal(): void {
    this.showContent = true;
  }
  closeModal(): void {
    this.showContent = false;
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
</style>
