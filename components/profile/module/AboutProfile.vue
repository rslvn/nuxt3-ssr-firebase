<script setup lang="ts">
import {UserProfile} from "~/types";

const {t} = useI18n()
const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()
</script>

<template>
  <UContainer>
    <UDashboardPanelContent class="pb-24 ">
      <UDashboardSection :title="t('field.emailAddress.label')" :description="t('field.emailAddress.description')"
                         icon="i-heroicons-envelope"
                         :ui="{container: 'flex flex-wrap items-center justify-between gap-4'}">
        <template #links>
          <span>{{ userProfile?.email }}</span>
        </template>
      </UDashboardSection>
      <UDivider class="mb-4"/>
    </UDashboardPanelContent>
  </UContainer>

</template>
