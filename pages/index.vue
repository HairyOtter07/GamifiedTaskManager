<template>
  <div class="flex h-full w-full max-w-7xl flex-col items-center justify-center space-y-16">
    <div class="prose prose-xl prose-invert prose-h1:font-mono">
      <h1>
        Task Manager
      </h1>
    </div>
    <div class="flex flex-col space-y-6">
      <Button to="/quests">
        Quest Log
      </Button>
      <Button to="/settings">
        Settings
      </Button>
      <Button to="/new">
        Add Quest
      </Button>
    </div>
  </div>
</template>
<script setup>

</script>
