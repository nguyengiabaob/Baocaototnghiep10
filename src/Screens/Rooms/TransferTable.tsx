/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { RouteProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Overlay, Text } from 'react-native-elements';
import { Table } from '../../Model/Table';
import { RoomParamList, RootStackParamList } from '../../navigation/types';
import data from '../../services/data';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomBoxItem from '../../Model/CustomBoxItem';
import { CustomNotification } from '../../Model/CustomNofication';
import WarningIcon from '../../asset/svg/Warning.svg';
import BellNofi from '../../asset/svg/bellnotification.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database'
type props ={
    navigation: StackNavigationProp<RoomParamList,'SwapTable'>
    route: RouteProp<RoomParamList,'SwapTable'>
}
export const TransferTable:React.FC<props> =({route,navigation})=>{
const {id} = route.params;
const [dataTable, setdatatble]= useState<Table[]>([]);
const [TableSelected, setTableSelected]= useState<Table>();
const [Visible, setVisible]= useState<boolean>(false);
const [table,setTable]= useState<Table>();
const [BillTable,setBillTable]= useState<any[]>([]);
const [BookTable,setBookTable]= useState<any[]>([]);
const [VisibleNotifi, setVisibleNotifi]= useState<boolean>(false);
const [VisibleNotifiSuccess, setVisibleNotifiSuccess]= useState<boolean>(false);
const [reload,setReload]= useState<boolean>(false);
const getTable= useCallback(async()=>{
      // let datarray :any[] = [];
      // data.getdata('Table').then(res=> {for ( let key in res)
      // {
      //     if (key !== '0')
      //     {
      //     datarray.push(
      //         {
      //             id: key,
      //             ...res[key],
      //         }
      //     );
      //     }
      // }
     let datarray= await  DataService.Getdata_dtService<Table>('Table')
      datarray.forEach(item=> {
        if (item.id === id)
        {
            setTable(item);
        }
      setdatatble(datarray);
  });
},[id]);
useEffect(()=>{
    getTable();
},[getTable]);
const cancelModal=()=>
{
  setVisibleNotifi(false);
}
const checkExistBill =async() =>{
  let c= await DataService.Getdata_dtService<any>('Bill');
  // data.getdata('Bill').then(res=>{
  //   var dataArray: any[]= [];
  //   for (let key in res)
  //   {
  //     dataArray.push({
  //       id: key,
  //       ...res[key],
  //     })
  //   }
    setBillTable(c);
  

}
const checkBookTable =async() =>{
  let dataArray = await DataService.Getdata_dtService('BookTable') 
  // data.getdata('BookTable').then(res=>{
  //   var dataArray: any[]= [];
  //   for (let key in res)
  //   {
  //     dataArray.push({
  //       id: key,
  //       ...res[key],
  //     })
  //   }
  setBookTable(dataArray);
  
  // })
}
useEffect(()=>{
  dataTable().ref('/Table').on('child-changed',()=>{
      setReload(prev=> !prev);
  })
})
useEffect(()=>{
  checkExistBill();
  checkBookTable();
},[reload])
const TransferTable =() =>{
   if (table?.Status === 0 )
   {
      setVisibleNotifi(true);
   }
   else
   {
     if (TableSelected)
     {
       var check =false;
      data.UpdateTable(TableSelected?.Name,TableSelected?.id,TableSelected?.Type,TableSelected?.Slots,1).catch(e=>{ check= true});
      if (BillTable.filter(item=> item.TableID === table?.id && item.Status === 0).length > 0)
      {
        var bill= BillTable.filter(item=> item.TableID === table?.id && item.Status === 0)
        data.UpdateBill(bill[0].id,bill[0].Total, bill[0].billID,bill[0].createrID,bill[0].Status,TableSelected.id,bill[0].CreateDate).catch(e=> {check= true});
      }
      if (BookTable.filter(item=>item.TableID === table?.id && item.Status === 0 ).length > 0)
      {
        var btable= BookTable.filter(item=>item.TableID === table?.id && item.Status === 0 );
        data.UpdateBookTable(btable[0].id,btable[0].CustomerName, btable[0].BookDate, btable[0].BookTime,btable[0].Slots,TableSelected?.id, btable[0].Status).catch(e=> {check= true});
      }
      if(table)
        data.UpdateTable(table?.Name, table?.id, table?.Type, table?.Slots,0).catch(e=> {check= true});

      if(check ==false)
      {
        setVisibleNotifiSuccess(true);
      }
      
      }
    
   }
}
    return (
        <View style={{flex:1, marginTop:25}}>
            <View style={{justifyContent:'center', alignItems:'center' }}>
                <Text style={{fontSize:18,fontWeight:'700'}}>Thông tin Chuyển bàn</Text>
            </View>
            <View style={{marginTop:35, marginLeft:25}}>
                <View>
                    <Text style={{fontWeight:'700', fontSize:16}}>Bàn Chuyển đi :</Text>

                </View>
                <TouchableOpacity disabled={true} style={{marginTop:20, alignItems:'center', backgroundColor:'#c5c2c2', width:reponsivewidth(310),alignSelf:'center',padding:10}}>
                <Text>{table?.Name}</Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:35}}>
                    <Entypo name="swap" color={'#02569E'} size={35}/>
            </View>
            <View style={{marginTop:25, marginLeft:25}}>
                <View>
                    <Text style={{fontWeight:'700', fontSize:16}}>Bàn Chuyển đến :</Text>

                </View>
                <TouchableOpacity onPress={()=>setVisible(true)} style={{marginTop:20, alignItems:'center', backgroundColor:'#ffffff', width:reponsivewidth(310),alignSelf:'center',padding:10, borderColor:'#9b9b9b', borderWidth:0.4}}>
                <Text>{TableSelected ? TableSelected.Name : 'Chọn bàn'}</Text>
                </TouchableOpacity>
                
            </View>
            <TouchableOpacity onPress={()=>{TransferTable()}}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center', alignSelf:'center',borderRadius:4, marginTop:80}}>
            <Text style={{color:'#FFFF'}}>
              Chuyển 
            </Text>
          </TouchableOpacity>
          <Overlay isVisible={Visible}>
          <View style={{width:reponsivewidth(320), height: reponsiveheight(360)}}>
      <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
      <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Khu vực</Text>

      </View>
      <View style={{height:reponsiveheight(250) }}>
        <ScrollView>
          {
            dataTable.filter(item=> item.id !== id && item.Status === 0).map(item=>{
              return (
                <TouchableOpacity key={item.id} onPress={()=>{setTableSelected(item); setVisible(false)}} style={{width:reponsivewidth(320), alignSelf:'center'}}>
                     <CustomBoxItem Style={{backgroundColor:'#e3e2e287',borderColor:'#6666667d', borderWidth:0.45, borderRadius:0}} title={item.Name}/>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </View>
      <View style={{alignItems:'center', marginTop:25}}>
          <TouchableOpacity onPress={()=>{setVisible(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}} ><Text style={{color:'#FFFF'}}>Thoát</Text></TouchableOpacity>
      </View>
      </View>
          </Overlay>
          <CustomNotification visible={VisibleNotifiSuccess} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  onCancel={()=>{setVisibleNotifiSuccess(false); navigation.goBack();}  } Content="Bạn đã chuyển bàn thành công !"/>
          <CustomNotification visible={VisibleNotifi} iconTitle={<WarningIcon width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  onCancel={()=>cancelModal() } Content="Không thể chuyển bàn vì bàn chưa được đặt !"/>
        </View>
    )
}