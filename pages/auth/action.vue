<script setup lang="ts">
import {PAGES} from '~/types'

definePageMeta({
  middleware: ['authenticated-not-allowed'],
})

const {t} = useI18n()
const route = useRoute()
const mode = route.query.mode

switch (mode) {
  case 'resetPassword':
    navigateTo({path: PAGES.RESET_PASSWORD.path, query: route.query})
    break
  case 'verifyEmail':
    navigateTo({path: PAGES.VERIFY_EMAIL.path, query: route.query})
    break
  case 'recoverEmail':
    console.log('>>>>> recoverEmail')
    break

  default:
    throw createError({statusCode: 404, statusMessage: t('page.notFound'), fatal: true})
}
</script>