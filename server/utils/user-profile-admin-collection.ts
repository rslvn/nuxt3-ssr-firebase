import {UserProfile} from "~/types";

export const getUserProfile = (userProfileId: string): Promise<UserProfile> => {
    return getModelById('user-profile', userProfileId)
}