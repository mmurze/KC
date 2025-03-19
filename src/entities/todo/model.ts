import type { Task } from "./types";

type LoadingState = "idle" | "loading" | "finished" | "failed";

export const useTaskStore = defineStore("tasks", () => {
  const allTasks = ref<Task[]>([]);
  const loadTasksState = ref<LoadingState>("idle");

  const solvedTasks = computed(() => {
    return allTasks.value.filter((task) => task.isSolved);
  });

  const unsolvedTasks = computed(() => {
    return allTasks.value.filter((task) => !task.isSolved);
  });

  const loadTasks = async () => {
    try {
      loadTasksState.value = "loading";

      const storedTasks = localStorage.getItem("tasks");

      if (storedTasks) {
        allTasks.value = JSON.parse(storedTasks);

        loadTasksState.value = "finished";
        return;
      }

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      allTasks.value = await response.json();
      allTasks.value = allTasks.value.map((task) => {
        return { ...task, isSolved: false };
      });

      loadTasksState.value = "finished";
    } catch (error) {
      loadTasksState.value = "failed";
      console.error("Ошибка:", error);
    }
  };

  const addTask = (title: string | null) => {
    if (title) {
      const task: Task = {
        id: Number(new Date()),
        title,
        isSolved: false,
      };

      allTasks.value.push(task);
    }
  };

  const deleteTask = (id: number) => {
    const index = allTasks.value.findIndex((item) => item.id === id);

    allTasks.value.splice(index, 1);
  };

  const changeTask = (id: number, title: string, isSolved: boolean) => {
    const task = allTasks.value.find((item) => item.id === id);

    if (!task) return;

    task.title = title;
    task.isSolved = isSolved;
  };

  watch(
    () => allTasks.value,
    (newVal) => {
      localStorage.setItem("tasks", JSON.stringify(newVal));
    },
    { deep: true }
  );

  return {
    allTasks,
    solvedTasks,
    unsolvedTasks,
    loadTasksState,
    changeTask,
    deleteTask,
    loadTasks,
    addTask,
  };
});
