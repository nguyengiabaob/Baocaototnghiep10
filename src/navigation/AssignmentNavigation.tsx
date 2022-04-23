import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AssignmentScreen} from '../Screens/Assignment/AssignmentScreen';
import ListOption from '../Screens/Assignment/ListOption';
import {reponsiveheight} from '../theme/Metric';
import {AssignmentParamaList} from './types';
const AssigmentStack = createStackNavigator<AssignmentParamaList>();
const AssigmentNavigation: React.FC = () => {
  const {Navigator, Screen} = AssigmentStack;
  return (
    <Navigator  screenOptions={{headerShown: false}}>
      <Screen name="Assignment" component={AssignmentScreen} />
      <Screen
        name="ListGeneralTimeWork"
        component={ListOption}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#67bff3',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            height: reponsiveheight(60),
          },
          headerTitle: 'Danh sách Ca ',
          headerTitleStyle: {color: '#FFF'},
          headerTintColor: '#FFF',
        }}
      />
    </Navigator>
  );
};
export default AssigmentNavigation;
