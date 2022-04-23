import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useEffect} from 'react';
// import Dashboard from '../Dashboard/DashboardScreen';
import LoginScreen from '../Screens/login/LoginScreen';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {checklogin, selectAuth} from '../redux/reducer/authslice';
// import DashboardNavigator from './DashboardNavigation';
import TabNavigator from './tabnavigation';
import {LoginstackParamList} from './types';
import {Register} from '../Screens/Register/Register';
import {ForgotPassword} from '../Screens/ForgotPassword/ForgotPassword';
import {AddStaffScreen} from '../Staff/AddStaff';
const LoginStack = createStackNavigator<LoginstackParamList>();
const LoginNavigator: React.FC = () => {
  const {isLoggedIn} = useAppSelector(selectAuth);
  const {userName} = useAppSelector(selectAuth);
  const {isLogging} = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checklogin());
  }, [dispatch]);
  console.log(isLoggedIn);
  const {Navigator, Screen} = LoginStack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn === true && userName ? (
        <Screen name="TabNavigator" component={TabNavigator} />
      ) : isLoggedIn === true && !userName ? (
        <Screen name="UpdateUserInformation" component={AddStaffScreen} />
      ) : (
        <Screen
          name="LoginScreen"
          component={LoginScreen}
      
        />
      )}
      <Screen name="RegisterScreen" component={Register} />
      <Screen name="ForgotPasswordSceen" component={ForgotPassword} />
    </Navigator>
  );
};
export default LoginNavigator;
