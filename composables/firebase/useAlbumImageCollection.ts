import {useFirestore} from "vuefire";
import {AlbumImage, FirebaseQueryOperator, FirestoreCollection} from "~/types";
import {getModelById,getModelsByWhereClauses, saveModel} from "~/service/firebase/firestore/firestore-collection-service";
import {getWhereClause} from "~/service/firebase/firebase-type-util";

export default function () {
    const firestore = useFirestore()
    const firebaseAuth = useFirebaseAuth()

    const saveAlbumImage = (albumImage: AlbumImage): Promise<AlbumImage> => {
        return saveModel(firestore, firebaseAuth, FirestoreCollection.ALBUM_IMAGE, albumImage)
    }

    const getAlbumImage = (albumImageId: string): Promise<AlbumImage> => {
        return getModelById(firestore, FirestoreCollection.ALBUM_IMAGE, albumImageId)
    }

    const getAlbumImagesByAlbumId = (albumId: string): Promise<AlbumImage[]> => {
        return getModelsByWhereClauses(firestore, FirestoreCollection.ALBUM_IMAGE, getWhereClause('albumId', FirebaseQueryOperator.EQ, albumId))
    }

    return {
        saveAlbumImage,
        getAlbumImage,
        getAlbumImagesByAlbumId
    }
}