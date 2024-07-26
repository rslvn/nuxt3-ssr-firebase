<script setup lang="ts">
import {UserProfile} from '~/types'
import AboutProfile from '~/components/profile/module/AboutProfile.vue'
import ProfileSettings from '~/components/profile/module/ProfileSettings.vue'

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()

enum ProfileModuleType {
  ABOUT = 'about',
  SETTINGS = 'settings'
}

interface ProfileModuleConfig {
  type: ProfileModuleType
  component: any
  private: boolean
  link: any
}

const {t, locale} = useI18n()

const selectedModuleType = ref(ProfileModuleType.ABOUT)
const changeModule = (profileModuleType: ProfileModuleType) => {
  selectedModuleType.value = profileModuleType
}
const profileModuleConfigs = computed((): ProfileModuleConfig[] => {
  if (!locale) {
    return null
  }

  return [
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
        click: () => changeModule(ProfileModuleType.SETTINGS),
        exact: false
      }
    }
  ]
})

const modules = computed(() => {
  return props.isMyProfile ? profileModuleConfigs.value : profileModuleConfigs.value.filter(module => !module.private)
})

const links = computed(() => modules.value.map(module => [module.link]))
const selectedModule = computed(() => modules.value.find(module => module.type === selectedModuleType.value))

</script>

<template>
  <div>
    <UContainer :ui="{ constrained: 'max-w-2xl'}">
      <UDashboardToolbar class="mt-44 sm:mt-24 xl:mt-16 py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links"
                               :ui="{wrapper: 'justify-center', label:'text-lg', icon: {base: 'w-7 h-7'}}" />
      </UDashboardToolbar>
    </UContainer>

    <component :is="selectedModule.component" v-if="selectedModule" v-bind="props" />
  </div>
</template>
