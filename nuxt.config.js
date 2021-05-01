import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3000, // default: 3000
    // proxy: 'http://localhost/'
    host: '0.0.0.0', // default: localhost,
    // timing: false
  },
  ssr: false, // Disable Server Side rendering
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - GetMonta',
    title: 'GetMonta',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        type: 'text/javascript',
        // src: 'MathJax.js',
        src: 'https://www.monta.ir/mathjax/MathJax.js?config=TeX-AMS_HTML-full&locale=fa',
        // src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML',
        // src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_CHTML',
        async: true
      },
      // {
      //   type: 'text/javascript',
      //   src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js',
      //   async: true
      // },
      // {
      //   type: 'text/javascript',
      //   src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js',
      //   async: true
      // }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    { src: 'katex/dist/katex.css', lang: 'css' },
    { src: 'github-markdown-css/github-markdown.css' },
    { src: '~/assets/markdownKatex.scss', lang: 'scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/mathjax.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    rtl: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    retry: { retries: 3 }, // By default, number of retries will be 3 times, if retry value is set to true. You can change it by passing the option with an inline retries sub-option
    // baseURL: 'https://www.monta.ir',
    debug: true,
    proxyHeaders: true, // In SSR context, this options sets client requests headers as default headers for the axios requests. NOTE: CloudFlare's CDN => set this to false
    proxy: true, // Can be also an object with default options
    progress: true, // This option shows a loading bar while making requests integrating Nuxt.js progress bar (see "loading" options in config.nuxt.js).
    headers: {
      common: {
        Host: 'www.monta.ir',
        Connection: 'keep-alive',
        'Content-Type': 'application/json; charset=UTF-8',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'sec-ch-ua-mobile': '?0',
        Origin: 'https://www.monta.ir',
        Referer: 'https://www.monta.ir/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8',
        'Accept': '*/*'
      },
      delete: {},
      get: {},
      head: {},
      post: {},
      put: {},
      patch: {}
    },
    // credentials: true // this says that in the request the httponly cookie should be sent
  },
  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: 'https://www.monta.ir'
  //   }
  // },
  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: 'https://www.monta.ir'
  //   }
  // },
  proxy: {
    // '/aaa/': 'http://localhost/api/'
    '/monta/': {
      target: 'https://www.monta.ir/',
      pathRewrite: {
        '^/monta': ''
      },
      changeOrigin: true
    }
    // '/login/': {
    //   target: 'http://localhost/login/',
    //   pathRewrite: {
    //     '^/login': ''
    //   },
    //   changeOrigin: true
    // }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
