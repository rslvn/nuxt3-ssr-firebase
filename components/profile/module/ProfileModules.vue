<script setup lang="ts">

import {UserProfile} from "~/types";
import AboutProfile from "~/components/profile/module/AboutProfile.vue";
import ProfileSettings from "~/components/profile/module/ProfileSettings.vue";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

enum ProfileModuleType {
  ABOUT = 'about',
  SETTINGS = 'settings'
}

interface ProfileModuleConfig {
  type: ProfileModuleType,
  component: any,
  private: boolean,
  link: any
}

const {t} = useI18n()

const selectedModuleType = ref(ProfileModuleType.ABOUT)
const changeModule = (profileModuleType: ProfileModuleType) => selectedModuleType.value = profileModuleType
const profileModuleConfigs: ProfileModuleConfig[] = [
  {
    type: ProfileModuleType.ABOUT,
    component: AboutProfile,
    private: false,
    link: {
      label: t('common.About'),
      icon: 'i-heroicons-user-circle',
      click: () => changeModule(ProfileModuleType.ABOUT),
      exact: true
    }
  },
  {
    type: ProfileModuleType.SETTINGS,
    component: ProfileSettings,
    private: true,
    link: {
      label: t('common.Settings'),
      icon: 'i-heroicons-cog-6-tooth',
      click: () => changeModule(ProfileModuleType.SETTINGS)
    }
  }
]

const modules = computed(() => {
  return props.isMyProfile ? profileModuleConfigs : profileModuleConfigs.filter(module => !module.private)
})

const links = computed(() => modules.value.map(module => module.link))
const selectedModule = computed(() => modules.value.find(module => module.type === selectedModuleType.value))

</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-3xl' }">
    <UDashboardToolbar class="mt-40 sm:mt-24 xl:mt-16 py-0 px-1.5 overflow-x-auto">
      <UHorizontalNavigation :links="links"/>
    </UDashboardToolbar>
  </UContainer>

  <component :is="selectedModule.component" v-if="selectedModule" v-bind="props"/>
</template>
