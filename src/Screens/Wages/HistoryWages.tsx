/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View } from  'react-native';
import { SearchBar, Text } from 'react-native-elements';
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
import database from '@react-native-firebase/database';
import { Modal, Portal, Provider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/reducer/authslice';
import { StackNavigationProp } from '@react-navigation/stack';
import { WagesParamaList } from '../../navigation/types';
import Loading from '../../Helper/Loader/Loading';
type props = {
    visible: boolean
    navigation: StackNavigationProp<WagesParamaList,'WagesScreen'>
}
export const WagesHistory:React.FC<props> = ({visible, navigation}) =>{
    const [DataWages, setDataWages] = useState<Wages[]>([]);
    const [Datauser, setDatauser] = useState<any[]>([]);
    const [DetailWages, setDetailWages] = useState<boolean>(false);
    const [DetailStaff, setDetailstaff] = useState<Userdata>();
    const [detailSelected,setSelected] = useState<Wages>();
    // const [reload, setReload]= useState<boolean>(false);
    const [testState, setTestState] = useState<boolean>(false);
    const [loading,setloading] = useState<boolean>(false);
    const [showSearch,setShowSearch] = useState<boolean>(false);
    const [valueSearch, setvalueSearch]= useState<string>('');
    const [dataSearch, setdataSearch]= useState<any>([]);
    const {typeUser} = useSelector(selectAuth);
    const isFocused = useIsFocused();
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
        let datarray = await DataService.Getdata_dtService<any>('user');

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
};
useEffect(()=>{
    database().ref('/Wages').on('value', ()=>{
        getallwages();
    });
    database().ref('/user').on('value',()=>{
        getalluser();
    });
},[]);
useEffect(()=>{
    if(valueSearch !=='' && valueSearch !== undefined)
        {
            let a :any[]=[];
            let idUser= Datauser.filter(x=> x.Name.toLowerCase().includes(valueSearch.toLowerCase()));
            console.log('1234789',idUser);
            if(idUser)
            {
                idUser.forEach(x=> {
                   let b = DataWages.filter(i=>i.EmployeeID == x.id );

                   if (b)
                   {

                      a = a.concat(b);
                   }

                })

            }
            setdataSearch(a);
        }
    else
    {
        setdataSearch(DataWages);
    }
  

},[valueSearch, DataWages, Datauser])
    useEffect(()=>{
    //     if (isFocused === true|| visible== true)
    // {
    // setTimeout((
    // )=>{ getallwages();
    //     getalluser();
    // },5000)

    if (isFocused == true)
    {
        setloading(true);
        Promise.all(
            [getallwages(),getalluser()]
        ).then(
            ()=>{
                setloading(false);
            }
        )
        .catch(e=>console.log(e));
    }

    //}
    },[isFocused]);
    // useEffect(()=>{
    //     if (detailSelected)
    // {

    //     Datauser.forEach(item=>{
    //         if(item.id=== detailSelected.EmployeeID)
    //             setDetailstaff(item);
    //     })
    // }
    // },[detailSelected,Datauser]);
  return (
        <SafeAreaView>
            <View style={[styles.Shadowbox, {paddingTop:8, alignItems:'center', paddingBottom:8}]}>
                {
                    showSearch == false ?
                    <TouchableOpacity style={{alignSelf:'flex-end', marginRight: reponsivewidth(20)}} onPress={()=>{
                        setShowSearch(true);
                    }}>
                        <Ionicons size={32} name="search"/>

                    </TouchableOpacity>
                :
                    <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
                        <SearchBar
                             lightTheme={true}
                             containerStyle={{
                               width: reponsivewidth(300),
                               height: reponsiveheight(50),
                               borderRadius: 5,
                             }}
                             onClear={()=> setvalueSearch('')}
                             inputContainerStyle={{height: reponsiveheight(38)}}
                            style={{width:reponsivewidth(300)}}
                            placeholder="Nhập tên nhân viên"
                            onChange={(e)=>{
                                setvalueSearch(e.nativeEvent.text);
                            }}
                            value={valueSearch}
                        />
                    <TouchableOpacity onPress={()=>{
                        setvalueSearch('');
                        setShowSearch(false);
                    }} style={{marginLeft: 8}}>
                        <Text >
                            Hủy
                        </Text>
                    </TouchableOpacity>
                    </View>
                }

            </View>
            <ScrollView style={{height:reponsiveheight(580), marginBottom: reponsiveheight(80)}}>
                {dataSearch.length > 0 ? dataSearch.map(item =>{
                    let user = Datauser.find(i=> i.id == item.EmployeeID );

                    return (
                        <View style={[ styles.Shadowbox ,{justifyContent:'center',alignItems:'center',width: reponsivewidth(350),alignSelf:'center', paddingRight:25, marginLeft:15, paddingTop:15, paddingBottom:20, marginTop:15, height:reponsiveheight(180),borderLeftColor: user?.service == 'Quản lý' ? 'red' : '#098f11', borderLeftWidth:10, borderRadius:5 }]}>
                        <View  style={{justifyContent:'center', alignItems:'center', marginLeft:70, width:reponsivewidth(380)}}>
                         <View style={[{justifyContent:'flex-end',alignItems:'flex-start', width:reponsivewidth(380),marginBottom:10, marginLeft:5 }]}>
                             <Text style={{fontWeight:'700'}}>{tranferday(item.Day)}</Text>
                        </View>
                        <View>
                        <Text>Tên : {user?.Name}{user?.isDelete== true && ' (Đã nghỉ việc)'}</Text>
                        <Text style={{marginTop:5}}>Chức vụ :{''}{user?.service}</Text>
                        <Text style={{marginTop:5, fontWeight:'700'}}>Lương : {''}{item.TotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</Text>
                        <View style={{alignItems:'flex-end',width:reponsivewidth(280)}}>
                            {/* <Pressable>
                                <Text>Xem chi tiết</Text>
                            </Pressable> */}
                            { typeUser == 1 ?
                                <CustomHyperLink onPress={()=>{setSelected(item); setDetailstaff(user); setDetailWages(true);}} title="Xem chi tiết" /> :
                                <View style={{marginRight:18, flexDirection:'row'}}>

                                       <TouchableOpacity onPress={()=>{

                                           console.log('id',item.id)
                                           navigation.navigate('WagesDetail', {id: item.id})}}>
                                           <MaterialIcons  name="mode-edit" size={32}/>
                                       </TouchableOpacity>
                                       <TouchableOpacity style={{marginLeft:15}}>
                                           <MaterialIcons  name="delete" size={32}/>
                                       </TouchableOpacity>
                                </View>
                            }
                            </View>
                            </View>
                            </View>
                        </View>
                    );
                })
                   :  <View style={{alignItems:'center', justifyContent:'center',height:reponsiveheight(550) }}>
                       <Text style={{opacity:0.4}}>Chưa có thông tin tính lương</Text>
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
       <MaterialIcons name="arrow-back" size={28} color="#efefef"/>
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
        <Text style={{fontSize:18, marginLeft:10}}>Chức vụ</Text>
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
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{detailSelected ? detailSelected.BasicSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}</Text>
    </View>
    </View>
    <View style={{flexDirection:'row', paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1 }}>
        <Text style={{fontSize:18, marginLeft:10}}>Tổng Lương</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(240) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{detailSelected ? detailSelected?.TotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}</Text>
    </View>
    </View>
    <View style={{flexDirection:'row', paddingBottom :25 , paddingTop:25,paddingLeft:10, paddingRight:10, borderBottomColor:'#d6d6d6', borderBottomWidth:1 }}>
        <Text style={{fontSize:18, marginLeft:10}}>Ngày tạo</Text>
    <View style={{ alignSelf:'flex-end', justifyContent:'flex-end', width:reponsivewidth(270) }}>
        <Text style={{fontSize:18,alignSelf:'flex-end', justifyContent:'flex-end'}}>{tranferday(detailSelected ? detailSelected.Day.toString() : '')}</Text>
    </View>
    </View>
</View>
</View>
</View>
</Overlay>
}
<Loading visible={loading}/>
        </SafeAreaView>
    );
};
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
    elevation:10,
    },
});
