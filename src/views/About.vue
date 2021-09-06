<template>
  <div class="home">
    <div>
      <button @click="increment100">increment 100!</button>
      <button @click="increment">increment 1</button>
    </div>
    increment counter: {{ incrementCounter }}
    <div>
      <button @click="decrement100">decrement 100!</button>
      <button @click="decrement">decrement 1</button>
    </div>
    decrement counter: {{ decrementCounter }}
    <div><button @click="resetCounter">reset counter</button></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { counterModule } from '@/store/modules/counter';

// モジュールクラスをインポート
@Component({
  components: {},
})
export default class About extends Vue {
  get incrementCounter() {
    return counterModule.incrementCounter; // インテリセンスが効く
  }
  get decrementCounter() {
    return counterModule.decrementCounter; // インテリセンスが
  }
  increment() {
    counterModule.SET_INCREMENT_COUNTER(counterModule.incrementCounter + 1); // 型チェックが効く
  }
  decrement() {
    counterModule.SET_DECREMENT_COUNTER(counterModule.decrementCounter - 1); // 型チェック
  }
  increment100() {
    counterModule.increment100(); // インテリセンスが効く
  }
  decrement100() {
    counterModule.decrement100(); // インテリセンスが
  }
  resetCounter() {
    counterModule.resetCounter(); // イ
  }
}
</script>
