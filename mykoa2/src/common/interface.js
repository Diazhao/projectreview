import axios from 'axios';

const interfaces = {
    getImageList(){
        return axios.get('/image');
    }
}

export default interfaces;