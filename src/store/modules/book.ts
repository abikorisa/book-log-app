// ~/store/user.ts
import { Module, VuexModule, Mutation, getModule } from "vuex-module-decorators";
import { reviewDate, paramsDate, bookType, BookState } from '../../../types/bookInfoType'
import store from "@/store/store";


// デコレータを設定。nameにモジュール名を指定する。UserStateを継承する
@Module({ stateFactory: true, dynamic: true, store, namespaced: true, name: "book" })
class Book extends VuexModule implements BookState {
  bookShelfId: string | null = null;
  bookShelf: bookType[] = []
  deleteTargetId: string | null = null;
  params: paramsDate = { bookInfo: {}, id: '' }

  //getters----------------------------------------------------------------------
  get getBookShelfId() {
    return (id: string) => {
      this.bookShelf.find((book) => book.bookId === id)
      this.bookShelfId = id
    }
  }

  get getParams() {
    return this.params
  }

  //mutations----------------------------------------------------------------------
  @Mutation
  addBookShelfId(id: string) {
    this.bookShelfId = id
  }

  @Mutation
  setParams(bookInfo: any) {
    this.params = bookInfo
  }

  @Mutation
  resetBookShelf() {
    this.bookShelf = []
  }

  @Mutation
  deleteReview(bookId: string) {
    const book: any = this.bookShelf.find((book) => book.bookId === bookId);
    const index = this.bookShelf.indexOf(book);
    this.bookShelf.splice(index, 1);
  }

  @Mutation
  fetchBookShelf(book: bookType) {
    this.bookShelf.push(book)
  }
}

export const bookModule = getModule(Book);