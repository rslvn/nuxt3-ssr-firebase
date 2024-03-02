import {createSharedComposable} from '@vueuse/core'
import {Profile} from "~/types"
import slugify from 'slugify'

const dashAllRegex = /-/g

const generateUsername = (email: string) => {
    const usernamePrefix = email.replace(/@.*$/, '')
    return slugify(usernamePrefix).replace(dashAllRegex, '') + (1000 + Math.random() * 9000).toFixed(0)
}

const _useAuthUser = () => {
    const profileCollection = useProfileCollection()
    const user = useCurrentUser()
    const profile = ref(null as Profile)

    const loadProfile = () => {
        if (!user.value?.uid) {
            profile.value = null
            return
        }
        profileCollection.getProfile(user.value.uid)
            .then(_profile => {
                if (_profile) { // profile found
                    profile.value = _profile
                    console.log('profile found for ', user.value.email)
                    return
                }

                console.log('No profile of ', user.value.email)
                // no profile found then create it
                const username = user.value.email ? generateUsername(user.value.email) : user.value.uid.replace(dashAllRegex, '')
                profileCollection.saveProfile({username, id: user.value.uid})
                    .then(savedProfile => profile.value = savedProfile)
            })
    }

    loadProfile()

    watch(user, async () => loadProfile(), {immediate: true})

    return {
        user,
        profile
    }
}

export const useAuthUser = createSharedComposable(_useAuthUser)
