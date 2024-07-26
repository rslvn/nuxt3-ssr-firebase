<script setup lang="ts">
import {NotificationMessage} from '~/types'

defineProps<{
  alertMessage: NotificationMessage
  closeAlert?: () => void
}>()

const {t} = useI18n()
</script>

<template>
  <UNotification
    :id="alertMessage.id"
    :icon="alertMessage.type.icon"
    :color="alertMessage.type.color"
    :title="t(alertMessage.title.key, alertMessage.title.params)"
    :description="t(alertMessage.message.key, alertMessage.message.params)"
    :close-button="{ onClick: closeAlert }"
    :timeout="0"
  />
</template>
