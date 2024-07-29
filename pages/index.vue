<script setup>
import {PAGES} from '~/types'

const {seoMetaInputByPageConfig} = useAppSeoMeta()
useSeoMeta(seoMetaInputByPageConfig(PAGES.HOME))
const {t} = useI18n()
const profilePage = useState('profilePage')
</script>

<template>
  <div>
    <UContainer class="mt-5">
      <ULandingHero
        :title="t('page.home.title')"
        :description="t('page.home.description')"
        :links="[{
          label: t('page.home.goToGithub'),
          icon: 'i-simple-icons-github',
          color: 'gray',
          size: 'lg',
          to: 'https://github.com/rslvn/nuxt3-ssr-firebase',
          target: '_blank'
        }]"
      />
    </UContainer>
    <pre>{{ profilePage }}</pre>
  </div>
</template>
