<script setup lang="ts">
const authStore = useAuthStore()
const {profilePageState} = useUserProfileState()
const {getPasswordProvider} = useAuthProviders()
const noPasswordProvider = computed(() => !getPasswordProvider(authStore.authUser?.providers))
</script>

<template>
    <UDashboardPanelContent class="pb-24" :ui="{ wrapper: 'p-2' }">
      <UCard>
        <ChangeUsernameForm :user-profile="profilePageState" />
      </UCard>
      <UCard class="mt-5">
        <AddPasswordForm v-if="noPasswordProvider" :user-profile="profilePageState" />
        <ChangePasswordForm v-else :user-profile="profilePageState" />
      </UCard>
      <UCard>
        <LinkedAccounts />
      </UCard>
    </UDashboardPanelContent>
</template>
