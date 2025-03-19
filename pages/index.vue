<template>
  <div class="main-page">
    <h1 class="title">TODO-лист</h1>

    <InputNewTask v-model="newTask" />

    <div v-if="loadTasksState === 'loading'" class="loading">Загрузка...</div>

    <Empty
      v-else-if="loadTasksState === 'failed'"
      title="Ошибка загрузки данных"
    />

    <template v-else>
      <div class="tasks-container">
        <h2 class="tasks-title">Задача, которые нужно выполнить</h2>

        <Empty v-if="unsolvedTasks.length === 0" />

        <div v-else class="tasks">
          <Note v-for="task in unsolvedTasks" :task="task" :key="task.id" />
        </div>
      </div>

      <div class="tasks-container">
        <h2 class="tasks-title">Завершенные задачи</h2>

        <Empty v-if="solvedTasks.length === 0" />

        <div v-else class="tasks">
          <Note
            v-for="task in solvedTasks"
            :task="task"
            :key="task.id"
            is-solved
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { InputNewTask, Note } from "~/entities/todo/index";
import { useTaskStore } from "~/entities/todo/model";
import { Empty } from "~/shared/ui/empty";

const newTask = ref<string>("");

const tasksStore = useTaskStore();
const { solvedTasks, unsolvedTasks, loadTasksState } = storeToRefs(tasksStore);

onMounted(async () => {
  await tasksStore.loadTasks();
});
</script>

<style lang="css" scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.icons {
  display: flex;
  gap: 5px;
}

.main-page {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 20px;
}

.tasks-title {
  margin-bottom: 15px;
}

.loading {
  text-align: center;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
