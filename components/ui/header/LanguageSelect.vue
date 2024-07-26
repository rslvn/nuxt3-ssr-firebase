<script setup lang="ts">

const {locale, locales, setLocale} = useI18n()
const languages = locales.value.map((item) => {
  return {
    id: item.name,
    label: item.name,
    flag: item.flag,
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
      <span class="text-2xl">{{currentLanguage.flag}}  </span>
    </template>

    <template #option="{ option: languageOption }">
      <span class="text-2xl">{{ languageOption.flag }}</span>
      <span>{{ languageOption.label }}</span>
    </template>
  </USelectMenu>
</template>
