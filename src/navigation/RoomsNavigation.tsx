/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BookTable } from '../Screens/Rooms/bookTable';
import { BookWater } from '../Screens/Rooms/BookWater';
import { EditRooms } from '../Screens/Rooms/EditRooms';
import RoomScreen from '../Screens/Rooms/RoomScreen';
import { TransferTable } from '../Screens/Rooms/TransferTable';
import { reponsiveheight } from '../theme/Metric';
// import Dashboard from '../Dashboard/DashboardScreen';
import LoginNavigator from './LoginNavigation';
import { RoomParamList, RootStackParamList } from './types';
const RoomStack = createStackNavigator<RoomParamList>();
const RoomNavigator: React.FC = ()=>{
    const {Navigator, Screen} = RoomStack;
    return (
        <Navigator screenOptions={{ headerShown:false}}>
            <Screen name="RoomScreen" component={RoomScreen}
             />
             <Screen name="callingWater" options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Gọi nước ' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}} component={BookWater} />
             <Screen name="SwapTable" options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Chuyển bàn ' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}} component={TransferTable}/>
             <Screen name="RoomEdit"options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Thông tin bàn ' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}}  component={EditRooms}/>
             <Screen name="BookTable"options={{headerShown: true, headerStyle:{backgroundColor:'#67bff3', borderBottomLeftRadius:15, borderBottomRightRadius:15, height:reponsiveheight(55)} ,headerTitle:'Đặt bàn ' , headerTitleStyle:{color:'#FFF'},headerTintColor:'#FFF', headerTitleAlign:'center'}}  component={BookTable}/>
        </Navigator>
    );
};
export default RoomNavigator;
