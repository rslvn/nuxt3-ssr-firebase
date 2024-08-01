<script setup lang="ts">
const {authUserRef} = useAuthUserState()
const {userProfileRef} = useUserProfileState()
const {getPasswordProvider} = useAuthProviders()
const noPasswordProvider = computed(() => !getPasswordProvider(authUserRef.value?.providers))
</script>

<template>
  <UDashboardPanelContent v-if="userProfileRef" class="pb-24" :ui="{ wrapper: 'p-2' }">
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
