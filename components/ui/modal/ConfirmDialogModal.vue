<script setup lang="ts">

const model = defineModel({
  type: Boolean
})

const props = defineProps<{
  title: string
  description: string
  onConfirm: () => {}
  icon?: string
  confirmButtonLabel?: string
  cancelButtonLabel?: string
}>()

const {t} = useI18n()

const loading = ref(false)

const confirmed = () => {
  loading.value = true
  Promise.resolve()
      .then(props.onConfirm)
      .finally(() => {
        loading.value = false
        model.value = false
      })
}
</script>

<template>
  <UDashboardModal
      v-model="model"
      :title="title"
      :description="description"
      :icon="icon || 'i-heroicons-exclamation-circle'"
      prevent-close
      :close-button="null"
      :ui="{
      icon: {
        base: 'text-red-500 dark:text-red-400'
      } as any,
      footer: {
        base: 'ml-16'
      } as any
    }"
  >
    <template #footer>
      <UButton
          color="red"
          :label="confirmButtonLabel || t('common.Confirm')"
          :loading="loading"
          @click="confirmed"
      />
      <UButton
          color="white"
          :label="cancelButtonLabel || t('common.Cancel')"
          @click="model = false"
      />
    </template>
  </UDashboardModal>
</template>
