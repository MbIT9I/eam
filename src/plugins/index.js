/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import apolloProvider from './apollo'
import { setupI18n, loadLocaleMessages } from './i18n'

const i18n = setupI18n({ locale: 'uk' })
loadLocaleMessages(i18n, 'uk')
loadLocaleMessages(i18n, 'en')


export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(apolloProvider)
    .use(i18n)
}
