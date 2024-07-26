<script setup lang="ts">
import {LazyVerifyEmail} from '#components'

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const route = useRoute()
const oobCode = route.query.oobCode as string
</script>

<template>
  <UContainer>
    <client-only>
      <LazyVerifyEmail :oob-code="oobCode"/>
    </client-only>
  </UContainer>
</template>
