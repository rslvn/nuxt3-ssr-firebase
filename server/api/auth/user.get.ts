import {UserRecord} from 'firebase-admin/auth'
import {getUserProfile, saveUserProfile} from '~/server/utils/user-profile-admin-collection'
import {AuthUser, UserProfile} from '~/types'
import {generateUsernameByEmailWith4DigitSuffix, generateUsernameById} from '~/service/user-profile-service'

const toAuthUser = (user: UserRecord, userProfile: UserProfile): AuthUser => {
  return {
    userId: user.uid as string,
    username: userProfile.username,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    profilePhoto: {
      src: userProfile.profilePhoto?.image?.src || 'https://picsum.photos/500/800',
    },
    providers: user.providerData,
  }
}

const addUserProfile = (user: UserRecord) => {
  const username = user.email ? generateUsernameByEmailWith4DigitSuffix(user.email) : generateUsernameById(user.uid)
  const userProfile: UserProfile = {
    id: user.uid,
    username,
    name: {firstName: user.displayName || ''},
    email: user.email,
    profilePhoto: {
      albumId: '',
      image: {src: user.photoURL || 'https://picsum.photos/500/800'}
    },
    coverPhoto: {
      albumId: '',
      image: {src: 'https://picsum.photos/1920/1080?random=1'}
    }
  }
  return saveUserProfile(userProfile, user.uid)
}

async function createOrGetUserProfile(user: UserRecord) {
  console.log('>>>> get user profile with uid:', user.uid)
  let userProfile = await getUserProfile(user.uid)
  if (!userProfile) {
    console.log('>>>> no user profile for uid', user.uid)
    userProfile = await addUserProfile(user)
  }
  console.log('>>>> Found profile:', !!userProfile)
  return userProfile
}

export default defineEventHandler(async (event) => {
  // try {
  const user = event.context.user
  if (!user) {
    console.log('>>>> no extracted user found')
    return
  }
  const userProfile = await createOrGetUserProfile(user)
  const authUser = toAuthUser(user, userProfile)
  console.log('sending authUser:', !!authUser)
  return authUser
  // } catch (error){
  //
  // }
})