import {RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
// import ProductScreen from '../Action/product';
import DashboardScreen from '../Screens/Dashboard/DashboardScreen';
// import ListMaterial from '../Screens/Material/ListMaterial';
// import RoomScreen from '../Screens/Rooms/RoomScreen';
// import ManageStaffScreen from '../Staff/ManageStaffScreen';
import ChartNavigator from './CharNavigation';
import ExpesneManagerNavigator from './ExpenseManagerNavigation';
import ManageEmployeeNavigator from './ManageEmployee';
import MaterialManagerNavigator from './MaterialManagerNavigation';
import ProductNavigator from './ProductNavigation';
import RoomNavigator from './RoomsNavigation';
// import Dashboard from '../Dashboard/DashboardScreen';
import {TabNavigationParamList} from './types';
const DashboardStack = createStackNavigator();
type Props = {
  route: RouteProp<TabNavigationParamList, 'DashboardNavigation'>;
};
const DashboardNavigator: React.FC<Props> = ({route}: Props) => {
  const {Navigator, Screen} = DashboardStack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="DashboardScreen" component={DashboardScreen} />
      <Screen name="ProductNavigation" component={ProductNavigator} />
      <Screen name="RoomNavigation" component={RoomNavigator} />
      <Screen name="ManageStaff" component={ManageEmployeeNavigator} />
      <Screen name="ChartNavigation" component={ChartNavigator} />
      <Screen name="ExpenseManager" component={ExpesneManagerNavigator} />
      <Screen name="MaterialManager" component={MaterialManagerNavigator} />
    </Navigator>
  );
};
export default DashboardNavigator;
