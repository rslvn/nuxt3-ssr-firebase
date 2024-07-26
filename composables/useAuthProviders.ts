import {AuthUser, PROVIDER_CONFIGS} from '~/types'
import {UserInfo} from '@firebase/auth'

export default function () {
  const {t} = useI18n()
  const {signInWithSocialProvider} = useFirebaseAuth()
  const {notifyByError} = useNotifyUser()

  const loginWithProvider = (providerId: string) => {
    signInWithSocialProvider(providerId)
      .catch(notifyByError)
  }

  const socialProviderConfigs = ref(Object.values(PROVIDER_CONFIGS).filter(provider => provider.providerId !== PROVIDER_CONFIGS.PASSWORD.providerId))

  const getLoginProviders = () => socialProviderConfigs.value.map(providerConfig => ({
    label: t('page.login.provider', {provider: providerConfig.name}),
    icon: providerConfig.icon,
    color: providerConfig.color,
    click: () => loginWithProvider(providerConfig.providerId)
  }))

  const getRegisterProviders = () => socialProviderConfigs.value.map(providerConfig => ({
    label: t('page.register.provider', {provider: providerConfig.name}),
    icon: providerConfig.icon,
    color: providerConfig.color,
    click: () => loginWithProvider(providerConfig.providerId)
  }))

  const getPasswordProvider = (userInfos: UserInfo[]) => userInfos?.find(userInfo => userInfo.providerId === PROVIDER_CONFIGS.PASSWORD.providerId)

  const getCurrentProviderIds = (authUser: AuthUser) => authUser?.providers?.map(provider => provider.providerId)

  const isPasswordProvider = (providerId: string) => providerId === PROVIDER_CONFIGS.PASSWORD.providerId

  return {
    getLoginProviders,
    getRegisterProviders,
    getPasswordProvider,
    getCurrentProviderIds,
    socialProviderConfigs,
    isPasswordProvider
  }
}