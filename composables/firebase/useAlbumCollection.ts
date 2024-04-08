import {Album, AlbumType, FirebaseQueryOperator, FirestoreCollection} from "~/types";
import {
    getModelById,
    getModelsByWhereClauses,
    saveModel
} from "~/service/firebase/firestore/firestore-collection-service";
import {getWhereClause} from "~/service/firebase/firebase-type-util";

export default function () {
    const {$firebaseAuth, $firebaseStore} = useNuxtApp()

    const saveAlbum = (album: Album): Promise<Album> => {
        return saveModel($firebaseStore, $firebaseAuth, FirestoreCollection.ALBUM, album)
    }

    const getAlbum = (albumId: string): Promise<Album> => {
        return getModelById($firebaseStore, FirestoreCollection.ALBUM, albumId)
    }

    const getAlbumByUserIdAndAlbumType = async (userId: string, albumType: AlbumType): Promise<Album> => {
        const albums = await getModelsByWhereClauses($firebaseStore, FirestoreCollection.ALBUM,
            getWhereClause('createdBy', FirebaseQueryOperator.EQ, userId),
            getWhereClause('albumType', FirebaseQueryOperator.EQ, albumType));
        return albums?.length > 0 ? albums[0] as Album : null;
    }

    const getOrAddAlbum = async (userId: string, albumType: AlbumType): Promise<Album> => {
        return await getAlbumByUserIdAndAlbumType(userId, albumType)
            .then(async (album: Album) => {
                if (album) {
                    return album
                }
                return await saveAlbum({
                    name: `${albumType} album of ${userId}`,
                    albumType
                })
            });
    }

    return {
        saveAlbum,
        getAlbum,
        getAlbumByUserIdAndAlbumType,
        getOrAddAlbum
    }
}