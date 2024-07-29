import {UserProfile} from '~/types'

export default function () {
  const {getUserProfile} = useUserProfileCollection()
  const {refreshToken} = useFirebaseAuth()
  const authStore = useAuthStore()
  const {getUserProfileByUsername} = useUserProfileCollection()

  const userProfileRef = useState<UserProfile>('userProfileState')
  const isMyProfile = computed(() => userProfileRef.value?.id === authStore.authUser?.userId)

  const setUserProfileState = (userProfile: UserProfile) => {
    delete userProfile.createdAt
    delete userProfile.updatedAt
    userProfileRef.value = userProfile
  }

  const setUserProfileByUsername = (username: string) => {
    return getUserProfileByUsername(username)
      .then(setUserProfileState)
  }

  const reloadUserProfile = async () => {
    console.log('>>>> reloadUserProfile', userProfileRef.value)
    if (userProfileRef.value?.id) {
      const userProfile = await getUserProfile(userProfileRef.value.id)
      setUserProfileState(userProfile)
      if (authStore.authUser?.userId === userProfileRef.value.id) { // do we really need this?
        await refreshToken()
      }
    }
  }

  const clearUserProfile = () => {
    userProfileRef.value = null
  }

  return {
    userProfileRef,
    setUserProfileByUsername,
    reloadUserProfile,
    clearUserProfile,
    isMyProfile
  }
}