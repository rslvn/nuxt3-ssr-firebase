<template>
  <div>
    <AppHeader/>
    <UContainer>
      <UMain>
        <UPage>
          <UPageError :error="error"/>
        </UPage>
      </UMain>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>
