import {createSharedComposable} from '@vueuse/core'
import {UserProfile} from "~/types"
import slugify from 'slugify'
import {User} from "@firebase/auth";

const dashAllRegex = /-/g

const generateUsername = (email: string) => {
    const usernamePrefix = email.replace(/@.*$/, '')
    return slugify(usernamePrefix, {
        lower: true,
        remove: /[*+~.,?#=()'"!:@]/g
    }).replace(dashAllRegex, '') + (1000 + Math.random() * 9000).toFixed(0)
}

const _useAuthUser = () => {
    const {getUserProfile, saveUserProfile} = useUserProfileCollection()
    const user = useCurrentUser()
    const userProfile = ref(null as UserProfile)

    const loadProfile = (newUser?: User) => {
        if (user.value?.uid === newUser?.uid) {
            return
        }
        if (!user.value?.uid) {
            userProfile.value = null
            return
        }
        getUserProfile(user.value.uid)
            .then(profile => {
                if (profile) { // profile found
                    userProfile.value = profile
                    console.log('profile found for ', user.value.email)
                    return
                }

                console.log('No profile of ', user.value.email)
                // no profile found then create it
                const username = user.value.email ? generateUsername(user.value.email) : user.value.uid.replace(dashAllRegex, '')
                saveUserProfile({
                    id: user.value.uid,
                    username,
                    name: {firstName: user.value.displayName?.split(' ')[0] || null},
                    email: user.value.email,
                    profilePhoto: {
                        image: {
                            src: user.value.photoURL || 'https://picsum.photos/500/800',
                            alt: 'profile photo'
                        }
                    },
                    coverPhoto: {
                        image: {
                            src: 'https://picsum.photos/1920/1080?random=1',
                            alt: 'cover photo'
                        }
                    }
                })
                    .then(savedProfile => userProfile.value = savedProfile)
            })
    }

    loadProfile()

    watch(user, async () => loadProfile(user.value), {immediate: true})

    const isUserProfileOfLoggedInUser = (requestedProfile: UserProfile) => {
        return !userProfile.value ? false : userProfile.value.id === requestedProfile.id
    }

    const isUsernameOfLoggedInUser = (username: string) => {
        return !userProfile.value ? false : userProfile.value.username === username
    }

    return {
        user,
        userProfile,
        isUserProfileOfLoggedInUser,
        isUsernameOfLoggedInUser
    }
}

export const useAuthUser = createSharedComposable(_useAuthUser)
