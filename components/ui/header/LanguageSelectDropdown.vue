<script setup lang="ts">
const {locales, setLocale, locale} = useI18n()
const languages = computed(() => locales.value.map((item) => ({
  label: item.name,
  flag: item.flag,
  value: item.code,
  click: () => setLocale(item.code)
})))

const currentLanguage = computed(() => languages.value.find((language: any) => language.value === locale.value))
</script>

<template>
  <UDropdown :items="[languages]">
    <UButton
      color="gray"
      square
      variant="ghost"
      class="hover:bg-gray-50 dark:hover:bg-gray-800 text-3xl content-center"
    >
      <span>{{ currentLanguage?.flag }}</span>
    </UButton>

    <template #item="{ item }">
      <div class="flex flex-row items-center space-x-2">
        <span class="text-2xl">{{ item.flag }}</span>
        <span>{{ item.label }}</span>
      </div>

      <UIcon v-if="item.value === currentLanguage.value" name="i-heroicons-check-solid"
             class="flex-shrink-0 ms-auto text-xl" />
    </template>
  </UDropdown>
</template>
