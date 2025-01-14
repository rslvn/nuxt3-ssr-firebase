<template>
  <UTooltip
    :text="tooltip"
    :popper="{ placement: 'bottom-start' }"
    :ui="{
      base: 'text-3 px-1 py-1 ',
    }"
  >
    <UButton
      :icon="icon"
      :class="classBinding"
      :disabled="disabledBinding"
      style="outline: none"
      size="sm"
      color="gray"
      variant="ghost"
      square
      padded
      trailing
    />
  </UTooltip>
</template>

<script setup lang="ts">
defineProps({
  disabledBinding: Boolean,
  tooltip: String,
  icon: String,
  classBinding: Object,
})
</script>
