export default {

    methods: {
        i18n(key) {
            var res = this.__pathIndex(this.$store.state.locale.data, key);
            return (res === undefined) ? '[' + key + ']' : res;
        },
        __multiIndex(obj, is) {
            return is.length ? this.__multiIndex(obj ? obj[is[0]] : undefined, is.slice(1)) : obj
        },
        __pathIndex(obj, is) {
            return this.__multiIndex(obj, is.split('.'))
        }
    }

}