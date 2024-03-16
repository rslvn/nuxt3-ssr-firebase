<script setup lang="ts">
import {UserProfile} from "~/types";

defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()
</script>

<template>
  <UContainer>
    <UDashboardPanelContent class="pb-24 ">
      <UCard>
        <UpdateProfileForm :user-profile="userProfile"/>
      </UCard>

      <UCard class="mt-5">
        <UpdateUsernameForm :user-profile="userProfile"/>
      </UCard>
    </UDashboardPanelContent>
  </UContainer>
</template>
