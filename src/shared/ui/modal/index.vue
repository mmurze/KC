<template>
  <Teleport to="body">
    <div v-if="value" class="modal-overlay show" @click.stop="value = false">
      <div class="modal show" @click.stop>
        <button class="modal__close-button" @click="value = false">
          <img :src="xmark" alt="xmark" class="icon" />
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import xmark from "~/shared/assets/images/xmark.svg";
const value = defineModel<boolean>();

watch(value, (isActive) => {
  if (!isActive) {
    close();
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  border: 2px solid var(--primary-color);
  background-color: var(--primary-dark-color);
  padding: 20px 30px;
  border-radius: 5px;

  animation: fadeIn 0.3s ease;

  @media (min-width: 578px) {
    max-width: 600px;
    width: 100%;
  }
}

.modal__close-button {
  position: absolute;
  top: 3px;
  right: 3px;

  height: 20px;
  width: 20px;

  img {
    fill: #aaa;
  }
}

.show {
  animation: showModal 0.3s ease;
  transition-delay: 0.1s;
}

.icon {
  max-width: 11px;
  max-height: 11px;
}

@keyframes showModal {
  0% {
    transform: translateY(-25px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
