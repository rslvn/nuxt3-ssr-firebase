<script setup lang="ts">
import {AlbumType, UserProfile} from "~/types";
import {getDisplayName, getProfilePhotoImage} from "~/service/user-profile-service";
import {Country} from "country-state-city";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()
const {getAlbumImagesByAlbumId} = useAlbumImageCollection()
const displayName = computed(() => getDisplayName(props.userProfile))
const profilePhoto = computed(() => getProfilePhotoImage(props?.userProfile, displayName.value))
const country = ref(props.userProfile?.address?.country && Country.getCountryByCode(props.userProfile.address.country))
const showProfileLightbox = ref(false)
const profileAlbumImages = ref([])
const currentProfileImageIndex = ref(0)

const loadProfileImages = () => {
  if (!props.userProfile?.profilePhoto?.albumId) {
    return
  }
  getAlbumImagesByAlbumId(props.userProfile.profilePhoto.albumId)
      .then((albumImages) => {
        console.log('>>>> found profile images', albumImages.length)
        profileAlbumImages.value = albumImages
        if (albumImages.length) {
          currentProfileImageIndex.value = albumImages.findIndex((image) => image.id === props.userProfile.profilePhoto.id)
        }
        showProfileLightbox.value = true
      })
}
</script>

<template>
  <div
      class="-mt-28 mx-auto flex flex-col items-center w-full px-4 absolute sm:w-auto sm:space-x-2 sm:flex-row sm:px-6 lg:px-8">
    <div class="bg-gray-400 rounded-full h-52 w-52">
      <NuxtImg class="object-cover rounded-full h-52 w-52 border-solid border-2 border-gray-300 dark:border-gray-900"
               :class="{'cursor-pointer': userProfile?.profilePhoto?.id}" :src="profilePhoto.src"
               :alt="profilePhoto.alt" @click="loadProfileImages" placeholder/>
      <client-only>
        <div v-if="isMyProfile" class="absolute text-2xl -my-9 mx-40 opacity-100">
          <UploadButton :album-type="AlbumType.PROFILE"/>
        </div>
        <Lightbox v-if="showProfileLightbox" v-model="showProfileLightbox" :startingIndex="currentProfileImageIndex"
                  :albumImages="profileAlbumImages"/>
      </client-only>
    </div>
    <div class="mt-2 sm:mt-24">
      <div class="flex flex-col text-center sm:text-left sm:space-y-0">
        <div v-if="displayName">
          <span class="truncate text-xl font-extrabold">{{ displayName }}</span>
        </div>
        <div>
          <span class="truncate">@{{ userProfile.username }}</span>
        </div>
        <div v-if="country">
          <div class="flex flex-row items-center">
            <div class="text-xl mr-1">{{ country.flag }}</div>
            <div>{{ country.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>