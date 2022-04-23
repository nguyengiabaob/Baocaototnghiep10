/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View } from  'react-native';
import { Text } from 'react-native-elements';
import { Overlay } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import CustomHyperLink from '../../Model/CustomHyperLink';
import { Userdata } from '../../Model/User';
import { Wages } from '../../Model/Wages';
import data from '../../services/data';
import { getheight, getwidth, reponsiveheight, reponsivewidth } from '../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database'
import { Modal, Portal, Provider } from 'react-native-paper';
type props = {
    visible: boolean
}
export const WagesHistory:React.FC<props> = ({visible}) =>{
    const [DataWages, setDataWages]=useState<Wages[]>([]);
    const [Datauser, setDatauser]=useState<Userdata[]>([]);
    const [DetailWages, setDetailWages]=useState<boolean>(false);
    const [DetailStaff, setDetailstaff]=useState<Userdata>();
    const [detailSelected,setSelected]= useState<Wages>(); 
    const [reload, setReload]= useState<boolean>(false);
    const [testState, setTestState]= useState<boolean>(false);
    const isFocused= useIsFocused();
    const tranferday = (d:string)=>{
        var month = new Date(d).getMonth() + 1;
        var date = new Date(d).getDate();
        var year = new Date(d).getFullYear();
       return date + '/' + month + '/' + year;
    };
    const getallwages = async()=>{
        let datarray = await DataService.Getdata_dtService<any>('Wages');

    //     data.getdata('Wages').then(res=> {for ( let key in res)
    //     {
    //         if (key !== '0')
    //         {
    //         datarray.push(
    //             {
    //                 id: key,
    //                 ...res[key],
    //             }
    //         );
    //         }
    //     }
      setDataWages(datarray);
    // });
    };
    const getalluser = async()=>{
        let datarray= await DataService.Getdata_dtService<any>('user');

        // data.getdata('user').then(res=> {for ( let key in res)
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
         setDatauser(datarray);
    // });
}
useEffect(()=>{
    database().ref('/Wages').on('child_changed', ()=>{
        setReload(prev=> !prev)
    })
},[])
    useEffect(()=>{
    //     if (isFocused === true|| visible== true)
    // {
    // setTimeout((
    // )=>{ getallwages();
    //     getalluser();
    // },5000)
       getalluser();
       getallwages();
    //}
    },[reload]);
    useEffect(()=>{
        if (detailSelected != undefined)
    {

        Datauser.forEach(item=>{
            if(item.id=== detailSelected.EmployeeID)
                setDetailstaff(item);
        })
    }
    },[detailSelected,Datauser]);
  return (
        <SafeAreaView>
          
            <ScrollView style={{height:reponsiveheight(620)}}>
                {DataWages.length > 0 ? DataWages.map(item =>{
                    let user = Datauser.filter(i=> i.id == item.EmployeeID );
                    console.log(DataWages);
                    return (
                        <View style={[ styles.Shadowbox ,{justifyContent:'center',alignItems:'center',width: reponsivewidth(350),alignSelf:'center', paddingRight:25, marginLeft:15, paddingTop:15, paddingBottom:20, marginTop:15, height:reponsiveheight(180),borderLeftColor: user[0]?.service == 'Quản lý' ? 'red' : '#098f11', borderLeftWidth:10, borderRadius:5, }]}>
                        <View  style={{justifyContent:'center', alignItems:'center', marginLeft:70, width:reponsivewidth(380)}}>
                         <View style={[{justifyContent:'flex-end',alignItems:'flex-start', width:reponsivewidth(380),marginBottom:10, marginLeft:5 }]}>
                             <Text style={{fontWeight:'700'}}>{tranferday(item.Day)}</Text>
                        </View>
                        <View>
                        <Text>{user[0]?.Name}</Text>
                        <Text style={{marginTop:5}}>Chức vụ :{user[0]?.service}</Text>
                        <Text style={{marginTop:5, fontWeight:'700'}}>Lương :{item.TotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</Text>
                        <View style={{alignItems:'flex-end',width:reponsivewidth(280)}}>
                            {/* <Pressable>
                                <Text>Xem chi tiết</Text>
                            </Pressable> */}
                            <CustomHyperLink onPress={()=>{setSelected(item); setDetailWages(true)}} title="Xem chi tiết" />
                            </View>
                            </View>
                            </View>
                        </View>
                    )
                })
                   :  <View>
                       <Text>Chưa có thông tin tính lương</Text>
                       </View>
                }
            </ScrollView>
           
          
  
           
    { detailSelected  && DetailStaff &&
            <Overlay isVisible={DetailWages}>
        <View style={{width:getwidth(), height:getheight(),flex:1, marginTop:-10.5}}>
    <View style={{height:reponsiveheight(755)}}>
    <View style={[{flexDirection:'row', justifyContent:'flex-start',padding:18, backgroundColor:'#67bff3', borderColor:'#e5e5e5', borderWidth:2}]}>
    <View style={{alignSelf:'flex-start', justifyContent:'flex-start', width:reponsivewidth(50)}}>
    <TouchableOpacity onPress={()=>setDetailWages(false)}>
       <MaterialIcons name="arrow-back" size={28} color='#efefef'/>
    </TouchableOpacity>
    </View>
    <Text style={{alignSelf:'center',fontSize:17, width:reponsivewidth(100), textAlign:'center', color:'#FFFF', fontWeight:'700'}}>Bảng lương</Text>
</View>
<View >
<View style={{flexDirection:'row',paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1}}>
        <Text style={{fontSize:18, marginLeft:10}}>Tên nhân viên</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(240) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{DetailStaff?.Name}</Text>
    </View>
    </View>
<View style={{flexDirection:'row',paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1}}>
        <Text style={{fontSize:18, marginLeft:10}}>chức vụ</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(280) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{DetailStaff?.service}</Text>
    </View>
    </View>
    <View style={{flexDirection:'row',paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1}}>
        <Text style={{fontSize:18, marginLeft:10}}>Giới tính</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(270) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{DetailStaff?.Gender}</Text>
    </View>
    </View>
    <View style={{flexDirection:'row',paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1}}>
        <Text style={{fontSize:18, marginLeft:10}}>Mức lương cơ bản :</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(180) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{detailSelected ?detailSelected.BasicSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):0}</Text>
    </View>
    </View>
    <View style={{flexDirection:'row', paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1, }}>
        <Text style={{fontSize:18, marginLeft:10}}>Tổng Lương</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(240) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{detailSelected ?detailSelected?.TotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):0}</Text>
    </View>
    </View>
    <View style={{flexDirection:'row', paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1, }}>
        <Text style={{fontSize:18, marginLeft:10}}>Ngày tạo</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(270) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{tranferday(detailSelected ? detailSelected.Day.toString(): '')}</Text>
    </View>
    </View>
</View>
</View>
</View> 
</Overlay>
}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Shadowbox:
    {
        backgroundColor:'#FFFF',
        shadowColor:'#000',
        shadowOffset:{
            width:2,
            height:2,
        },
        shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation:10
    }
})