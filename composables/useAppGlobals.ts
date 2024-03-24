import {UserProfile} from "~/types"

const _useAppGlobals = () => {
    const {getUserProfile} = useUserProfileCollection()
    const {updateAuthStoreByUserProfile} = useAuthUser()
    const userProfile = ref(null as UserProfile)

    const reloadUserProfile = async () => {
        if (userProfile.value.id) {
            userProfile.value = await getUserProfile(userProfile.value.id)
            updateAuthStoreByUserProfile(userProfile.value)
        }
    }

    return {
        userProfile,
        reloadUserProfile
    }
}

export const useAppGlobals = createSharedComposable(_useAppGlobals)
