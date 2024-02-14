<script setup lang="ts">
const {locale, locales, setLocale} = useI18n()
const languages = locales.value.map((item) => {
  return {
    label: item.name,
    icon: item.icon,
    value: item.code,
    click: () => setLocale(item.code)
  }
})
const currentLocale = computed(() => locales.value.find(item => item.code === locale.value))
</script>

<template>
  <UDropdown :items="[languages]" :ui="{ item: { disabled: 'cursor-text select-text', width: 'w-32' } }">
    <UButton
        color="gray"
        square
        variant="ghost"
        class="hover:bg-gray-50 dark:hover:bg-gray-800"
        :icon="currentLocale.icon"
    />
  </UDropdown>


</template>
