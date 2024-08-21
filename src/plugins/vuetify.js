/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import {
  VDataTable
} from "vuetify/components/VDataTable";
// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          // primary: '#1867C0',
          // secondary: '#5CBBF6',
          'secondary-darken-1': '#005a70'
        },
      },
      dark: {
        colors: {
          'secondary-darken-1': '#005a70'
        }
      }
    },
  },
  components: {
    VDataTable
  },
})
