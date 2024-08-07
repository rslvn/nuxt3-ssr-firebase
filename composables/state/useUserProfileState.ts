import {UserProfile} from '~/types'

export default function () {
  const userProfileRef = useState<UserProfile>('userProfileState')

  const {getUserProfile} = useUserProfileCollection()
  const {refreshToken} = useFirebaseAuth()
  const {getUserProfileByUsername} = useUserProfileCollection()
  const {authUserRef} = useAuthUserState()
  const isMyProfile = computed(() => userProfileRef.value?.id === authUserRef.value?.userId)

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
    console.log('>>>> reloadUserProfile')
    if (userProfileRef.value?.id) {
      const userProfile = await getUserProfile(userProfileRef.value.id)
      console.log('>>>> user profile is loaded', userProfile)
      setUserProfileState(userProfile)
      if (authUserRef.value?.userId === userProfileRef.value.id) { // do we really need this?
        console.log('>>> refreshToken')
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