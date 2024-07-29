<script setup lang="ts">
const {profilePageState, isMyProfile} = useUserProfileState()
</script>

<template>
  <ProfileAbout :user-profile="profilePageState" :is-my-profile="isMyProfile" />
</template>