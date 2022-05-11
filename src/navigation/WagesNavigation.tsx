import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DetailLog from '../Screens/Wages/DetailLog';
import {TimeKeeping} from '../Screens/Wages/DoWages';
import ListLogScreen from '../Screens/Wages/ListLogScreeen';

import WageDetail from '../Screens/Wages/WagesDetail';
import AttendanceDetail from '../Staff/AttendanceDetail';
import {reponsiveheight} from '../theme/Metric';
import {WagesParamaList} from './types';
const WagesNavigator: React.FC = () => {
  const wagesStack = createStackNavigator<WagesParamaList>();
  const {Navigator, Screen} = wagesStack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Chấm công ',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
        name="WagesScreen"
        component={TimeKeeping}
      />
      <Screen
        name="WagesDetail"
        component={WageDetail}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: reponsiveheight(55),
          },
          headerTitle: 'Chi tiết chấm công ',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
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
        component={DetailLog}
      />
      <Screen
        name="LisLogScreen"
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
        component={ListLogScreen}
      />
    </Navigator>
  );
};
export default WagesNavigator;
