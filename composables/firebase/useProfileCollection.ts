import {useFirestore} from "vuefire";
import {FirebaseQueryOperator, FirestoreCollection, Profile} from "~/types";
import {
    getModelById,
    getModelsByWhereClauses,
    saveModel
} from "~/service/firebase/firestore/firestore-collection-service";
import {getWhereClause} from "~/service/firebase/firebase-type-util";

export default function () {

    const firestore = useFirestore()
    const firebaseAuth = useFirebaseAuth()

    const saveProfile = (profile: Profile): Promise<Profile> => {
        return saveModel(firestore, firebaseAuth, FirestoreCollection.PROFILE, profile)
    }

    const getProfile = (profileId: string): Promise<Profile> => {
        return getModelById(firestore, FirestoreCollection.PROFILE, profileId)
    }

    const getProfilesByUsername = (username: string) :Promise<Profile[]> => {
        return getModelsByWhereClauses(firestore, FirestoreCollection.PROFILE, getWhereClause('username', FirebaseQueryOperator.EQ, username))
    }

    return {
        getProfile,
        saveProfile
    }
}