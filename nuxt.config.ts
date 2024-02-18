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
        '@nuxtjs/robots'
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
            // databaseURL:
            //     'https://nuxt-vuefire-example-blaze-default-rtdb.firebaseio.com',
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
    },
    sitemap: {
        sources: ['/api/sitemap'],
        xsl: false,
        exclude: ['/auth/**', 'register'],
    },
    nitro: {
        preset: 'firebase',

        // for the upcoming preset
        firebase: {
            gen: 2,
            nodeVersion: '18',
        },
    },
    imports: {
        dirs: ['stores']
    },
    runtimeConfig: {
        // Keys within public are also exposed client-side
        public: {
            url: process.env.WEBSITE_URL || 'http://localhost:3000',
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
                    'tr/common-tr.ts'
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
    vite: {
        build: {
            minify: 'terser',
            rollupOptions: {
                output: {
                    // target ~250KB per chunk in an ideal world
                    experimentalMinChunkSize: 250 * 1024,
                    // manualChunks: (id, _) => {
                    //
                    //     // need to avoid touching non-entrypoint files, otherwise it breaks bundling
                    //     // because imports aren't idempotent
                    //     if (
                    //         !id.includes("node_modules") &&
                    //         !id.startsWith("virtual:") &&
                    //         !id.includes("src") &&
                    //         !id.includes("assets")
                    //     ) {
                    //         // merge pages/foo/* as chunk-pg-foo, pages/bar/* as chunk-pg-bar, etc.
                    //         // then merge pages/* (ie no subfolder) into chunk-pg-misc
                    //         if (id.includes("pages")) {
                    //             const parts = id.split("/");
                    //             const folderIndex = parts.indexOf("pages");
                    //             if (folderIndex + 2 < parts.length) {
                    //                 const pageGroup = parts[folderIndex + 1];
                    //                 return `chunk-pg-${pageGroup}`;
                    //             }
                    //             return "chunk-pg-misc";
                    //         }
                    //     }
                    // },
                },
            },
        },
    }

})
