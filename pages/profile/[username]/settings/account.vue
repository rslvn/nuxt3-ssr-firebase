<script setup lang="ts">
const authStore = useAuthStore()
const {userProfileRef} = useUserProfileState()
const {getPasswordProvider} = useAuthProviders()
const noPasswordProvider = computed(() => !getPasswordProvider(authStore.authUser?.providers))
</script>

<template>
  <UDashboardPanelContent class="pb-24" :ui="{ wrapper: 'p-2' }">
    <UCard>
      <ChangeUsernameForm :user-profile="userProfileRef" />
    </UCard>
    <UCard class="mt-5">
      <AddPasswordForm v-if="noPasswordProvider" :user-profile="userProfileRef" />
      <ChangePasswordForm v-else :user-profile="userProfileRef" />
    </UCard>
    <UCard>
      <LinkedAccounts />
    </UCard>
  </UDashboardPanelContent>
</template>
