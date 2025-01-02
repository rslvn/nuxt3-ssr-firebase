import {
  AlbumImage,
  FirebaseQueryOperator,
  FirestoreCollection
} from '~/types'
import {
  getModelById,
  getModelsByWhereClauses,
  saveModel
} from '~/service/firebase/firestore-collection-service'
import { getWhereClause } from '~/service/firebase/firebase-type-util'

export default function () {
  const { $firebaseAuth, $firebaseStore } = useNuxtApp()

  const saveAlbumImage = (albumImage: AlbumImage): Promise<AlbumImage> => {
    return saveModel($firebaseStore, $firebaseAuth, FirestoreCollection.ALBUM_IMAGE, albumImage)
  }

  const getAlbumImage = (albumImageId: string): Promise<AlbumImage> => {
    return getModelById($firebaseStore, FirestoreCollection.ALBUM_IMAGE, albumImageId)
  }

  const getAlbumImagesByAlbumId = (albumId: string): Promise<AlbumImage[]> => {
    return getModelsByWhereClauses($firebaseStore, FirestoreCollection.ALBUM_IMAGE, getWhereClause('albumId', FirebaseQueryOperator.EQ, albumId))
  }

  return {
    saveAlbumImage,
    getAlbumImage,
    getAlbumImagesByAlbumId
  }
}
