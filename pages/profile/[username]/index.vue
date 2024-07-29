<script setup lang="ts">
const {profilePageState, isMyProfile} = useUserProfileState()

console.log('/[username]/index.vue processed', profilePageState.value)
</script>

<template>
  <ProfileAbout :user-profile="profilePageState" :is-my-profile="isMyProfile" />
</template>