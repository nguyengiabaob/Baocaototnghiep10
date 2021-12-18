/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Calendar, LocaleConfig} from 'react-native-calendars';
import React, {useCallback, useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, Pressable, StyleSheet, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../Model/CustomHeader';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import { ScrollView} from 'react-native-gesture-handler';
import { Overlay, SearchBar, Text } from 'react-native-elements';
import CustomBoxItem from '../../Model/CustomBoxItem';
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { ManageEmployeePramaList } from '../../navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../Model/CustomInput';
import { Modalize } from 'react-native-modalize';
import data from '../../services/data';
import { Userdata } from '../../Model/User';
import { useIsFocused } from '@react-navigation/native';
import CustomBox from '../../Model/CustomBox';
import { Assigment } from '../../Model/Assignment';
import { timeWork } from '../../Model/TimeWork';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
type props ={
    navigation: StackNavigationProp<ManageEmployeePramaList,'Assignment'>
}
export const AssignmentScreen: React.FC<props> = ({navigation}:props)=>{
    const [visible, setvisible] = useState<boolean>(false);
    const [visiblelist, setvisiblelist] = useState<boolean>(false);
    const [TimeworkSelected, setTimeWorkSeleted] = useState<timeWork>();
    const [Timework, setTimeWork] = useState<timeWork[]>([]);
    const [visibleModal,setVisibleModal] = useState<boolean>(false);
    const [staffArray, setstaffArray] = useState<Userdata[]>([]);
    const [staffArrayQuery, setstaffArrayQuery] = useState<Userdata[]>([]);
    const [valueSearching, setvaluesearching] = useState<string>('');
   // const [staffArrayselected, setstaffArrayselected] = useState<Userdata[]>([]);
    const [AssignmentData, setAssginmentData] = useState<Assigment[]>([]);
    const [DataAssignment, setDataAssignment] = useState<Userdata[]>([]);
    const [dataSelected2, setdataSelected2]  = useState<string []>([]);
    const [isrerender, setisrerender]  = useState<boolean>(false);
    const [dayChoosen, setdayChoosen]  = useState<Date>(new Date());
    var isFocused = useIsFocused();
    const getalluser = ()=>{
    let datarray :any[] = [];
    data.getdata('user').then(res=> {for ( let key in res)
    {
        if (key !== '0')
        {
        datarray.push(
            {
                id: key,
                ...res[key],
            }
        );
        }
    }
    setstaffArray(datarray);
});
};
const getallAssignment=()=>{
    let datarray :any[] = [];
    data.getdata('Assignment').then(res=> {for ( let key in res)
    {
        if (key !== '0')
        {
        datarray.push(
            {
                id: key,
                ...res[key],
            }
        );
        }
    }
    setAssginmentData(datarray);
});
};
const Datauser = (id :any)=>{
 
    let user = staffArray.filter(item => item.id == id);
    return user;
}
const getuserAssignment1= (dataassignment :any[] )=>
{
    let array: any []= [];
    dataassignment.forEach(item=> {
        array.push(
           ...Datauser(item.EmployeeID)
        );
    });
    console.log('Array', array);
    setDataAssignment(array);
}
const getuserAssignment = async (day:string,Time: string)=>
{   console.log(day);
    let datarray :any[] = [];
        data.getdata('Assignment').then( res=> {for ( let key in res)
        {
            if (key !== '0')
            {
            datarray.push(
                {
                    id: key,
                    ...res[key],
                }
            );
            }
        }
        if ( Time === 'all')
    {
       
        let check = datarray.filter(item=> item.Day === day);
        if (check.length > 0)
        {

            getuserAssignment1(check);
        }
        //     let datauser :any[] = [];
        //    console.log('check',check);
        //     check.forEach( item =>{
        //      data.getuser('user',item.EmployeeID).then( Res=>{
        //       //  console.log('Res',Res);
        //       datauser.push({
        //                 id: item.EmployeeID,
        //                 ...Res,
        //             })
        //         console.log('datauser',datauser);
            
        //             let checkuser = DataAssignment.filter(i=> i.id === item.EmployeeID);
        //             console.log('checkuser',check);
        //             if ( checkuser.length > 0)
        //             {
        //                 console.log(DataAssignment);
        //             }
        //             else
        //             {
        //                  setDataAssignment(prev=>prev.concat(datauser));
        //             }
        //         });
                   

        //     }
        //     )
            
        // }
        else
        {
            setDataAssignment([]);
        }
    }
    else
    {
        let check = datarray.filter(item=> (item.Day === day && item.Time == Time));
        //console.log('check',check);
        //console.log('datarray',datarray );
        if (check.length > 0)
        {
          getuserAssignment1(check);
            // //console.log(check);
            // check.forEach( item =>{
            //  data.getuser('user',item.EmployeeID).then( Res=>{
            //   let datauser :any[] = [];
            //   datauser.push({
            //             id: item.EmployeeID,
            //             ...Res,
            //         });
            //         let checkuser = DataAssignment.filter(i=> i.id === item.EmployeeID );
            //         if ( checkuser.length > 0)
            //         {
            //             return;
            //         }
            //         else
            //         {
            //             setDataAssignment(prev=>prev.concat(datauser));
            //         }
            //     });
                   

            // }
            // );
        }
        else
        {
            setDataAssignment([]);
        }
        // datarray.forEach(item=> {
        //     if ( item.Day === day && item.Time === Time)
        //     {
        //     let datarrayuser :any[] = [];
        //     data.getuser('user',item.id).then( Res=> {
        //     datarrayuser.push(
        //     {
        //         id: item.id,
        //         ...Res,
        //     }
        //  );
        //     setstaffArrayselected(prev=> prev.concat(datarrayuser));
        //     });
        // }
        // }
        // );
    }
    });
};
const getTimeWork = (day: string)=>{
    console.log('chạy timework');
    let datarray :any[] = [];
    data.getdata('TimeWork'). then(res=>{
        for ( let key in res)
        {
            if (res[key] != null)
        {
            if (res[key].Day === day)
            {
                datarray.push(
                    {
                        id: key,
                        ...res[key],
                    }
                );
            }
        }
        }
        setTimeWork(datarray);
    }
    );
};
useEffect(()=>{
    if (isFocused )
    {
        getalluser();
        getallAssignment();
    }

    
    // if (staffArrayselected.length > 0)
    // {
    //     console.log(staffArrayselected);

    // }
},[isFocused]);
useEffect(()=>
{
    getTimeWork(new Date().toLocaleString());
    getuserAssignment(new Date().toLocaleString(),'all');
},[]);
// console.log(DataAssignment);
    const DayVN = (day:string)=>{
        if (day === 'Mon')
        {return 'Thứ Hai'; }
        if (day === 'Tue')
        {return 'Thứ Ba'; }
        if (day === 'Wed')
        {return 'Thứ Tư'; }
        if (day === 'Thu')
        {return 'Thứ Năm'; }
        if (day === 'Fri')
        {return 'Thứ Sáu'; }
        if (day === 'Sat')
        {return 'Thứ Bảy'; }
        if (day === 'Sun')
        {return 'Chủ Nhật'; }

    };
    const tranferday = (d:string)=>{
        var stringday = new Date(d).toDateString();
        //console.log(d);
        var daynow = DayVN(stringday.substring(0,3));
        var month = new Date(d).getMonth() + 1;
        var date = new Date(d).getDate();
        var year = new Date(d).getFullYear();
       return daynow + ', ' + date + '/' + month + '/' + year;
    };
    var stringday = new Date().toDateString();
    var daynow = DayVN(stringday.substring(0,3));
    var month = new Date().getMonth() + 1;
    var date = new Date().getDate();
    var year = new Date().getFullYear();
    var Day = daynow + ', ' + date + '/' + month + '/' + year;
    const [Changeday ,setchangeday] = useState<string>(Day);
    const pickday = (day:any)=>{
       setchangeday(tranferday(day.dateString));
       
    };
    LocaleConfig.locales.vn = {
        monthNames: ['Tháng 1 ','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
        monthNamesShort: ['Tg1.','Tg2.','Tg3','Tg4','Tg5','Tg6','Tg7','Tg8','Tg9','Tg10','Tg11','Tg12'],
        dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
        dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
        today: 'Hôm nay',
      };
      LocaleConfig.defaultLocale = 'vn';
      const ModalListimeWork: React.FC = ()=>
      {    
          const [Name,SetName]= useState<string>('');
          const [ModalEdit,setModalEdit]= useState<boolean>(false);
          const [ChoosenEdit,setChoosenEdit]= useState<any>();
          const [flag,setflag]= useState<boolean>(false);
          const EditTimeWork= (item: any)=>{
             if(Name !== '')
            {
                data.UpdateTimeWork('TimeWork',Name,item.Day,item.id ).then(res=>{
                    if(res== true)
                    {
                        setflag(true);
                    }
                })
                setModalEdit(false);
                console.log('Name',Name);
            }
          }
          const DelTimeWork =(id :string)=>{
              data.deletedData("TimeWork",id);
              data.getdata("Assignment").then(res=>{
                let datararray: any[] = [];
                for (let key in res)
                {
                    if (key!="0")
                    {
                        datararray.push({
                            id:key,
                            ...res[key],
                        })
                    }
                }
                datararray.forEach(item=>{
                    if(item.Time === id)
                    {
                        data.deletedData("Assignment",item.id);
                        
                    }
                
                })
                setflag(true);
              })
          }
          useEffect(()=>{
              if(flag== true)
              {
                  getTimeWork(dayChoosen.toDateString());
              }

          },[flag])
          return (
              <>
              <View >
                  <Text style={{textAlign:'center',fontSize:18,fontWeight:'700', paddingBottom:8}}>Danh sách ca</Text>
              </View>
              <ScrollView  style={{borderColor:'#787878',borderTopWidth:0.75}}>
            { Timework.length > 0 && Timework.map(item=>{

            return (
             
                <View key={item.id} style={{flexDirection:'row',marginTop:10, paddingBottom:15, marginLeft:2}}>
                <TouchableOpacity onPress={ async()=>{
                await setTimeWorkSeleted(item);
                await setvisiblelist(false);
                await getuserAssignment(item.Day,item.id);
                setChoosenEdit(item);
                }} style={[styles.Shadowbox, {padding:10,marginTop:5,flex:0.9}]}><Text style={{padding:10}}>{item.Name}</Text></TouchableOpacity>
                {new Date(dayChoosen).getDay() >= new Date ().getDay() && 
                <>
                <TouchableOpacity onPress={async ()=>{await setflag(false); DelTimeWork(item.id)}} style={{marginLeft:10,justifyContent:'center'}}>
                    <Materiallcons name="delete" size={26} color={"#c6c6c6"}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ()=>{setChoosenEdit(item) ;setModalEdit(true);}} style={{marginLeft:10,justifyContent:'center'}}>
                    <MaterialCommunityIcons name="file-edit" size={26} color={"#c6c6c6"}/>
                </TouchableOpacity>
                </>
                }
                </View>
          
                    );
               })
            }
                </ScrollView>
              <View style={{marginTop:30,  alignItems:'center', justifyContent:'center'}} >
              {/* <Pressable style={{marginHorizontal:40, backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                      <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Xác nhận</Text>
                  </Pressable> */}
                  <Pressable onPress={()=>{setvisiblelist(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                      <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Thoát</Text>
                  </Pressable>
              </View>
              <Overlay isVisible={ModalEdit}>
                    <View style={{borderBottomColor:'', borderBottomWidth:1}}>
                        <Text style={{textAlign:'center',fontSize:18,fontWeight:'700', paddingBottom:8}}>Thông tin ca</Text>
                    </View>
                    <View style={{marginTop:25, justifyContent:'center'}}>
                        <CustomInput style={{width:reponsivewidth(300),marginLeft:5}} title="Tên ca" onchange={(text)=>{SetName(text)}} text={ChoosenEdit?.Name}/>
                    </View>
                    <View style={{marginTop:30,  alignItems:'center', flexDirection:'row'}} >
                    <Pressable onPress={async()=>{await setflag(false);EditTimeWork(ChoosenEdit)}} style={{marginHorizontal:40, backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                            <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Cập nhật</Text>
                        </Pressable>
                        <Pressable onPress={()=>{setModalEdit(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                            <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Thoát</Text>
                        </Pressable>
                    </View>
              </Overlay>
              </>
          );
      };
const ModalAddTimeWork: React.FC = ()=>
{
    const [NametimWork, SetNameTimeWork]= useState<string>('');
    return (
        <>
        <View style={{borderBottomColor:'', borderBottomWidth:1}}>
            <Text style={{textAlign:'center',fontSize:18,fontWeight:'700', paddingBottom:8}}>Thông tin ca</Text>
        </View>
        <View style={{marginTop:25, justifyContent:'center'}}>
           <CustomInput style={{width:reponsivewidth(300),marginLeft:5}} title="Tên ca" onchange={(text)=>{SetNameTimeWork(text)}} /> 
        </View>
        <View style={{marginTop:30,  alignItems:'center', flexDirection:'row'}} >
        <Pressable onPress={()=>{onAddTimeWork(NametimWork)}} style={{marginHorizontal:40, backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Thêm</Text>
            </Pressable>
            <Pressable onPress={()=>{setvisible(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Thoát</Text>
            </Pressable>
        </View>
        </>
    );
};
type props={
    Visible :boolean,
    onClosed: ()=>void,
    title?: string,
    valueSearch: string,
    placeHolder: string,
    onChangeText?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => any,
    Data: any[];
  }
  const ModalMutipleSelected: React.FC<props> = ({Visible, onClosed,title ,placeHolder,Data}:props)=>{
  const modalizeRef = useRef<Modalize>(null);
  const [valuesea, setvaluesea]  = useState<string >('');
  const [dataQuery,setdataquery] = useState<any[]>([]);
  const [dataSelected, setdataSelected]  = useState<string []>([]);
 useEffect(()=>{
    if (Visible === true)
    {
        modalizeRef.current?.open();
    }
    ; 
 },[Visible]);

  const onsearch = useCallback((valuesearch: string)=>
  {  if (valuesearch.length > 0)
      {
         var user = Data.filter(item=> item.Name.toLowerCase().includes(valuesearch));
         if (user.length > 0)
         {
             setdataquery(user);
         }
         else
         {
             setdataquery([{error: 'Nhân viên không tìm thấy'}]);
         }
      }
      else
      {
          if (valuesearch.length < 0 || valuesearch === '' || valuesearch === null)
          { 
              setdataquery([]);
          }
      }
  }
  ,[Data]);
  useEffect(()=>
  {
    if (isrerender === true)
      {
      getuserAssignment(new Date(dayChoosen).toDateString(),TimeworkSelected ? TimeworkSelected.id : 'all');  
      setisrerender(false);
      }
})
  useEffect(()=>
  {
      onsearch(valuesea.toLowerCase());
  }
  ,[onsearch, valuesea]);
  const onPress = ( id:string,pressed:boolean)=>{
          if (pressed)
          {
              setdataSelected(dataSelected.filter(item=>item !== id));
          }
          else
          {
              setdataSelected([...dataSelected, id]);
          }
  };
 function onFinishChoose () {
     var DataSelected : any[] = [];
     
       // console.log(dataSelected);
      for ( let i = 0; i < dataSelected.length; i++ )
    {
      Data.forEach( item => {if ( item.id === dataSelected[i] )
      {
          DataSelected.push(item);
      }
      });
    }
    if (DataAssignment.length === 0 )
    {
    setTimeout(()=>{ setdataSelected2(dataSelected); setDataAssignment(DataSelected)},1000);
    // console.log(DataSelected);
    }
    // else
    // {
         if (DataAssignment.length > 0)         {
        //     for (let i = 0; i < DataSelected.length; i++)
        //        { 
        //         for (let j = 0; j < staffArrayselected.length; j++)
        //             {
        //                 if (DataSelected[i].id === staffArrayselected[j].id)
        //                 {
        //                     break;
        //                 }
        //                 else
        //                 {
        //                 Datafilter.push(DataSelected[i]);
        //                 }
        //             }
        //         }
        setTimeout(()=> {setdataSelected2(dataSelected); ; setDataAssignment(prev =>prev.concat(DataSelected))},1000);
        }
        modalizeRef.current?.close();
    //}
  };
      return (
           <Modalize ref={modalizeRef} modalHeight={reponsiveheight(750)}  onClosed={onClosed} rootStyle={{height:reponsiveheight(800)}} >
          <View >
              <View style={{borderBottomColor:'#b7b7b7',borderWidth:1, width:reponsivewidth(400)}}>
                  <Text style={{fontSize:18, fontWeight:'700',textAlign:'center', padding:8}}>{title}</Text>
              </View>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:8}}>
                  <SearchBar  containerStyle={{borderBottomColor:'#838282', borderWidth:0.8    , width:reponsivewidth(380), height:reponsiveheight(50),alignItems:'center', justifyContent:'center',borderRadius:4}} onChange={(e)=>setvaluesea(e.nativeEvent.text)}  value={valuesea} placeholder={placeHolder} platform="android" />
              </View>
              <View>
                 <ScrollView>
                      {/* {  console.log(dataQuery.length <= 0 )} */}
                      {/* {console.log('data',Data)}; */}
                      {dataQuery.length > 0  && !dataQuery[0]?.error ? ( dataQuery.map(item=>{
                          let check1 = 0;
                          const pressedbox = dataSelected.includes(item.id);
                          if (DataAssignment.length > 0)
                          {
                          DataAssignment.forEach(i=> {
                              if ( i.id === item.id )
                              {
                                  check1 = 1;
                              }
                          });
                          if ( check1 === 1)
                          {
                            return (
                                <TouchableOpacity disabled={true} key={item.id}  onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                <CustomBox  stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                              );
                          }
                          else
                          {
                          return (
                            <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                    <CustomBox  stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                        );
                          }
                        }
                          else
                          {
                          return (
                            <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                    <CustomBox  stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                        );
                          }
                      }))
                          :
                          
                          dataQuery[0]?.error ? <Text style={{fontSize:16, alignSelf:'center', textAlign:'center', marginTop:18}}>{ dataQuery[0].error}</Text> :
                         ( Data.map(item=>{
                             let check = 0;
                            const pressedbox = dataSelected.includes(item.id);
                
                              if (DataAssignment.length > 0)
                            {
                              DataAssignment.forEach( i=> {
                                  if (i.id === item.id)
                                  {
                                        check = 1;
                                  }
                                  });
                                  if (check === 1)
                                  {
                                        return (
                                        <TouchableOpacity key={item.id} disabled={true} onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                                <CustomBox stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                        </TouchableOpacity>
                                    );
                                  }
                                  else
                                  {

                                      return (
                                    <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                            <CustomBox stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                    </TouchableOpacity>
                                );
                                  }
                            }
                            else
                            {
                            return (
                                <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                        <CustomBox stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                </TouchableOpacity>
                            );
                            }
                              //console.log(dataSelected);
                          })
                         )
                      }
                 </ScrollView>
              </View>
              <View style={{marginTop:15, justifyContent:'center', alignItems:'center'}} >
              <TouchableOpacity onPress={
              async ()=>{
                   onFinishChoose();
              }
              } style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                  <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}> Chọn</Text>
              </TouchableOpacity>
          </View>
          </View>
          </Modalize>
      );
  };
  const onPressDay = async (day: any)=>
  {
    await getuserAssignment(new Date(day.dateString).toDateString(),'all'); 
    pickday(day);
    getTimeWork(new Date(day.dateString).toDateString());
    setTimeWorkSeleted(undefined);
    setdayChoosen(new Date(day.dateString));
   
  };
  const onsaveAssignment = (day: string , TimeworkID: any)=>{
      if (TimeworkSelected !== undefined && dataSelected2 !== undefined)
      {dataSelected2.forEach( item=> 
        data.PostAssigment('Assignment',item,TimeworkID,day)
        )}

  };
  const onAddTimeWork = (NameTimeWork: string) =>{
    data.PostTimeWork('TimeWork',NameTimeWork,new Date(dayChoosen).toDateString());
    setvisible(false);
   
};
const onDeletedAssignment= (id: string)=>{
    data.deletedatAssignment('Assignment',id);
}
    return (
        <>
        <View style={styles.container} >
            <CustomHeader title="Lịch thi công trong tuần" onpress={()=>navigation.navigate('MainScreen')}/>
        <View style={{flex:0.45,borderColor:'#ebe9e9', borderWidth:2, marginBottom:25}}>
            <Calendar  headerStyle={{height:reponsiveheight(55)}}   onDayPress={async(day)=>{ await onPressDay(day)}} firstDay={1}/>
        </View>
        <View style={{flex:0.12,marginTop:5}} >
            <View style={{backgroundColor:'#67bff3',height:reponsiveheight(35),borderRadius:2, flexDirection:'row'}}>
            <Text style={{textAlignVertical:'center',fontSize:16,color:'#FFFF',flex:0.9}}>{Changeday}</Text>
            <Pressable onPress={()=>setvisible(true)} style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} ><Ionicons  name="add-circle" size={26}/><Text style={{fontWeight:'700', marginLeft:5}}>Thêm ca</Text></Pressable>
            </View>

        <Pressable onPress={()=>{setvisiblelist(true); getTimeWork(new Date(dayChoosen).toDateString())}} style={{backgroundColor:'#FFF', borderColor:'#c1c0c0', borderWidth:1,marginTop:2}}>
             {/* <Text style={{padding:7, fontSize: 16, marginLeft:10, fontWeight:'700'}}>Ca : <Text style={{padding:7, fontSize: 15, marginLeft:18}}> Cả ngày</Text></Text> */}
             <Text style={{padding:7, fontSize: 16, marginLeft:10, fontWeight:'500'}}>{(TimeworkSelected === undefined)  ? 'Chọn Ca' : TimeworkSelected?.Name}</Text>
        </Pressable>
        {/* <ScrollView style={{marginBottom:5}}>
           <CustomBoxItem IsnotButton={true} title=" Nguyễn văn A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
           <CustomBoxItem IsnotButton={true} title=" Nguyễn văn A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
           <CustomBoxItem IsnotButton={true} title=" Nguyễn văn A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
           <CustomBoxItem IsnotButton={true} title=" Nguyễn văn A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
            <CustomBoxItem IsnotButton={true} title=" Nguyễn văn A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
        </ScrollView> */}
        </View>
     
        { TimeworkSelected !== undefined && new Date(dayChoosen).getDay()>= new Date().getDay()?
        <View style={{ justifyContent:'flex-end',flexDirection:'row'}}>
            <Pressable onPress={()=>{setVisibleModal(true)}} style={{flexDirection:'row', alignItems:'center'}}>
                <Ionicons  name="add" size={26}/>
                <Text style={{padding:8,fontWeight:'700'}}>Chọn Nhân viên</Text>
            </Pressable>
        </View>
        : undefined
        }
        <View style={{flex:0.4 }}>
            <ScrollView style={{height:reponsiveheight(300)}}>
            {/* { console.log(DataAssignment)}  */}
                {DataAssignment.length > 0 && DataAssignment.map(item=>(<CustomBoxItem key={item.id} IsnotButton={true} title={item.Name} Style={{width:'98%', height:reponsiveheight(70),marginTop:reponsiveheight(10)}} newButton={<Pressable onPress={async ()=>{
                var user ;
                    if (TimeworkSelected !== undefined)
                {
                  user = AssignmentData.filter(items=>items.EmployeeID === item.id && items.Time == TimeworkSelected.id && items.Day === new Date(Changeday).toDateString());
                  console.log(user);
                  user.forEach( assignment =>{
                    onDeletedAssignment(assignment.id); 
                  })
                  setisrerender(true);
                }
                else
                {
                    user = AssignmentData.filter(items =>items.EmployeeID === item.id && items.Day === new Date(dayChoosen).toDateString());
                    console.log(user);
                    user.forEach( assignment =>{
                        onDeletedAssignment(assignment.id); 
                       
                      });
                      setisrerender(true);
                }
                }} style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>)) }
            </ScrollView>
        </View>
        <View style={{flex:0.1, justifyContent:'center', alignItems:'center' }}>
        <TouchableOpacity onPress={ ()=>{
        
        if (TimeworkSelected !== undefined){
        onsaveAssignment(new Date(dayChoosen).toDateString(), TimeworkSelected.id);}}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                  <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}> Lưu</Text>
              </TouchableOpacity>
        </View>
        <Overlay overlayStyle={{height:reponsiveheight(250), width:reponsivewidth(350)}} isVisible={visible}>
            <ModalAddTimeWork/>
        </Overlay>
        <Overlay overlayStyle={{height:reponsiveheight(450), width:reponsivewidth(350)}} isVisible={visiblelist}>
           <ModalListimeWork/>
        </Overlay>
        </View>
        <ModalMutipleSelected  valueSearch={valueSearching} placeHolder="Nhập tên nhân viên"   Data={staffArray} title=" Danh sách Nhân viên" Visible={visibleModal} onClosed={()=>{setVisibleModal(false)}}/>
    </>
    );
};
const styles = StyleSheet.create(
    {
        container:{
            flex:1,

        },
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
    },
    
);
