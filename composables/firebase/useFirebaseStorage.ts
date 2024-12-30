import { getDownloadURL, getStorage, ref as storageRef, uploadBytesResumable, UploadMetadata } from '@firebase/storage'
import { extension } from 'mime-types'
import { getNewFileName } from '~/service/firebase/fire-storage-service'
import { AlbumType } from '~/types'

export default function () {
  const { notifyByError, showErrorToaster } = useNotifyUser()
  const { reloadUserProfile } = useUserProfileState()
  const { saveUserProfile, getUserProfile } = useUserProfileCollection()
  const { getOrAddAlbum } = useAlbumCollection()
  const { saveAlbumImage } = useAlbumImageCollection()

  const uploadingFile = ref(false)
  const { authUserRef } = useAuthUserState()

  const uploadFileToFirebaseStorage = (albumType: AlbumType, parentPath: string, file: File) => {
    console.log('>>> uploadFileToFirebaseStorage albumType:', albumType)
    const fileExtension = extension(file.type)
    const filePath = `${parentPath}/${getNewFileName(file.name, fileExtension || '')}`
    const fileUploadRef = storageRef(getStorage(), filePath)
    const userId = authUserRef.value.userId

    uploadingFile.value = true

    const imageMeta: UploadMetadata = {
      contentType: file.type,
      cacheControl: 'max-age=31536000, immutable',
      customMetadata: {
        userId: authUserRef.value.userId,
        albumType,
      }
    }

    const uploadTask = uploadBytesResumable(fileUploadRef, file, imageMeta)

    uploadTask.on('state_changed', (snapshot) => {
      switch (snapshot.state) {
        case 'running':
          break
        case 'success':
          break
        default:
          showErrorToaster({ key: 'notification.photoUploadFailed' })
      }
    },
    (reason) => {
      uploadingFile.value = false
      notifyByError(reason)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then(async (downloadURL) => {
          const album = await getOrAddAlbum(userId, albumType)
          console.log('>>>> Found album: ', album, 'albumType: ', albumType)
          const savedAlbumImage = await saveAlbumImage({
            albumId: album.id,
            image: {
              path: filePath,
              src: downloadURL,
            }
          })

          await getUserProfile(userId)
            .then(async (profile) => {
              if (albumType === AlbumType.PROFILE) {
                profile.profilePhoto = savedAlbumImage
              } else if (albumType === AlbumType.COVER) {
                profile.coverPhoto = savedAlbumImage
              }
              await saveUserProfile(profile)
                .then(() => {
                  // userProfile.value = savedProfile
                  reloadUserProfile()
                })
            })
        })
        .catch(notifyByError)
        .finally(() => {
          uploadingFile.value = false
        })
    }
    )
  }

  const uploadSinglePhoto = (albumType: AlbumType, photo: File) => {
    if (!albumType || !photo) {
      console.log('>>>>> Cannot be uploaded')
    }
    const userId = authUserRef.value.userId

    console.log(`>>>>> Uploading ${albumType}:`, photo.name)
    switch (albumType) {
      case AlbumType.PROFILE:
        return uploadFileToFirebaseStorage(albumType, `users/${userId}/profilePhotos`, photo)
      case AlbumType.COVER:
        return uploadFileToFirebaseStorage(albumType, `users/${userId}/coverPhotos`, photo)
      case AlbumType.CUSTOM:
      default:
        console.log('>>>>> Unknown albumType: ', albumType)
    }
  }

  return {
    uploadingFile,
    uploadSinglePhoto
  }
}
