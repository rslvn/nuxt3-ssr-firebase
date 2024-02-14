<script setup lang="ts">

const {locale, locales, setLocale} = useI18n()
const languages = locales.value.map((item) => {
  return {
    id: item.name,
    label: item.name,
    icon: item.icon,
    code: item.code,
    click: () => setLocale(item.code)
  }
})
const changeLocale = (language: { code: string }) => {
  setLocale(language.code)
}
const currentLanguage = ref(languages.find(language => language.code === locale.value))
</script>

<template>
  <USelectMenu v-model="currentLanguage" :options="languages" @change="changeLocale">
    <template #leading>
      <UIcon :name="(currentLanguage.icon as string)" class="w-4 h-4 mx-0.5"/>
    </template>
  </USelectMenu>
</template>
