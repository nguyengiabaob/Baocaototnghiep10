/* eslint-disable no-lone-blocks */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInputChangeEventData, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Input, Overlay, SearchBar } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import PersonIcon from '../../asset/svg/person.svg';
import ClockIcon from '../../asset/svg/clock.svg';
import CoinIcon from '../../asset/svg/coins.svg';
import MoneyHourIcon from '../../asset/svg/Moneyforhour.svg';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Modalize } from 'react-native-modalize';
import data from '../../services/data';
import CustomBox from '../../Model/CustomBox';
import { Userdata } from '../../Model/User';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import { CustomNotification } from '../../Model/CustomNofication';
import DataService from '../../services/dataservice';
import MonthSelector from 'react-native-month-selector';
import moment from 'moment';
import { AttendanceMode } from '../../Model/AttendanceModel';
export const Wages :React.FC = ()=>{
 const [DataAssignment, setDataAssignment] = useState<Userdata[]>([]);
 const [EmployeeIDselected, setEmployeeIDselected] = useState<Userdata[]>([]);
 const [AddSuccess, setAddSuccess] = useState<boolean>(false);
 const [AddError, setAddError] = useState<boolean>(false);
 const [chooosenMonth, setChoosenMonth] = useState<any>();
 const [visibleMonth, setVisibleMonth] = useState<boolean>(false);
 const [ArrayTime, setArrayTime] = useState<any[]>();
 const [AttendanceLog, setAttendanceLog] = useState<AttendanceMode[]>();
 const [stringTime, setstringTime] = useState<string>('');
 const [ArrayWages,SetArrayWages]= useState<any[]>();
 const getTextTimeWork = (array: any []) =>
 {
     let a = '';
     array.forEach(i=>{
         a += i.TimeWork ==0 ? '' :i.TimeWork  + ',';
     });
     return a;
 };
 const CaculatedTimeWork = useCallback(async(DayCheck: any)=>{
    let arr : any[] = [];
    if (EmployeeIDselected.length > 0)
    {
        let a = await DataService.Getdata_dtService<AttendanceMode>('LogAttendance');
        EmployeeIDselected.forEach(item=>{
            // let countStart = 0;
            let totalTime = 0;
           a.forEach(i=> {
                if (i.userId === item.id && new Date(i.date).getMonth() + 1 == new Date( DayCheck).getMonth() + 1 && new Date(i.date).getFullYear() === new Date( DayCheck).getFullYear() )
                {
                   if (i.type == 'B???t ?????u')
                    {
                        let time= 0;
                        // countStart +=   Number(Number(new Date(i.time).getMinutes() / 60).toFixed(2));
                        let b =a.find(x=> 
                            new Date(x.time).getDate() ==  new Date(i.time).getDate() &&  new Date(x.time).getMonth()+1 ==  new Date(i.time).getMonth()+ 1 &&  new Date(x.time).getFullYear() ==  new Date(i.time).getFullYear() && x.type =='K???t th??c'
                        )
                        if(b)
                        {
                            let hours = (new Date(b.time).getHours() - new Date(i.time).getHours()) * 60 ;
                            let minutes = new Date(b.time).getMinutes() - new Date(i.time).getMinutes() ;
                            time = Number(((hours + minutes)/ 60).toFixed(2)) ;
                            totalTime += time;
                        }
                    }
                        // console.log('TimeArray',  new Date(i.time).geHours());
                    // } 
                    // if (i.type == 'B???t ?????u')
                    // {
                    //     countStart +=   Number(Number(new Date(i.time).getMinutes() / 60).toFixed(2));
                    //     // console.log('TimeArray',  new Date(i.time).geHours());
                    // }
                    // else
                    // {
                    //     if (i.type == 'K???t th??c')
                    //     {
                    //         countEnd += Number(Number(new Date(i.time).getMinutes() / 60).toFixed(2));
                    //         // console.log('TimeArray',  i);
                    //     }
                    // }
                }
           });
        //    console.log('countEnd',   countEnd );
           console.log('countStart',  totalTime );
           arr.push({
               ...item,
               TimeWork: totalTime === 0  ? 0 : totalTime ,
               DateLog: new Date(DayCheck).toDateString(),

           });
        });
        console.log('TimeArray', arr);
        setstringTime(getTextTimeWork(arr));
        SetArrayWages(arr);
        return arr;
    }
    setstringTime(getTextTimeWork(arr));
    SetArrayWages(arr);
    return [];
 } ,[EmployeeIDselected]);
 useEffect(()=>{
     if (chooosenMonth)
     {
         console.log('78956456',chooosenMonth);
        CaculatedTimeWork(chooosenMonth);
     }
 },[chooosenMonth,CaculatedTimeWork])
 const renderModalMonth = useCallback(()=>{
    return (
        <Overlay isVisible={visibleMonth}>
<View
  style={{
    width: reponsivewidth(300),
    height: reponsiveheight(450),
    marginBottom: -25,
  }}>
  <MonthSelector
    onMonthTapped={month => {
      console.log('month',month.toDate());
      setChoosenMonth(month.toDate());
      setVisibleMonth(false);
    //   setModalCalendar(false);
    //   setModelFilter(false);
    //   setFilter('2');
    }}
    maxDate={moment(new Date(new Date().getFullYear(), 10))}
    selectedBackgroundColor="#02569E"

    prevIcon={
      <EvilIcons name="chevron-left" size={32} color={'#757575'} />
    }
    nextIcon={
      <EvilIcons name="chevron-right" size={32} color={'#757575'} />
    }
  />
  <TouchableOpacity
    style={[
      {
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 25,
        marginRight: 15,
      },
    ]}
    onPress={() => setVisibleMonth(false)}>
    <Text style={{fontWeight: '700', color: 'black'}}>Tho??t</Text>
  </TouchableOpacity>
</View>
{/* <Text>dsadsad</Text> */}
</Overlay>
    );
},[visibleMonth]);
 type props={
    Visible :boolean,
    onClosed?: ()=>void,
    title?: string,
    placeHolder?: string,
    onChangeText?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => any,
}
    const ModalEmployee:React.FC<props> = ({Visible,onClosed})=>{
        const modalizeRef = useRef<Modalize>(null);
        const [dataSelected, setdataSelected]  = useState<Userdata []>([]);
        const [valueSearch, setvalueSearch] = useState<string>('');
        const [dataQuery,setdataQuery] = useState<any[]>([]);
        const [Datauser1,setDatauser1] = useState<Userdata[]>([]);

        const getalluser = async()=>{
        let datarray = await DataService.Getdata_dtService<Userdata>('user');
       setDatauser1(datarray);
    };
        useEffect(()=>{
            if (Visible === true)
            {
                 modalizeRef.current?.open();
                 getalluser();
            }
        },[Visible]);
        const onPress = ( id:Userdata,pressed:boolean)=>{
            if (pressed)
            {
                setdataSelected(dataSelected.filter(item=>item !== id));
            }
            else
            {
                setdataSelected([...dataSelected,id]);
            }
        };
        const onsearch = useCallback((valuesearch: string)=>
        {  if (valuesearch.length > 0 && Datauser1 !== undefined)
      {
         var user = Datauser1.filter(item=> item.Name.toLowerCase().includes(valuesearch));
         if (user.length > 0)
         {
             setdataQuery(user);
         }
         else
         {
             setdataQuery([{error: 'Nh??n vi??n kh??ng t??m th???y'}]);
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
  ,[Datauser1]);
  useEffect(()=>
    {
      onsearch(valueSearch.toLowerCase());
    },[valueSearch,onsearch]);

    function onFinishChoose () {

        setTimeout(()=>{ setEmployeeIDselected(dataSelected);},1000);
        modalizeRef.current?.close();
       //}
     };
        return (
            <Modalize modalStyle={{elevation: 10 }}  ref={modalizeRef} modalHeight={reponsiveheight(750)}  onClosed={onClosed}  rootStyle={{height:reponsiveheight(800), elevation:20}} >
              <SafeAreaView>
                  <View style={{borderBottomColor:'#b7b7b7',borderWidth:1, width:reponsivewidth(400)}}>
                      <Text style={{fontSize:18, fontWeight:'700',textAlign:'center', padding:8}}>Danh s??ch nh??n vi??n</Text>
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
                                <TouchableOpacity disabled={true} key={item.id}  onPress={()=>{onPress(item, pressedBox);}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                <CustomBox  stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                              );
                          }
                          else
                          {
                          return (
                            <TouchableOpacity key={item.id}  onPress={()=>{onPress(item, pressedBox);}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                    <CustomBox  stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                        );
                          }
                        }
                          else
                          {
                          return (
                            <TouchableOpacity key={item.id}  onPress={()=>{onPress(item, pressedBox);}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                    <CustomBox  stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                        );
                          }
                      }))
                          :
                          dataQuery[0]?.error ? <Text style={{fontSize:16, alignSelf:'center', textAlign:'center', marginTop:18}}>{ dataQuery[0].error}</Text> :
                         ( Datauser1 ?.map(item=>{
                             let check = 0;
                            const pressedBox = dataSelected.includes(item);
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
                                        <TouchableOpacity key={item.id} disabled={true} onPress={()=>{onPress(item, pressedBox);}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                                <CustomBox stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                        </TouchableOpacity>
                                    );
                                  }
                                  else
                                  {

                                      return (
                                    <TouchableOpacity key={item.id}  onPress={()=>{onPress(item, pressedBox);}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                            <CustomBox stylecontainet={{padding:10}} pressed={pressedBox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                    </TouchableOpacity>
                                );
                                  }
                            }
                            else
                            {
                            return (
                                <TouchableOpacity key={item.id}  onPress={()=>{onPress(item, pressedBox);}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
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
                      <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}> Ch???n</Text>
                  </TouchableOpacity>
              </View>
              </SafeAreaView>
              </Modalize>
          );
    };
    const [visibleModal, setvisibleModal] = useState<boolean>(false);
    const [Datauser,setDatauser] = useState<Userdata[]>([]);
    const [Hours,setHours] = useState<string>('');
    const [MoneyHour,setMoneyHours] = useState<number>(0);
    const [totalsalary, settotalsalary] = useState<number>();
    const tranferday = (d:string)=>{
        var month = new Date(d).getMonth() + 1;
        var date = new Date(d).getDate();
        var year = new Date(d).getFullYear();
       return   date + '/' + month + '/' + year;
    };
    const getLogAttendance = async()=>{
        let dataArray = await DataService.Getdata_dtService<AttendanceMode>('LogAttendance');
        setAttendanceLog(dataArray);
    };
    useEffect(()=>{
        getLogAttendance;
    },[]);

    const RenderEmployeeSelected = ()=>
    {
        if (EmployeeIDselected.length > 0)
        {
           return (
                <SafeAreaView style={{flexDirection:'row', alignItems:'center'}}>
                 <Text style={{fontWeight:'700',marginLeft:25,fontSize:16}}>Nh??n vi??n</Text>
                <View style={[styles.shadowNames,{flexDirection:'row',marginLeft:30,backgroundColor:'#849ecf',paddingTop:15, paddingLeft:10, paddingRight:1, paddingBottom:15,borderRadius:5,}]}>
                    <Pressable style={{flexDirection:'row'}}>
                  { EmployeeIDselected ?
                      EmployeeIDselected.map(item=> {
                         if (EmployeeIDselected.indexOf(item) === 0)
                        {
                          return (
                              <Text >{item.Name}</Text>
                          );
                        }
                      })

                   : undefined
                  }
                {EmployeeIDselected.length > 1 && <Text>, ...</Text>}
                </Pressable>
                <Pressable style={{marginLeft:10,justifyContent:'flex-end', paddingRight:8}} onPress={()=>{setEmployeeIDselected([]);}}>
                    <Text>x</Text>
                </Pressable>
                </View>
               </SafeAreaView>
           );
        }
    };
    const DoWages = ()=>{
        if ( MoneyHour > 0 && ArrayWages)
        {
            let total1=0;
          Promise.all( ArrayWages.map(i=>{

            let total = i.TimeWork * Number(MoneyHour);
            total1+=total;
                data.PostWages(i.id, Number(MoneyHour),total,i.TimeWork,new Date().toDateString(), chooosenMonth);
            }))
            .then( () => {
                {
                    settotalsalary(total1);
                    console.log( 'Posted Data ');
                    setEmployeeIDselected([]);
                    SetArrayWages([]);
                    setAddSuccess(true);
                    setMoneyHours(0);
                    
                }
            })
            .catch(e=> console.log(e));



    }
    else
    {  console.log(ArrayWages);
        setAddError(true);
    }

};
    return (
        <SafeAreaView style={styles.container}>
        <View style={[styles.shadowNames,{flexDirection:'row',alignItems:'center',marginBottom:15,borderColor:'#606060', borderWidth:1, width:reponsivewidth(150), backgroundColor:'#dbdada', borderRadius:10, marginLeft:5}]}>
            <EvilIcons name="calendar" size={32}/>

            <TouchableOpacity onPress={()=> setVisibleMonth(true)}>
                <Text>{chooosenMonth ? `${new Date(chooosenMonth).getMonth() + 1}/${new Date(chooosenMonth).getFullYear()}` : 'Ch???n th??ng'}</Text>
            </TouchableOpacity>
            {/* <Text>{tranferday(new Date().toDateString())}</Text> */}
        </View>

        {EmployeeIDselected.length > 0 ?  RenderEmployeeSelected() :
         <View style={{alignItems:'center', marginTop:35}}>
            <TouchableOpacity onPressOut={()=>{
                setvisibleModal(true);}} style={styles.btnStaff}>
               <View style={{marginLeft:-40, marginRight:20}}>
                 <PersonIcon  width={reponsivewidth(33)}/>
               </View>

                <Text >Ch???n nh??n vi??n</Text>
            </TouchableOpacity>
        </View>
        }
            <View style={{alignItems:'center', marginTop:50,height:reponsiveheight(50)}}>
            {
               <Input containerStyle={{ width: reponsivewidth(350) }}
               value={stringTime ? stringTime : ''}
                // onChangeText={(text) => { setHours(text); } }
                placeholder="Nh???p s??? gi???"
                keyboardType={'number-pad'}
                leftIcon={<ClockIcon
                    width={reponsivewidth(32)} />} autoCompleteType={undefined} />
                }
            </View>
            <View style={{height:reponsiveheight(50), marginTop:25, alignItems:'center'}}>
            <TextInput />
            <Input containerStyle={{ width: reponsivewidth(350) }}
                onChange={(e) => { setMoneyHours(Number(isNaN(Number(e.nativeEvent.text))) ? Number(e.nativeEvent.text.replace(/,/g, '')) : Number(e.nativeEvent.text)); } }
                placeholder="Nh???p s??? ti???n/gi???"
                value={MoneyHour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                keyboardType={'decimal-pad'}
                leftIcon={<MoneyHourIcon
                    width={reponsivewidth(32)} />} autoCompleteType={undefined}/>
            </View>
            <View style={ [styles.shadowWages, {height: reponsiveheight(50), marginTop:80,justifyContent:'center',flexDirection:'row', alignItems:'center', backgroundColor:'#e7e7e7', width:reponsivewidth(250), alignSelf:'center', zIndex:-99999999}]} >
            <View style={{marginRight:5 }}>
                <CoinIcon   width={reponsivewidth(32)} />
            </View>
                <Text style={{marginRight:25 ,fontStyle:'italic', fontWeight:'700'}} >{totalsalary !== undefined ? totalsalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}</Text>

            <Text style={{fontWeight:'700'}}>VND</Text>
            </View>
            <View style={{width:reponsivewidth(150), alignSelf:'center', marginTop:50}}>
                <TouchableOpacity onPress={()=>{DoWages();}} style={{backgroundColor:'#02569E', padding:15, alignItems:'center', borderRadius:5,}}>
                    <Text style={{color:'#FFF'}}>T??nh l????ng</Text>
                </TouchableOpacity>
            </View>
            <ModalEmployee onClosed={()=>setvisibleModal(false)} Visible={visibleModal} />
            <CustomNotification visible={AddSuccess} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Th??ng b??o"  onCancel={()=>{setAddSuccess(false); settotalsalary(0)} } Content="B???n ???? th??m th??nh c??ng !"/>
           <CustomNotification visible= {AddError}  iconTitle={<Warning width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Th??ng b??o"  onCancel={()=>setAddError(false) } Content="Xin vui l??ng nh???p l???i" />
           {renderModalMonth()}
        </SafeAreaView>
    );
};
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
            elevation: 10,
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
        elevation:4,
        },
});
