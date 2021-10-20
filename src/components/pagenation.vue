<template>
  <div class="row py-3 justify-content-center" v-if="totalPages">
    <div class="col-auto">
      <!-- ページネーションの実装 -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <!-- 1ページ目なら機能させない -->
          <li class="page-item" :class="{ disabled: currentPageEdited == 1 }">
            <a class="page-link" href="#" v-on:click.prevent="setPage(1)"></a>
          </li>
          <li class="page-item" :class="{ disabled: currentPageEdited == 1 }">
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="setPage(currentPageEdited - 1)"
              :class="{ disable: currentPageEdited == 1 }"
            ></a>
          </li>
          <li
            class="page-item"
            v-for="num in showPagesFix"
            :key="num"
            :class="{ active: numFix(num) == currentPageEdited }"
          >
            <template v-if="numFix(num) == currentPageEdited">
              <span class="page-link">{{ numFix(num) }}</span>
            </template>
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="setPage(numFix(num))"
              v-else
              >{{ numFix(num) }}</a
            >
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPageEdited == totalPages }"
          >
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="setPage(currentPageEdited + 1)"
              >></a
            >
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPageEdited == totalPages }"
          >
            <a
              class="page-link"
              href="#"
              v-on:click.prevent="setPage(totalPages)"
              >>></a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPages: Number, //ページネーションを何件表示するか
    currentPage: Number, //現在のページ
    totalCount: Number, //総件数
    totalPages: Number, //総ページ数
    perPage: Number, //1ページあたりの表示件数
  },
  watch: {
    //ページネーションを複数設置したときの対応
    currentPage(val) {
      this.currentPageEdited = this.currentPage
    },
  },
  data() {
    return {
      currentPageEdited: Number,
    }
  },
  computed: {
    //ページ番号を計算する
    numFix() {
      return function(num) {
        let ajust = 1 + (this.showPages - 1) / 2
        let result = num
        //前ページがマイナスになる場合は1からはじめる
        if (this.currentPageEdited > this.showPages / 2) {
          result = num + this.currentPageEdited - ajust
        }
        //後ページが最大ページを超える場合は最大ページを超えないようにする
        if (this.currentPageEdited + this.showPages / 2 > this.totalPages) {
          result = this.totalPages - this.showPages + num
        } //総ページ数が表示ページ数に満たない場合、連番そのまま
        if (this.totalPages <= this.showPages) {
          result = num
        }
        return result
      }
    },

    //総記事数が表示ページ数以下の場合に調整する
    showPagesFix() {
      if (this.totalPages < this.showPages) {
        return this.totalPages
      } else {
        return this.showPages
      }
    },
  },
  mounted() {
    this.currentPageEdited = this.currentPage
  },
  methods: {
    //何ページ目を表示するか
    setPage(page) {
      //マイナスにならないようにする
      if (page <= 0) {
        this.currentPageEdited = 1
      }
      //最大ページを超えないようにする
      else if (page > this.totalPages) {
        this.currentPageEdited = this.totalPages
      } else {
        this.currentPageEdited = page
      }
      //親コンポーネントに現在のページを送る
      this.currentPage = this.currentPageEdited
    },
  },
}
</script>
