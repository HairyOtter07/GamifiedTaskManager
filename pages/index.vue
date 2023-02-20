<template>
  <div>
    <div v-if="loggedIn" class="absolute left-2 top-2 font-mono text-white">
      <p>logged in as {{ session.userName }}</p>
      <p class="text-green-400">
        level {{ level }}: {{ xp }}/100
      </p>
    </div>
    <p v-else class="absolute left-2 top-2 font-mono text-white">
      not logged in
    </p>
    <div class="flex h-full w-full max-w-7xl flex-col items-center justify-center space-y-16">
      <div class="prose prose-xl prose-invert prose-h1:font-mono">
        <h1>
          Task Hero
        </h1>
      </div>
      <div v-if="loggedIn" class="flex flex-col space-y-6">
        <Button to="/quests">
          Quest Log
        </Button>
        <Button to="/new">
          Add Quest
        </Button>
      </div>
      <div v-else class="flex flex-col space-y-6">
        <Button to="/login">
          Log In
        </Button>
        <Button to="/signup">
          Sign Up
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup>
useHead({
  title: "Home",
});

const { session, refresh } = await useSession();
await refresh();
const loggedIn = computed(() => {
  if (!session.value?.userId) {
    return false;
  } else {
    return true;
  }
});
const xp = computed(() => {
  if (!session.value?.userXp) {
    return 0;
  } else {
    return session.value?.userXp % 100;
  }
});
const level = computed(() => {
  if (!session.value?.userXp) {
    return 0;
  } else {
    return Math.floor(session.value?.userXp / 100);
  }
});
</script>
