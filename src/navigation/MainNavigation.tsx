/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import Dashboard from '../Dashboard/DashboardScreen';
import LoginNavigator from './LoginNavigation';
import { RootStackParamList } from './types';
const RootStack = createStackNavigator<RootStackParamList>();
const RootNavigator: React.FC = ()=>{
    const {Navigator, Screen} = RootStack;
    return (
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="Main" component={LoginNavigator}
             />
        </Navigator>
    );
};
export default RootNavigator;
