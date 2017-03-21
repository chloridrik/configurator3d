<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

    import Vue from 'vue';
    import locale from './mixins/locale';

    Vue.mixin(locale);

    export default {

        name: 'App',

        data() {
            return {
            };
        },

        created:function(){
            this.$store.dispatch('getLocale');
        },

        mounted() {
            console.log('App is mounted');
        }

    }
</script>