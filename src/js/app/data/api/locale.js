import Axios from 'axios';

export default {

    getLocale(){
        return Axios.get('assets/data/locale.json');
    }

}