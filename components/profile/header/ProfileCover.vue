<script setup lang="ts">
import {UserProfile} from "~/types";
import {getCoverPhoto, getDisplayName} from "~/service/user-profile-service";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

const displayName = computed(() => {
  return getDisplayName(props.userProfile)
})

const images = [
  {
    src: getCoverPhoto(props?.userProfile),
    description: props.userProfile.coverPhoto.image.alt || `the cover photo of ${displayName.value || 'the profile'}`
  }
]
</script>

<template>
  <UCarousel v-slot="{ item }" :items="images" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden">
    <img :src="item.src" class="h-80 w-full object-cover" draggable="false" :alt="item.description">
  </UCarousel>
</template>