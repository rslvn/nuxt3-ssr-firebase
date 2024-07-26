<script setup lang="ts">
const confirmBusy = ref(false)
defineProps<{
  type?: string
  label: string
  confirmTitle: string
  confirmDescription: string
  onConfirm: () => void
  modalIcon?: string
  confirmButtonLabel?: string
  cancelButtonLabel?: string
}>()
</script>

<template>
  <UButton :type="type || ''" color="gray" variant="ghost"
           :loading="confirmBusy" :disabled="confirmBusy"
           @click="() => confirmBusy = true">
    {{ label }}
  </UButton>
  <ConfirmDialogModal v-model="confirmBusy"
                      :title="confirmTitle"
                      :description="confirmDescription"
                      :on-confirm="onConfirm"
                      :confirm-button-label="confirmButtonLabel"
                      :cancel-button-label="cancelButtonLabel" />
</template>