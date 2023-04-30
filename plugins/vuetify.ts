// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        components,
        directives,
        display: {
            mobileBreakpoint: 'sm',
            thresholds: {
                xs: 0,
                sm: 400,
                md: 540,
                lg: 800,
                xl: 1280,
            },
        },
    })
    nuxtApp.vueApp.use(vuetify)
})
