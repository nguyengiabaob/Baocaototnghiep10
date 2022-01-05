/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { TextInput } from "react-native-paper";
import IconbookTable from '../../asset/svg/booktable.svg';
import { reponsiveheight, reponsivewidth } from "../../theme/Metric";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import data from "../../services/data";
import { RouteProp } from "@react-navigation/native";
import { RoomParamList } from "../../navigation/types";
import { Table } from "../../Model/Table";
import DataService from "../../services/dataservice";
type props={
    route :RouteProp<RoomParamList,'BookTable'>
}
export const BookTable: React.FC<props> =({route})=>{
const [showdatepicker,setshowdatepicker] = useState<boolean>(false);
const {id}= route.params;
const [showtime,setshowtime] = useState<boolean>(false);
const [showdatepickervalue,setshodatepickervalue] = useState<Date>(new Date());
const [time,settime] = useState<Date>(new Date() );
const [nameCustomer,setnameCustomer] = useState<string>('');
const [date,setdate] = useState<string>('');
const [TimeValue,setTimeValue] = useState<string>('');
const [Slots,setSlots] = useState<number>(0);
const [table, setTable]= useState<Table>(); 
const getTable = useCallback(async()=>{

     let datarray = await DataService.Getdata_dtService<any>('Table');
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
    datarray.forEach(item=> {
      if (item.id === id)
      {
          setTable(item);
      }
    });
// });
},[id]);
useEffect(()=>{
    getTable();
},[getTable])
const onChange = (event: Event, selectdate: any) => {
    var currentDate = selectdate || showdatepickervalue; 
    setshowdatepicker(false);
    setshodatepickervalue(currentDate);
  };

function transferday (currentDate:any){
    let pickdate = new Date(currentDate);
    let textdate = pickdate.getDate() + '/' + (pickdate.getMonth() + 1) + '/' + pickdate.getFullYear();
    return textdate;
}
const onChangetime = (event: Event, selectdate: any) => {
    var currentDate = selectdate || time; 
    setshowtime(false);
    settime(currentDate);
  
  };
const onSave =()=>{
    if (nameCustomer !== '' && Slots > 0 && table !== undefined)
    {
        data.PostBookTable(nameCustomer,showdatepickervalue,time,Slots,table.id,0)
    }
    console.log('Name',nameCustomer);
    console.log('ngày',showdatepickervalue.toDateString());
    console.log('gio',time.toTimeString());
    console.log('slots',Slots);
}
    return (
        <View style={{flex:1}}>
            <View style={{marginTop:25}}>
            <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
                <IconbookTable width={reponsivewidth(50)} height={reponsiveheight(50)}/>
                <Text style={{fontSize:19,fontWeight:'700'}}>Thông tin đặt bàn</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:35}}>
                <TextInput onChangeText={(text) => { setnameCustomer(text); } } placeholder="Tên khách hàng" mode="outlined" outlineColor="#02569E" style={{ width: reponsivewidth(350) }} autoCompleteType={undefined}/>
            </View>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:35}}>
                <TextInput  editable={false} mode="outlined" outlineColor="#02569E" style={{ width: reponsivewidth(350) }} right={<TextInput.Icon onPress={() => setshowdatepicker(true)} name="calendar-today" />} autoCompleteType={undefined}>{transferday(showdatepickervalue)}</TextInput>
                   {showdatepicker &&  (  <DateTimePicker
                        value={showdatepickervalue}
                        display={"calendar"}
                        mode={"date"}
                        is24Hour={true}
                        onChange={onChange}
                        />
                )}
               </View>
               <View style={{justifyContent:'center', alignItems:'center',marginTop:35}}>
                <TextInput onBlur={() => { setTimeValue(time.toString()); } } mode="outlined" outlineColor="#02569E" style={{ width: reponsivewidth(350) }} right={<TextInput.Icon onPress={() => setshowtime(true)} name="clock" />} autoCompleteType={undefined}>{time.getHours()+ ":" + time.getMinutes()}</TextInput>
                {showtime &&  (  <DateTimePicker 
                        value={time}
                        display={"clock"}
                        mode={"time"}
                        is24Hour={true}
                        onChange={onChangetime}
                        />
                )}
            </View>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:35}}>
                <TextInput onChangeText={(text) => setSlots(Number(text))} placeholder="Số người " mode="outlined" outlineColor="#02569E" style={{ width: reponsivewidth(350) }} autoCompleteType={undefined}/>
            </View>
            <View style={{justifyContent:'center', alignItems:'center',marginTop:35}}>
            <TouchableOpacity onPress={()=>{onSave()}}   style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
            <Text style={{color:'#FFFF'}}>
              Lưu
            </Text>
          </TouchableOpacity> 
            </View>
            </View>
            </View>
      
    );
}