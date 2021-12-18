/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import React from 'react';
import { Userdata } from '../../Model/User';
import data from '../../services/data';
import { AppDispatch, AppThunk, Rootstate } from '../store';
export interface AuthState
{
  isLoggedIn?: boolean;
  isLogging?: boolean;
  errorMessages?: string ;
  userToken?: string| null;
  userName?: string;
  isLoggedGoogle?:boolean
  isLoggedFacebook?:boolean

}
const initialState : AuthState = {
    isLoggedIn: false,
    isLogging: false,
    errorMessages:'',
    userToken: null,
    userName: undefined,
    isLoggedGoogle:false,
    isLoggedFacebook:false,


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
        },
        checkStatus: (state, action: PayloadAction<AuthState>)=>{
            state.isLoggedIn  = action.payload.isLoggedIn;
            state.isLogging = action.payload.isLogging;
        },
    },
});
export const {updateStatus, checkStatus} = authSlice.actions;
export const SigIn = (username: string , password: string): AppThunk => async (dispatch: AppDispatch)=>
{
    var data_fetch: Userdata[] = [];
    data.getdata('user').then(async data_f=>{ 
    for (let key in data_f)
    { data_fetch.push({
        id: key,
        ...data_f[key],
      });
    }
    let datauser = data_fetch.find((user)=>user.username === username && user.password == password);
    if (datauser !== undefined)
    {
       dispatch(
           updateStatus({isLoggedIn: true, isLogging:false, userToken:datauser.id })
       );
       try {
           await AsyncStorage.setItem('userToken',datauser.id);
           await AsyncStorage.setItem('username',datauser.username);
       }
       catch (e) {
         console.log(e);
       }
    }
  });
};
export const requestLogout = ():AppThunk =>async(dispatch,selector)=>{
    console.log(selector().auth.isLoggedGoogle);
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
        updateStatus({isLoggedIn: false, isLogging:false, userToken:null ,userName:undefined,isLoggedGoogle: false , isLoggedFacebook: false})
    );
};
export const checklogin =  ():AppThunk => async dispatch =>{
    var  usertoken = await AsyncStorage.getItem('userToken');
    if (usertoken != null)
    {
        dispatch(
            updateStatus({isLoggedIn:true, isLogging:false,userToken: usertoken})
        );
     }
     else
     {
        dispatch(
           checkStatus({isLoggedIn:false, isLogging:true})
        );
     }
    };


export const selectAuth = (state:Rootstate)=>state.auth;
export default authSlice.reducer;

