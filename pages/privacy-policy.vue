<script setup lang="ts">
const { PAGES } = usePages()
const { seoMetaInputByPageConfig } = useAppSeoMeta()
useSeoMeta(seoMetaInputByPageConfig(PAGES.PRIVACY_AND_POLICY))
const { t } = useI18n()
</script>

<template>
  <UContainer class="mt-5">
    <ULandingHero
      :title="t(PAGES.PRIVACY_AND_POLICY.title.key)"
      :description="t(PAGES.PRIVACY_AND_POLICY.description.key)"
    />
  </UContainer>
</template>
