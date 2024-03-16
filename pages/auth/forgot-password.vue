<script setup lang="ts">
import {LazyForgetPasswordForm} from '#components'

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})
</script>

<template>
  <UContainer class=" max-w-4xl mt-5 md:mt-10">
    <client-only>
      <LazyForgetPasswordForm/>
    </client-only>
  </UContainer>
</template>