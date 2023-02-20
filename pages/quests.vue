<template>
  <div class="flex h-full w-full items-center justify-center">
    <NuxtLink class="absolute left-3 top-3 font-mono text-white" to="/">
      &lt;-- home
    </NuxtLink>
    <div class="flex h-full w-full max-w-7xl flex-row items-center justify-center bg-zinc-900/50">
      <TabGroup @change="changeTab">
        <div class="flex h-full w-full flex-col items-center">
          <TabList class="flex w-full flex-row items-center justify-center font-mono text-base">
            <Tab class="flex w-full items-center justify-center border border-zinc-400 py-5 ui-selected:bg-zinc-800/50">
              Not Started
            </Tab>
            <Tab class="flex w-full items-center justify-center border border-zinc-400 py-5 ui-selected:bg-zinc-800/50">
              In Progress
            </Tab>
            <Tab class="flex w-full items-center justify-center border border-zinc-400 py-5 ui-selected:bg-zinc-800/50">
              Complete
            </Tab>
          </TabList>
          <TabPanels class="flex w-full flex-col items-center overflow-y-auto">
            <TabPanel class="w-full">
              <QuestList tab="unstarted" :quests="quests" @select="selectQuest" />
            </TabPanel>
            <TabPanel class="w-full">
              <QuestList tab="started" :quests="quests" @select="selectQuest" />
            </TabPanel>
            <TabPanel class="w-full">
              <QuestList tab="complete" :quests="quests" @select="selectQuest" />
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
      <div class="flex h-full w-full flex-col items-center">
        <QuestListing :title="selectedQuest.title" :category="selectedQuest.categories.join(', ')" />
        <div class="flex h-full w-full flex-col justify-between border border-zinc-300 p-6 font-sans text-3xl italic text-zinc-100">
          <p>{{ selectedQuest.description }}</p>
          <p>Reward: {{ selectedQuest.reward }}xp</p>
        </div>
        <div v-if="selectedQuest.id !== '0'" class="flex w-full flex-row justify-end space-x-2 border border-zinc-300 p-6">
          <Button @click="deleteQuest">
            Delete
          </Button>
          <Button @click="editQuest">
            Edit
          </Button>
          <Button v-if="activeTab === 0" @click="acceptQuest">
            Accept
          </Button>
          <Button v-if="activeTab === 1" @click="completeQuest">
            Complete
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
const { session, update } = await useSession();

const activeTab = ref(0);
const changeTab = (index: number) => {
  activeTab.value = index;
  selectedQuest.value = DEFAULT_QUEST;
};

const DEFAULT_QUEST = {
  id: "0",
  title: "No Quest Selected",
  description: "Select a quest to view details.",
  categories: [],
  reward: 0,
  active: false,
  status: "unstarted",
} as Quest;

const selectedQuest = ref(DEFAULT_QUEST);

const selectQuest = (quest: Quest) => {
  selectedQuest.value = quest;
};

const deleteQuest = async (_: MouseEvent) => {
  await $fetch(`/api/quests/${selectedQuest.value.id}`, {
    method: "DELETE",
  });
  quests.value = await $fetch("/api/quests") as Quest[];
  selectedQuest.value = DEFAULT_QUEST;
};

const editQuest = (_: MouseEvent) => {
  update({ questId: selectedQuest.value.id });
  useRouter().push("/edit");
};

const acceptQuest = async (_: MouseEvent) => {
  await $fetch(`/api/quests/${selectedQuest.value.id}`, {
    method: "PATCH",
    body: {
      title: selectedQuest.value.title,
      description: selectedQuest.value.description,
      categories: selectedQuest.value.categories,
      reward: selectedQuest.value.reward,
      active: false,
      status: "started",
    },
  });
  quests.value = await $fetch("/api/quests") as Quest[];
  selectedQuest.value = DEFAULT_QUEST;
};

const completeQuest = async (_: MouseEvent) => {
  await $fetch(`/api/quests/${selectedQuest.value.id}`, {
    method: "PATCH",
    body: {
      title: selectedQuest.value.title,
      description: selectedQuest.value.description,
      categories: selectedQuest.value.categories,
      reward: selectedQuest.value.reward,
      active: false,
      status: "complete",
    },
  });
  const res = await $fetch(`/api/users/${session.value?.userId}`, {
    method: "PATCH",
    body: {
      xp: session.value?.userXp + selectedQuest.value.reward,
    },
  });
  update({ userXp: res.xp });
  quests.value = await $fetch("/api/quests") as Quest[];
  selectedQuest.value = DEFAULT_QUEST;
};

const quests = ref(await $fetch("/api/quests") as Quest[]);
</script>
