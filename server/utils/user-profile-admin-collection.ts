import {UserProfile} from "~/types";

export const getUserProfile = (userProfileId: string): Promise<UserProfile> => {
    return getModelById('user-profile', userProfileId)
}

export const saveUserProfile = (userProfile: UserProfile, requestedBy ?: string): Promise<UserProfile> => {
    return saveModel('user-profile', userProfile, requestedBy)
}