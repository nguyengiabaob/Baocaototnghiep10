/* eslint-disable prettier/prettier */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Addproductscreen from '../Screens/Action/Addproduct';
import ProductScreen from '../Screens/Action/product';
import ListProductNavigator from './Listproductnavigation';
// import DashboardScreen from '../Dashboard/DashboardScreen';
// import Dashboard from '../Dashboard/DashboardScreen';
import {ProductNavigationPramaList} from './types';
const ProductStack = createStackNavigator<ProductNavigationPramaList>();
const ProductNavigator: React.FC = () => {
  const {Navigator, Screen} = ProductStack;
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {/* <Screen name="ProductScreen" component={ProductScreen} />
            <Screen name= "AddproductScreen" component={Addproductscreen}/> */}
      <Screen name="LisProductNavigation" component={ListProductNavigator} />
    </Navigator>
  );
};
export default ProductNavigator;
