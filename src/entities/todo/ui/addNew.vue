<template>
  <div class="add-new-note">
    <input v-model="title" class="input" placeholder="Введите новую задачу" />

    <button
      :class="{ disabled: title === '' }"
      class="plus-button"
      @click="createTask"
    >
      <img :src="plus" class="icon" alt="icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import plus from "~/shared/assets/images/plus.svg";
import { useTaskStore } from "../model";

const tasksStore = useTaskStore();
const title = defineModel<string>();

const createTask = () => {
  title.value = "";
  tasksStore.addTask(title.value as string);
};
</script>

<style lang="scss" scoped>
.add-new-note {
  display: flex;
  gap: 5px;
}

.input {
  border: 1px solid var(--primary-color);
  padding: 15px;
  border-radius: 5px;

  color: #fff;
}

.plus-button {
  border-radius: 5px;
  background-color: var(--primary-color);
  width: 50px;
  border: none;
  position: relative;

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 15px;
    height: 15px;
  }
}

.disabled {
  color: var(--gray-color);
  cursor: none;
}
</style>
