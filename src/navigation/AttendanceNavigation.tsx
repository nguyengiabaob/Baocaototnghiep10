import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import React from 'react';
import {AddStaffScreen} from '../Staff/AddStaff';
import Attendance from '../Staff/AtendanceScreen';
import ListStaffScreen from '../Staff/ListStaffScreen';
import AttendanceSettingScreen from '../Staff/AttendanceSettingScreen';
import {UserInformation} from '../Staff/UserInformation';
import {reponsiveheight} from '../theme/Metric';
import {AttendanceParamaList} from './types';
import AttendanceDetail from '../Staff/AttendanceDetail';
import AddLogAttendance from '../Staff/AddLogAttendance';
import AttendanceListUser from '../Staff/AttendanceList_User';
// import Dashboard from '../Dashboard/DashboardScreen';
const AttendanceStack = createStackNavigator<AttendanceParamaList>();
const AttendanceNavigator: React.FC = () => {
  const {Navigator, Screen} = AttendanceStack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        name="AttendanceScreen"
        component={Attendance}
        options={{
          headerShown: true,
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
      />
      <Screen
        name="AttendanceSettingScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Danh sách điểm danh',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        component={AttendanceSettingScreen}
      />
      <Screen
        name="AttendanceDetailScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Chi tiết điểm danh',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        component={AttendanceDetail}
      />
       <Screen
        name="AddAttedance"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Chi tiết điểm danh',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        component={AddLogAttendance}
      />
          <Screen
        name="AttendacneUser"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Thông tin điểm danh',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        component={AttendanceListUser}
      />
    </Navigator>
  );
};
export default AttendanceNavigator;
