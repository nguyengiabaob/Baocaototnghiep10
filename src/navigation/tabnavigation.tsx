/* eslint-disable no-return-assign */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { Userdata } from '../Model/User';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { getUserName, selectAuth } from '../redux/reducer/authslice';
import AuthService from '../services/authService';
import data from '../services/data';
import AccountNavigator from './AccountNavigator';
import DashboardNavigator from './DashboardNavigation';
import { LoginstackParamList, TabNavigationParamList } from './types';
const CreateTabnavigator = createBottomTabNavigator<TabNavigationParamList>();
type Props = {
    route: RouteProp<LoginstackParamList,'TabNavigator'>
}
const TabNavigator: React.FC<Props> = ({ route}:Props)=>{
const {Navigator ,Screen} = CreateTabnavigator;
const [username, setusername] = useState<string|null>();
const [arrayuser,setarrayuser] = useState<Userdata[]>([]);
     return (
        <Navigator tabBarOptions={{activeBackgroundColor: 'white'}}>
            <Screen
            name="DashboardNavigation"
            component={DashboardNavigator}
            options={{
            title: 'Trang chủ',
           tabBarIcon: ()=>(
                <Icon name="home"  size={20}/>
            ),
        }}
             />
              <Screen name="AccountNavigation"
            component={AccountNavigator}
            options={{
            title: 'Tài khoản',
            tabBarIcon: ()=>(
                <Icon name="user"  size={20}/>
            ),
        }}
             />

        </Navigator>
    );
};
export default TabNavigator;
