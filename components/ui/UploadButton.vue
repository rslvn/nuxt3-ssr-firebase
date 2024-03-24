<script setup lang="ts">
import useFirebaseUploadFile from "~/composables/firebase/useFirebaseUploadFile";

const {notifyByError} = useNotifyUser()
const {fileForUpload, uploadingFile} = useFirebaseUploadFile()

const fileRef = ref<{ input: HTMLInputElement }>()

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) {
    return
  }
  fileForUpload.value = input.files[0]
  console.log('>>>> onFileChange fileForUpload',fileForUpload.value)
}

function onFileClick() {
  fileRef.value?.input.click()
}
</script>

<template>
  <div>
    <UButton class="bg-gray-700 text-gray-100 hover:text-gray-400 hover:dark:text-gray-400"
             icon="i-heroicons-camera-solid" variant="outline" :ui="{ rounded: 'rounded-full' }" color="white"
             :disabled="uploadingFile"
             :loading="uploadingFile"
             @click="onFileClick"/>
    <UInput ref="fileRef" type="file" class="hidden" accept="image/*" @change="onFileChange"/>
  </div>
</template>
