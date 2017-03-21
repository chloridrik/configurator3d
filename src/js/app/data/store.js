//
// VueJS
//

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//
// Modules
//
import locale from './stores/locale';

//
// Initialization
//
export default new Vuex.Store({

    modules: {
        locale
    }

});