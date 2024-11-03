import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vuetify/styles/main.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import { router } from "./router";
import { createPinia } from "pinia";
import withUUID from "vue-uuid";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(pinia).use(router).use(vuetify).use(withUUID).mount("#app");
