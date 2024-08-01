import {config} from '@vue/test-utils'
import {createI18n} from 'vue-i18n'

import buttonEn from '~/i18n/en/button-en'
import fieldEn from '~/i18n/en/field-en'
import commonEn from '~/i18n/en/common-en'
import dialogEn from '~/i18n/en/dialog-en'
import notificationEn from '~/i18n/en/notification-en'
import pageEn from '~/i18n/en/page-en'

import buttonTr from '~/i18n/tr/button-tr'
import fieldTr from '~/i18n/tr/field-tr'
import commonTr from '~/i18n/tr/common-tr'
import dialogTr from '~/i18n/tr/dialog-tr'
import notificationTr from '~/i18n/tr/notification-tr'
import pageTr from '~/i18n/tr/page-tr'

const messageEn = {...buttonEn, ...fieldEn, commonEn, dialogEn, ...notificationEn, ...pageEn}
const messageTr = {...buttonTr, ...fieldTr, commonTr, dialogTr, ...notificationTr, ...pageTr}

export const i18nSetup = () => {
  const i18n = createI18n({messages: {en: {...messageEn}, tr: {...messageTr}}})
  config.global.plugins = [i18n]
}
