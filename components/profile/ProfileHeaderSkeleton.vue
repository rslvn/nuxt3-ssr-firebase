<template>
  <USkeleton class="h-80 w-full object-cover"/>
  <div class="-mt-28 mx-auto flex flex-col items-center w-full px-4 absolute sm:space-x-2 sm:flex-row sm:px-6 lg:px-8">
    <div class="ring-3 ring-gray-900 dark:ring-gray-300 h-52 w-52">
      <USkeleton
        class="bg-origin-padding p-4 border-4 border-gray-500 dark:border-gray-900 rounded-full bg-center bg-gray-400 bg-no-repeat h-52 w-52"
        :ui="{ rounded: 'rounded-full' }"/>
    </div>
    <div class="mt-2 sm:mt-20">
      <div class="w-40 flex flex-col text-center sm:text-left space-y-2">
        <div>
          <USkeleton class="h-5 w-full"/>
        </div>
        <div>
          <USkeleton class="h-4 w-full"/>
        </div>
      </div>
    </div>
  </div>
</template>