import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import Vuex from 'vuex'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(ViewUIPlus)
  .use(Vuex)
  .use(VCalendar, {})
  .mount('#app')

  

