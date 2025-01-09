<script setup lang="ts">
const { PAGES } = usePages()
const { seoMetaInputByPageConfig } = useAppSeoMeta()
useSeoMeta(seoMetaInputByPageConfig(PAGES.TERMS))
const { t } = useI18n()
</script>

<template>
  <UContainer class="mt-5">
    <ULandingHero
      :title="t(PAGES.TERMS.title.key)"
      :description="t(PAGES.TERMS.description.key)"
    />
  </UContainer>
</template>
