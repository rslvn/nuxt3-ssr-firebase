import {getDownloadURL, ref as storageRef, UploadMetadata} from "@firebase/storage";
import {getNewFileName} from "~/service/firebase/fire-storage-service";
import useAlbumCollection from "~/composables/firebase/useAlbumCollection";
import {AlbumType} from "~/types";
import useAlbumImageCollection from "~/composables/firebase/useAlbumImageCollection";
import {useAppGlobals} from "~/composables/useAppGlobals";

export default function () {
    const firebaseStorage = useFirebaseStorage()
    const {notifyByError, showErrorToaster} = useNotifyUser()
    const {reloadUserProfile} = useAppGlobals()
    const {saveUserProfile, getUserProfile} = useUserProfileCollection()
    const {getOrAddAlbum} = useAlbumCollection()
    const {saveAlbumImage} = useAlbumImageCollection()

    const uploadingFile = ref(false)
    const fileForUpload = ref(null as File)
    const authStore = useAuthStore()

    const uploadFileToFirebaseStorage = (albumType: AlbumType, parentPath: string) => {
        console.log('>>>> fileForUpload', fileForUpload.value)
        const filePath = `${parentPath}${getNewFileName(fileForUpload.value.name)}`
        const fileUploadRef = storageRef(firebaseStorage, filePath)
        const {uploadTask, upload} = useStorageFile(fileUploadRef)

        uploadingFile.value = true

        const imageMeta: UploadMetadata = {
            contentType: fileForUpload.value.type,
            cacheControl: 'max-age=31536000, immutable',
            customMetadata: {
                userId: authStore.authUser.userId
            }
        }
        upload(fileForUpload.value, imageMeta)
            .catch(notifyByError)

        if (!uploadTask.value) {
            uploadingFile.value = false
            return
        }

        uploadTask.value.on('state_changed', (snapshot) => {
                console.log(snapshot.state)
                switch (snapshot.state) {
                    case 'running':
                        break
                    case 'success':
                        break
                    default:
                        showErrorToaster({key: 'notification.photoUploadFailed'})
                }
            },
            reason => {
                uploadingFile.value = false
                notifyByError(reason)
            },
            () => {
                getDownloadURL(uploadTask.value.snapshot.ref)
                    .then(async (downloadURL) => {
                        const album = await getOrAddAlbum(authStore.authUser.userId, albumType)
                        const savedAlbumImage = await saveAlbumImage({
                            albumId: album.id,
                            image: {
                                path: filePath,
                                src: downloadURL,
                            }
                        })
                        await getUserProfile(authStore.authUser.userId)
                            .then(async (profile) => {
                                if (albumType === AlbumType.PROFILE) {
                                    profile.profilePhoto = savedAlbumImage
                                } else if (albumType === AlbumType.COVER) {
                                    profile.coverPhoto = savedAlbumImage
                                }
                                await saveUserProfile(profile)
                                    .then(async (savedProfile) => {
                                        // userProfile.value = savedProfile
                                        await reloadUserProfile()
                                    })
                            })
                    })
                    .catch(notifyByError)
                    .finally(() => {
                        uploadingFile.value = false
                    });
            }
        )
    }

    const uploadProfilePhoto = () => {
        const profilePhotoParentPath = `users/${authStore.authUser.userId}/profilePhotos/`
        return uploadFileToFirebaseStorage(AlbumType.PROFILE, profilePhotoParentPath)
    }

    watch(fileForUpload, () => {
        if (fileForUpload.value) {
            uploadProfilePhoto()
        }
    })

    return {
        fileForUpload,
        uploadingFile
    }
}