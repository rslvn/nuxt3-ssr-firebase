<script setup>
import {PAGES} from "~/types";

const {seoMetaInputByPageConfig} = useAppSeoMeta()
useSeoMeta(seoMetaInputByPageConfig(PAGES.HOME))
</script>

<template>
  <div>
    <UContainer class="mt-5">
      <h1>Welcome Nuxt3 SSR Firebase</h1>
    </UContainer>
  </div>
</template>
