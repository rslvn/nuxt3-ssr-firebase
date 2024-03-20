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
        <UpdateProfileNameForm :user-profile="userProfile"/>
      </UCard>

      <UCard class="mt-5">
        <ChangeUsernameForm :user-profile="userProfile"/>
      </UCard>

      <UCard class="mt-5">
        <ProfileAddressForm :user-profile="userProfile"/>
      </UCard>

      <UCard class="mt-5">
        <ChangePasswordForm :user-profile="userProfile"/>
      </UCard>

    </UDashboardPanelContent>
  </UContainer>
</template>
