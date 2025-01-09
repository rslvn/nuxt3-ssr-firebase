<script setup>
const {seoMetaInputByPageConfig} = useAppSeoMeta()
const {PAGES} = usePages()
useSeoMeta(seoMetaInputByPageConfig(PAGES.HOME))
const {t} = useI18n()
const links = [{
  label: t('page.home.goToGithub'),
  icon: 'i-simple-icons-github',
  color: 'gray',
  size: 'lg',
  to: 'https://github.com/rslvn/nuxt3-ssr-firebase',
  target: '_blank'
}]
</script>

<template>
  <UContainer class="mt-5">
    <ULandingHero
      :title="t('page.home.title')"
      :description="t('page.home.description')"
      :links="links"
    />
  </UContainer>
</template>
