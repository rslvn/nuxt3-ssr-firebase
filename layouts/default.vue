<template>
  <AppHeader />

  <UMain>
    <slot />
  </UMain>

  <UFooter>
    <template #center>
      Copyright© {{ thisYear }} {{ runtimeConfig.public.appDomain }}
    </template>
  </UFooter>
</template>

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
const thisYear = new Date().getFullYear()
</script>
