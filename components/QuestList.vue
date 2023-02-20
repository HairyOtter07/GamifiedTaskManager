<template>
  <RadioGroup v-model="selected">
    <template v-for="quest in quests" :key="quest.id">
      <RadioGroupOption v-if="quest.status == tab" v-slot="{ checked }" class="hover:cursor-pointer" :value="quest">
        <QuestListing
          :title="quest.title"
          :category="quest.categories.join(', ')"
          :completed="quest.status == 'complete'"
          :selected="checked"
          :active="quest.active"
          @click="$event => $emit('select', quest)"
        />
      </RadioGroupOption>
    </template>
  </RadioGroup>
</template>
<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
defineProps<{
  tab: QuestStatus;
  quests: Quest[];
}>();
defineEmits<{
  (event: "select", quest: Quest): void;
}>();
const selected = ref("");
</script>
