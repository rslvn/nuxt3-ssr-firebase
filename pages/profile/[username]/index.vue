<script setup lang="ts">
const {userProfileRef, isMyProfile} = useUserProfileState()
</script>

<template>
  <ProfileAbout :user-profile="userProfileRef" :is-my-profile="isMyProfile" />
</template>