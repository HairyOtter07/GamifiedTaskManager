<template>
  <div>
    <NuxtLink class="absolute left-3 top-3 font-mono text-white" to="/">
      &lt;-- home
    </NuxtLink>
    <div class="flex h-full w-full max-w-7xl flex-col items-center justify-center space-y-6 font-mono">
      <div :class="titleError && 'text-red-600'">
        <p>Title</p>
        <input v-model="title" class="border-4  bg-transparent px-6 py-3" :class="titleError ? 'border-red-600' : 'border-white'">
        <p>{{ title?.length }}/25</p>
      </div>
      <div>
        <p>Description</p>
        <textarea v-model="description" class="h-32 border-4 border-white bg-transparent px-6 py-3" />
      </div>
      <div :class="categoryError && 'text-red-600'">
        <div class="flex flex-row justify-between">
          <p>Categories</p>
          <p>{{ categories?.length }}/4</p>
        </div>
        <div class="relative">
          <input v-model="category" class="border-4 bg-transparent px-6 py-3" :class="categoryError ? 'border-red-600' : 'border-white'">
          <p class="absolute right-4 top-[25%] hover:cursor-pointer" @click="addCategory">
            +
          </p>
          <div v-for="(cat, index) in categories" :key="cat" class="flex flex-row justify-between">
            <p>{{ cat }}</p>
            <p class="hover:cursor-pointer" @click="removeCategory(index)">
              -
            </p>
          </div>
        </div>
      </div>
      <RadioGroup v-model="reward">
        <RadioGroupLabel>Reward</RadioGroupLabel>
        <div class="flex flex-row space-x-2">
          <RadioGroupOption v-slot="{ checked }" :value="0">
            <div class="flex items-center justify-center border-4 border-white px-4 py-2" :class="checked && 'bg-zinc-900/50'">
              <p>0</p>
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" :value="5">
            <div class="flex items-center justify-center border-4 border-white px-4 py-2" :class="checked && 'bg-zinc-900/50'">
              <p>5</p>
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" :value="10">
            <div class="flex items-center justify-center border-4 border-white px-4 py-2" :class="checked && 'bg-zinc-900/50'">
              <p>10</p>
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" :value="15">
            <div class="flex items-center justify-center border-4 border-white px-4 py-2" :class="checked && 'bg-zinc-900/50'">
              <p>15</p>
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" :value="20">
            <div class="flex items-center justify-center border-4 border-white px-4 py-2" :class="checked && 'bg-zinc-900/50'">
              <p>20</p>
            </div>
          </RadioGroupOption>
          <RadioGroupOption v-slot="{ checked }" :value="25">
            <div class="flex items-center justify-center border-4 border-white px-4 py-2" :class="checked && 'bg-zinc-900/50'">
              <p>25</p>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
      <Button @click="updateQuest">
        Update Quest
      </Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

useHead({
  title: "Edit Quest",
});

const { session } = await useSession();

if (!session.value?.questId) {
  useRouter().push("/new");
}

const questId = session.value?.questId;

const res = await $fetch(`/api/quests/${questId}`);
if (res.code === "QUEST_NOT_FOUND" || res.code === "ERROR") {
  useRouter().push("/new");
}

const quest = {
  id: res.id?.toString(),
  title: res.title,
  description: res.description,
  categories: res.categories,
  reward: res.reward,
  active: res.active,
  status: res.status,
} as Quest;

const title = ref(res.title);
const description = ref(res.description);
const category = ref("");
const categories = ref(res.categories);
const reward = ref(res.reward);

const titleError = ref(false);
const categoryError = ref(false);

const addCategory = (_: MouseEvent) => {
  if (category.value === "") {
    categoryError.value = true;
    return;
  }
  categoryError.value = false;
  categories.value?.push(category.value);
  category.value = "";
};

const removeCategory = (index: number) => {
  categories.value?.splice(index, 1);
};

const updateQuest = async (_: MouseEvent) => {
  const res = await $fetch(`/api/quests/${quest.id}`, {
    method: "PATCH",
    body: {
      title: title.value,
      description: description.value,
      categories: categories.value,
      reward: reward.value,
      active: quest.active,
      status: quest.status,
    },
  });
  if (res.code === "TITLE_REQUIRED" || res.code === "TITLE_TOO_LONG") {
    titleError.value = true;
    categoryError.value = false;
  } else if (res.code === "TOO_MANY_CATEGORIES") {
    titleError.value = false;
    categoryError.value = true;
  } else if (res.code === "ERROR") {
    // something went wrong internally
  } else {
    useRouter().push("/quests");
  }
};
</script>
