<script setup lang="ts">
const {userProfileRef, isMyProfile} = useUserProfileState()
</script>

<template>
  <ProfileAbout v-if="userProfileRef" :user-profile="userProfileRef" :is-my-profile="isMyProfile" />
</template>
