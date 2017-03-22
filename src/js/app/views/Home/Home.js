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

        setGround(materialName)
        {
            this.room.updateGround("/assets/materials/"+materialName);
        },

        setTV(materialName)
        {
            this.room.updateTV("/assets/materials/"+materialName);
        },

        setLion(materialName)
        {
            this.room.updateLion("/assets/materials/"+materialName);
        },

        setChair(materialName)
        {
            this.room.updateChair("/assets/materials/"+materialName);
        }

    }

}