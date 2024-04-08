import {getUserProfile, saveUserProfile} from "~/server/utils/user-profile-admin-collection";
import {AuthUser, UserProfile} from "~/types";
import {
    generateUsernameByEmailWith4DigitSuffix,
    generateUsernameById,
    getDisplayName
} from "~/service/user-profile-service";
import {UserRecord} from "firebase-admin/auth";

const toAuthUser = (user: UserRecord, userProfile: UserProfile): AuthUser => {
    return {
        userId: userProfile.id as string,
        username: userProfile.username,
        displayName: getDisplayName(userProfile) as string,
        email: userProfile.email,
        emailVerified: user.emailVerified,
        profilePhoto: userProfile.profilePhoto.image,
        providers: user.providerData,
    }
}

const addUserProfile = (user: UserRecord) => {
    const username = user.email ? generateUsernameByEmailWith4DigitSuffix(user.email) : generateUsernameById(user.uid)
    const userProfile: UserProfile = {
        id: user.uid,
        username,
        name: {firstName: user.displayName?.split(' ')[0] || ''},
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

export default defineEventHandler(async (event) => {
    // try {
    const user = event.context.user;
    if (!user) {
        console.log('>>>> no extracted user found')
        return
    }

    let userProfile = await getUserProfile(user.uid)
    if (!userProfile) {
        console.log('>>>> no user profile for uid', user.uid)
        userProfile = await addUserProfile(user)
    }

    const authUser = toAuthUser(user, userProfile)
    console.log('sending authUser:', !!authUser)
    return authUser
    // } catch (error){
    //
    // }
})