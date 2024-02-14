import {TranslationConfig} from "~/types/index";

export interface PageConfig {
    title: TranslationConfig,
    description: TranslationConfig,
    path: string
}

export const PAGES = {
    HOME: {title: {key: 'common.Home'}, description: {key: 'page.home.description'}, path: '/'} as PageConfig,
    LOGIN: {title: {key: 'common.Login'}, description: {key: 'page.login.description'}, path: '/login'} as PageConfig,
    REGISTER: {
        title: {key: 'common.Register'},
        description: {key: 'page.register.description'},
        path: '/register'
    } as PageConfig,
    AUTH_ACTION: {
        title: {key: 'page.auth.title'},
        description: {key: 'page.home.description'},
        path: '/auth/action'
    } as PageConfig,
    FORGOT_PASSWORD: {
        title: {key: 'common.ForgotPassword'},
        description: {key: 'page.forgotPassword.description'},
        path: '/auth/forgot-password'
    } as PageConfig,
    RESET_PASSWORD: {
        title: {key: 'common.ResetPassword'},
        description: {key: 'page.resetPassword.description'},
        path: '/auth/reset-password'
    } as PageConfig,
    VERIFY_EMAIL: {title: {key: 'NA'}, description: {key: 'NA'}, path: '/auth/verify-email'} as PageConfig
}

export const AUTHENTICATED_NOT_ALLOWED_ROUTES = [
    PAGES.LOGIN.path, PAGES.LOGIN.path + '/',
    PAGES.REGISTER.path, PAGES.REGISTER.path + '/',
    PAGES.AUTH_ACTION.path, PAGES.AUTH_ACTION.path + '/',
    PAGES.RESET_PASSWORD.path, PAGES.RESET_PASSWORD.path + '/',
    PAGES.FORGOT_PASSWORD.path, PAGES.FORGOT_PASSWORD.path + '/',
    PAGES.VERIFY_EMAIL.path, PAGES.VERIFY_EMAIL.path + '/',
]