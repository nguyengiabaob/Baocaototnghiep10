/* eslint-disable prettier/prettier */
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import React from 'react';
import { AddStaffScreen } from '../Staff/AddStaff';
import Attendance from '../Staff/AtendanceScreen';
import ListStaffScreen from '../Staff/ListStaffScreen';
import { UserInformation } from '../Staff/UserInformation';
import { reponsiveheight } from '../theme/Metric';
import { EmployeeInformationParamList } from './types';
// import Dashboard from '../Dashboard/DashboardScreen';
const EmployeeInformationStack = createStackNavigator< EmployeeInformationParamList>();
const  EmployeeInformationNavigator: React.FC = ()=>{
    const {Navigator, Screen} = EmployeeInformationStack;
    return (
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="ListStaffScreen" component={ListStaffScreen} options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Danh sách nhân viên' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}}/>
            <Screen name="UserInformation" options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Thông tin nhân viên' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}} component={UserInformation}/>
            <Screen name="AddstaffScreen" options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Thêm nhân viên' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}} component={AddStaffScreen}/>
            <Screen name="AttendanceScreen" options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Điểm danh' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}} component={Attendance}/>
        </Navigator>
    );
};
export default  EmployeeInformationNavigator;