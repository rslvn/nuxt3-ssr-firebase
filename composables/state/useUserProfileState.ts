import {UserProfile} from '~/types'

export default function () {
  const {getUserProfile} = useUserProfileCollection()
  const {refreshToken} = useFirebaseAuth()
  const authStore = useAuthStore()
  const {getUserProfileByUsername} = useUserProfileCollection()
  const profilePageState = useState<UserProfile>('profilePageState')

  const isMyProfile = computed(() => profilePageState.value?.id === authStore.authUser?.userId)

  const setUserProfileState = (userProfile: UserProfile) => {
    delete userProfile.createdAt
    delete userProfile.updatedAt
    profilePageState.value = userProfile
  }

  const setUserProfileInProfilePageStateByUsername = (username: string) => {
    return getUserProfileByUsername(username)
      .then(setUserProfileState)
  }

  const reloadUserProfile = async () => {
    console.log('>>>> reloadUserProfile', profilePageState.value)
    if (profilePageState.value?.id) {
      const userProfile = await getUserProfile(profilePageState.value.id)
      setUserProfileState(userProfile)
      if (authStore.authUser?.userId === profilePageState.value.id) { // do we really need this?
        await refreshToken()
      }
    }
  }

  const clearProfilePageState = () => {
    profilePageState.value = null
  }

  return {
    profilePageState,
    setUserProfileInProfilePageStateByUsername,
    reloadUserProfile,
    clearProfilePageState,
    isMyProfile
  }
}