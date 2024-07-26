<script setup lang="ts">
import {AlbumType, UserProfile} from '~/types'
import {getCoverPhotoImage, getDisplayName} from '~/service/user-profile-service'

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

const {getAlbumImagesByAlbumId} = useAlbumImageCollection()

const displayName = computed(() => {
  return getDisplayName(props.userProfile)
})

const images = computed(() => [
  getCoverPhotoImage(props?.userProfile, displayName.value)
])

const showCoverLightbox = ref(false)
const coverAlbumImages = ref([])
const currentCoverImageIndex = ref(0)

const loadCoverImages = () => {
  if (!props.userProfile?.coverPhoto?.albumId) {
    return
  }
  getAlbumImagesByAlbumId(props.userProfile.coverPhoto.albumId)
    .then((albumImages) => {
      console.log('>>>> found cover images', albumImages.length)
      coverAlbumImages.value = albumImages
      if (albumImages.length) {
        currentCoverImageIndex.value = albumImages.findIndex(image => image.id === props.userProfile.coverPhoto.id)
      }
      showCoverLightbox.value = true
    })
}
</script>

<template>
  <div>
    <client-only>
      <div v-if="isMyProfile" class="absolute z-10 mt-2 ml-2">
        <UploadButton :album-type="AlbumType.COVER" />
      </div>
    </client-only>
    <UCarousel v-slot="{ item }" :items="images" :ui="{ item: 'basis-full' }"
               class="rounded-lg overflow-hidden z-0" :class="{ 'cursor-pointer': userProfile?.coverPhoto?.id }">
      <NuxtImg :src="item.src" draggable="false" :alt="item.alt" placeholder class="h-80 w-full object-cover"
               @click="loadCoverImages" />
    </UCarousel>
    <client-only>
      <Lightbox v-if="showCoverLightbox" v-model="showCoverLightbox" :starting-index="currentCoverImageIndex"
                :album-images="coverAlbumImages" />
    </client-only>
  </div>
</template>