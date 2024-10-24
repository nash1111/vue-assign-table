<template>
  <div class="container">
    <div class="left-column">
      <div
        v-for="(item, index) in leftColumnItems"
        :key="index"
        :class="['box', item.isFullyAssigned ? 'fully-assigned' : 'partially-assigned']"
        @click="selectLeftItem(index)"
      >
        <!-- アサイン状態に応じてスタイルを分ける -->
        <span :class="['amount', item.unassignedPrice > 0 ? 'unassigned' : '']">
          {{ item.unassignedPrice }} 円
        </span>
        <span :class="['amount', item.assignedPrice > 0 ? 'assigned' : '']">
          {{ item.assignedPrice }} 円
        </span>
      </div>
    </div>

    <!-- 矢印表示スペース -->
    <div class="arrow-container">
      <div v-for="item in leftColumnItems" :key="item.price" class="arrows">
        <div
          v-for="person in item.assignedPeople"
          :key="person.name"
          class="arrow"
        >
          ⬅
        </div>
      </div>
    </div>

    <div class="right-column">
      <div
        v-for="(person, index) in rightColumnPeople"
        :key="index"
        class="box person"
        @click="selectRightPerson(person)"
      >
        {{ person.name }} - 単価: {{ person.price }}円, 人月: {{ person.workMonth }}
      </div>
    </div>

    <!-- 人月選択ボックスと決定ボタン -->
    <div v-if="selectedLeftItem !== null && selectedRightPerson !== null" class="assign-box">
      <p>アサインする人月を選択してください:</p>
      <select v-model="selectedWorkMonth">
        <option v-for="n in maxWorkMonths" :key="n" :value="n">{{ n }}</option>
      </select>
      <button @click="confirmAssignment">決定</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftColumnItems: [
        { price: 5000, assignedPrice: 0, unassignedPrice: 5000, isFullyAssigned: false, assignedPeople: [] },
        { price: 10000, assignedPrice: 0, unassignedPrice: 10000, isFullyAssigned: false, assignedPeople: [] },
        { price: 15000, assignedPrice: 15000, unassignedPrice: 0, isFullyAssigned: true, assignedPeople: [{ name: "鈴木", price: 12000, workMonth: 2.0 }] }, // 初期でアサイン済み
      ],
      rightColumnPeople: [
        { name: "田中", price: 5000, workMonth: 1.0, assigned: false },
        { name: "佐藤", price: 8000, workMonth: 0.5, assigned: false },
        { name: "鈴木", price: 12000, workMonth: 2.0, assigned: true },
      ],
      selectedLeftItem: null,
      selectedRightPerson: null,
      selectedWorkMonth: 0.5,
      maxWorkMonths: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0], // 人月選択肢
    };
  },
  methods: {
    // 左のセルを選択
    selectLeftItem(index) {
      if (!this.leftColumnItems[index].isFullyAssigned) {
        this.selectedLeftItem = this.leftColumnItems[index];
        this.selectedRightPerson = null; // 右の人物が選択されていない状態にリセット
      }
    },
    // 右の人物を選択
    selectRightPerson(person) {
      if (this.selectedLeftItem && !person.assigned) {
        this.selectedRightPerson = person;
      }
    },
    // アサインの確定
    confirmAssignment() {
      if (this.selectedLeftItem && this.selectedRightPerson) {
        const assignAmount = this.selectedWorkMonth * this.selectedRightPerson.price;

        // 左の列のアイテムを更新
        this.selectedLeftItem.assignedPrice += assignAmount;
        this.selectedLeftItem.unassignedPrice -= assignAmount;

        // アサインされた人物を配列に追加
        this.selectedLeftItem.assignedPeople.push({
          name: this.selectedRightPerson.name,
          price: this.selectedRightPerson.price,
          workMonth: this.selectedWorkMonth,
        });

        // 人物のアサイン状態を更新
        this.selectedRightPerson.assigned = true;

        // 完全アサインの確認
        if (this.selectedLeftItem.unassignedPrice <= 0) {
          this.selectedLeftItem.isFullyAssigned = true;
        }

        // 選択をリセット
        this.selectedLeftItem = null;
        this.selectedRightPerson = null;
        this.selectedWorkMonth = 0.5; // 初期値にリセット
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  position: relative;
}

.left-column, .right-column {
  margin: 10px;
}

.box {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
  position: relative;
}

.arrow-container {
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

.arrows {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.arrow {
  font-size: 24px;
}

.assigned {
  background-color: blue;
  color: white;
}

.unassigned {
  background-color: red;
  color: white;
}

.amount {
  display: block;
}

.fully-assigned {
  background-color: blue;
  color: white;
}

.partially-assigned {
  background: linear-gradient(to bottom, red, blue);
}

.person {
  background-color: gray;
}

.assign-box {
  margin-top: 20px;
}

.assign-box p {
  font-weight: bold;
}

.assign-box select {
  margin-right: 10px;
}

.assign-box button {
  padding: 5px 10px;
}
</style>
