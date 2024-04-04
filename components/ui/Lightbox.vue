<script setup lang="ts">
import {AlbumImage} from "~/types";

const props = defineProps<{
  startingIndex: number
  albumImages: AlbumImage[]
}>()
const showLightbox = defineModel()

const imageIndex = ref(props.startingIndex > props.albumImages.length || props.startingIndex < 0 ? 0 : props.startingIndex)
const albumImage = computed(() => props.albumImages.length && props.albumImages[imageIndex.value])

const nextImage = () => {
  if (props.albumImages.length >= imageIndex.value) {
    imageIndex.value = 0
  }
  imageIndex.value++
}
const previousImage = () => {
  if (imageIndex.value <= 0) {
    imageIndex.value = props.albumImages.length - 1
  }
  imageIndex.value--
}

</script>

<template>
  <!--    <UModal v-model="showLightbox" :overlay="false" fullscreen>-->
  <!--      <div class="h-screen flex items-center justify-center">-->
  <!--        <UCard>-->
  <!--          <img class="object-cover h-max" :src="image.image.src" alt="asdasd">-->
  <!--        </UCard>-->
  <!--      </div>-->
  <!--    </UModal>-->

  <UModal v-model="showLightbox" :overlay="false" fullscreen>

    <!--    <UCard-->
    <!--        :ui="{-->
    <!--          base: 'h-full flex flex-col',-->
    <!--          rounded: '',-->
    <!--          divide: 'divide-y divide-gray-100 dark:divide-gray-800',-->
    <!--          body: {-->
    <!--            base: 'grow'-->
    <!--          }-->
    <!--        }"-->
    <!--    >-->
    <!--      <template #header>-->
    <!--        <div class="flex items-center justify-end">-->
    <!--          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"-->
    <!--                   @click="showLightbox = false"/>-->
    <!--        </div>-->
    <!--      </template>-->
    <div class="flex items-center justify-center h-screen w-screen">
      <img class="object-scale-down h-4/5" :src="albumImage.image.src" :alt="albumImage.image.alt">
    </div>
    <!--    </UCard>-->

  </UModal>


</template>
