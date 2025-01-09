<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const thisYear = new Date().getFullYear()
const { PAGES } = usePages()
const { t } = useI18n()
</script>

<template>
  <UFooter>
    <template #left>
      Copyright© {{ thisYear }} {{ runtimeConfig.public.appDomain }}
    </template>
    <template #right>
      <NuxtLink :to="PAGES.TERMS.path" class="text-primary font-medium mr-3">
        {{ t(PAGES.TERMS.title.key, PAGES.TERMS.title.params) }}
      </NuxtLink>
      <NuxtLink :to="PAGES.PRIVACY_AND_POLICY.path" class="text-primary font-medium">
        {{ t(PAGES.PRIVACY_AND_POLICY.title.key, PAGES.PRIVACY_AND_POLICY.title.params) }}
      </NuxtLink>
    </template>
  </UFooter>
</template>
