<script setup lang="ts">
const {locales, setLocale} = useI18n()
const languages = locales.value.map((item) => {
  return {
    label: item.name,
    icon: item.icon,
    value: item.code,
    click: () => setLocale(item.code)
  }
})
</script>

<template>
  <UDropdown :items="[languages]" :ui="{ item: { icon: {base: 'w-7 h-7'}, size:'text-lg' } }">
    <UButton
        color="gray"
        square
        variant="ghost"
        class="hover:bg-gray-50 dark:hover:bg-gray-800"
        icon="i-heroicons-globe-alt"
    />
  </UDropdown>
</template>
