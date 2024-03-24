<script setup lang="ts">

import {UserProfile} from "~/types";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

</script>

<template>
  <ProfileCover :user-profile="userProfile" :is-my-profile="isMyProfile"/>
  <ProfileSummary :user-profile="userProfile" :is-my-profile="isMyProfile"/>
</template>