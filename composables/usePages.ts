import { PageConfig } from '~/types'

export default function () {
  const PAGES = {
    HOME: { title: { key: 'common.Home' }, description: { key: 'page.home.description' }, path: '/' } as PageConfig,
    LOGIN: { title: { key: 'common.Login' }, description: { key: 'page.login.description' }, path: '/login' } as PageConfig,
    REGISTER: {
      title: { key: 'common.Register' },
      description: { key: 'page.register.description' },
      path: '/register'
    } as PageConfig,
    TERMS: {
      title: { key: 'page.terms.title' },
      description: { key: 'page.terms.description' },
      path: '/terms'
    } as PageConfig,
    PRIVACY_AND_POLICY: {
      title: { key: 'page.privacyAndPolicy.title' },
      description: { key: 'page.privacyAndPolicy.description' },
      path: '/privacy-policy'
    } as PageConfig,
    AUTH_ACTION: {
      title: { key: 'page.auth.title' },
      description: { key: 'page.home.description' },
      path: '/auth/action'
    } as PageConfig,
    FORGOT_PASSWORD: {
      title: { key: 'common.ForgotPassword' },
      description: { key: 'page.forgotPassword.description' },
      path: '/auth/forgot-password'
    } as PageConfig,
    RESET_PASSWORD: {
      title: { key: 'common.ResetPassword' },
      description: { key: 'page.resetPassword.description' },
      path: '/auth/reset-password'
    } as PageConfig,
    VERIFY_EMAIL: { title: { key: 'NA' }, description: { key: 'NA' }, path: '/auth/verify-email' } as PageConfig,
    PROFILE: { title: { key: 'NA' }, description: { key: 'NA' }, path: '/profile/:username', pathParams: { username: ':username' } },
    PROFILE_SETTINGS: { title: { key: 'NA' }, description: { key: 'NA' }, path: '/profile/:username/settings', pathParams: { username: ':username' } },
    PROFILE_SETTINGS_ACCOUNT: { title: { key: 'NA' }, description: { key: 'NA' }, path: '/profile/:username/settings/account', pathParams: { username: ':username' } },
  }

  const AUTHENTICATED_NOT_ALLOWED_ROUTES = [
    PAGES.LOGIN.path, PAGES.LOGIN.path + '/',
    PAGES.REGISTER.path, PAGES.REGISTER.path + '/',
    PAGES.RESET_PASSWORD.path, PAGES.RESET_PASSWORD.path + '/',
    PAGES.FORGOT_PASSWORD.path, PAGES.FORGOT_PASSWORD.path + '/'
  ]

  const authenticatedUserNotAllowed = (path: string) => {
    return AUTHENTICATED_NOT_ALLOWED_ROUTES.includes(path)
  }

  const authenticatedUserAllowed = (path: string) => {
    return !authenticatedUserNotAllowed(path)
  }

  const getProfilePath = (username: string) => {
    return PAGES.PROFILE.path.replace(PAGES.PROFILE.pathParams.username, username)
  }

  const getProfileSettingsPath = (username: string) => {
    return PAGES.PROFILE_SETTINGS.path.replace(PAGES.PROFILE_SETTINGS.pathParams.username, username)
  }

  const getProfileAccountSettingsPath = (username: string) => {
    return PAGES.PROFILE_SETTINGS_ACCOUNT.path.replace(PAGES.PROFILE_SETTINGS_ACCOUNT.pathParams.username, username)
  }

  return {
    PAGES,
    authenticatedUserAllowed,
    authenticatedUserNotAllowed,
    getProfilePath,
    getProfileSettingsPath,
    getProfileAccountSettingsPath
  }
}
