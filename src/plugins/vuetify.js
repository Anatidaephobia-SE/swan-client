import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: false,
      light: {
        primary: colors.blue.base,
        secondary: colors.amber.base,
        accent: colors.indigo.base,
        info: colors.green.darken3,
        error: colors.red.darken2,
        success: colors.green.base
      }
    }
  }
});
