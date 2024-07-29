<script setup lang="ts">
definePageMeta({
  middleware: ['profile-owner-only'],
})
const {profilePageState, isMyProfile} = useUserProfileState()
console.log('/[username]/settings.vue processed', profilePageState.value)
</script>

<template>
  <ProfileSettings v-if="isMyProfile" :user-profile="profilePageState" :is-my-profile="isMyProfile" />
</template>