<script setup lang="ts">
definePageMeta({
  middleware: ['profile-owner-only'],
})
const {profilePageState, isMyProfile} = useUserProfileState()
</script>

<template>
  <ProfileSettings v-if="isMyProfile" :user-profile="profilePageState" :is-my-profile="isMyProfile" />
</template>