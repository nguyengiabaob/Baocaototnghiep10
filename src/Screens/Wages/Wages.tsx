/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native';
import { Input, SearchBar } from 'react-native-elements';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import PersonIcon from '../../asset/svg/person.svg';
import ClockIcon from '../../asset/svg/clock.svg';
import CoinIcon from '../../asset/svg/coins.svg';
import MoneyHourIcon from '../../asset/svg/Moneyforhour.svg';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Modalize } from 'react-native-modalize';
import data from '../../services/data';
import CustomBox from "../../Model/CustomBox";
import { Userdata } from "../../Model/User";
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import { CustomNotification } from "../../Model/CustomNofication";
import DataService from '../../services/dataservice';
export const Wages :React.FC = ()=>{
 const [DataAssignment, setDataAssignment] = useState<Userdata[]>([]);
 const [EmployeeIDselected, setEmployeeIDselected] = useState<string[]>([]);
 const [AddSuccess, setAddSuccess]= useState<boolean>(false);
 const [AddError, setAddError]= useState<boolean>(false);
 type props={
    Visible :boolean,
    onClosed?: ()=>void,
    title?: string,
    placeHolder?: string,
    onChangeText?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => any,
    Data?: any[];
}
    const ModalEmployee:React.FC<props> = ({Visible,onClosed,Data})=>{
        const modalizeRef = useRef<Modalize>(null);
        const [dataSelected, setdataSelected]  = useState<string []>([]);
        const [valueSearch, setvalueSearch] = useState<string>('');
        const [dataQuery,setdataQuery]= useState<any[]>([]);
        useEffect(()=>{
            if (Visible === true)
            {
                 modalizeRef.current?.open();
            }
            ; 
        },[Visible]);
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
        const onsearch = useCallback((valuesearch: string)=>
        {  if (valuesearch.length > 0 && Data !== undefined)
      {
         var user = Data.filter(item=> item.Name.toLowerCase().includes(valuesearch));
         if (user.length > 0)
         {
             setdataQuery(user);
         }
         else
         {
             setdataQuery([{error: 'Nhân viên không tìm thấy'}]);
         }
      }
      else
      {
          if (valuesearch.length < 0 || valuesearch === '' || valuesearch === null)
          { 
              setdataQuery([]);
          }
      }
  }
  ,[Data]);
  useEffect(()=>
    {
      onsearch(valueSearch.toLowerCase());
    },[valueSearch,onsearch]);

    function onFinishChoose () {

        setTimeout(()=>{ setEmployeeIDselected(dataSelected)},1000);
        modalizeRef.current?.close();
       //}
     };
        return (
            <Modalize modalStyle={{elevation:10}}  ref={modalizeRef} modalHeight={reponsiveheight(750)}  onClosed={onClosed}  rootStyle={{height:reponsiveheight(800)}} >
              <View >
                  <View style={{borderBottomColor:'#b7b7b7',borderWidth:1, width:reponsivewidth(400)}}>
                      <Text style={{fontSize:18, fontWeight:'700',textAlign:'center', padding:8}}>Danh sách nhân viên</Text>
                  </View>
                  <View style={{justifyContent:'center', alignItems:'center', marginTop:8}}>
                      <SearchBar  containerStyle={{borderBottomColor:'#838282', borderWidth:0.8    , width:reponsivewidth(380), height:reponsiveheight(50),alignItems:'center', justifyContent:'center',borderRadius:4}} platform="android"  value={valueSearch} onChange={(e)=>setvalueSearch(e.nativeEvent.text)}/>
                  </View>
                  <View>
                     <ScrollView style={{height:reponsiveheight(380)}}>
                     {dataQuery.length > 0  && !dataQuery[0]?.error ? ( dataQuery.map(item=>{
                          let check1 = 0;
                          const pressedBox = dataSelected.includes(item.id);
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
                                <TouchableOpacity disabled={true} key={item.id}  onPress={()=>{onPress(item.id, pressedBox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                <CustomBox  stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                              );
                          }
                          else
                          {
                          return (
                            <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedBox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                    <CustomBox  stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                        );
                          }
                        }
                          else
                          {
                          return (
                            <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedBox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                    <CustomBox  stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                        );
                          }
                      }))
                          :
                          dataQuery[0]?.error ? <Text style={{fontSize:16, alignSelf:'center', textAlign:'center', marginTop:18}}>{ dataQuery[0].error}</Text> :
                         ( Data?.map(item=>{
                             let check = 0;
                            const pressedBox = dataSelected.includes(item.id);
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
                                        <TouchableOpacity key={item.id} disabled={true} onPress={()=>{onPress(item.id, pressedBox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                                <CustomBox stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                        </TouchableOpacity>
                                    );
                                  }
                                  else
                                  {

                                      return (
                                    <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedBox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                            <CustomBox stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                    </TouchableOpacity>
                                );
                                  }
                            }
                            else
                            {
                            return (
                                <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedBox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                        <CustomBox stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
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
                 ()=>{
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
    const [visibleModal, setvisibleModal] = useState<boolean>(false);
    const [Datauser,setDatauser] = useState<Userdata[]>([]);
    const [Hours,setHours] = useState<string>('');
    const [MoneyHour,setMoneyHours] = useState<number>(0);
    const [totalsalary, settotalsalary]=useState<number>();
    const tranferday = (d:string)=>{
        var month = new Date(d).getMonth() + 1;
        var date = new Date(d).getDate();
        var year = new Date(d).getFullYear();
       return   date + '/' + month + '/' + year;
    };
    const getalluser = async()=>{
        let datarray = await DataService.Getdata_dtService<Userdata>('user');
    //     data.getdata('user').then(res=> {for ( let key in res)
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
       setDatauser(datarray);
    // });
    };
    useEffect(()=>{
        getalluser();
    },[])

    const RenderEmployeeSelected=()=>
    {
        let dataArray:any[]= [];
        if (EmployeeIDselected.length>0)
        {
           EmployeeIDselected.forEach( item =>{
               let employee = Datauser.filter(i=> i.id === item);
               dataArray.push(...employee);
           })
           return (
                <View style={{flexDirection:'row', alignItems:'center'}}>
                 <Text style={{fontWeight:'700',marginLeft:25,fontSize:16}}>Nhân viên</Text>
                <View style={[styles.shadowNames,{flexDirection:'row',marginLeft:30,backgroundColor:'#849ecf',paddingTop:15, paddingLeft:10, paddingRight:1, paddingBottom:15,borderRadius:5,}]}>
                    <Pressable style={{flexDirection:'row'}}>
                  { dataArray ? 
                      dataArray.map(item=> {
                         if (dataArray.indexOf(item) === 0)
                        {
                          return (
                              <Text >{item.Name}</Text>
                          );
                        }
                      })

                   : undefined
                  }
                {dataArray.length > 1 && <Text>, ...</Text>}
                </Pressable>
                <Pressable style={{marginLeft:10,justifyContent:'flex-end', paddingRight:8}} onPress={()=>{setEmployeeIDselected([])}}>
                    <Text>x</Text>
                </Pressable>
                </View>
               </View>
           );
        }
    }
    const DoWages = ()=>{
        if (Hours.length>0 && MoneyHour >0 && EmployeeIDselected !== null )
        {
            let total = Number(Hours) * Number(MoneyHour);
            settotalsalary(total);
            EmployeeIDselected.forEach( item=>{
                data.PostWages(item, Number(MoneyHour),total,Number(Hours),new Date().toDateString()).then( res => {if ( res === true)
                {
                    console.log( 'Posted Data ');
                    setEmployeeIDselected([]);
                    setHours('');
                    setMoneyHours(0);
                    setAddSuccess(true);
                }
            });
            })
    }
    else
    {
        setAddError(true);
    }

}
    return (
        <View style={styles.container}>
        <View style={{flexDirection:'row',alignItems:'center',marginBottom:15,borderColor:'#606060', borderWidth:1, width:reponsivewidth(150), backgroundColor:'#dbdada', borderRadius:10}}>
            <EvilIcons name="calendar" size={32}/>
            <Text>{tranferday(new Date().toDateString())}</Text>
        </View>
        {EmployeeIDselected.length > 0 ?  RenderEmployeeSelected() :
         <View style={{alignItems:'center', marginTop:35}}>
            <TouchableOpacity onPress={()=>{setvisibleModal(true)}} style={styles.btnStaff}>
               <View style={{marginLeft:-40, marginRight:20}}>
                 <PersonIcon  width={reponsivewidth(33)}/>
               </View>

                <Text >Chọn nhân viên</Text>
            </TouchableOpacity>
        </View>
        }
            <View style={{alignItems:'center', marginTop:50,height:reponsiveheight(50)}}>
            <Input containerStyle={{ width: reponsivewidth(350) }}
                onChangeText={(text) => { setHours(text); } }
                placeholder="Nhập số giờ"
                keyboardType={"number-pad"}
                leftIcon={<ClockIcon
                    width={reponsivewidth(32)} />} autoCompleteType={undefined} />
            </View>
            <View style={{height:reponsiveheight(50), marginTop:25, alignItems:'center'}}>
            <TextInput />
            <Input containerStyle={{ width: reponsivewidth(350) }}
                onChange={(e) => { setMoneyHours(Number(isNaN(Number(e.nativeEvent.text))) ? Number(e.nativeEvent.text.replace(/,/g, '')) : Number(e.nativeEvent.text)); } }
                placeholder="Nhập số tiền/giờ"
                value={MoneyHour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                keyboardType={"decimal-pad"}
                leftIcon={<MoneyHourIcon
                    width={reponsivewidth(32)} />} autoCompleteType={undefined}/>
            </View>
            <View style={ [styles.shadowWages, {height: reponsiveheight(50), marginTop:80,justifyContent:'center',flexDirection:'row', alignItems:'center', backgroundColor:'#e7e7e7', width:reponsivewidth(250), alignSelf:'center', zIndex:-99999999}]} >
            <View style={{marginRight:5 }}>
                <CoinIcon   width={reponsivewidth(32)} />
            </View>
                <Text style={{marginRight:25 ,fontStyle:'italic', fontWeight:'700'}} >{totalsalary !== undefined ? totalsalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0}</Text>

            <Text style={{fontWeight:'700'}}>VND</Text>
            </View>
            <View style={{width:reponsivewidth(150), alignSelf:'center', marginTop:50}}>
                <TouchableOpacity onPress={()=>{DoWages()}} style={{backgroundColor:'#02569E', padding:15, alignItems:'center', borderRadius:5,}}>
                    <Text style={{color:'#FFF'}}>Tính lương</Text>
                </TouchableOpacity>
            </View>
            <ModalEmployee onClosed={()=>setvisibleModal(false)} Visible={visibleModal} Data={Datauser}/>
            <CustomNotification visible={AddSuccess} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  onCancel={()=>setAddSuccess(false) } Content="Bạn đã thêm thành công !"/>
           <CustomNotification visible= {AddError}  iconTitle={<Warning width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  onCancel={()=>setAddError(false) } Content="Xin vui lòng nhập lại" />
        </View>
    );
}
    const styles = StyleSheet.create({
        container:
        {
         flex:1,
            justifyContent:'flex-start',
            marginTop:18,
        },
        btnStaff :
        {
            flexDirection: 'row',
            backgroundColor:'#ededed',
            justifyContent:'center',
            alignItems:'center',
            width:reponsivewidth(300),
            height:reponsiveheight(75),
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation:10,
        },
        shadowWages:{
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity: 0.23,
        shadowRadius: 2.62,
        },
        shadowNames:{
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation:4
        },
});
