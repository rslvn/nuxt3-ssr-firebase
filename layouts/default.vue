<template>
  <AppHeader/>

  <UMain>
    <slot/>
  </UMain>

  <UFooter>
    <template #left>
      Copyright© {{ thisYear }} nuxt3-ssr-firebase.com
    </template>
  </UFooter>
</template>

<script setup>

const {locale} = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  titleTemplate: '%s - nuxt3-ssr-firebase',
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
