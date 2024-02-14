<script setup>
import {PAGES} from "~/types";

const {seoMetaInputByPageConfig} = useAppSeoMeta()
useSeoMeta(seoMetaInputByPageConfig(PAGES.HOME))
const user = useCurrentUser()
</script>

<template>
  <div>
    <UContainer class="mt-5">
      <h1>Welcome tangowall home</h1>
<!--      <pre v-if="user">{{ user }}</pre>-->
    </UContainer>
  </div>
</template>
