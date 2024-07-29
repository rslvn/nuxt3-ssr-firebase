<script setup lang="ts">
import {PAGES} from '~/types'
import useUserProfileState from '~/composables/state/useUserProfileState'

const {t, locale} = useI18n()
const {params} = useRoute()
const username = params.username as string
if (!username) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}

const {profilePageState, setUserProfileInProfilePageStateByUsername, clearProfilePageState, isMyProfile} = useUserProfileState()
await setUserProfileInProfilePageStateByUsername(username)
  .catch((reason: any) => {
    if (reason?.code === 'permission-denied') {
      throw createError({statusCode: 403, statusMessage: t('page.accessDenied'), fatal: true})
    }
  })

if (!profilePageState.value) {
  console.log('>>>> no profile found by username', username)
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}

onBeforeRouteLeave(() => {
  clearProfilePageState()
})

const {seoMetaInputByUserProfile} = useAppSeoMeta()
useSeoMeta(seoMetaInputByUserProfile(profilePageState.value))

const leftLinks = computed(() => {
  if (!locale) {
    return []
  }
  const aboutLink = {
    label: t('common.About'),
    icon: 'i-heroicons-user-circle',
    to: `${PAGES.PROFILE.path}/${profilePageState.value.username}`,
    exact: true
  }

  return isMyProfile.value
    ? [aboutLink, {
        label: t('common.Settings'),
        icon: 'i-heroicons-cog-6-tooth',
        to: `${PAGES.PROFILE.path}/${profilePageState.value.username}/settings`
      }]
    : [aboutLink]
})

const links = computed(() => {
  return [leftLinks.value]
})
console.log('[username].vue processed', profilePageState.value)
</script>

<template>
  <section>
    <ProfileHeader v-if="profilePageState" :user-profile="profilePageState" :is-my-profile="isMyProfile" />
    <ProfileHeaderSkeleton v-else />
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
