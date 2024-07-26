import {UseSeoMetaInput} from '@unhead/schema'
import {PageConfig, UserProfile} from '~/types'
import {getDisplayName} from '~/service/user-profile-service'

export default function () {
  const {t} = useI18n()
  const runtimeConfig = useRuntimeConfig()
  const requestURL = useRequestURL()

  const getSeoMetaInput = (title: string, description: string, image: string): UseSeoMetaInput => {
    return {
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogUrl: requestURL.href,
      ogImage: image,
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image
    }
  }

  const seoMetaInputByPageConfig = (pageConfig: PageConfig): UseSeoMetaInput => {
    const title = t(pageConfig.title.key, pageConfig.title.params)
    const description = t(pageConfig.description.key, pageConfig.description.params)
    const image = requestURL.origin + '/img/cover-20240206.png'

    return getSeoMetaInput(title, description, image)
  }

  const seoMetaInputByUserProfile = (userProfile: UserProfile): UseSeoMetaInput => {
    const displayName = getDisplayName(userProfile)
    const title = displayName || t('common.Profile')
    const description = displayName ? `${runtimeConfig.public.appName} profile of ${displayName}` : `${runtimeConfig.public.appName} profile`
    const image = userProfile?.profilePhoto?.image?.src || 'https://picsum.photos/500/800'
    return getSeoMetaInput(title, description, image)
  }

  return {
    seoMetaInputByPageConfig,
    seoMetaInputByUserProfile,
    getSeoMetaInput
  }
}