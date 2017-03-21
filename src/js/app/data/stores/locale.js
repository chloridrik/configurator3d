import uiApi from '../api/locale';

export default {

    state: {
        data:{}
    },

    mutations: {
        _setLocale(state, payload) {
            state.data = payload;
        }
    },

    actions: {
        getLocale({commit}, payload){
            uiApi.getLocale().then((response) => {
                commit('_setLocale', response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
    },

    getters: {
    }

}