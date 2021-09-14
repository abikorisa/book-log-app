// ~/store/user.ts
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "@/store/store";

// Stateの型を定義する
interface reviewDate {
  reviewDate: string;
  reviewText: string;
}

interface bookType {
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  bookId: string;
  bookReview: reviewDate[];
}

export interface BookState {
  bookShelfId: string | null;
  bookShelf: bookType[]
}

// デコレータを設定。nameにモジュール名を指定する。UserStateを継承する
@Module({ stateFactory: true, dynamic: true, store, namespaced: true, name: "book" })
class Book extends VuexModule implements BookState {
  bookShelfId: string | null = null;
  bookShelf: bookType[] = []
  deleteTargetId: string | null = null;
  keyword = ''

  get getBookShelfId() {
    return (id: string) => {
      this.bookShelf.find((book) => book.bookId === id)
      this.bookShelfId = id
    }
  }

  get getKeyword() {
    return this.keyword
  }

  @Mutation
  addBookShelfId(id: string) {
    this.bookShelfId = id
    console.log('下記はbookShelfId')
    console.log(this.bookShelfId)
  }

  @Mutation
  setKeyword(keyword: string) {
    this.keyword = keyword
  }

  /* @Mutation
  addBookShelf(book: bookType) {
    console.log('下記はbookShelf[]の中身')
    this.bookShelf.push(book)
    console.log(this.bookShelf)
  } */
}

export const bookModule = getModule(Book);