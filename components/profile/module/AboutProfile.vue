<script setup lang="ts">
import {UserProfile} from "~/types";
import {getDisplayName} from "~/service/user-profile-service";
import {Country} from "country-state-city";

const props = defineProps<{
  userProfile: UserProfile
  isMyProfile?: boolean
}>()
const {t} = useI18n()

const displayName = computed(() => {
  return getDisplayName(props.userProfile)
})

const country = ref(props.userProfile?.address?.country && Country.getCountryByCode(props.userProfile.address.country))

</script>

<template>
  <UContainer>

    <UDashboardPanelContent>

      <div class="grid grid-cols-3 gap-4">
        <div class="col-span-1">{{t('field.fullName.label')}}</div>
        <div>{{ displayName }}</div>
      </div>

      <UDashboardSection :title="t('field.fullName.label')" orientation="horizontal"
                         :ui="{container: 'grid grid-cols-3 gap-4'}">
        <!--        <template #links>-->
        <div class="flex justify-center items-center">
          <span>{{ displayName }}</span>
        </div>
        <!--        </template>-->
      </UDashboardSection>

      <UDashboardSection :title="t('field.country.label')" orientation="horizontal"
                         :ui="{container: 'flex items-center justify-center sm:justify-between sm:flex-row gap-4'}">
        <!--        <template #links>-->
        <UCard class="flex items-center justify-center">
          <div class="flex flex-row items-center">
            <span class="text-2xl mr-2">{{ country.flag }}</span>
            <span>{{ country.name }}</span>
          </div>
        </UCard>
        <!--        </template>-->
      </UDashboardSection>

      <UDashboardSection :title="t('field.about.label')" orientation="horizontal"
                         :ui="{container: 'flex items-center justify-center sm:justify-between sm:flex-row gap-4'}">
        <!--        <template #links>-->
        <UCard>
          <span>{{ userProfile.about }}</span>
        </UCard>

        <!--        </template>-->
      </UDashboardSection>

    </UDashboardPanelContent>
  </UContainer>
</template>
