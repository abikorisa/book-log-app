// ~/store/user.ts
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "@/store/store";

// Stateの型を定義する
export interface BookState {
  bookShelfId: string | null;
  bookShelf: []
}

// デコレータを設定。nameにモジュール名を指定する。UserStateを継承する
@Module({ stateFactory: true, dynamic: true, store, namespaced: true, name: "book" })
class Book extends VuexModule implements BookState {
  bookShelfId: string | null = null;
  bookShelf: [] = []

  get getBookShelfId(): string | null {
    return this.bookShelfId
  }

  // mutationはデコレータで指定
  /* @Mutation
  setLoginUser(user: any | null): void {
    this.bookShelfId = this.login_user.uid
  } 
  @Mutation
  addBookShelf(user: any | null): void {
    this.login_user = user
    console.log(this.login_user)
    this.uid = this.login_user.uid
    console.log(this.uid)
  }

  
  */
  @Mutation
  addBookShelf(id: string, book: any) {
    this.bookShelfId = id
    //ここでこbookが取得できていない・・・
    //console.log(book)
  }
}

export const bookModule = getModule(Book);