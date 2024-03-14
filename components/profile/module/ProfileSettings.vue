<script setup lang="ts">
import {UserProfile} from "~/types";
import {User} from "@firebase/auth";
defineProps<{
  userProfile: UserProfile
  user: User
  isMyProfile?: boolean
}>()
</script>

<template>
  <UContainer>
    <UDashboardPanelContent class="pb-24 ">
      <UCard>
        <UpdateProfileForm :user-profile="userProfile"/>
      </UCard>
    </UDashboardPanelContent>
  </UContainer>
</template>
