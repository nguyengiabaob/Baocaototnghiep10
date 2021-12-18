/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Userdata } from "../Model/User";
import data from "./data";
import '@react-native-firebase/app'


class AuthService {
     static async getuserid()
    {
        var userID = await AsyncStorage.getItem('userToken');
        return userID;
    }
    static async getusername()
    {
        var userName = await AsyncStorage.getItem('username');
        return userName;
    }
}

export default AuthService;