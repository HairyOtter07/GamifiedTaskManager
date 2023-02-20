<template>
  <div class="relative flex w-full flex-row items-center space-x-3 border border-zinc-300" :class="completed && !selected ? 'bg-zinc-900/25' : selected && 'bg-zinc-800/50'" @click="$event=> $emit('click', $event)">
    <div class="flex h-24 w-full flex-col justify-center px-3">
      <h1 class="font-mono text-xl text-zinc-100" :class="completed && !selected && 'text-zinc-400'">
        {{ title }}
      </h1>
      <p class="font-mono text-base text-yellow-500" :class="completed && !selected && 'text-yellow-700'">
        {{ category }}
      </p>
    </div>
    <div v-if="completed" class="absolute right-8">
      <h2 class="font-mono text-xl">
        Completed
      </h2>
    </div>
    <div v-if="active && !completed" class="absolute right-10 h-5 w-5 bg-yellow-500" />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  title: string;
  category: string;
  completed?: boolean;
  selected?: boolean;
  active?: boolean;
}>();

defineEmits<{
  (event: "click", payload: MouseEvent): void;
}>();
</script>
