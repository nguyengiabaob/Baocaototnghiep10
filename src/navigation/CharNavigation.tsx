/* eslint-disable prettier/prettier */
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AccountScreen from '../Screens/Account/Account';
import { ChartScreen } from '../Screens/Chart/ChartScreen';
import { reponsiveheight } from '../theme/Metric';
// import Dashboard from '../Dashboard/DashboardScreen';
import { AccountNavigationParamList, ChartParamList, TabNavigationParamList } from './types';
const ChartStack = createStackNavigator<ChartParamList>();
type Props = {
    route: RouteProp<TabNavigationParamList,'AccountNavigation'>
}
const ChartNavigator: React.FC<Props> = ({route}:Props)=>{
    
    const {Navigator, Screen} = ChartStack;
    return (
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="ChartScreen" component={ChartScreen} options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:5, borderBottomRightRadius:5, height:reponsiveheight(60)} ,headerTitle:'Thống kê' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF',}}   />
        </Navigator>
    );
};
export default ChartNavigator;