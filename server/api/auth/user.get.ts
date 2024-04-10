import {getUserProfile, saveUserProfile} from "~/server/utils/user-profile-admin-collection";
import {AuthUser, FirebaseClaims, UserProfile} from "~/types";
import {generateUsernameByEmailWith4DigitSuffix, generateUsernameById} from "~/service/user-profile-service";
import {getAuth, UserRecord} from "firebase-admin/auth";

const toAuthUser = (user: UserRecord, firebaseClaims: FirebaseClaims): AuthUser => {
    return {
        userId: user.uid as string,
        username: firebaseClaims.username,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        profilePhoto: {
            src: user.photoURL,
        },
        providers: user.providerData,
    }
}

const addFirebaseClaims = async (userProfile: UserProfile) => {
    const firebaseClaims: FirebaseClaims = {
        username: userProfile.username
    }
    await getAuth().setCustomUserClaims(userProfile.id as string, firebaseClaims);
    return firebaseClaims
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
    let userProfile = await getUserProfile(user.uid)
    if (!userProfile) {
        console.log('>>>> no user profile for uid', user.uid)
        userProfile = await addUserProfile(user)
    }
    return userProfile;
}

export default defineEventHandler(async (event) => {
    // try {
    let user = event.context.user;
    if (!user) {
        console.log('>>>> no extracted user found')
        return
    }

    let firebaseClaims = user.customClaims as FirebaseClaims;

    console.log('Found user with customClaims', firebaseClaims)
    if (!firebaseClaims) {
        let userProfile = await createOrGetUserProfile(user);
        user = await getAuth().updateUser(user.uid, {photoURL: userProfile.profilePhoto.image.src})
        firebaseClaims = await addFirebaseClaims(userProfile)
    }

    const authUser = toAuthUser(user, firebaseClaims)
    console.log('sending authUser:', !!authUser)
    return authUser
    // } catch (error){
    //
    // }
})