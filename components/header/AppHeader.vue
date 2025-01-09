<script setup lang="ts">
const {t} = useI18n()
const {logout} = useFirebaseAuth()
const {isHeaderDialogOpen} = useUIState()
const {authUserRef} = useAuthUserState()

const closeDialog = () => {
  isHeaderDialogOpen.value = false
}

const signOut = () => {
  logout()
  closeDialog()
}
</script>

<template>
  <UHeader :ui="{ logo: 'text-2xl' }">
    <template #logo>
      nuxt3-ssr
      <UBadge label="firebase" variant="subtle" class="mb-0.5 hidden md:flex" />
    </template>

    <template #right>
      <RegisterBar v-if="!authUserRef" class="hidden lg:flex" />
      <UColorModeButton class="hidden md:block" />
      <LanguageSelectDropdown class="hidden md:block" />
      <NavUser v-if="authUserRef" />
    </template>

    <template #panel>
      <div class="grid grid-cols-2 gap-x-2">
        <UColorModeSelect />
        <LanguageSelect />
      </div>
      <UDivider class="my-6" />
      <RegisterBar v-if="!authUserRef" block />
      <UButton v-if="authUserRef" :label="t('common.SignOut')" color="green" variant="ghost"
               block @click="signOut" />
    </template>
  </UHeader>
</template>
