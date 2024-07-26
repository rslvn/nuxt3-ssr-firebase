const separatedChunks = ['@firebase']
// https://nuxt.com/docs/api/configuration/nuxt-config
const ONE_DAY = 60 * 60 * 24 * 1000
const ONE_WEEK = ONE_DAY * 7
export default defineNuxtConfig({
  ssr: true,

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/ui',
    'nuxt-gtag',
    '@nuxtjs/sitemap',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],

  extends: ['@nuxt/ui-pro'],

  ui: {
    icons: ['heroicons', 'simple-icons', 'emojione'],
  },

  colorMode: {
    preference: 'system',
  },

  gtag: {
    id: 'G-2KY53M5NEN',
  },

  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    // private config
    serviceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    // public config
    public: {
      appName: 'nuxt3-ssr-firebase',
      authCookieName: '__session',
      authCookieExpires: parseInt(ONE_WEEK.toString(), 10),
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  },

  eslint: {
    config: {
      stylistic: true,
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
    dirs: ['stores'],
  },

  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        flag: '🇬🇧',
        files: [
          'en/button-en.ts',
          'en/common-en.ts',
          'en/field-en.ts',
          'en/notification-en.ts',
          'en/page-en.ts',
          'en/dialog-en.ts',
        ],
      },
      {
        name: 'Turkce',
        code: 'tr',
        iso: 'tr-US',
        flag: '🇹🇷',
        files: [
          'tr/button-tr.ts',
          'tr/common-tr.ts',
          'tr/field-tr.ts',
          'tr/notification-tr.ts',
          'tr/page-tr.ts',
          'tr/dialog-tr.ts',
        ],
      },
    ],
    defaultLocale: 'en',
    langDir: './i18n/',
    lazy: true,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions:
                {
                  strictNullChecks: false,
                  verbatimModuleSyntax: false,
                },
    },
  },

  postcss: {
    plugins: {
      'tailwindcss/nesting': 'postcss-nesting',
      'tailwindcss': {},
      'autoprefixer': {},
      ...(process.env.NODE_ENV === 'production'
        ? {
            cssnano: {
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                },
              ],
            },
          }
        : {}),
    },
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            const separateModule = separatedChunks.find(module => id.includes(module))
            if (separateModule) return separateModule
          },
        },
      },
    },
    optimizeDeps: {
      exclude: separatedChunks,
    },
  },

  compatibilityDate: '2024-07-24',
})
