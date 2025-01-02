import {
  FirebaseQueryOperator,
  FirestoreCollection,
  UserProfile
} from '~/types'
import {
  getModelById,
  getModelsByWhereClauses,
  saveModel
} from '~/service/firebase/firestore-collection-service'
import { getWhereClause } from '~/service/firebase/firebase-type-util'

export default function () {
  const { $firebaseAuth, $firebaseStore } = useNuxtApp()

  const saveUserProfile = (profile: UserProfile): Promise<UserProfile> => {
    return saveModel($firebaseStore, $firebaseAuth, FirestoreCollection.USER_PROFILE, profile)
  }

  const getUserProfile = (profileId: string): Promise<UserProfile> => {
    return getModelById($firebaseStore, FirestoreCollection.USER_PROFILE, profileId)
  }

  const getUserProfileByUsername = async (username: string): Promise<UserProfile> => {
    const profiles = await getModelsByWhereClauses($firebaseStore, FirestoreCollection.USER_PROFILE, getWhereClause('username', FirebaseQueryOperator.EQ, username))
    return profiles?.length > 0 ? profiles[0] as UserProfile : null
  }

  return {
    saveUserProfile,
    getUserProfile,
    getUserProfileByUsername
  }
}
