const separatedChunks = ['vuefire', '@firebase'];
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate']
            }
        ],
        '@nuxtjs/i18n',
        'nuxt-vuefire',
        '@nuxt/ui',
        'nuxt-gtag',
        '@nuxtjs/sitemap',
        // 'nuxt-purgecss'
    ],
    extends: ['@nuxt/ui-pro'],
    ui: {
        icons: ['heroicons', 'simple-icons', 'emojione']
    },
    gtag: {
        id: 'G-VWMF1MJ0W2'
    },
    components: [
        {
            path: '~/components', // will get any components nested in let's say /components/test too
            pathPrefix: false,
        },
    ],
    vuefire: {
        emulators: {
            // uncomment this line to run the application in production mode without emulators during dev
            // enabled: false,
            auth: {
                options: {
                    disableWarnings: true,
                },
            },
        },
        auth: {
            enabled: true,
            // enables the sessionCookie
            sessionCookie: true
        },

        // appCheck: {
        //     provider: 'ReCaptchaV3',
        //     // site key, NOT secret key
        //     key: '6LeS5q0nAAAAABH3u13ntLwuIOkiNjHlXJOXoN5T',
        //     isTokenAutoRefreshEnabled: true,
        // },
        config: {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            // appId: process.env.FIREBASE_APP_ID,
            // measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
    },
    sitemap: {
        sources: ['/api/sitemap'],
        xsl: false,
        exclude: ['/auth/**', 'register'],
    },
    nitro: {
        preset: 'firebase',
        compressPublicAssets: true,
        // for the upcoming preset
        firebase: {
            gen: 2,
            nodeVersion: '20',
        },
    },
    imports: {
        dirs: ['stores']
    },
    runtimeConfig: {
        // Keys within public are also exposed client-side
        public: {
            url: process.env.WEBSITE_URL || 'http://localhost:3000',
            appName: 'nuxt3-ssr-firebase'
        }
    },
    i18n: {
        locales: [
            {
                name: 'English',
                code: 'en',
                iso: 'en-US',
                icon: 'i-emojione-flag-england',
                files: [
                    'en/common-en.ts',
                    'en/field-en.ts',
                    'en/notification-en.ts',
                    'en/page-en.ts',
                ],
            },
            {
                name: 'Turkce',
                code: 'tr',
                iso: 'tr-US',
                icon: 'i-emojione-flag-for-turkey',
                files: [
                    'tr/common-tr.ts',
                    'tr/field-tr.ts',
                    'tr/notification-tr.ts',
                    'tr/page-tr.ts',
                ],
            }
        ],
        defaultLocale: 'en',
        langDir: './i18n/',
        lazy: true,
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',  // recommended
        },
        // seo: true,
        baseUrl: process.env.WEBSITE_URL || 'http://localhost:3000',
    },
    typescript: {
        tsConfig: {
            compilerOptions:
                {
                    strictNullChecks: false,
                    verbatimModuleSyntax: false
                }
        }
    },
    postcss: {
        plugins: {
            'tailwindcss/nesting': 'postcss-nesting',
            tailwindcss: {},
            autoprefixer: {},
            ...(process.env.NODE_ENV === 'production' ? {cssnano: {}} : {})
        }
    },
    vite: {
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id: any) {
                        const separateModule = separatedChunks.find(module => id.includes(module));
                        if (separateModule) return separateModule;
                    }
                }
            },
        },
        optimizeDeps: {
            exclude: separatedChunks
        }
    },
})
