import {UserProfile} from '~/types'

const _useAppGlobals = () => {
  const {getUserProfile} = useUserProfileCollection()
  const authStore = useAuthStore()
  const {refreshToken} = useFirebaseAuth()
  const userProfile = ref(null as UserProfile)

  const reloadUserProfile = async () => {
    if (userProfile.value.id) {
      userProfile.value = await getUserProfile(userProfile.value.id)
      if (authStore.authUser?.userId === userProfile.value.id) {
        refreshToken()
      }
    }
  }

  return {
    userProfile,
    reloadUserProfile
  }
}

export const useAppGlobals = createSharedComposable(_useAppGlobals)
