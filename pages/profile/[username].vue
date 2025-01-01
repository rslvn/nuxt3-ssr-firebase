<script setup lang="ts">
const { t, locale } = useI18n()
const { getProfilePath, getProfileSettingsPath } = usePages()
const { params } = useRoute()
const username = params.username as string
if (!username) {
  throw createError({ statusCode: 404, statusMessage: t('page.notFound'), fatal: true })
}

const { userProfileRef, setUserProfileByUsername, clearUserProfile, isMyProfile } = useUserProfileState()
await setUserProfileByUsername(username)
  .catch((reason: any) => {
    if (reason?.code === 'permission-denied') {
      throw createError({ statusCode: 403, statusMessage: t('page.accessDenied'), fatal: true })
    }
  })

if (!userProfileRef.value) {
  console.log('>>>> no profile found by username', username)
  throw createError({ statusCode: 404, statusMessage: t('page.notFound'), fatal: true })
}

onBeforeRouteLeave(() => {
  clearUserProfile()
})

const { seoMetaInputByUserProfile } = useAppSeoMeta()
useSeoMeta(seoMetaInputByUserProfile(userProfileRef.value))

const leftLinks = computed(() => {
  if (!locale) {
    return []
  }
  const aboutLink = {
    label: t('common.About'),
    icon: 'i-heroicons-user-circle',
    to: getProfilePath(userProfileRef.value?.username),
    exact: true
  }

  return isMyProfile.value
    ? [aboutLink, {
        label: t('common.Settings'),
        icon: 'i-heroicons-cog-6-tooth',
        to: getProfileSettingsPath(userProfileRef.value?.username)
      }]
    : [aboutLink]
})

const links = computed(() => {
  return [leftLinks.value]
})
</script>

<template>
  <section v-if="userProfileRef">
    <ProfileHeader :user-profile="userProfileRef" :is-my-profile="isMyProfile" />
  </section>

  <section>
    <UContainer :ui="{ constrained: 'max-w-2xl' }">
      <UDashboardToolbar class="mt-44 sm:mt-24 xl:mt-16 py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links"
                               :ui="{ wrapper: 'justify-center', label: 'text-lg', icon: { base: 'w-7 h-7' } }" />
      </UDashboardToolbar>
    </UContainer>
  </section>

  <section>
    <NuxtPage />
  </section>
</template>
