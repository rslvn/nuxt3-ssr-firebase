<script setup lang="ts">
const {locales, setLocale, locale} = useI18n()
const languages = computed(() => locales.value.map((item) => ({
      label: item.name,
      labelClass: locale.value === item.code ? 'text-primary-400' : '',
      icon: item.icon,
      value: item.code,
      click: () => setLocale(item.code)
    })))

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
