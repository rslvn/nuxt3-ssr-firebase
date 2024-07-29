<script setup lang="ts">
const {profilePageState, isMyProfile} = useUserProfileState()
</script>

<template>
    <UDashboardPanelContent class="pb-24" :ui="{ wrapper: 'p-2' }">
      <UCard>
        <EmailSettings :user-profile="profilePageState" :is-my-profile="isMyProfile" />
      </UCard>
      <UCard class="mt-5">
        <UpdateProfileForm :user-profile="profilePageState" />
      </UCard>
      <UCard class="mt-5">
        <ProfileAddressForm :user-profile="profilePageState" />
      </UCard>
    </UDashboardPanelContent>
</template>
