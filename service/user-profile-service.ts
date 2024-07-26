import {Image, UserProfile} from '~/types'
import {sanitizeUrlContext} from '~/service/url-service'

const DEFAULT_PROFILE_PHOTO = 'https://picsum.photos/500/800'
const DEFAULT_COVER_PHOTO = 'https://picsum.photos/1920/1080?random=1'
const dashAllRegex = /-/g
const httpProtocolRegex = /(^\w+:|^)\/\//

export const getProfilePhotoImage = (userProfile: UserProfile, displayName: string): Image => {
  return {
    src: userProfile?.profilePhoto?.image?.src || DEFAULT_PROFILE_PHOTO,
    alt: userProfile?.profilePhoto?.image?.alt || `the profile photo of ${displayName || 'the profile'}`
  }
}

export const getCoverPhotoImage = (userProfile: UserProfile, displayName: string): Image => {
  return {
    src: userProfile?.coverPhoto?.image?.src || DEFAULT_COVER_PHOTO,
    alt: userProfile?.coverPhoto?.image?.alt || `the cover photo of ${displayName || 'the profile'}`
  }
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
