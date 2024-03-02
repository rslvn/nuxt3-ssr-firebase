<script setup lang="ts">
const images = [
  {
    src: 'https://picsum.photos/1920/1080?random=1',
    description: 'description'
  },
  {
    src: 'https://picsum.photos/1920/1080?random=2',
    description: 'description'
  },
  {
    src: 'https://picsum.photos/1920/1080?random=3',
    description: 'description'
  },
]
const profile = {
  name: 'Hello World',
  email: 'hello.world@example.com',
  avatar: 'https://picsum.photos/500/800',
}
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
          :style="{'background-image': `url(${profile.avatar})`}"
      ></div>
    </div>
    <div class="mt-2 sm:mt-20">
      <div class="flex flex-col text-center sm:text-left sm:space-y-0">
        <div>
          <span class="truncate text-xl font-extrabold">{{ profile.name }}</span>
        </div>
        <div>
          <span class="truncate">{{ profile.email }}</span>
        </div>

      </div>

    </div>
  </div>
</template>