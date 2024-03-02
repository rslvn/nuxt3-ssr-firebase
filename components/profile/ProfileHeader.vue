<script setup lang="ts">

import {UserProfile} from "~/types";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

const {} = useAuthUser()

const displayName = computed(() => {
  if (props.userProfile?.firstName) {
    if (props.userProfile?.middleName) {
      return `${props.userProfile?.firstName} ${props.userProfile?.middleName} ${props.userProfile?.lastName}`
    }
    return `${props.userProfile?.firstName} ${props.userProfile?.lastName}`
  }

  return props.userProfile?.email || 'User'
})

const images = [
  {
    src: props.userProfile.coverPhoto.image.src || 'https://picsum.photos/1920/1080?random=1',
    description: props.userProfile.coverPhoto.image.alt || `cover photo of ${displayName}`
  }
]

const profilePhoto = props.userProfile?.profilePhoto?.image?.src || 'https://picsum.photos/500/800'

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
        <div>
          <span class="truncate text-xl font-extrabold">{{ displayName }}</span>
        </div>
        <div>
          <span class="truncate">@{{ userProfile.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>