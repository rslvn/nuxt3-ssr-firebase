<script setup lang="ts">
import {AlbumType, UserProfile} from "~/types";
import {getCoverPhoto, getDisplayName} from "~/service/user-profile-service";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

const displayName = computed(() => {
  return getDisplayName(props.userProfile)
})

const images = computed(() => [
  {
    src: getCoverPhoto(props?.userProfile),
    description: props.userProfile.coverPhoto.image.alt || `the cover photo of ${displayName.value || 'the profile'}`
  }
])
</script>

<template>
  <div>
    <div v-if="isMyProfile" class="absolute z-10 mt-2 ml-2">
      <UploadButton :album-type="AlbumType.COVER"/>
    </div>
    <UCarousel v-slot="{ item }" :items="images" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden z-0">
      <img :src="item.src" class="h-80 w-full object-cover" draggable="false" :alt="item.description">
    </UCarousel>
  </div>
</template>