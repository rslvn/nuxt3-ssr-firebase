<script setup lang="ts">
import {UserProfile} from "~/types";
import ProfileToolBar from "~/components/profile/ProfileToolBar.vue";

// definePageMeta({
//   middleware: ['authenticated-allowed'],
// })

const {seoMetaInputByUserProfile} = useAppSeoMeta()

const {t} = useI18n()
const {getUserProfileByUsername} = useUserProfileCollection()
const {userProfile, isUsernameOfLoggedInUser} = useAuthUser()
const {params} = useRoute()

const username = params.username as string
if (!username) {
  throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}

// workaround using async onCreated
const loadUserProfile = async () => {
  profile.value = isMyProfile ? userProfile.value : await getUserProfileByUsername(username)
  if (!profile.value) {
    throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
  }
}

const profile = ref(null as UserProfile)
const isMyProfile = isUsernameOfLoggedInUser(username);

loadUserProfile()
useSeoMeta(seoMetaInputByUserProfile(profile.value))

const links = [[{
  label: 'General',
  icon: 'i-heroicons-user-circle'
}, {
  label: 'Members',
  icon: 'i-heroicons-user-group'
}, {
  label: 'Notifications',
  icon: 'i-heroicons-bell'
}]]

</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <section>
        <ProfileHeader v-if="profile" :user-profile="profile" :is-my-profile="isMyProfile"/>
        <ProfileHeaderSkeleton v-else/>
      </section>

      <UContainer :ui="{ constrained: 'max-w-3xl' }">
      <UDashboardToolbar class="mt-40 sm:mt-24 xl:mt-16 py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>
      </UContainer>

      <NuxtPage />
    </UDashboardPanel>
  </UDashboardPage>



<!--  <section>-->
<!--    <ProfileHeader v-if="profile" :user-profile="profile" :is-my-profile="isMyProfile"/>-->
<!--    <ProfileHeaderSkeleton v-else/>-->
<!--  </section>-->
<!--  <UContainer :ui="{ constrained: 'max-w-3xl' }">-->

<!--    &lt;!&ndash;    {&ndash;&gt;-->
<!--    &lt;!&ndash;    base: 'mx-auto',&ndash;&gt;-->
<!--    &lt;!&ndash;    padding: 'px-4 sm:px-6 lg:px-8',&ndash;&gt;-->
<!--    &lt;!&ndash;    constrained: 'max-w-7xl',&ndash;&gt;-->
<!--    &lt;!&ndash;    }&ndash;&gt;-->
<!--    <ProfileToolBar class="mt-40 sm:mt-24 xl:mt-16"/>-->
<!--  </UContainer>-->
</template>
