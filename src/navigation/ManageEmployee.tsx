/* eslint-disable prettier/prettier */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AssignmentScreen} from '../Screens/Assignment/AssignmentScreen';
import {TimeKeeping} from '../Screens/Wages/DoWages';
import Attendance from '../Staff/AtendanceScreen';
import CreatAccount from '../Staff/CreatAccountScreen';
// import ListStaffScreen from '../Staff/ListStaffScreen';
import ManageStaffScreen from '../Staff/ManageStaffScreen';
import {reponsiveheight} from '../theme/Metric';
import AssigmentNavigation from './AssignmentNavigation';
import AttendanceNavigator from './AttendanceNavigation';
import EmployeeInformationNavigator from './EmployeeInformation';
import {ManageEmployeePramaList} from './types';
import WagesNavigator from './WagesNavigation';
// import Dashboard from '../Dashboard/DashboardScreen';
const ManageEmployeeStack = createStackNavigator<ManageEmployeePramaList>();
const ManageEmployeeNavigator: React.FC = () => {
  const {Navigator, Screen} = ManageEmployeeStack;
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      mode={'modal'}
      headerMode={'screen'}>
      <Screen name="MainScreen" component={ManageStaffScreen} />
      <Screen
        name="EmployeeInformationParamList"
        component={EmployeeInformationNavigator}
      />
      <Screen
        name="CreateAccount"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Tạo tài khoản',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        component={CreatAccount}
      />
      <Screen
        name="AssignmentParamaList"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Lịch công trong tuần',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        component={AssigmentNavigation}
      />
      <Screen
        name="WagesParamaList"
        // options={{
        //   headerShown: true,
        //   headerStyle: {
        //     backgroundColor: '#67bff3',
        //     borderBottomLeftRadius: 15,
        //     borderBottomRightRadius: 15,
        //     height: reponsiveheight(55),
        //   },
        //   headerTitle: 'Chấm công',
        //   headerTitleStyle: {color: '#FFF'},
        //   headerTintColor: '#FFF',
        //   headerTitleAlign: 'center',
        // }}
        component={WagesNavigator}
      />
      <Screen name="AttendanceParamaList"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Điểm danh',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        component={AttendanceNavigator}/>
    </Navigator>
  );
};
export default ManageEmployeeNavigator;
