import {UserProfile} from "~/types";
import {sanitizeUrlContext} from "~/service/url-service";

const DEFAULT_PROFILE_PHOTO = 'https://picsum.photos/500/800'
const DEFAULT_COVER_PHOTO = 'https://picsum.photos/1920/1080?random=1'
const dashAllRegex = /-/g
const httpProtocolRegex = /(^\w+:|^)\/\//

export const getProfilePhoto = (userProfile?: UserProfile) => {
    return userProfile?.profilePhoto?.image?.src || DEFAULT_PROFILE_PHOTO
}

export const getCoverPhoto = (userProfile?: UserProfile) => {
    return userProfile?.coverPhoto?.image?.src || DEFAULT_COVER_PHOTO
}

export const getDisplayName = (userProfile?: UserProfile) => {
    if (userProfile?.name?.firstName) {
        if (userProfile.name.middleName && userProfile.name.lastName) {
            return `${userProfile.name.firstName} ${userProfile.name.middleName} ${userProfile.name.lastName}`
        } else if (userProfile.name.lastName) {
            return `${userProfile.name.firstName} ${userProfile.name.lastName}`
        }
        return userProfile.name.firstName
    }
    return null
}

export const generateUsernameById = (id: string) => {
    return id.replace(dashAllRegex, '')
}


export const generateUsernameByEmail = (email: string) => {
    const usernamePrefix = email.replace(/@.*$/, '')
    return sanitizeUrlContext(usernamePrefix)
}

export const generateUsernameByEmailWith4DigitSuffix = (email: string) => {
    return generateUsernameByEmail(email) + (1000 + Math.random() * 9000).toFixed(0)
}

export const removeHttpProtocol = (url: string) => url.replace(httpProtocolRegex, '')

