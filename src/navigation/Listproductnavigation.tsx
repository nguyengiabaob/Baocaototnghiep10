/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Addproductscreen from '../Screens/Action/Addproduct';
// import Addproductscreen from '../Action/Addproduct';
import ListproductScreen from '../Screens/Action/ListproductScreen';
// import ProductScreen from '../Action/product';
import UpdateProductScreen from '../Screens/Action/updateProductScreen';
// import DashboardScreen from '../Dashboard/DashboardScreen';
// import Dashboard from '../Dashboard/DashboardScreen';
import { ListproductNavigationPramaList } from './types';
const ListProductStack = createStackNavigator<ListproductNavigationPramaList>();
const ListProductNavigator: React.FC = ()=>{
    const {Navigator, Screen} = ListProductStack;
    return (
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="ListProductScreen" component={ListproductScreen}/>
            <Screen name="UpdateProductScreen" component ={UpdateProductScreen}/>
            <Screen name= "AddproductScreen" component={Addproductscreen}/>
        </Navigator>
    );
};
export default ListProductNavigator;
