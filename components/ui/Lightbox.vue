<script setup lang="ts">
import {AlbumImage} from '~/types'

const props = defineProps<{
  startingIndex: number
  albumImages: AlbumImage[]
}>()
const showLightbox = defineModel({type: Boolean})

const imageIndex = ref(props.startingIndex > props.albumImages.length || props.startingIndex < 0 ? 0 : props.startingIndex)
const albumImage = computed(() => props.albumImages.length && props.albumImages[imageIndex.value])

const nextImage = () => {
  if (props.albumImages.length - 1 <= imageIndex.value) {
    imageIndex.value = 0
  } else {
    imageIndex.value++
  }
}
const previousImage = () => {
  if (imageIndex.value <= 0) {
    imageIndex.value = props.albumImages.length - 1
  } else {
    imageIndex.value--
  }
}

</script>

<template>
  <UModal v-model="showLightbox" :overlay="false" fullscreen>
    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="absolute right-10 top-5"
             @click="showLightbox = false"/>
    <div class="flex flex-row items-center">
      <UButton icon="i-heroicons-arrow-left-20-solid" class="absolute left-0 sm:left-10" color="gray"
               @click="previousImage"/>
      <div class="flex items-center justify-center h-screen w-screen" @click="showLightbox = false">
        <NuxtImg class="object-scale-down h-4/5" :src="albumImage.image.src" :alt="albumImage.image.alt" placeholder
                 @click.stop=""/>
      </div>
      <UButton icon="i-heroicons-arrow-right-20-solid" class="absolute right-0 sm:right-10" color="gray"
               @click="nextImage"/>
    </div>
  </UModal>
</template>
