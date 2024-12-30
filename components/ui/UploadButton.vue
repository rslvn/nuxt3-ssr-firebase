<script setup lang="ts">
import imageCompression from 'browser-image-compression'
import { AlbumType } from '~/types'
import { DEFAULT_COMPRESSED_IMAGE_MIME } from '~/service/firebase/fire-storage-service'

const props = defineProps<{
  albumType: AlbumType
}>()
const {showErrorToaster} = useNotifyUser()
const {uploadingFile, uploadSinglePhoto} = useFirebaseStorage()

const fileRef = ref<HTMLInputElement>()

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input?.files?.length) {
    return
  }
  const fileSize = input.files[0].size / 1024 / 1024
  console.log(`originalFile size ${fileSize} MB`)
  if (fileSize > 30) {
    showErrorToaster({key: 'notification.uploadFileSizeTooBig', params: {fileSize: 35}})
    return
  }

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: DEFAULT_COMPRESSED_IMAGE_MIME
  }

  imageCompression(input.files[0], options)
    .then((compressedFile) => {
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`)
      uploadSinglePhoto(props.albumType, compressedFile)
    })
}

function onFileClick() {
  fileRef.value?.click()
}
</script>

<template>
  <div>
    <UButton class="bg-gray-700 text-gray-100 hover:text-gray-400 hover:dark:text-gray-400"
             icon="i-heroicons-camera-solid" variant="outline" :ui="{ rounded: 'rounded-full' }" color="white"
             :disabled="uploadingFile"
             :loading="uploadingFile"
             @click="onFileClick" />
    <input ref="fileRef" type="file" class="hidden" accept="image/*" @change="onFileChange">
  </div>
</template>
