/* eslint-disable prettier/prettier */
import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://drinkshopmanager-default-rtdb.firebaseio.com/',
});
export default instance;
