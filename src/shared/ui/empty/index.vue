<template>
  <div class="empty-container">
    <img :src="empty" alt="empty" class="image" />
    <p>{{ title ?? "Нет задач" }}</p>
  </div>
</template>

<script setup lang="ts">
import empty from "~/shared/assets/images/empty.png";

defineProps<{ title?: string }>();
</script>

<style lang="css" scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  font-size: 18px;
}

.image {
  max-width: 200px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 300px;
  }
}
</style>
