import {AuthUser, ProviderIdType, UserProfile} from "~/types"
import {User} from "@firebase/auth";
import {
    generateUsernameByEmailWith4DigitSuffix,
    generateUsernameById,
    getDisplayName
} from "~/service/user-profile-service";
import {useAuthStore} from "~/stores/auth-store";

const _useAuthUser = () => {
    const authStore = useAuthStore()
    const {getUserProfile, saveUserProfile} = useUserProfileCollection()

    const toAuthUser = (user: User, userProfile: UserProfile): AuthUser => {
        return {
            userId: userProfile.id,
            username: userProfile.username,
            displayName: getDisplayName(userProfile),
            email: userProfile.email,
            emailVerified: user.emailVerified,
            profilePhoto: userProfile.profilePhoto.image,
            providers: user.providerData,
        }
    }

    const updateAuthStoreByUserProfile = (userProfile: UserProfile) => {
        const authUser = {
            ...authStore.authUser,
            userId: userProfile.id,
            username: userProfile.username,
            displayName: getDisplayName(userProfile),
            email: userProfile.email,
            profilePhoto: userProfile.profilePhoto.image,
        }
        authStore.setAuthUser(authUser)
    }

    const setAuthStoreByUser = async (user: User) => {
        if (!user?.uid) {
            authStore.setAuthUser(null)
            return
        }

        console.log(new Date(), '>>>> initializeAuthUserStore', user.email)
        await getUserProfile(user.uid)
            .then(async (userProfile) => {
                if (userProfile) { // profile found
                    authStore.setAuthUser(toAuthUser(user, userProfile))
                    return
                }
                console.log(new Date(), 'No profile of ', user.email)
                // no profile found then create it
                const username = user.email ? generateUsernameByEmailWith4DigitSuffix(user.email) : generateUsernameById(user.uid)
                await saveUserProfile({
                    id: user.uid,
                    username,
                    name: {firstName: user.displayName?.split(' ')[0] || null},
                    email: user.email,
                    profilePhoto: {
                        albumId: null,
                        image: {
                            src: user.photoURL || 'https://picsum.photos/500/800',
                            alt: 'profile photo'
                        }
                    },
                    coverPhoto: {
                        albumId: null,
                        image: {
                            src: 'https://picsum.photos/1920/1080?random=1',
                            alt: 'cover photo'
                        }
                    }
                }).then(userProfile => {
                    authStore.setAuthUser(toAuthUser(user, userProfile))
                })
            })
    }

    const passwordProviderIdExist = computed(() => !!authStore.authUser?.providers?.find(userInfo => userInfo.providerId === ProviderIdType.PASSWORD))

    return {
        setAuthStoreByUser,
        updateAuthStoreByUserProfile,
        passwordProviderIdExist
    }
}

export const useAuthUser = createSharedComposable(_useAuthUser)
