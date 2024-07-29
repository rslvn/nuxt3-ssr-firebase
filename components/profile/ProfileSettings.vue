<script setup lang="ts">
import {UserProfile} from '~/types'

defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

const authStore = useAuthStore()
const {getPasswordProvider} = useAuthProviders()

const noPasswordProvider = computed(() => !getPasswordProvider(authStore.authUser?.providers))
</script>

<template>
  <UContainer :ui="{ padding: 'px-2' }">
    <UDashboardPanelContent class="pb-24" :ui="{ wrapper: 'p-2' }">
      <UCard>
        <EmailSettings :user-profile="userProfile" :is-my-profile="isMyProfile" />
      </UCard>

      <UCard class="mt-5">
        <UpdateProfileForm :user-profile="userProfile" />
      </UCard>

      <UCard class="mt-5">
        <ChangeUsernameForm :user-profile="userProfile" />
      </UCard>

      <UCard class="mt-5">
        <ProfileAddressForm :user-profile="userProfile" />
      </UCard>

      <UCard class="mt-5">
        <AddPasswordForm v-if="noPasswordProvider" :user-profile="userProfile" />
        <ChangePasswordForm v-else :user-profile="userProfile" />
      </UCard>

      <UCard class="mt-5">
        <LinkedAccounts />
      </UCard>
    </UDashboardPanelContent>
  </UContainer>
</template>
