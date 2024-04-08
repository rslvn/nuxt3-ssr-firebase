import {getUserProfile} from "~/server/utils/user-profile-admin-collection";
import {AuthUser, UserProfile} from "~/types";
import {getDisplayName} from "~/service/user-profile-service";
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

export default defineEventHandler(async (event) => {
    // try {
    const user = event.context.user;
    if (!user) {
        return
    }

    const userProfile = await getUserProfile(user.uid)

    const authUser = toAuthUser(user, userProfile)
    console.log('sending authUser:', !!authUser)
    return authUser
    // } catch (error){
    //
    // }
})