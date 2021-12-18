/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AddExpenseManager } from '../Screens/ExpenseManager/AddExpenseManager';
import { ExpenseManagerScreen } from '../Screens/ExpenseManager/ExpenseManager';
import { UpdateExpenseManager } from '../Screens/ExpenseManager/UpdateExpenseManager';
import { reponsiveheight } from '../theme/Metric';
import { ExpenseParamList } from './types';
// import Dashboard from '../Dashboard/DashboardScreen';
const ExpenseManagerStack = createStackNavigator<ExpenseParamList>();
const  ExpesneManagerNavigator: React.FC = ()=>{
    const {Navigator, Screen} = ExpenseManagerStack;
    return (
        <Navigator screenOptions={{ headerShown:false}} mode={'modal'} headerMode={'screen'}>
            <Screen name="ExpenseMainScreen" component={ExpenseManagerScreen} options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:5, borderBottomRightRadius:5, height:reponsiveheight(60)} ,headerTitle:'Quản lý nguồn chi' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF',}}/>
            <Screen name="AddExpenseScreen"  options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:5, borderBottomRightRadius:5, height:reponsiveheight(60)} ,headerTitle:'Thêm nguồn chi' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF',}} component={AddExpenseManager}/>
            <Screen name="UpdateExpenseScreen"  options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:5, borderBottomRightRadius:5, height:reponsiveheight(60)} ,headerTitle:'Cập nhật nguồn chi' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF',}} component={UpdateExpenseManager}/>
        </Navigator>
    );
};
export default  ExpesneManagerNavigator