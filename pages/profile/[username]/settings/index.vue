<script setup lang="ts">
const {userProfileRef, isMyProfile} = useUserProfileState()
</script>

<template>
  <UDashboardPanelContent class="pb-24" :ui="{ wrapper: 'p-2' }">
    <UCard>
      <EmailSettings :user-profile="userProfileRef" :is-my-profile="isMyProfile" />
    </UCard>
    <UCard class="mt-5">
      <UpdateProfileForm :user-profile="userProfileRef" />
    </UCard>
    <UCard class="mt-5">
      <ProfileAddressForm :user-profile="userProfileRef" />
    </UCard>
  </UDashboardPanelContent>
</template>
