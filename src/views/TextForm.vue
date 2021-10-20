<template>
  <div class="container">
    <div class="row py-3 align-items-center">
      <div class="col-auto">
        <h1>楽天検索</h1>
      </div>
      <div class="col">
        <input
          type="text"
          class="form-control"
          v-model="keyword"
          v-on:keydown.enter="search(keyword, 1)"
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" v-on:click="search(keyword, 1)">
          検索
        </button>
      </div>
    </div>

    <div class="row" v-if="totalCount">
      <div class="col">
        <strong>{{ totalCount }}</strong> 件の結果が見つかりました。
      </div>
    </div>

    <pagenation
      :showPages="showPages"
      :currentPage="currentPage"
      :totalCount="totalCount"
      :perPage="perPage"
      :totalPages="totalPages"
      @currentPage="getCurrentPage"
    ></pagenation>

    <div class="row flex-column" v-if="list">
      <div class="col col-item" v-for="(item, index) in list" :key="index">
        <a
          :href="item.Item.affiliateUrl"
          target="_blank"
          class="text-dark border p-2 d-block mb-3"
          rel="noopener noreferrer"
        >
          <div class="row">
            <div class="col-auto">
              <img
                :src="item.Item.mediumImageUrls[0].imageUrl"
                class="img-fluid"
                v-if="item.Item.mediumImageUrls[0]"
              />
            </div>
            <div class="col">
              <h3 class="font-weight-bold text-primary">
                {{ item.Item.itemName }}
              </h3>
              <div>
                <p>{{ item.Item.catchcopy }}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <pagenation
      :showPages="showPages"
      :currentPage="currentPage"
      :totalCount="totalCount"
      :perPage="perPage"
      :totalPages="totalPages"
      @currentPage="getCurrentPage"
    ></pagenation>
  </div>
</template>

<script>
import pagenation from '../components/pagenation.vue'
import axios from 'axios'

export default {
  data() {
    return {
      //ページネーションの設定
      currentPage: 1, //現在のページ（初期は1）
      showPages: 5, //ページネーションを何ページ表示するか（奇数でないとずれる）
      perPage: 5, //1ページの表示件数

      //API用の設定
      keyword: '',
      totalCount: 0, //取得したアイテムの総件数
      totalPages: 0, //総ページ数
      list: [],
    }
  },
  components: {
    pagenation,
  },
  methods: {
    //currentPageがページネーションコンポーネントから送られる現在のページ
    getCurrentPage(currentPage) {
      this.currentPage = currentPage
      //APIを呼び直す
      this.search(this.keyword, this.currentPage)
    },
    //APIからのデータ取得
    search(keyword, page) {
      if (!keyword) {
        return
      }
      axios
        .get(
          'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404',
          {
            params: {
              title: keyword,
              page: page,
              //hits:何件表示するか
              hits: this.perPage,
              applicationId: '1027306809265886299',
            },
          }
        )
        .then((res) => {
          console.log(res)
          if (res.data) {
            this.list = res.data.Items
            this.totalCount = res.data.count
            this.currentPage = res.data.page
            this.totalPages = res.data.pageCount
          }
        })
        .catch((error) => {
          //エラーのとき
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
/* CSSは見栄えを整えるだけ */
h1 {
  font-size: 1.4rem;
  margin-bottom: 0;
}
h3 {
  font-size: 1.2rem;
}
.col-item a {
  text-decoration: none;
}
</style>
