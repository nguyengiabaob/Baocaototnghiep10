/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {Calendar, LocaleConfig} from 'react-native-calendars';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../../Model/CustomHeader';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import {ScrollView} from 'react-native-gesture-handler';
import {Overlay, SearchBar, Text} from 'react-native-elements';
import CustomBoxItem from '../../Model/CustomBoxItem';
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {AssignmentParamaList, ManageEmployeePramaList} from '../../navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../Model/CustomInput';
import {Modalize} from 'react-native-modalize';
import data from '../../services/data';
import {Userdata} from '../../Model/User';
import {useIsFocused} from '@react-navigation/native';
import CustomBox from '../../Model/CustomBox';
import {Assigment} from '../../Model/Assignment';
import {timeWork} from '../../Model/TimeWork';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '../../redux/hook';
import {selectAuth} from '../../redux/reducer/authslice';
import database from '@react-native-firebase/database';
import Loading from '../../Helper/Loader/Loading';
import OptionModal from './OptionModal';
import DataService from '../../services/dataservice';
import AddUpdateTimeWork from './AddUpdateTimeWork';
type props = {
  // navigation: StackNavigationProp<ManageEmployeePramaList, 'AssignmentParamaList'>;
  navigation : StackNavigationProp<AssignmentParamaList,'Assignment'>
};
export const AssignmentScreen: React.FC<props> = ({navigation2,navigation}: props) => {
  const [visible, setvisible] = useState<boolean>(false);
  const [visiblelist, setvisiblelist] = useState<boolean>(false);
  const [TimeworkSelected, setTimeWorkSeleted] = useState<timeWork>();
  const [Timework, setTimeWork] = useState<timeWork[]>([]);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [staffArray, setstaffArray] = useState<Userdata[]>([]);
  const [staffArrayQuery, setstaffArrayQuery] = useState<Userdata[]>([]);
  const [valueSearching, setvaluesearching] = useState<string>('');
  // const [staffArrayselected, setstaffArrayselected] = useState<Userdata[]>([]);
  const [AssignmentData, setAssginmentData] = useState<Assigment[]>([]);
  const [DataAssignment, setDataAssignment] = useState<any[]>([]);
  const [dataSelected2, setdataSelected2] = useState<string[]>([]);
  const [isrerender, setisrerender] = useState<boolean>(false);
  const [dayChoosen, setdayChoosen] = useState<Date>(new Date());
  const [loading,setLoading]= useState<boolean>(false);
  var isFocused = useIsFocused();
  const {typeUser} = useAppSelector(selectAuth);
  const [Reload, setReload] = useState<boolean>(false);
  const [visibleOption,setVisibleOption]= useState<boolean>(false);
  const [visibleListTimeWork,setVisibleListTimeWork]= useState<boolean>(false);
  const ModelOption = [
    {
      key : 1,
      title: 'Danh s??ch ca chung',
      Action : ()=> {
        setVisibleOption(false);
        navigation.navigate('ListGeneralTimeWork');
      },
    },
    {
      key : 2,
      title: 'Th??m ca ri??ng',
      Action : ()=> {setvisible(true)},
    }
  ]
  const realTime = ()=>{
      database().ref('/user').on('value', snapshot=>{
        getalluser();
        getallAssignment();
      });
      database().ref('/Assignment').on('value', snapshot=>{
        getallAssignment();
      });
  }
  useEffect(()=>{
    realTime();
  },[]);
  const renderListUser= (listuser, listChoosing)=>{
    if(listChoosing.length > 0)
    {
      listChoosing.forEach(x=>{
        listuser = listuser.filter(i=> i.id !== x);
       })
    }

      return listuser;
  }
  const getalluser = () => {
    let datarray: any[] = [];
    data.getdata('user').then(res => {
      for (let key in res) {
        if (key !== '0') {
          datarray.push({
            id: key,
            ...res[key],
          });
        }
      }
      setstaffArray(datarray);
    });
  };
  const getallAssignment = () => {
    let datarray: any[] = [];
    data.getdata('Assignment').then(res => {
      for (let key in res) {
        if (key !== '0') {
          datarray.push({
            id: key,
            ...res[key],
          });
        }
      }
      setAssginmentData(datarray);
    });
  };
  const Datauser = (id: any) => {
    let user = staffArray.filter(item => item.id == id);
    return user;
  };
  const getuserAssignment1 = (dataassignment: any[]) => {
    let array: any[] = [];
    let olduser: any [] = [];
    if(dataassignment.length>0)
    {
    dataassignment.forEach(item => {
      array.push(...Datauser(item.EmployeeID),);
    });
    }
    if (dataSelected2.length>0)
    {
      dataSelected2.forEach(x=>
        {
          olduser.push(...Datauser(x))
        })
      console.log('dataSelected2',olduser)
      array = array.concat(...olduser)
    }
    console.log('Array', array);
    setDataAssignment(array);
  };
  const getuserAssignment = async (day: string, Time: string) => {
    console.log(day);
    let datarray: any[] = [];
    data.getdata('Assignment').then(res => {
      for (let key in res) {
        if (key !== '0') {
          datarray.push({
            id: key,
            ...res[key],
          });
        }
      }
      if (Time === 'all') {
        let check = datarray.filter(item => item.Day === day);
        console.log('check',check)
        if (check.length >0 || dataSelected2.length > 0) {
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
        else {
          setDataAssignment([]);
        }
      } else {
        let check = datarray.filter(
          item => item.Day === day && item.Time == Time,
        );
        console.log('check123',day);
        //console.log('datarray',datarray );
        if (check.length > 0 || dataSelected2.length >0) {
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
        } else {
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
  const getTimeWork =async(day: string) => {
    // let datarray: any[] = [];
    // data.getdata('TimeWork').then(res => {
    //   for (let key in res) {
    //     if (res[key] != null) {
    //       console.log(res);
    //       if (res[key].Day === day) {
    //         datarray.push({
    //           id: key,
    //           ...res[key],
    //         });
    //       }
    //     }
    //   }
    //   console.log('ch???y timework',datarray );
    //   setTimeWork(datarray);
    // });
   let newData= await DataService.Getdata_dtService<timeWork>('TimeWork');
   if(newData.length > 0)
   {
      let d= newData.filter(x=> x.Day === day || x.Type === 1)
      setTimeWork(d);
   }
  };
  useEffect(() => {
    if (isFocused ) {
      getalluser();
      getallAssignment();
    }

    // if (staffArrayselected.length > 0)
    // {
    //     console.log(staffArrayselected);

    // }
  }, [isFocused]);
  useEffect(() => {

    setLoading(true);
    Promise.all([getTimeWork(dayChoosen.toDateString()),
      getuserAssignment(dayChoosen.toDateString(), 'all')]).then(
        (res)=> { setLoading(false)}
      )


  },[]);
  // console.log(DataAssignment);
  const DayVN = (day: string) => {
    if (day === 'Mon') {
      return 'Th??? Hai';
    }
    if (day === 'Tue') {
      return 'Th??? Ba';
    }
    if (day === 'Wed') {
      return 'Th??? T??';
    }
    if (day === 'Thu') {
      return 'Th??? N??m';
    }
    if (day === 'Fri') {
      return 'Th??? S??u';
    }
    if (day === 'Sat') {
      return 'Th??? B???y';
    }
    if (day === 'Sun') {
      return 'Ch??? Nh???t';
    }
  };
  const tranferday = (d: string) => {
    var stringday = new Date(d).toDateString();
    //console.log(d);
    var daynow = DayVN(stringday.substring(0, 3));
    var month = new Date(d).getMonth() + 1;
    var date = new Date(d).getDate();
    var year = new Date(d).getFullYear();
    return daynow + ', ' + date + '/' + month + '/' + year;
  };
  var stringday = new Date().toDateString();
  var daynow = DayVN(stringday.substring(0, 3));
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  var year = new Date().getFullYear();
  var Day = daynow + ', ' + date + '/' + month + '/' + year;
  const [Changeday, setchangeday] = useState<string>(Day);
  const pickday = (day: any) => {
    setchangeday(tranferday(day.dateString));
  };
  // const RenderNoficatioNoData = useCallback (()=>{
  //      return (
  //       <Overlay
  //       overlayStyle={{
  //         height: reponsiveheight(450),
  //         width: reponsivewidth(350),
  //       }}
  //       isVisible={visiblelist}>
  //       <ModalListimeWork Timework={[]} />
  //     </Overlay>
  //      )
  // },[])
  LocaleConfig.locales.vn = {
    monthNames: [
      'Th??ng 1 ',
      'Th??ng 2',
      'Th??ng 3',
      'Th??ng 4',
      'Th??ng 5',
      'Th??ng 6',
      'Th??ng 7',
      'Th??ng 8',
      'Th??ng 9',
      'Th??ng 10',
      'Th??ng 11',
      'Th??ng 12',
    ],
    monthNamesShort: [
      'Tg1.',
      'Tg2.',
      'Tg3',
      'Tg4',
      'Tg5',
      'Tg6',
      'Tg7',
      'Tg8',
      'Tg9',
      'Tg10',
      'Tg11',
      'Tg12',
    ],
    dayNames: [
      'Ch??? nh???t',
      'Th??? 2',
      'Th??? 3',
      'Th??? 4',
      'Th??? 5',
      'Th??? 6',
      'Th??? 7',
    ],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'H??m nay',
  };
  type props_ListTimeWork={
    Timework: any
  }
  LocaleConfig.defaultLocale = 'vn';
  const ModalListimeWork: React.FC<props_ListTimeWork> = ({Timework}) => {
    const [Name, SetName] = useState<string>('');
    const [ModalDetail, setModalDetail] = useState<boolean>(false);
    const [ChoosenEdit, setChoosenEdit] = useState<any>();
    const [flag, setflag] = useState<boolean>(false);
    // const [TimeWork, setTimeWork]= useState<timeWork[]>();
    // const EditTimeWork = (item: any) => {
    //   if (Name !== '') {
    //     data.UpdateTimeWork('TimeWork', Name, item.Day, item.id).then(res => {
    //       if (res == true) {
    //         setflag(true);
    //       }
    //     });
    //     setModalEdit(false);
    //     console.log('Name', Name);
    //   }
    // };
    // const DelTimeWork = (id: string) => {
    //   data.deletedData('TimeWork', id);
    //   data.getdata('Assignment').then(res => {
    //     let datararray: any[] = [];
    //     for (let key in res) {
    //       if (key !== '0') {
    //         datararray.push({
    //           id: key,
    //           ...res[key],
    //         });
    //       }
    //     }
    //     datararray.forEach(item => {
    //       if (item.Time === id) {
    //         data.deletedData('Assignment', item.id);
    //       }
    //     });
    //     setflag(true);
    //   });
    // };
    useEffect(() => {
      if (flag == true) {
        getTimeWork(dayChoosen.toDateString());
      }
    }, [flag]);
    return (
      <>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              paddingBottom: 8,
            }}>
            Danh s??ch ca
          </Text>
        </View>
        <ScrollView style={{borderColor: '#787878', borderTopWidth: 0.75 }}>
          {/* { console.log('123456789', new Date().toDateString())} */}
          {Timework.length > 0 ?
            Timework.map(item => {
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    paddingBottom: 15,
                    marginLeft: 2,
                  }}>
                  <TouchableOpacity
                    onPress={async () => {
                      await setTimeWorkSeleted(item);
                      await setvisiblelist(false);
                      await getuserAssignment(dayChoosen.toDateString(), item.id);

                    }}
                    style={[
                      styles.Shadowbox,
                      {padding: 10, marginTop: 5, flex: 0.9},
                    ]}>
                    <Text style={{padding: 10}}>{item.Name}</Text>
                  </TouchableOpacity>
                  <>
                  <TouchableOpacity
                        onPress={async () => {
                          setChoosenEdit(item);
                          setModalDetail(true);
                        }}
                        style={{marginLeft: 10, justifyContent: 'center'}}>
                        <MaterialCommunityIcons
                          name="calendar-search"
                          size={26}
                          color={'#c6c6c6'}
                        />
                      </TouchableOpacity>
                    </>
                  {/* {new Date(dayChoosen).getDay() >= new Date().getDay() && (
                    <>
                      <TouchableOpacity
                        onPress={async () => {
                          await setflag(false);
                          DelTimeWork(item.id);
                        }}
                        style={{marginLeft: 10, justifyContent: 'center'}}>
                        <Materiallcons
                          name="delete"
                          size={26}
                          color={'#c6c6c6'}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setChoosenEdit(item);
                          setModalEdit(true);
                        }}
                        style={{marginLeft: 10, justifyContent: 'center'}}>
                        <MaterialCommunityIcons
                          name="file-edit"
                          size={26}
                          color={'#c6c6c6'}
                        />
                      </TouchableOpacity>
                    </>
                  )} */}
                </View>
              );
            }) : <Text style={{textAlign:'center', height:reponsiveheight(300), textAlignVertical:'center', opacity:0.4}}>Ch??a c?? th??ng tin ca</Text>}
        </ScrollView>
        <View
          style={{
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <Pressable style={{marginHorizontal:40, backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                      <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>X??c nh???n</Text>
                  </Pressable> */}
          <Pressable
            onPress={() => {
              setvisiblelist(false);
            }}
            style={{
              backgroundColor: '#226cb3',
              padding: 5,
              width: reponsivewidth(100),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
              Tho??t
            </Text>
          </Pressable>
        </View>
        <AddUpdateTimeWork visible={ModalDetail} Item={ChoosenEdit} ReadOnly ={true} onCancel={setModalDetail}/>
        {/* <Overlay isVisible={ModalDetail}>
          <View style={{borderBottomColor: '', borderBottomWidth: 1}}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '700',
                paddingBottom: 8,
              }}>
              Th??ng tin ca
            </Text>
          </View>
          <View style={{marginTop: 25, justifyContent: 'center'}}>
            <CustomInput
              style={{width: reponsivewidth(300), marginLeft: 5}}
              title="T??n ca"
              onchange={text => {
                SetName(text);
              }}
              text={ChoosenEdit?.Name}
            />
          </View>
          <View
            style={{marginTop: 30, alignItems: 'center', flexDirection: 'row'}}>
            <Pressable
              onPress={async () => {
                await setflag(false);
                EditTimeWork(ChoosenEdit);
              }}
              style={{
                marginHorizontal: 40,
                backgroundColor: '#226cb3',
                padding: 5,
                width: reponsivewidth(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
                C???p nh???t
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalEdit(false);
              }}
              style={{
                backgroundColor: '#226cb3',
                padding: 5,
                width: reponsivewidth(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
                Tho??t
              </Text>
            </Pressable>
          </View>
        </Overlay> */}
      </>
    );
  };
  const ModalAddTimeWork: React.FC = () => {
    const [NametimWork, SetNameTimeWork] = useState<string>('');
    return (
      <>
        <View style={{borderBottomColor: '', borderBottomWidth: 1}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              paddingBottom: 8,
            }}>
            Th??ng tin ca
          </Text>
        </View>
        <View style={{marginTop: 25, justifyContent: 'center'}}>
          <CustomInput
            style={{width: reponsivewidth(300), marginLeft: 5}}
            title="T??n ca"
            onchange={text => {
              SetNameTimeWork(text);
            }}
          />
        </View>
        <View
          style={{marginTop: 30, alignItems: 'center', flexDirection: 'row'}}>
          <Pressable
            onPress={() => {
              onAddTimeWork(NametimWork);
            }}
            style={{
              marginHorizontal: 40,
              backgroundColor: '#226cb3',
              padding: 5,
              width: reponsivewidth(100),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
              Th??m
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setvisible(false);
            }}
            style={{
              backgroundColor: '#226cb3',
              padding: 5,
              width: reponsivewidth(100),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
              Tho??t
            </Text>
          </Pressable>
        </View>
      </>
    );
  };
  type props = {
    Visible: boolean;
    onClosed: () => void;
    title?: string;
    valueSearch: string;
    placeHolder: string;
    onChangeText?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => any;
    Data: any[];
  };
  const ModalMutipleSelected: React.FC<props> = ({
    Visible,
    onClosed,
    title,
    placeHolder,
    Data,
  }: props) => {
    const modalizeRef = useRef<Modalize>(null);
    const [valuesea, setvaluesea] = useState<string>('');
    const [dataQuery, setdataquery] = useState<any[]>([]);
    const [dataSelected, setdataSelected] = useState<string[]>([]);
    useEffect(() => {
      if (Visible === true) {
        modalizeRef.current?.open();
      }
    }, [Visible]);

    const onsearch = useCallback(
      (valuesearch: string) => {
        if (valuesearch.length > 0) {
          var user = Data.filter(item =>
            item.Name.toLowerCase().includes(valuesearch) && item.isDelete==false,
          );
          if (user.length > 0) {
            setdataquery(user);
          } else {
            setdataquery([{error: 'Nh??n vi??n kh??ng t??m th???y'}]);
          }
        } else {
          if (
            valuesearch.length < 0 ||
            valuesearch === '' ||
            valuesearch === null
          ) {
            setdataquery([]);
          }
        }
      },
      [Data],
    );
    useEffect(() => {
      if (isrerender === true) {
        getuserAssignment(
          new Date(dayChoosen).toDateString(),
          TimeworkSelected ? TimeworkSelected.id : 'all',
        );
        setisrerender(false);
      }
    });
    useEffect(() => {
      onsearch(valuesea.toLowerCase());
    }, [onsearch, valuesea]);
    const onPress = (id: string, pressed: boolean) => {
      if (pressed) {
        setdataSelected(dataSelected.filter(item => item !== id));
      } else {
        setdataSelected([...dataSelected, id]);
      }
    };
    function onFinishChoose() {
      var DataSelected: any[] = [];

      // console.log(dataSelected);
      for (let i = 0; i < dataSelected.length; i++) {
        Data.forEach(item => {
          if (item.id === dataSelected[i]) {
            DataSelected.push(item);
          }
        });
      }
      if (DataAssignment.length === 0) {
        setTimeout(() => {
          setdataSelected2(dataSelected);
          setDataAssignment(DataSelected);
        }, 1000);
        // console.log(DataSelected);
      }
      // else
      // {
      if (DataAssignment.length > 0) {
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
        setTimeout(() => {
          setdataSelected2(dataSelected);
          setDataAssignment(prev => prev.concat(DataSelected));
        }, 1000);
      }
      modalizeRef.current?.close();
      //}
    }
    return (
      <Modalize
        ref={modalizeRef}
        modalHeight={reponsiveheight(750)}
        onClosed={onClosed}
        rootStyle={{height: reponsiveheight(800)}}>
        <View style={{marginBottom:80}}>
          <View
            style={{
              borderBottomColor: '#b7b7b7',
              borderWidth: 1,
              width: reponsivewidth(400),
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                textAlign: 'center',
                padding: 8,
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <SearchBar
              containerStyle={{
                borderBottomColor: '#838282',
                borderWidth: 0.8,
                width: reponsivewidth(380),
                height: reponsiveheight(50),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}
              onChange={e => setvaluesea(e.nativeEvent.text)}
              value={valuesea}
              placeholder={placeHolder}
              platform="android"
              round={true}
            />
          </View>
          <View>
            <ScrollView>
              {/* {  console.log(dataQuery.length <= 0 )} */}
              {/* {console.log('data',Data)}; */}
              {dataQuery.length > 0 && !dataQuery[0]?.error ? (
                dataQuery.map(item => {
                  let check1 = 0;
                  const pressedbox = dataSelected.includes(item.id);
                  if (DataAssignment.length > 0) {
                    DataAssignment.forEach(i => {
                      if (i.id === item.id) {
                        check1 = 1;
                      }
                    });
                    if (check1 === 1) {
                      return (
                        <TouchableOpacity
                          disabled={true}
                          key={item.id}
                          onPress={() => {
                            onPress(item.id, pressedbox);
                          }}
                          style={{
                            width: reponsivewidth(370),
                            flexDirection: 'row',
                            borderColor: '#c1bbbb',
                            borderWidth: 0.6,
                            marginTop: 15,
                            marginLeft: 10,
                            height: reponsiveheight(85),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                          }}>
                          <CustomBox
                            stylecontainet={{padding: 10}}
                            pressed={pressedbox}
                            isAvatar={true}
                            title={item.Name}
                            subtitle={item.service}
                            avatar={{uri: item.Avatar}}
                          />
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => {
                            onPress(item.id, pressedbox);
                          }}
                          style={{
                            width: reponsivewidth(370),
                            flexDirection: 'row',
                            borderColor: '#c1bbbb',
                            borderWidth: 0.6,
                            marginTop: 15,
                            marginLeft: 10,
                            height: reponsiveheight(85),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                          }}>
                          <CustomBox
                            stylecontainet={{padding: 10}}
                            pressed={pressedbox}
                            isAvatar={true}
                            title={item.Name}
                            subtitle={item.service}
                            avatar={{uri: item.Avatar}}
                          />
                        </TouchableOpacity>
                      );
                    }
                  } else {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          onPress(item.id, pressedbox);
                        }}
                        style={{
                          width: reponsivewidth(370),
                          flexDirection: 'row',
                          borderColor: '#c1bbbb',
                          borderWidth: 0.6,
                          marginTop: 15,
                          marginLeft: 10,
                          height: reponsiveheight(85),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 4,
                        }}>
                        <CustomBox
                          stylecontainet={{padding: 10}}
                          pressed={pressedbox}
                          isAvatar={true}
                          title={item.Name}
                          subtitle={item.service}
                          avatar={{uri: item.Avatar}}
                        />
                      </TouchableOpacity>
                    );
                  }
                })
              ) : dataQuery[0]?.error ? (
                <Text
                  style={{
                    fontSize: 16,
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 18,
                  }}>
                  {dataQuery[0].error}
                </Text>
              ) : (
                Data.map(item => {
                  let check = 0;
                  const pressedbox = dataSelected.includes(item.id);

                  if (DataAssignment.length > 0) {
                    DataAssignment.forEach(i => {
                      if (i.id === item.id) {
                        check = 1;
                      }
                    });
                    if (check === 1) {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          disabled={true}
                          onPress={() => {
                            onPress(item.id, pressedbox);
                          }}
                          style={{
                            width: reponsivewidth(370),
                            flexDirection: 'row',
                            borderColor: '#c1bbbb',
                            borderWidth: 0.6,
                            marginTop: 15,
                            marginLeft: 10,
                            height: reponsiveheight(85),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                          }}>
                          <CustomBox
                            stylecontainet={{padding: 10}}
                            pressed={pressedbox}
                            isAvatar={true}
                            title={item.Name}
                            subtitle={item.service}
                            avatar={{uri: item.Avatar}}
                          />
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => {
                            onPress(item.id, pressedbox);
                          }}
                          style={{
                            width: reponsivewidth(370),
                            flexDirection: 'row',
                            borderColor: '#c1bbbb',
                            borderWidth: 0.6,
                            marginTop: 15,
                            marginLeft: 10,
                            height: reponsiveheight(85),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                          }}>
                          <CustomBox
                            stylecontainet={{padding: 10}}
                            pressed={pressedbox}
                            isAvatar={true}
                            title={item.Name}
                            subtitle={item.service}
                            avatar={{uri: item.Avatar}}
                          />
                        </TouchableOpacity>
                      );
                    }
                  } else {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          onPress(item.id, pressedbox);
                        }}
                        style={{
                          width: reponsivewidth(370),
                          flexDirection: 'row',
                          borderColor: '#c1bbbb',
                          borderWidth: 0.6,
                          marginTop: 15,
                          marginLeft: 10,
                          height: reponsiveheight(85),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 4,
                        }}>
                        <CustomBox
                          stylecontainet={{padding: 10}}
                          pressed={pressedbox}
                          isAvatar={true}
                          title={item.Name}
                          subtitle={item.service}
                          avatar={{uri: item.Avatar}}
                        />
                      </TouchableOpacity>
                    );
                  }
                  //console.log(dataSelected);
                })
              )}
            </ScrollView>
          </View>
          <View
            style={{
              marginTop: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={async () => {
                onFinishChoose();
              }}
              style={{
                backgroundColor: '#226cb3',
                padding: 5,
                width: reponsivewidth(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
                {' '}
                Ch???n
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    );
  };
  const onPressDay = async (day: any) => {
    await getuserAssignment(new Date(day.dateString).toDateString(), 'all');
    pickday(day);
    getTimeWork(new Date(day.dateString).toDateString());
    setTimeWorkSeleted(undefined);
    setdayChoosen(new Date(day.dateString));
  };
  const onsaveAssignment = (day: string, TimeworkID: any) => {
    if (TimeworkSelected !== undefined && dataSelected2 !== undefined) {
      dataSelected2.forEach(item =>
        data.PostAssigment('Assignment', item, TimeworkID, day),
      );
    }
  };
  const onAddTimeWork = (NameTimeWork: string) => {
    data.PostTimeWork(
      'TimeWork',
      NameTimeWork,
      new Date(dayChoosen).toDateString(),
    );
    setvisible(false);
  };
  const onDeletedAssignment = (id: string) => {
    data.deletedatAssignment('Assignment', id);
  };
  return (
    <SafeAreaView style= {{flex:1}}>
      <View style={styles.container}>
        <CustomHeader
          title="L???ch thi c??ng trong tu???n"
          onpress={() => navigation.goBack()}
        />
        <View
          style={{
            
            borderColor: '#ebe9e9',
            borderWidth: 2,
         
          }}>
          <Calendar
           hideDayNames={true}
            onDayPress={async day => {
              await onPressDay(day);

            }}
            style={{height: reponsiveheight(380)}}
            firstDay={1}
          />
        </View>
        <View style={{ marginTop: reponsiveheight(8)}}>
          <View
            style={{
              backgroundColor: '#67bff3',
              height: reponsiveheight(35),
              borderRadius: 2,
              flexDirection: 'row',
            

            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                fontSize: 16,
                color: '#FFFF',
                flex: 0.9,
              }}>
              {Changeday}
            </Text>
            {typeUser == 0 && (
              <Pressable
                onPress={() => navigation.navigate('ListGeneralTimeWork')}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Materiallcons name="list-alt" size={26} />
                <Text style={{fontWeight: '700', marginLeft: 5}}>Danh s??ch ca</Text>
              </Pressable>
            )}
          </View>
          <View>
          <Pressable
            onPress={() => {
              setvisiblelist(true);
              getTimeWork(new Date(dayChoosen).toDateString());
            }}
            style={{
              backgroundColor: '#FFF',
              borderColor: '#c1c0c0',
              borderWidth: 1,
              marginTop: 2,

            }}>
            {/* <Text style={{padding:7, fontSize: 16, marginLeft:10, fontWeight:'700'}}>Ca : <Text style={{padding:7, fontSize: 15, marginLeft:18}}> C??? ng??y</Text></Text> */}
            <Text
              style={{
                padding: 7,
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '500',
              }}>
              {TimeworkSelected === undefined
                ? 'Ch???n Ca'
                : TimeworkSelected?.Name}
            </Text>
          </Pressable>
          </View>
          <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          { typeUser == 0 && TimeworkSelected !== undefined &&
        new Date(dayChoosen).getDate() >= new Date().getDate() && new Date(dayChoosen).getMonth() +1  >= new Date().getMonth() + 1 && new Date(dayChoosen).getFullYear() >= new Date().getFullYear() && (

            <TouchableOpacity
              onPress={() => {
                //
                setVisibleModal(true);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="add" size={26} />
              <Text style={{padding: 8, fontWeight: '700'}}>
                Ch???n Nh??n vi??n
              </Text>
            </TouchableOpacity>
        ) }
        </View>
          {/* <ScrollView style={{marginBottom:5}}>
           <CustomBoxItem IsnotButton={true} title=" Nguy???n v??n A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
           <CustomBoxItem IsnotButton={true} title=" Nguy???n v??n A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
           <CustomBoxItem IsnotButton={true} title=" Nguy???n v??n A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
           <CustomBoxItem IsnotButton={true} title=" Nguy???n v??n A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
            <CustomBoxItem IsnotButton={true} title=" Nguy???n v??n A" Style={{width:'98%', height:reponsiveheight(55),marginTop:reponsiveheight(10)}} newButton={<Pressable style={{alignSelf:'center', marginLeft:reponsivewidth(120)}}><Materiallcons  name="delete"  size={30} color="#454444"/></Pressable>}/>
        </ScrollView> */}

        </View>
        {/* <View style={{justifyContent: 'flex-end', flexDirection: 'row', marginTop:10}}>
          {TimeworkSelected !== undefined &&
        new Date(dayChoosen).getDay() >= new Date().getDay() && (

            <TouchableOpacity
              onPress={() => {
                //
                console.log('123456');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="add" size={26} />
              <Text style={{padding: 8, fontWeight: '700'}}>
                Ch???n Nh??n vi??n
              </Text>
            </TouchableOpacity>
        ) }
        </View> */}
        <View >
          <ScrollView style={{height: typeUser == 0 && TimeworkSelected !== undefined &&
        new Date(dayChoosen).getDate() >= new Date().getDate() && new Date(dayChoosen).getMonth() +1  >= new Date().getMonth() + 1 && new Date(dayChoosen).getFullYear() >= new Date().getFullYear() ? reponsiveheight(160) : reponsiveheight(180)}}>
            {/* { console.log(DataAssignment)}  */}
            {DataAssignment.length > 0 &&
              DataAssignment.map(item => (
                <CustomBoxItem
                  Avatarimg={{uri:item.Avatar}}
                  key={item.id}
                  IsnotButton={true}
                  title={item.isDelete == true ? `${item.Name} (???? ngh??? vi???c)` :item.Name }
                  Style={{
                    width: '98%',
                    height: reponsiveheight(70),
                    marginTop: reponsiveheight(10),
                  }}
                  newButton={
                    typeUser == 0 ?
                    <Pressable
                      onPress={async () => {
                        var user;
                        if (TimeworkSelected !== undefined) {
                          user = AssignmentData.filter(
                            items =>
                              items.EmployeeID === item.id &&
                              items.Time == TimeworkSelected.id &&
                              items.Day === new Date(Changeday).toDateString(),
                          );
                            if (user.length>0)
                            {
                              user.forEach(assignment => {
                                onDeletedAssignment(assignment.id);
                              });
                              setisrerender(true);
                            }
                            else
                            {
                              setdataSelected2(dataSelected2.filter(x=> x !== item.id))
                             
                            }
                            setisrerender(true);

                        } else {
                          user = AssignmentData.filter(
                            items =>
                              items.EmployeeID === item.id &&
                              items.Day === new Date(dayChoosen).toDateString(),
                          );
                         if (user.length > 0)
                         {
                          user.forEach(assignment => {
                            onDeletedAssignment(assignment.id);
                          });
                         }
                         else
                         {
                           setdataSelected2(dataSelected2.filter(x=> x !== item.id));
                         }
                         setisrerender(true);
                        }
                      }}
                      style={{
                        alignSelf: 'center',
                        marginLeft: reponsivewidth(120),
                      }}>
                      <Materiallcons name="delete" size={30} color="#454444" />
                    </Pressable>: undefined
                  }
                />
              ))}
          </ScrollView>
        </View>
        <View
          style={{ justifyContent: 'center', alignItems: 'center'}}>
          {typeUser == 0 && (
            <TouchableOpacity
              disabled={dataSelected2.length >0 ? false : true}

              onPress={() => {
                if (TimeworkSelected !== undefined) {
                  onsaveAssignment(
                    new Date(dayChoosen).toDateString(),
                    TimeworkSelected.id,
                  );
                }
              }}
              style={{
                backgroundColor: dataSelected2.length > 0 ? '#226cb3':  '#c3c3c3',
                padding: 5,
                width: reponsivewidth(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                marginTop:5
              }}>
              <Text style={{fontSize: 16, color: dataSelected2.length > 0 ? '#FFFF' : '#FFFF', fontWeight: '700'}}>
                {' '}
                L??u
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Overlay
          overlayStyle={{
            height: reponsiveheight(250),
            width: reponsivewidth(350),
          }}
          isVisible={visible}>
          <ModalAddTimeWork />
        </Overlay>
        <Overlay
          overlayStyle={{
            height: reponsiveheight(450),
            width: reponsivewidth(350),
          }}
          isVisible={visiblelist}>
          <ModalListimeWork  Timework={Timework}/>
        </Overlay>
      </View>
      <ModalMutipleSelected
        valueSearch={valueSearching}
        placeHolder="Nh???p t??n nh??n vi??n"
        Data={renderListUser(staffArray.filter(x=>x.isDelete === false),dataSelected2)}
        title=" Danh s??ch Nh??n vi??n"
        Visible={visibleModal}
        onClosed={() => {
          setVisibleModal(false);
        }}
      />
      {/* <OptionModal visible={visibleOption} onCancel={setVisibleOption} options={ModelOption} navigation2={navigation2}/> */}
      <Loading visible={loading}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Shadowbox: {
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
});
