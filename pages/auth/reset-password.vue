<script setup lang="ts">
import {LazyResetPasswordForm} from '#components'

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const route = useRoute();
const oobCode = route.query.oobCode as string
</script>

<template>
  <UContainer class="max-w-4xl mt-5 md:mt-10">
    <client-only>
      <LazyResetPasswordForm :oobCode="oobCode"/>
    </client-only>
  </UContainer>
</template>