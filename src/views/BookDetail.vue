<template>
  <div>
    <Modal
      v-show="showContent"
      @from-child="closeModal"
      :book_title="this.$route.params.book_title"
      :book_author="this.$route.params.book_author"
      :book_image="this.$route.params.book_image"
    />
    <Header />
    <p>{{ getUid }}</p>
    <div class="details">
      <div class="details__left">
        <div class="details__image">
          <img :src="$route.params.book_image2" alt="" />
          <p>{{ this.$route.params.book_title }}</p>
          <p>{{ this.$route.params.book_author }}</p>
        </div>
        <button @click="openModal" class="btn btn-tag btn-tag--bookmark">
          <i class="fas fa-bookmark"></i>本棚に追加
        </button>
        <a href="#" class="btn btn-tag btn-tag--bookmark">
          <i class="fas fa-bookmark"></i>書店で詳細を見る
        </a>
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
import Header from '@/components/molecules/header.vue';
import Modal from '@/components/molecules/modal.vue';

@Component({
  components: {
    Header,
    Modal,
  },
})
export default class Detail extends Vue {
  bookInfo = this.$route.params;
  showContent = false;

  get getUid() {
    return authModule.uid;
  }

  openModal() {
    this.showContent = true;
  }
  closeModal() {
    this.showContent = false;
  }
}
</script>

<style lang="scss" scoped>
.details__image {
  background-color: #fff;
  width: 216px;
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

@import 'https://use.fontawesome.com/releases/v5.13.0/css/all.css';

.btn,
a.btn,
button.btn {
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

button.btn-tag {
  position: relative;
  padding: 1.25rem 3rem 1.25rem 80px;
  color: #000;
}

button.btn-tag:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  content: '';
  border-radius: 0.5rem 0 0 0.5rem;
}

button.btn-tag--bookmark {
  background: #e5e5e5;
}

button.btn-tag--bookmark:before {
  background: #fcbd4c;
}

button.btn-tag--bookmark i {
  font-size: 120%;
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  padding: 1.5rem 0;
  text-align: center;
  letter-spacing: 0;
  opacity: 0.5;
  color: #fff;
}

button.btn-tag--bookmark:hover {
  color: #212529;
  background: #f2f2f2;
}

button.btn-tag--bookmark:hover i {
  opacity: 1;
  color: #fff100;
}

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
</style>
