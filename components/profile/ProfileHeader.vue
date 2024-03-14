<script setup lang="ts">

import {UserProfile} from "~/types";
import {getCoverPhoto, getDisplayName, getProfilePhoto} from "~/service/user-profile-service";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

const {t} = useI18n()

const displayName = computed(() => {
  return getDisplayName(props.userProfile)
})

const images = [
  {
    src: getCoverPhoto(props?.userProfile),
    description: props.userProfile.coverPhoto.image.alt || `the cover photo of ${displayName.value || 'the profile'}`
  }
]

const profilePhoto = getProfilePhoto(props?.userProfile)

</script>

<template>
  <UCarousel v-slot="{ item }" :items="images" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden">
    <img :src="item.src" class="h-80 w-full object-cover" draggable="false" :alt="item.description">
  </UCarousel>
  <div
      class="-mt-28 mx-auto flex flex-col items-center w-full px-4 absolute sm:space-x-2 sm:flex-row sm:px-6 lg:px-8">
    <div class="ring-3 ring-gray-900 dark:ring-gray-300 h-52 w-52">
      <div
          class="bg-origin-padding p-4 border-4 border-gray-500 dark:border-gray-900 rounded-full bg-center bg-gray-400 bg-no-repeat h-52 w-52"
          :style="{'background-image': `url(${profilePhoto})`}"
      ></div>
    </div>
    <div class="mt-2 sm:mt-20">
      <div class="flex flex-col text-center sm:text-left sm:space-y-0">
        <div v-if="displayName">
          <span class="truncate text-xl font-extrabold">{{ displayName }}</span>
        </div>
        <div>
          <span class="truncate">@{{ userProfile.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>