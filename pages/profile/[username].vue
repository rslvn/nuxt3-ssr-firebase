<script setup lang="ts">
import {ProvideInjectType} from '~/types';

const {seoMetaInputByUserProfile} = useAppSeoMeta()

const {t} = useI18n()
const {notifyByError} = useNotifyUser()
const {getUserProfileByUsername, getUserProfile} = useUserProfileCollection()
const currentUser = ref(null)
await getCurrentUser()
    .then(user => {
      currentUser.value = user
    })
const {params} = useRoute()

const username = params.username as string
if (!username) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}
const userProfile = ref(null)

await getUserProfileByUsername(username)
    .then((profile) => {
      if (!profile) {
        throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
      }
      userProfile.value = profile
    })
    .catch((reason) => {
      console.log('>>>>> reason',reason)
      if(reason?.code === 'permission-denied'){
        throw createError({statusCode: 403, statusMessage: t('page.accessDenied'), fatal: true})
      }
      throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
    })

useSeoMeta(seoMetaInputByUserProfile(userProfile.value))

const isMyProfile = computed(() => userProfile.value?.id === currentUser.value?.uid);

const updateUserProfile = async () => {
  userProfile.value = await getUserProfile(userProfile.value.id)
}
provide(ProvideInjectType.USER_PROFILE_UPDATED, {
  updateUserProfile
})

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <section>
        <ProfileHeader v-if="userProfile" :user-profile="userProfile" :is-my-profile="isMyProfile"/>
        <ProfileHeaderSkeleton v-else/>
      </section>

      <ProfileModules v-if="userProfile" :user-profile="userProfile" :is-my-profile="isMyProfile" :user="currentUser"/>
    </UDashboardPanel>
  </UDashboardPage>
</template>
