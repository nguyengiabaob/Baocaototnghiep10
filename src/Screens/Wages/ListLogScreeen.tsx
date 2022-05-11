/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import CustomHyperLink from '../../Model/CustomHyperLink';
import Loading from '../../Helper/Loader/Loading';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {AttendanceParamaList, WagesParamaList} from '../../navigation/types';
import {CustomNotificationDel} from '../../Model/CustomNoficationDel';
import Warning from '../../asset/svg/Warning.svg';
import data from '../../services/data';
type props = {
  navigation: StackNavigationProp<WagesParamaList, 'LisLogScreen'>;
  route: RouteProp<WagesParamaList, 'LisLogScreen'>;
};
const ListLogScreen: React.FC<props> = ({navigation, route}) => {
  const [ListAttendance, setListAttendance] = useState<any[]>();
  const [ListUser, SetListUser] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteVisible, setVisibleDelete] = useState<boolean>(false);
  const [ItemDeleted, setItemDeleted] = useState<any>();
  const {Day, userId} = route.params;
  const isFocused = useIsFocused();
  const getListAttendance = useCallback(async () => {
    let a = await DataService.Getdata_dtService<any>('LogAttendance');

    if (a && userId) {
      a.filter(x => {
        new Date(x.date).getMonth() + 1 == new Date(Day).getMonth() + 1 &&
          new Date(x.date).getFullYear() == new Date(Day).getFullYear() &&
          x.userId == userId;
      });
    }

    setListAttendance(a);
  }, [Day, userId]);
  const getListUser = async () => {
    let a = await DataService.Getdata_dtService('user');
    SetListUser(a);
  };
  const Delete = () => {
    if (ItemDeleted) {
      data.deletedData('LogAttendance', ItemDeleted.id).then(() => {
        if (res === true) {
          console.log('Deleted');
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
  }, [getListAttendance, isFocused]);
  return (
    <SafeAreaView>
      <ScrollView>
        {ListAttendance &&
          ListAttendance.map(x => {
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
                    borderLeftColor: x.type == 'Bắt đầu' ? '#02569E' : 'red',
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
                        Thể loại: {''} {x.type}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <Text>
                        Tên : {''} {user?.Name}
                      </Text>
                      <Text style={{marginTop: 5}}>
                        Chức vụ :{''} {user?.service}
                      </Text>
                    </View>

                    {/* <Text style={{marginTop: 5, fontWeight: '700'}}>
                      Lương :
                      {item.TotalSalary.toString().replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}{' '}
                      VND
                    </Text> */}

                    {/* <Pressable>
                    <Text>Xem chi tiết</Text>
                </Pressable> */}
                  </View>
                  <View style={{flex: 0.1}}>
                    <TouchableOpacity
                      style={{marginBottom: 25}}
                      onPress={() => {
                        navigation.navigate('AttendanceDetailScreen', {
                          id: x.id,
                        });
                      }}>
                      <Foundation name="page-edit" size={30} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      onPress={() => {
                        setItemDeleted(x);
                      }}>
                      <MaterialIcon name="delete" size={30} />
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
      <CustomNotificationDel
        visible={deleteVisible}
        Content={'Bạn có muốn xóa ? '}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        onCancel={() => setVisibleDelete(false)}
        onAction={() => {
          () => Delete();
        }}
      />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
export default ListLogScreen;
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
