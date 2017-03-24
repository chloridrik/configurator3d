export default {

    name: 'Editor',

    components: [],

    mixins: [],

    data() {
        return {
            editor:null
        };
    },

    computed: {},

    mounted() {
        this.editor = new Editor(this.$el.querySelector('.renderCanvas'));

        window.addEventListener('resize', this.resize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
    },

    methods: {

        resize()
        {
            this.editor.updateSize();
        },

    }

}