import {useFirestore} from "vuefire";
import {AlbumImage, FirestoreCollection} from "~/types";
import {getModelById, saveModel} from "~/service/firebase/firestore/firestore-collection-service";

export default function () {
    const firestore = useFirestore()
    const firebaseAuth = useFirebaseAuth()

    const saveAlbumImage = (albumImage: AlbumImage): Promise<AlbumImage> => {
        return saveModel(firestore, firebaseAuth, FirestoreCollection.ALBUM_IMAGE, albumImage)
    }

    const getAlbumImage = (albumImageId: string): Promise<AlbumImage> => {
        return getModelById(firestore, FirestoreCollection.ALBUM_IMAGE, albumImageId)
    }

    return {
        saveAlbumImage,
        getAlbumImage
    }
}