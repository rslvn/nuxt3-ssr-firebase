<script setup>
const {locale} = useI18n()
const runtimeConfig = useRuntimeConfig()

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  titleTemplate: `%s - ${runtimeConfig.public.appName}`,
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})
</script>

<template>
  <AppHeader />

  <UMain>
    <slot />
  </UMain>

  <AppFooter />
</template>
