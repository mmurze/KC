<template>
  <div class="note-container">
    <p class="title" :class="{ 'title-is-solved': isSolved }">
      {{ task?.title }}
    </p>

    <div class="icons">
      <button
        v-if="!isSolved"
        class="icon"
        @click="tasksStore.changeTask(task.id, task.title, !task.isSolved)"
      >
        <img :src="check" alt="icon" />
      </button>

      <button
        v-else
        class="icon"
        @click="tasksStore.changeTask(task.id, task.title, !task.isSolved)"
      >
        <img class="xmark" :src="xmark" alt="icon" />
      </button>

      <button class="icon" @click="tasksStore.deleteTask(task.id)">
        <img :src="trash" alt="icon" />
      </button>

      <button class="icon" @click="openModal">
        <img :src="pen" alt="pen" style="height: 15px; width: 15px" />
      </button>
    </div>
  </div>

  <Modal v-model="isModalOpen">
    <h3>Введите новый заголовок задачи</h3>
    <input v-model="changedTask" placeholder="Задачка" class="input" />
    <button
      :disabled="changedTask === ''"
      class="button-save"
      :class="{ disabled: changedTask === '' }"
      @click="changeTask"
    >
      Сохранить
    </button>
  </Modal>
</template>

<script setup lang="ts">
import { Modal } from "~/shared/ui/modal";
import check from "~/shared/assets/images/check.svg";
import trash from "~/shared/assets/images/trash.svg";
import xmark from "~/shared/assets/images/xmark.svg";
import pen from "~/shared/assets/images/pen.svg";

import type { Task } from "../types";

import { useTaskStore } from "../model";

const tasksStore = useTaskStore();

const props = defineProps<{ task: Task; isSolved?: boolean }>();

const isModalOpen = ref<boolean>(false);
const changedTask = ref<string>("");

const openModal = () => {
  isModalOpen.value = true;
  changedTask.value = props.task.title;
};

const changeTask = () => {
  isModalOpen.value = false;
  tasksStore.changeTask(props.task.id, changedTask.value, props.task.isSolved);
};
</script>

<style scoped>
.note-container {
  background-color: var(--primary-dark-color);
  border-radius: 5px;
  padding: 10px;

  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  gap: 5px;

  @media (min-width: 500px) {
    align-items: center;
    flex-direction: row;
  }
}

.input {
  margin-top: 10px;
  border-bottom: 1px solid var(--primary-color);
  padding: 5px 0;

  color: #fff;
}

.title-is-solved {
  text-decoration: line-through;
  color: var(--success-color);
}

.icons {
  display: flex;
  justify-content: end;
  gap: 15px;
}

.button-save {
  margin: 20px auto 0;
  background-color: var(--primary-color);
  border-radius: 5px;
  padding: 10px 20px;
}

.disabled {
  color: var(--gray-color);
  cursor: default;
}

.icon {
  max-width: 20px;
  max-height: 20px;
}

.xmark {
  height: 15px;
  width: 15px;
}
</style>
