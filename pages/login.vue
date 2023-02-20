<template>
  <div>
    <NuxtLink class="absolute left-3 top-3 font-mono text-white" to="/">
      &lt;-- home
    </NuxtLink>
    <div class="flex h-full w-full max-w-7xl flex-col items-center justify-center space-y-6 font-mono">
      <div>
        <p :class="emailError ? 'text-red-600' : ''">
          Email
        </p>
        <input v-model="email" class="border-4 bg-transparent px-6 py-3" :class="emailError ? 'border-red-600 text-red-600' : 'border-white'">
      </div>
      <div>
        <div class="flex flex-row justify-between">
          <p :class="passwordError ? 'text-red-600' : ''">
            Password
          </p>
          <p class="hover:cursor-pointer" :class="passwordError ? 'text-red-600' : ''" @click="togglePassword">
            {{ showHideText }}
          </p>
        </div>
        <input v-model="password" :type="hidePassword && 'password'" class="border-4 bg-transparent px-6 py-3" :class="passwordError ? 'border-red-600 text-red-600' : 'border-white'">
        <p v-if="userNotFound" class="text-red-600">
          User Not Found
        </p>
      </div>
      <Button @click="login">
        Log In
      </Button>
    </div>
  </div>
</template>
<script setup>
const { update } = await useSession();
const email = ref("");
const password = ref("");
const hidePassword = ref(true);
const showHideText = ref("Show");
const emailError = ref(false);
const passwordError = ref(false);
const userNotFound = ref(false);
const togglePassword = (_) => {
  hidePassword.value = !hidePassword.value;
  if (hidePassword.value) {
    showHideText.value = "Show";
  } else {
    showHideText.value = "Hide";
  }
};
const login = async (_) => {
  const res = await $fetch("/api/users/signin/", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  });
  if (res.code === "EMAIL_REQUIRED") {
    emailError.value = true;
    passwordError.value = false;
    userNotFound.value = false;
  } else if (res.code === "PASSWORD_REQUIRED") {
    emailError.value = false;
    passwordError.value = true;
    userNotFound.value = false;
  } else if (res.code === "USER_NOT_FOUND") {
    emailError.value = true;
    passwordError.value = true;
    userNotFound.value = true;
  } else if (res.code === "ERROR") {
    // something went wrong internally
  } else {
    await update({ userId: res.id, userName: res.name, userXp: res.xp });
    useRouter().push("/");
  }
};
</script>
