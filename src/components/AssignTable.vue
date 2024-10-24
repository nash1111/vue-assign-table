<template>
  <div class="container">
    <div class="left-column">
      <div
        v-for="(item, index) in leftColumnItems"
        :key="index"
        :class="['box', item.assigned ? 'assigned' : 'unassigned']"
        @click="assignItem(index)"
      >
        {{ item.price }} 円
      </div>
    </div>
    <div class="right-column">
      <div
        v-for="(person, index) in rightColumnPeople"
        :key="index"
        class="box person"
      >
        {{ person.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftColumnItems: [
        { price: 5000, assigned: false },
        { price: 10000, assigned: false },
        { price: 15000, assigned: true }, // 初期でアサイン済み
      ],
      rightColumnPeople: [
        { name: "田中" },
        { name: "佐藤" },
        { name: "鈴木" },
      ],
      assignedPeople: [],
    };
  },
  methods: {
    assignItem(index) {
      if (!this.leftColumnItems[index].assigned) {
        const person = this.rightColumnPeople.shift();
        if (person) {
          this.assignedPeople.push(person);
          this.leftColumnItems[index].assigned = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.left-column, .right-column {
  margin: 10px;
}

.box {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 5px;
  text-align: center;
}

.assigned {
  background-color: blue;
  color: white;
}

.unassigned {
  background-color: red;
  color: white;
}

.person {
  background-color: gray;
}
</style>
