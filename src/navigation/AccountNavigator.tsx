/* eslint-disable prettier/prettier */
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../Screens/Account/Account';
// import Dashboard from '../Dashboard/DashboardScreen';
import { AccountNavigationParamList, TabNavigationParamList } from './types';
const AccountStack = createStackNavigator<AccountNavigationParamList>();
type Props = {
    route: RouteProp<TabNavigationParamList,'AccountNavigation'>
}
const AccountNavigator: React.FC<Props> = ({route}:Props)=>{
    
    const {Navigator, Screen} = AccountStack;
    return (
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="AccountScreen" component={AccountScreen} />
        </Navigator>
    );
};
export default AccountNavigator;
