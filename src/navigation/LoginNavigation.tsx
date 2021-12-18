/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useEffect } from 'react';
// import Dashboard from '../Dashboard/DashboardScreen';
import LoginScreen from '../Screens/login/LoginScreen';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { checklogin, selectAuth } from '../redux/reducer/authslice';
// import DashboardNavigator from './DashboardNavigation';
import TabNavigator from './tabnavigation';
import { LoginstackParamList } from './types';
import { Register } from '../Screens/Register/Register';
import { ForgotPassword } from '../Screens/ForgotPassword/ForgotPassword';
const LoginStack = createStackNavigator<LoginstackParamList>();
const LoginNavigator: React.FC = ()=>{
    const {isLoggedIn} = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();
    useEffect(()=>{
      dispatch(
          checklogin()
      );
    },[dispatch]);
    console.log(isLoggedIn);
    const {Navigator, Screen} = LoginStack;
    return (
        <Navigator screenOptions={{ headerShown:false}}>
            { isLoggedIn ? <Screen name="TabNavigator" component={TabNavigator}/> :  <Screen name="LoginScreen" component={LoginScreen} />}
            <Screen name="RegisterScreen" component={Register}></Screen>
            <Screen name="ForgotPasswordSceen" component={ForgotPassword}></Screen>
        </Navigator>
    );
};
export default LoginNavigator;
