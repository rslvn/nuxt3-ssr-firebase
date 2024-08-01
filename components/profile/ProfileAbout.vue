<script setup lang="ts">
import {UserProfile} from '~/types'

defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()
const {t} = useI18n()
</script>

<template>
  <UContainer>
    <UDashboardPanelContent>
      <UDashboardSection :title="t('field.about.label')" orientation="horizontal"
                         :ui="{ container: 'flex items-center justify-center sm:justify-between sm:flex-row gap-4' }">
        <UCard>
          <span id="profile-about">{{ userProfile.about }}</span>
        </UCard>
      </UDashboardSection>
    </UDashboardPanelContent>
  </UContainer>
</template>
