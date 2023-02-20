<template>
  <NuxtLink v-if="to !== undefined" :to="to" class="prose prose-xl prose-invert flex justify-center border-4 border-white px-6 py-3 hover:bg-zinc-900/10 prose-h4:font-mono">
    <h4>
      <slot />
    </h4>
  </NuxtLink>
  <button v-else class="prose prose-xl prose-invert flex justify-center border-4 border-white px-6 py-3 hover:bg-zinc-900/10 prose-h4:font-mono" @click="$event => $emit('click', $event)">
    <h4>
      <slot />
    </h4>
  </button>
</template>
<script setup lang="ts">
defineProps<{
  to?: string;
}>();

// eslint-disable-next-line func-call-spacing
defineEmits<{
  (event: "click", payload: MouseEvent): void
}>();
</script>
