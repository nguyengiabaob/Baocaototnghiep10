import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddMaterial from '../Screens/Material/AddMaterial';
import ListMaterial from '../Screens/Material/ListMaterial';
import UpdateMaterial from '../Screens/Material/UpdateMaterial';
import {reponsiveheight} from '../theme/Metric';
import {MaterialParamList} from './types';

// import Dashboard from '../Dashboard/DashboardScreen';
const MaterialManagerStack = createStackNavigator<MaterialParamList>();
const MaterialManagerNavigator: React.FC = () => {
  const {Navigator, Screen} = MaterialManagerStack;
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      mode={'modal'}
      headerMode={'screen'}>
      <Screen
        name="ListMaterialScreen"
        component={ListMaterial}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            height: reponsiveheight(60),
          },
          headerTitle: 'Quản lý kho',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
        }}
      />
      <Screen
        name="AddMaterialScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            height: reponsiveheight(60),
          },
          headerTitle: 'Thêm kho',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
        }}
        component={AddMaterial}
      />
      <Screen
        name="UpdateMaterialScreen"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            height: reponsiveheight(60),
          },
          headerTitle: 'Cập nhật kho',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
        }}
        component={UpdateMaterial}
      />
    </Navigator>
  );
};
export default MaterialManagerNavigator;
