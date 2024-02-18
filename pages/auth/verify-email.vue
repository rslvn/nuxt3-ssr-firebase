<script setup lang="ts">
import {LazyVerifyEmailForm} from '#components'

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const route = useRoute();
const oobCode = route.query.oobCode as string
</script>

<template>
  <UContainer>
    <client-only>
      <LazyVerifyEmailForm :oobCode="oobCode"/>
    </client-only>
  </UContainer>
</template>
