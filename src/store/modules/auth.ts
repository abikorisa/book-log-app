// ~/store/user.ts
import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators";
import store from "@/store/store";

// Stateの型を定義する
export interface UserState {
  uid: string | null;
  login_user: any | null,
  headerFlg: boolean
}

// デコレータを設定。nameにモジュール名を指定する。UserStateを継承する
@Module({ stateFactory: true, dynamic: true, store, namespaced: true, name: "user" })
class User extends VuexModule implements UserState {
  uid: string | null = null;
  login_user: any | null = null;
  headerFlg = false;

  // getterはデコレータなしのgetアクセサで書く
  get isLogin(): boolean {
    return this.uid != null;
  }

  get getUid(): string | null {
    return this.uid
  }

  get getFlg(): boolean {
    return this.headerFlg
  }

  // mutationはデコレータで指定
  /* @Mutation
  setUser(uid: string | null): void {
    this.uid = uid;
  } */

  @Mutation
  deleteUser() {
    this.uid = null
  }

  @Mutation
  setLoginUser(user: any | null): void {
    this.login_user = user
    this.uid = this.login_user.uid
  }

  @Mutation
  changeFlgTrue() {
    this.headerFlg = true
  }
  @Mutation
  changeFlgFalse() {
    this.headerFlg = false
  }

  // actionもデコレータで指定
  /* @Action({ rawError: true })
  async login(uid: string | null) {
    // thisでmutationが呼べる
    this.setUser(uid);
  } */
}

export const authModule = getModule(User);