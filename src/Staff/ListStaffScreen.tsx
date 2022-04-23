/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
//   StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CheckBox, Text} from 'react-native-elements';
import {
//   TouchableHighlight,
  // TouchableOpacity,
} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
// import Feather from 'react-native-vector-icons/Feather';
import CustomBox from '../Model/CustomBox';
// import CustomHeader from '../Model/CustomHeader';
import {ModelDelete} from '../Model/ModelDelete';
import {EmployeeInformationParamList} from '../navigation/types';
import Entypo from 'react-native-vector-icons/Entypo';
import data from '../services/data';
import {Userdata} from '../Model/User';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';
import {useIsFocused} from '@react-navigation/native';
import DataService from '../services/dataservice';
import {useAppSelector} from '../redux/hook';
import {selectAuth} from '../redux/reducer/authslice';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import Loading from '../Helper/Loader/Loading';
type props = {
  navigation: StackNavigationProp<
    EmployeeInformationParamList,
    'ListStaffScreen'
  >;
};

const ListStaffScreen: React.FC<props> = ({navigation}: props) => {
  const [search, setsearch] = useState<string>('');
  const [flag, setflag] = useState<boolean>(false);
  const [ischeckbox, setcheckbox] = useState<boolean>(false);
  const [datadel, setdatadel] = useState<any[]>([]);
  const [staffArray, setstaffArray] = useState<Userdata[]>([]);
  const [staffArraysearch, setstaffArraysearch] = useState<Userdata[]>([]);
  const [Reload, setReload] = useState<boolean>(false);
  const {typeUser} = useAppSelector(selectAuth);
  const [loading,setLoading] = useState<boolean>(false);
  var isFocused = useIsFocused();
  const getuser = async () => {
    var datarray = await DataService.Getdata_dtService<Userdata>('user');
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
    setstaffArray(datarray);
    // });
  };
   useEffect(()=>{
    database().ref('/user').on('value', snapshot=>{
      setReload(prev=> !prev);
    })
   },[])
  useEffect(() => {
    if (isFocused === true || Reload === false || Reload === true  || flag == true) {
      setLoading(true);
      Promise.resolve( getuser()).then(()=>{
        setLoading(false);
      });

    }
  }, [isFocused, flag, Reload]);
  const getsearch = useCallback(
    (value: string) => {
      if (search != '') {
        let val = value.toLowerCase();
        let res = staffArray.filter(item =>
          item.Name.toLowerCase().includes(val),
        );
        // console.log('abc', res);
        setstaffArraysearch(res);
      } else {
        setstaffArraysearch([]);
      }
    },
    [search, staffArray],
  );
  useEffect(() => {
    getsearch(search);
  }, [getsearch, search]);
  console.log(staffArray);
  // const staffArray = [{
  //     id:'1',
  //     name:'Nguyễn Văn A',
  //     service: 'Nhân viên',
  //     check:false,
  //     Avatar:'',
  // },
  //     {
  //         id:'2',
  //         name:'Nguyễn Văn A',
  //         service: 'Nhân viên',
  //         Avatar:'' ,
  //         check:false,

  //     },
  //     {
  //         id:'3',
  //         name:'Nguyễn Văn A',
  //         service: 'Nhân viên',
  //         Avatar:'' ,
  //         check:false,
  //     },
  //     {
  //         id:'4',
  //         name:'Nguyễn Văn A',
  //         service: 'Nhân viên',
  //         Avatar:'' ,
  //         check:false,
  //     },
  //     {
  //         id:'5',
  //         name:'Nguyễn Văn A',
  //         service: 'Nhân viên',
  //         Avatar:'' ,
  //         check:false,
  //     },
  //     {
  //         id:'6',
  //         name:'Nguyễn Văn A',
  //         service: 'Nhân viên',
  //         Avatar:'' ,
  //         check:false,

  //     },
  //     {
  //         id:'7',
  //         name:'Nguyễn Văn A',
  //         service: 'Nhân viên',
  //         Avatar:'' ,
  //         check:false,

  //     },

  // ];
  const DelImage= (url:string)=>{
    const imgref = storage().refFromURL(url);
    imgref.delete().then(()=>{console.log('del Success')}).catch(e=> console.log(e));
  }
  const ondel = async () => {
    if (datadel.length > 0) {
      datadel.forEach(item => {
        DelImage(item.Avatar);
        data.deletedData('user', item);
      });
      let dataarray = await DataService.Getdata_dtService<any>('Assignment');
      // data.getdata("Assignment").then(res=>{
      //     let dataarray: any[]= [];
      //     for ( let key in res)
      //     {
      //         if ( key !== "0")
      //         {
      //             dataarray.push({
      //                 id: key,
      //                 ...res[key],
      //             })
      //         }
      //     }
      datadel.forEach(item => {
        dataarray.forEach(i => {
          if (i.EmployeeID == item.id) {
            data.deletedData('Assignment', i.id);
          }
        });
      });

      // })
      setdatadel([]);
      setcheckbox(false);
      setflag(true);
      navigation.setOptions({headerShown: true});
    }
  };
  const oncheck = (id: any, check: boolean) => {
    if (check) {
      setdatadel(datadel.filter(item => item !== id));
    } else {
      setdatadel([id, ...datadel]);
    }
  };
  const renderheader = () => {
    return (
      <ModelDelete
        onpressdel={() => {
          setflag(false);
          ondel();
        }}
        onpress={() => {
          setcheckbox(false);
          navigation.setOptions({headerShown: true});
        }}
        textcount={datadel.length.toString()}
      />
    );
  };
  return (
    <SafeAreaView>
      {ischeckbox && renderheader()}
      <View style={styles.containerOption}>
        <Searchbar
          value={search}
          placeholder="Nhập tên nhân viên...."
          style={{width: '95%'}}
          onChangeText={text => {
            setsearch(text);
          }}
        />
        {/* <TouchableHighlight  style={{marginHorizontal:30, flex:1, justifyContent:'center'}}>
                    <Feather name="filter" size={25}/>
                </TouchableHighlight> */}
      </View>
      <View>
    
       { typeUser == 0 &&
          <TouchableOpacity
            onPress={() => navigation.navigate('AddstaffScreen')}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              margin: 6,
            }}>
            <Entypo name="add-user" size={23} />
            <Text style={{marginLeft: 5}}>Thêm</Text>
          </TouchableOpacity>
          }
        
        <ScrollView  style={{height: reponsiveheight(590)}}>
          {staffArraysearch.length > 0
            ? staffArraysearch.map(item => {
                const checked = datadel.includes(item);
                return (
                  <View key={item.id} style={styles.stylecontainer}>
                    {ischeckbox ? (
                      <>
                        <CheckBox
                          checked={checked}
                          style={{
                            justifyContent: 'center',
                            backgroundColor: 'red',
                            width: reponsivewidth(50),
                          }}
                          onPress={() => oncheck(item.id, checked)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('UserInformation', {
                              id: item.id,
                            });
                          }}
                          onLongPress={() => setcheckbox(true)}
                          style={{marginLeft: -30, width: reponsivewidth(320)}}>
                          <CustomBox
                            isAvatar={true}
                            title={item.Name}
                            subtitle={item.service}
                            avatar={{
                              uri:
                                item.Avatar !== 'none' ? item.Avatar : 'none',
                            }}
                          />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('UserInformation', {id: item.id});
                        }}
                        onLongPress={() => {
                          setcheckbox(true);
                          navigation.setOptions({headerShown: false});
                        }}
                        style={{width: reponsivewidth(350)}}>
                        <CustomBox
                          isAvatar={true}
                          title={item.Name}
                          subtitle={item.service}
                          avatar={{
                            uri: item.Avatar !== 'none' ? item.Avatar : 'none',
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            : staffArray.map(item => {
                const checked = datadel.includes(item);
                return (
                  <View key={item.id} style={styles.stylecontainer}>
                    {typeUser === 1 ? (
                      <TouchableOpacity onPress={() => {
                            navigation.navigate('UserInformation', {
                              id: item.id,
                            });
                          }} style={{width: reponsivewidth(350)}}>
                        <CustomBox
                          isAvatar={true}
                          title={item.Name}
                          subtitle={item.service}
                          avatar={{uri: item.Avatar}}
                        />
                      </TouchableOpacity>
                    ) :
                    ischeckbox ? (
                      <>
                        <CheckBox
                          checked={checked}
                          style={{
                            justifyContent: 'center',
                            backgroundColor: 'red',
                            width: reponsivewidth(50),
                          }}
                          onPress={() => oncheck(item.id, checked)}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('UserInformation', {
                              id: item.id,
                            });
                          }}
                          onLongPress={() => setcheckbox(true)}
                          style={{marginLeft: -30, width: reponsivewidth(320)}}>
                          <CustomBox
                            isAvatar={true}
                            title={item.Name}
                            subtitle={item.service}
                            avatar={{uri: item.Avatar}}
                          />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                      onPress={() => {
                          navigation.navigate('UserInformation', {id: item.id});
                        }}
                        onLongPress={() => {
                          setcheckbox(true);
                          navigation.setOptions({headerShown: false});
                        }}
                        style={{width: reponsivewidth(350)}}>
                        <CustomBox
                          isAvatar={true}
                          title={item.Name}
                          subtitle={item.service}
                          avatar={{uri: item.Avatar}}
                        />
                      </TouchableOpacity>
                    )}
                    {/* {ischeckbox ? <><CheckBox checked={checked} style={{justifyContent:'center',backgroundColor:'red' ,width:reponsivewidth(50)}} onPress={ ()=> oncheck(item.id,checked)}/> 
                         <TouchableOpacity  onPress={()=>{navigation.navigate('UserInformation',{id:item.id});}} onLongPress={()=>setcheckbox(true)} style={{marginLeft:-30, width:reponsivewidth(320)}}>
                         <CustomBox  isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                         </TouchableOpacity></>
                    :  <TouchableOpacity  onPress={()=>{navigation.navigate('UserInformation',{id:item.id});}} onLongPress={()=>{setcheckbox(true)
                    navigation.setOptions({headerShown: false})}} style={{ width:reponsivewidth(350)}}>
                        <CustomBox isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>

                        </TouchableOpacity>} */}
                  </View>
                );
              })}
        </ScrollView>
      </View>
      <Loading visible={loading}/>
      </SafeAreaView>
  );
};
export default ListStaffScreen;
const styles = StyleSheet.create({
  containerOption: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#dcdcdc',
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: '#FFF',
  },
  stylecontainer: {
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});
