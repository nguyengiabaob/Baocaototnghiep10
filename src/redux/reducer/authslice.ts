/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createSlice, PayloadAction} from '@reduxjs/toolkit';
// import React from 'react';
import { Userdata } from '../../Model/User';
import data from '../../services/data';
import DataService from '../../services/dataservice';
import { AppDispatch, AppThunk, Rootstate } from '../store';
export interface AuthState
{
  isLoggedIn?: boolean;
  isLogging?: boolean;
  errorMessages?: string ;
  userToken?: string| null;
  userName?: string;
  isLoggedGoogle?:boolean
  isLoggedFacebook?:boolean;
  typeUser? : number|undefined

}
const initialState : AuthState = {
    isLoggedIn: false,
    isLogging: false,
    errorMessages:'',
    userToken: null,
    userName: undefined,
    isLoggedGoogle:false,
    isLoggedFacebook:false,
    typeUser: undefined

};
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        updateStatus: (state, action: PayloadAction<AuthState>)=>{
            state.isLoggedIn  = action.payload.isLoggedIn;
            state.isLogging = action.payload.isLogging;
            state.errorMessages = action.payload.errorMessages;
            state.userToken = action.payload.userToken;
            state.userName = action.payload.userName;
            state.isLoggedFacebook = action.payload.isLoggedFacebook;
            state.isLoggedGoogle = action.payload.isLoggedGoogle;
            state.typeUser = action.payload.typeUser;
        },
        checkStatus: (state, action: PayloadAction<AuthState>)=>{
            state.isLoggedIn  = action.payload.isLoggedIn;
            state.isLogging = action.payload.isLogging;
        },
    },
});
export const {updateStatus, checkStatus} = authSlice.actions;
export const SigIn = (username: string , password: string): AppThunk => async (dispatch)=>
{
    // var data_fetch: Userdata[] = [];
    // data.getdata('user').then(async data_f=>{ 
    // for (let key in data_f)
    // { data_fetch.push({
    //     id: key,
    //     ...data_f[key],
    //   });
    // }
   let  data_fetch= await DataService.Getdata_dtService<Userdata>('user');
    let datauser = data_fetch.find((user)=>user.username === username && user.password == password);
    if (datauser !== undefined)
    {
       dispatch(
           updateStatus({isLoggedIn: true, isLogging:false, userToken:datauser.id, typeUser: datauser.type, userName:datauser.Name  })
       );
       try {
           await AsyncStorage.setItem('userToken',datauser.id);
           await AsyncStorage.setItem('username',datauser.Name);
       }
       catch (e) {
         console.log(e);
       }
    }
    else
    {
        dispatch(
            updateStatus({ isLogging:true  })
        );
    }
//   });
};
export const UpdatePermission = ():AppThunk =>async(dispatch,selector)=>{
    let  data_fetch = await DataService.Getdata_dtService<Userdata>('user');
    let datauser = data_fetch.find((user)=>user.id === selector().auth.userToken);
    console.log('type', datauser?.type)
    if (datauser?.type !== selector().auth.typeUser)
    {
        dispatch(requestLogout());
    }
};
export const requestLogout = ():AppThunk =>async(dispatch,selector)=>{
    // console.log(selector().auth.isLoggedGoogle);
    if (selector().auth.isLoggedGoogle === true)
    {
        await GoogleSignin.signOut();
    }
    else
    {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('username');
    }
    dispatch(
        updateStatus({isLoggedIn: false, isLogging:false, userToken:null ,userName:undefined,isLoggedGoogle: false , isLoggedFacebook: false, typeUser:undefined})
    );
};
export const checklogin =  ():AppThunk => async dispatch =>{
    var  usertoken = await AsyncStorage.getItem('userToken');
    if (usertoken != null)
    {
        let user= await DataService.Getdata_dtServiceById<Userdata>('user',usertoken);
        dispatch(
            updateStatus({isLoggedIn:true, isLogging:false,userToken: usertoken, typeUser:user.type, userName: user.Name})
        );
     }
     else
     {
        dispatch(
           checkStatus({isLoggedIn:false, isLogging:false})
        );
     }
    };
export const intialIsLogging = () :AppThunk => async dispatch =>{
    dispatch(updateStatus({isLogging: false}));
};

export const selectAuth = (state:Rootstate)=>state.auth;
export default authSlice.reducer;

