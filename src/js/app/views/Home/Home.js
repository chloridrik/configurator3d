import {Room} from './../../libs/room/Room';
export default {

    name: 'Home',

    components: [],

    mixins: [],

    data() {
        return {
            room:null,
        };
    },

    computed: {},

    mounted() {
        this.room = new Room(this.$el.querySelector('.renderCanvas'));

        window.addEventListener('resize', this.resize);
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resize);
    },

    methods: {
        resize()
        {
            this.room.updateSize();
        },

        setSky(index)
        {
            this.room.updateSkybox("/assets/textures/skybox/room"+index)
        },

        setGround(index)
        {
            var grounds = ["/assets/materials/wood0","/assets/materials/wood1"]
            this.room.updateGround(grounds[index]);
        }

    }

}