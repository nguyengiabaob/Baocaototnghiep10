/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { RouteProp } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Overlay, Text } from "react-native-elements";
import { Input } from "react-native-elements/dist/input/Input";
import { Area } from "../../Model/Area";
import CustomBoxItem from "../../Model/CustomBoxItem";
import { CustomNotification } from "../../Model/CustomNofication";
import { Table } from "../../Model/Table";
import { RoomParamList } from "../../navigation/types";
import data from "../../services/data";
import DataService from "../../services/dataservice";
import { reponsiveheight, reponsivewidth } from "../../theme/Metric";
import WarningIcon from '../../asset/svg/Warning.svg';
import BellNofi from '../../asset/svg/bellnotification.svg';
type props ={
    route: RouteProp<RoomParamList,'RoomEdit'>
}
export const EditRooms: React.FC<props> = ({route}:props)=>{
    const {id}= route.params;
    const [TableSel, settablesel]= useState<Table>();
    const [dataArea, setdataArea]= useState<Area[]>([]);
    const [visibleArea, setvisibleArea]= useState<boolean>(false);
    const [visibleStatus, setvisibleStatus]= useState<boolean>(false);
    const [AreaSelected, setAreaSelected]= useState<Area>();
    const [StatusSelected, setStatusSelected]= useState<Table>();
    const [Name, setName]= useState<string>('');
    const [Slots, setSlots]= useState<number>(0);
    const [VisibleUpdate, setvisibleUpdate]= useState<boolean>(false);
    const [VisibleError, setvisibleError]= useState<boolean>(false);
    const DataArea1 =async ()=>{
        let datarray = await DataService.Getdata_dtService<any>('Area');
        // data.getdata('Area').then(res=> {for ( let key in res)
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
      
        setdataArea(datarray);
 
    // });
    }
    const DataTable =()=>{
        let datarray :Table ;
        data.getdata('Table/').then(async(res)=> {for ( let key in res)
        {
            if (key !== '0' && key === id)
            {
                datarray = res[key];
                datarray.id = key;
            }
        }
        let datarrayArea= await DataService.Getdata_dtService<any>('Area');
        // data.getdata('Area').then(Res=> {for ( let key in Res)
        // {
        //     if (key !== '0')
        //     {
        //     datarrayArea.push(
        //         {
        //             id: key,
        //             ...Res[key],
        //         }
        //     );
        //     }
        // }
        setStatusSelected(datarray);
        datarrayArea.forEach( item=>{
            if ( item.id === datarray.Type)
            {
                
                datarray.Type = item.Name ;
                setAreaSelected(item);
            }
        })
        console.log('dataarray', datarray);
        settablesel(datarray);
    // });
    });
    }
useEffect(()=>{
    DataArea1();
    DataTable();
},[])
const ChoosenArea =(item :Area)=>{
    setAreaSelected(item);
    setvisibleArea(false);

}
const ChoosenStatus =(value :number)=>{
    let item: Table|undefined = StatusSelected;
    if ( item !== undefined)
    {
        item.Status= value;
        setStatusSelected(item );
    }
    setvisibleStatus(false);

}
const  SaveData =()=>{
    if ( AreaSelected !== undefined && StatusSelected !== undefined )
    {
        data.UpdateTable(Name ==='' ? StatusSelected.Name : Name ,id,AreaSelected.id, Slots === 0 ? StatusSelected.Slots : Slots,StatusSelected?.Status).then(res=> {if ( res === true)
        {
            setvisibleUpdate(true);
            console.log( 'Update Table');
        }})
    }
    else
    {
        setv
    }
}
    return ( 
     
        <SafeAreaView style={{justifyContent:'flex-start',flex:1, marginTop:25}}>
            <View style={{marginLeft:15}} >
                <Text style={{fontSize:18, fontWeight:'700'}}>T??n B??n :</Text>
                <Input containerStyle={{width: reponsivewidth(350)}} onChangeText={(text)=>{setName(text)}}>
                    {TableSel?.Name}
                </Input>
            </View>
            <View  style={{marginLeft:15,marginTop:15}}>
                <Text style={{fontSize:18, fontWeight:'700'}}> S??? ch???</Text>
                <Input containerStyle={{width: reponsivewidth(350)}}  onChangeText={(text)=>{setSlots(Number(text))}} >
                {TableSel?.Slots}
                </Input>
            </View>
            <View style={{marginTop:15, marginLeft:15}}>
            <Text style={{fontSize:18, fontWeight:'700'}}> Khu v???c: </Text>
            { AreaSelected &&
             <TouchableOpacity onPress={()=>{setvisibleArea(true)}}  style={{marginTop:20, alignItems:'center', backgroundColor:'#c5c2c2', width:reponsivewidth(350),alignSelf:'center',padding:10}}>
                    <Text  style={{fontSize:16}}>{AreaSelected.Name}</Text>
             </TouchableOpacity>
            }
            </View>
            <View style={{marginTop:25, marginLeft:15}}>
                <Text style={{fontSize:18, fontWeight:'700'}}>Tr???ng th??i</Text>
            {StatusSelected &&
                <TouchableOpacity onPress={()=>setvisibleStatus(true)}  style={{marginTop:20, alignItems:'center', backgroundColor:'#c5c2c2', width:reponsivewidth(350),alignSelf:'center',padding:10}}>
                    <Text style={{fontSize:16}}>{StatusSelected.Status === 0 ? 'Tr???ng' : '???? ?????t' }</Text>
             </TouchableOpacity>
            }
            </View>
            <View style={{marginTop:35, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>SaveData()} style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                 <Text style={{color:'#FFFF'}}>
                    L??u
                </Text>
             </TouchableOpacity>
            </View>
            <Overlay isVisible={visibleArea}>
      <View style={{width:reponsivewidth(320), height: reponsiveheight(360)}}>
      <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
      <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Khu v???c</Text>

      </View>
      <View style={{height:reponsiveheight(250) }}>
        <ScrollView>
          {
            dataArea.map(item=>{
            
             if (AreaSelected?.id === item.id)
             {
                return (
                    <TouchableOpacity key={item.id} onPress={()=>{ChoosenArea(item)}} style={{width:reponsivewidth(320), alignSelf:'center'}}>
                    <CustomBoxItem Style={{backgroundColor:'#b6e4ff',borderColor:'#6666667d', borderWidth:0.45, borderRadius:0}} title={item.Name}/>
               </TouchableOpacity>
                )
             }
             else
             {
              return (
                <TouchableOpacity key={item.id} onPress={()=>{ChoosenArea(item)}} style={{width:reponsivewidth(320), alignSelf:'center'}}>
                     <CustomBoxItem Style={{backgroundColor:'#e3e2e287',borderColor:'#6666667d', borderWidth:0.45, borderRadius:0}} title={item.Name}/>
                </TouchableOpacity>
              );
             }
            })
        
          }
        </ScrollView>
      </View>
      <View style={{alignItems:'center', marginTop:25}}>
          <TouchableOpacity onPress={()=>{setvisibleArea(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}} ><Text style={{color:'#FFFF'}}>Tho??t</Text></TouchableOpacity>
      </View>
      </View>
      </Overlay>


      <Overlay isVisible={visibleStatus}>
      <View style={{width:reponsivewidth(320), height: reponsiveheight(360)}}>
      <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
      <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Tr???ng th??i</Text>

      </View>
      <View style={{height:reponsiveheight(250) }}>
        <ScrollView>
                    <TouchableOpacity onPress={()=>{ChoosenStatus(0)}} style={{width:reponsivewidth(320), alignSelf:'center'}}>
                    <CustomBoxItem Style={{backgroundColor:StatusSelected?.Status === 0 ? '#b6e4ff' : '#e3e2e287' ,borderColor:'#6666667d', borderWidth:0.45, borderRadius:0}} title="Tr???ng"/>
               </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{ChoosenStatus(1)}} style={{width:reponsivewidth(320), alignSelf:'center'}}>
                     <CustomBoxItem Style={{backgroundColor:StatusSelected?.Status === 1 ? '#b6e4ff': '#e3e2e287',borderColor:'#6666667d', borderWidth:0.45, borderRadius:0}} title={'???? ?????t'}/>
                </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{alignItems:'center', marginTop:25}}>
          <TouchableOpacity onPress={()=>{setvisibleStatus(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}} ><Text style={{color:'#FFFF'}}>Tho??t</Text></TouchableOpacity>
      </View>
      </View>
      </Overlay>
      <CustomNotification visible={VisibleUpdate} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} Content={'B???n c???p nh???t th??ng tin th??nh c??ng !'} onCancel={()=>setvisibleUpdate(false)} /> 
      <CustomNotification visible={VisibleError}  iconTitle ={<WarningIcon  width={reponsivewidth(30)} height={reponsiveheight(30)}/> }  Content={'Vui l??ng nh???p ?????y ????? th??ng tin !'} onCancel={()=>{setvisibleError(false)}}/>
    </SafeAreaView>
     
    )
}