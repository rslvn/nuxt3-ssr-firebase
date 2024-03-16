<script setup lang="ts">
import {PAGES} from "~/types";

defineProps({
  block: {
    type: Boolean,
    required: false,
    default: false
  }
})

const {isHeaderDialogOpen} = useUIState()
const {t} = useI18n()

</script>

<template>
  <div>
    <UButton :label="t(PAGES.LOGIN.title.key, PAGES.LOGIN.title.params)" :to="PAGES.LOGIN.path" color="green"
             variant="ghost" :block="block" @click="isHeaderDialogOpen = false"/>
    <UButton :label="t(PAGES.REGISTER.title.key, PAGES.REGISTER.title.params)" :to="PAGES.REGISTER.path"
             icon="i-heroicons-arrow-right-20-solid" trailing color="purple"
             :block="block" @click="isHeaderDialogOpen = false"/>
  </div>
</template>