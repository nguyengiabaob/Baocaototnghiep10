/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import DataService from '../services/dataservice';
import database from '@react-native-firebase/database';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';
import CustomHyperLink from '../Model/CustomHyperLink';
import Loading from '../Helper/Loader/Loading';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {AttendanceParamaList} from '../navigation/types';
import {CustomNotificationDel} from '../Model/CustomNoficationDel';
import Warning from '../asset/svg/Warning.svg';
import data from '../services/data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '../redux/hook';
import {selectAuth} from '../redux/reducer/authslice';
import {SearchBar} from 'react-native-elements';
type props = {
  navigation: StackNavigationProp<
    AttendanceParamaList,
    'AttendanceSettingScreen'
  >;
};
const AttendanceListUser: React.FC<props> = ({navigation}) => {
  const [ListAttendance, setListAttendance] = useState<any[]>([]);
  const [ListUser, SetListUser] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteVisible, setVisibleDelete] = useState<boolean>(false);
  const [ItemDeleted, setItemDeleted] = useState<any>();
  const [valueSearch, setvalueSearch] = useState<string>('');
  const [dataSearch, setDataSearch] = useState<any>([]);
  const isFocused = useIsFocused();
  const {userToken} = useAppSelector(selectAuth);
  const [ShowSearch, setShowSearch] = useState<boolean>(false);
  const getListAttendance = useCallback(async () => {
    if (userToken) {
      let a = await DataService.Getdata_dtService<any>('LogAttendance');
      if (a) {
        a = a.filter(x => x.userId == userToken);
        setListAttendance(a);
      }
    }
  }, [userToken]);
  const getListUser = async () => {
    let a = await DataService.Getdata_dtService('user');
    SetListUser(a);
  };
  const Delete = () => {
    if (ItemDeleted) {
      data.deletedData('LogAttendance', ItemDeleted.id).then(res => {
        if (res === true) {
          setVisibleDelete(false);
        }
      });
    }
  };
  const tranferday = (d: string) => {
    var month = new Date(d).getMonth() + 1;
    var date = new Date(d).getDate();
    var year = new Date(d).getFullYear();
    return date + '/' + month + '/' + year;
  };
  const getUser = (id: string) => {
    let a = ListUser?.find(x => x.id == id);
    console.log(a);
    return a;
  };
  useEffect(() => {
    database()
      .ref('/LogAttendance')
      .on('value', () => {
        getListAttendance();
      });
    database()
      .ref('/user')
      .on('value', () => {
        getListUser();
      });
  }, []);
  useEffect(() => {
    if (isFocused == true) {
      setLoading(true);
      Promise.all([getListAttendance(), getListUser()]).then(() => {
        setLoading(false);
      });
    }
  }, [isFocused, getListAttendance]);
  useEffect(() => {
    if (valueSearch != '' || valueSearch != undefined) {
      let a = ListAttendance.filter(
        x =>
          tranferday(x.date).includes(valueSearch) ||
          x.type.toLowerCase().includes(valueSearch.toLowerCase()),
      );
      if (a) {
        setDataSearch(a);
      }
    } else {
      setDataSearch(ListAttendance ? ListAttendance : []);
    }
  }, [valueSearch, ListAttendance]);
  return (
    <SafeAreaView>
      <View
        style={[
          styles.Shadowbox,
          {marginTop: 10, paddingTop: 10, paddingBottom: 10},
        ]}>
        {ShowSearch === false ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowSearch(true);
              }}>
              <Ionicons name={'search-outline'} size={32} />
            </TouchableOpacity>
          </View>
        ) : (
          ShowSearch == true && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SearchBar
                lightTheme={true}
                containerStyle={{
                  width: reponsivewidth(300),
                  height: reponsiveheight(50),
                  borderRadius: 5,
                }}
                onClear={() => setvalueSearch('')}
                inputContainerStyle={{height: reponsiveheight(38)}}
                style={{width: reponsivewidth(300)}}
                placeholder="Nh???p ng??y, th??? lo???i"
                onChange={e => {
                  setvalueSearch(e.nativeEvent.text);
                }}
                value={valueSearch}
              />
              <TouchableOpacity
                onPress={() => {
                  setvalueSearch('');
                  setShowSearch(false);
                }}
                style={{marginLeft: 8}}>
                <Text>H???y</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
      <ScrollView style={{marginBottom: 80}}>
        {dataSearch.length > 0 ? (
          dataSearch.map(x => {
            let user = getUser(x.userId);
            console.log('user', user);
            return (
              <View
                style={[
                  styles.Shadowbox,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: reponsivewidth(350),
                    alignSelf: 'center',
                    paddingRight: 25,
                    marginLeft: 15,
                    paddingTop: 15,
                    paddingBottom: 20,
                    marginTop: 15,
                    height: reponsiveheight(180),
                    borderLeftColor: x.type == 'B???t ?????u' ? '#02569E' : 'red',
                    borderLeftWidth: 10,
                    borderRadius: 5,
                  },
                ]}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      flex: 0.9,
                    }}>
                    <View
                      style={[
                        {
                          justifyContent: 'flex-end',
                          alignItems: 'flex-start',

                          marginBottom: 10,
                          marginLeft: 5,
                        },
                      ]}>
                      <Text style={{fontWeight: '700'}}>
                        {tranferday(x.date)} {''} {new Date(x.time).getHours()}h
                        : {new Date(x.time).getMinutes()}
                      </Text>
                    </View>
                    <View
                      style={[
                        {
                          justifyContent: 'flex-end',
                          alignItems: 'flex-start',

                          marginBottom: 10,
                          marginLeft: 5,
                        },
                      ]}>
                      <Text>
                        Th??? lo???i: {''} {x.type}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Text>
                        T??n : {''} {user?.Name}
                      </Text>
                      <Text style={{marginTop: 5}}>
                        Ch???c v??? :{''} {user?.service}
                      </Text>
                    </View>

                    {/* <Text style={{marginTop: 5, fontWeight: '700'}}>
                      L????ng :
                      {item.TotalSalary.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}{' '}
                      VND
                    </Text> */}

                    {/* <Pressable>
                    <Text>Xem chi ti???t</Text>
                </Pressable> */}
                  </View>
                  {/* <View style={{flex: 0.1}}>
                    <TouchableOpacity
                      style={{marginBottom: 25}}
                      onPress={() => {
                        navigation.navigate('AttendanceDetailScreen', {
                          item: x.id,
                        });
                      }}>
                      <Foundation name="page-edit" size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setItemDeleted(x);
                        setVisibleDelete(true);
                      }}>
                      <MaterialIcon name="delete" size={30} />
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              height: reponsiveheight(550),
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{opacity: 0.5}}>Kh??ng c?? th??ng tin ??i???m danh</Text>
          </View>
        )}
      </ScrollView>
      <CustomNotificationDel
        visible={deleteVisible}
        Content={'B???n c?? mu???n x??a ? '}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        onCancel={() => setVisibleDelete(false)}
        onAction={() => {
          Delete();
        }}
      />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
export default AttendanceListUser;
const styles = StyleSheet.create({
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
