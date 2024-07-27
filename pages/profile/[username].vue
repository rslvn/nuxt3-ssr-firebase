<script setup lang="ts">
import {PAGES} from '~/types'

const {t, locale} = useI18n()
const {getUserProfileByUsername} = useUserProfileCollection()
const {userProfile} = useAppGlobals()
const {params} = useRoute()
const authStore = useAuthStore()

const username = params.username as string
if (!username) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}

await getUserProfileByUsername(username)
  .then((profile) => {
    if (!profile) {
      console.log('>>>> no profile found by username', username)
      throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
    }
    userProfile.value = profile
  })
  .catch((reason) => {
    if (reason?.code === 'permission-denied') {
      throw createError({statusCode: 403, statusMessage: t('page.accessDenied'), fatal: true})
    }
    console.log('>>>> error when profile loading', reason)
    throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
  })

const isMyProfile = computed(() => userProfile.value?.id === authStore.authUser?.userId)

const {seoMetaInputByUserProfile} = useAppSeoMeta()
useSeoMeta(seoMetaInputByUserProfile(userProfile.value))

const leftLinks = computed(() => {
  if (!locale) {
    return []
  }
  const aboutLink = {
    label: t('common.About'),
    icon: 'i-heroicons-user-circle',
    to: `${PAGES.PROFILE.path}/${userProfile.value.username}`,
    exact: true
  }

  return isMyProfile.value
    ? [aboutLink, {
        label: t('common.Settings'),
        icon: 'i-heroicons-cog-6-tooth',
        to: `${PAGES.PROFILE.path}/${userProfile.value.username}/settings`
      }]
    : [aboutLink]
})

const links = computed(() => {
  return [leftLinks.value]
})
</script>

<template>
  <section>
    <ProfileHeader v-if="userProfile" :user-profile="userProfile" :is-my-profile="isMyProfile" />
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
