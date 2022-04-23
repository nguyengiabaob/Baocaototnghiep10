/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {ExpenseParamList} from '../../navigation/types';
import data from '../../services/data';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Overlay} from 'react-native-elements/dist/overlay/Overlay';
import moment from 'moment';
// import {Calendar, LocaleConfig} from 'react-native-calendars';
import MonthSelector from 'react-native-month-selector';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Checkbox} from 'react-native-paper';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database';
import Loading from '../../Helper/Loader/Loading';
type props = {
  navigation: StackNavigationProp<ExpenseParamList, 'ExpenseMainScreen'>;
};
export const ExpenseManagerScreen: React.FC<props> = ({navigation}: props) => {
  const [ArrayExpense, setArrayExpense] = useState<any[]>([]);
  const [showmodeldate, setshowmodeldate] = useState<boolean>(false);
  const [showmodelyear, setshowmodelyear] = useState<boolean>(false);
  const [ModeYear, setYear] = useState<any>();
  const [ModelFilter, setModelFilter] = useState<boolean>(false);
  const [ModelCanlendar, setModalCalendar] = useState<boolean>(false);
  const [Filtermodel, setFilter] = useState<string>('');
  const [choosenModel, setChoosenModel] = useState<any>();
  const [ModeYearclick, setYearclick] = useState<any>(new Date().getFullYear());
  const [datepickervalue, setdatepickervalue] = useState<any>();
  const [showdatepickervalue, setshodatepickervalue] = useState<Date>(
    new Date(),
  );
  const [Reload, setReload] = useState<boolean>(false);
  const [DelArray, setDelArray] = useState<string[]>([]);
  const [flag, setflag] = useState<boolean>(false);
  const [CheckAll, setCheckAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const tranferday = (d: string) => {
    var month = new Date(d).getMonth() + 1;
    var date = new Date(d).getDate();
    var year = new Date(d).getFullYear();
    return date + '/' + month + '/' + year;
  };
  const onChange = (event: Event, selectdate: any) => {
    var currentDate = selectdate || showdatepickervalue;
    setshowmodeldate(false);
    setModelFilter(false);
    setshodatepickervalue(currentDate);
    setdatepickervalue(currentDate);
    setFilter('3');
  };
  // LocaleConfig.locales.vn = {
  //     monthNames: ['Tháng 1 ','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  //     monthNamesShort: ['Tg1.','Tg2.','Tg3','Tg4','Tg5','Tg6','Tg7','Tg8','Tg9','Tg10','Tg11','Tg12'],
  //     dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  //     dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
  //     today: 'Hôm nay',
  //   };
  //   LocaleConfig.defaultLocale = 'vn';
  // const momnetchange= moment.defineLocale('vn', {
  //     months: ['Tháng 1 ','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  //     monthsShort :  ['1.','Tg2.','Tg3','Tg4','Tg5','Tg6','Tg7','Tg8','Tg9','Tg10','Tg11','Tg12'],
  //     weekdays: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  //     weekdaysShort:  ['CN','T2','T3','T4','T5','T6','T7'],
  // });
  const isFocused = useIsFocused();
  const getDataExpense = async () => {
    // data.getdata('Expense').then(res => {
    //     let datarray: any [] = [];
    //     for ( let key in res)
    //     {
    //          if (key !== '0')
    //          {
    //              datarray.push({
    //                  id: key,
    //                  ...res[key],
    //              })
    //          }
    //     }
    //     setArrayExpense(datarray);
    // });
    // let dta : any =[];
    let dta = await DataService.Getdata_dtService<any>('Expense');
    setArrayExpense(dta);
  };
  useEffect(() => {
    database()
      .ref()
      .on('child_changed', () => setReload(prev => !prev));
  }, []);
  const oncheck = (id: string, check: boolean) => {
    if (check) {
      setDelArray(DelArray.filter(item => item !== id));
    } else {
      setDelArray([id, ...DelArray]);
    }
  };
  const onDel = () => {
    if (DelArray.length > 0) {
      DelArray.forEach(item => {
        data.deletedData('Expense', item);
      });
      setflag(true);
    }
  };
  useEffect(() => {
    if (
      isFocused === true ||
      Reload === false ||
      Reload === true ||
      flag === true
    ) {
      setLoading(true);
      Promise.resolve(getDataExpense()).then(() => setLoading(false));
    }
    // if (flag == true) {
    //   getDataExpense();
    // }
  }, [isFocused, flag, Reload]);
  const oncheckAll = (check: boolean) => {
    if (check) {
      setCheckAll(false);
      setDelArray([]);
    } else {
      let datacheck: any[] = [];
      setCheckAll(true);
      if (
        ArrayExpense.length > 0 &&
        Filtermodel === '' &&
        ArrayExpense.filter(
          item =>
            new Date(item.CreateDate).getDate() === new Date().getDate() &&
            new Date(item.CreateDate).getMonth() + 1 ===
              new Date().getMonth() + 1 &&
            new Date(item.CreateDate).getFullYear() ===
              new Date().getFullYear(),
        ).length > 0
      ) {
        ArrayExpense.filter(
          item =>
            new Date(item.CreateDate).getDate() === new Date().getDate() &&
            new Date(item.CreateDate).getMonth() + 1 ===
              new Date().getMonth() + 1 &&
            new Date(item.CreateDate).getFullYear() ===
              new Date().getFullYear(),
        ).forEach(item => {
          datacheck.push(item.id);
        });
      }

      if (
        Filtermodel == '1' &&
        ModeYear &&
        ArrayExpense.filter(
          item => new Date(item.CreateDate).getFullYear() === ModeYear,
        ).length > 0
      ) {
        ArrayExpense.filter(
          item => new Date(item.CreateDate).getFullYear() === ModeYear,
        ).forEach(item => {
          datacheck.push(item.id);
        });
      }
      if (
        Filtermodel == '2' &&
        choosenModel &&
        ArrayExpense.filter(
          item =>
            new Date(item.CreateDate).getMonth() + 1 ===
              new Date(choosenModel).getMonth() + 1 &&
            new Date(item.CreateDate).getFullYear() ===
              new Date(choosenModel).getFullYear(),
        ).length > 0
      ) {
        ArrayExpense.filter(
          item =>
            new Date(item.CreateDate).getMonth() + 1 ===
              new Date(choosenModel).getMonth() + 1 &&
            new Date(item.CreateDate).getFullYear() ===
              new Date(choosenModel).getFullYear(),
        ).forEach(item => {
          datacheck.push(item.id);
        });
      }
      if (
        Filtermodel == '3' &&
        datepickervalue &&
        ArrayExpense.filter(
          item =>
            new Date(item.CreateDate).getMonth() + 1 ===
              new Date(datepickervalue).getMonth() + 1 &&
            new Date(item.CreateDate).getDate() ===
              new Date(datepickervalue).getDate() &&
            new Date(item.CreateDate).getFullYear() ===
              new Date(datepickervalue).getFullYear(),
        ).length > 0
      ) {
        ArrayExpense.filter(
          item =>
            new Date(item.CreateDate).getMonth() + 1 ===
              new Date(datepickervalue).getMonth() + 1 &&
            new Date(item.CreateDate).getDate() ===
              new Date(datepickervalue).getDate() &&
            new Date(item.CreateDate).getFullYear() ===
              new Date(datepickervalue).getFullYear(),
        ).forEach(item => {
          datacheck.push(item.id);
        });
      }
      if (ArrayExpense.length > 0 && Filtermodel === '0') {
        ArrayExpense.forEach(item => {
          datacheck.push(item.id);
        });
      }
      // if(ArrayExpense.length> 0)
      // {
      //    ArrayExpense.forEach(item=>{
      //        datacheck.push(item.id);
      //    })
      // }
      setDelArray(datacheck);
    }
  };
  useEffect(() => {
    if (DelArray.length == 0) {
      setCheckAll(false);
    }
  }, [DelArray.length]);
  return (
    <SafeAreaView style={style.container}>
      <View>
        {showmodeldate && (
          <DateTimePicker
            value={showdatepickervalue}
            display={'calendar'}
            mode={'date'}
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <View
          style={[
            style.Shadowbox,
            {
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
              backgroundColor: '#02569E',
              height: reponsiveheight(60),
            },
          ]}>
          {/* <View style={{justifyContent:'flex-start', width:'50%'}}>
                        <TouchableOpacity onPress={()=>{setvisibleOverplayAdd(true);}} style={{marginLeft:15}}>
                            <MaterialIcons name="menu" size={32} color={'#ffff'}/>
                        </TouchableOpacity>
                    </View> */}
          <View
            style={[
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
              },
            ]}>
            {DelArray.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  setflag(false);
                  onDel();
                }}
                style={{marginRight: 25}}>
                <MaterialIcons name="delete" size={32} color={'#ffff'} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddExpenseScreen');
              }}
              style={{marginRight: 25}}>
              <MaterialIcons name="library-add" size={32} color={'#ffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModelFilter(true)}
              style={{marginRight: 20}}>
              <MaterialCommunityIcons name="filter" size={32} color={'#ffff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            borderColor: '#606060',
            borderWidth: 1,
            width: reponsivewidth(150),
            backgroundColor: '#fbfbfb',
            borderRadius: 5,
            marginTop: 15,
          }}>
          <EvilIcons name="calendar" size={32} />
          {Filtermodel === '' ? (
            <Text>{tranferday(new Date().toDateString())}</Text>
          ) : Filtermodel == '2' && choosenModel ? (
            <Text>{`Tháng ${new Date(choosenModel).getMonth() + 1} ${new Date(
              choosenModel,
            ).getFullYear()}`}</Text>
          ) : Filtermodel == '3' && datepickervalue ? (
            <Text>{tranferday(datepickervalue.toString())}</Text>
          ) : (
            Filtermodel == '1' && ModeYear && <Text>{`Năm ${ModeYear}`}</Text>
          )}
        </View>
        <View>
          {console.log('filtermodel1', Filtermodel)}
          {console.log('date', datepickervalue)}
          {console.log(
            'filtermodel2',
            ArrayExpense.filter(
              item =>
                new Date(item.CreateDate).getFullYear() ==
                  new Date(datepickervalue).getFullYear() &&
                new Date(item.CreateDate).getMonth() + 1 ==
                  new Date(datepickervalue).getMonth() + 1 &&
                new Date(item.CreateDate).getDate() ==
                  new Date(datepickervalue).getDate(),
            ).length > 0,
          )}
          {ArrayExpense.map(item => {
            console.log(new Date(item.CreateDate).getDate());
          })}
          {(ArrayExpense.length > 0 &&
            Filtermodel === '' &&
            ArrayExpense.filter(
              item =>
                new Date(item.CreateDate).getDate() === new Date().getDate() &&
                new Date(item.CreateDate).getMonth() + 1 ===
                  new Date().getMonth() + 1 &&
                new Date(item.CreateDate).getFullYear() ===
                  new Date().getFullYear(),
            ).length > 0) ||
          (Filtermodel == '1' &&
            ModeYear &&
            ArrayExpense.filter(
              item => new Date(item.CreateDate).getFullYear() === ModeYear,
            ).length > 0) ||
          (Filtermodel == '2' &&
            choosenModel &&
            ArrayExpense.filter(
              item =>
                new Date(item.CreateDate).getMonth() + 1 ===
                  new Date(choosenModel).getMonth() + 1 &&
                new Date(item.CreateDate).getFullYear() ===
                  new Date(choosenModel).getFullYear(),
            ).length > 0) ||
          (Filtermodel == '3' &&
            datepickervalue &&
            ArrayExpense.filter(
              item =>
                new Date(item.CreateDate).getMonth() + 1 ===
                  new Date(datepickervalue).getMonth() + 1 &&
                new Date(item.CreateDate).getDate() ===
                  new Date(datepickervalue).getDate() &&
                new Date(item.CreateDate).getFullYear() ===
                  new Date(datepickervalue).getFullYear(),
            ).length > 0) ||
          (Filtermodel == '1' &&
            ModeYear &&
            ArrayExpense.filter(
              item => new Date(item.CreateDate).getFullYear() === ModeYear,
            ).length > 0) ||
          (Filtermodel == '2' &&
            choosenModel &&
            ArrayExpense.filter(
              item =>
                new Date(item.CreateDate).getMonth() + 1 ===
                  new Date(choosenModel).getMonth() + 1 &&
                new Date(item.CreateDate).getFullYear() ===
                  new Date(choosenModel).getFullYear(),
            ).length > 0) ||
          (Filtermodel == '3' &&
            datepickervalue &&
            ArrayExpense.filter(
              item =>
                new Date(item.CreateDate).getMonth() + 1 ===
                  new Date(datepickervalue).getMonth() + 1 &&
                new Date(item.CreateDate).getDate() ===
                  new Date(datepickervalue).getDate() &&
                new Date(item.CreateDate).getFullYear() ===
                  new Date(datepickervalue).getFullYear(),
            ).length > 0) ||
          (ArrayExpense.length > 0 &&
            Filtermodel === '' &&
            ArrayExpense.filter(
              item =>
                new Date(item.CreateDate).getDate() === new Date().getDate() &&
                new Date(item.CreateDate).getMonth() + 1 ===
                  new Date().getMonth() + 1 &&
                new Date(item.CreateDate).getFullYear() ===
                  new Date().getFullYear(),
            ).length > 0) ||
          (ArrayExpense.length > 0 && Filtermodel === '0') ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
                marginTop: 5,
                marginBottom: 15,
              }}>
              <Checkbox
                color="#02569E"
                onPress={() => {
                  oncheckAll(CheckAll);
                }}
                status={CheckAll ? 'checked' : 'unchecked'}
              />
              <Text style={{marginLeft: 5}}> Chọn tất cả</Text>
            </View>
          ) : undefined}
          <ScrollView>
            {Filtermodel == '1' &&
            ModeYear &&
            ArrayExpense.filter(
              item => new Date(item.CreateDate).getFullYear() === ModeYear,
            ).length > 0 ? (
              ArrayExpense.filter(
                item => new Date(item.CreateDate).getFullYear() === ModeYear,
              ).map(item => {
                let check = DelArray.includes(item.id);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 8,
                      marginBottom: 15,
                    }}>
                    <Checkbox
                      onPress={() => {
                        oncheck(item.id, check);
                      }}
                      status={check == true ? 'checked' : 'unchecked'}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdateExpenseScreen', {
                          id: item.id,
                        });
                      }}
                      style={[
                        style.Shadowbox,
                        {
                          width: reponsivewidth(340),
                          alignSelf: 'center',
                          paddingBottom: 15,
                          borderRadius: 5,
                          borderLeftColor: '#02569E',
                          borderLeftWidth: 10,
                        },
                      ]}>
                      <View style={{alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: '700', marginLeft: 20}}>
                          {tranferday(item.CreateDate)}
                        </Text>
                      </View>
                      <View style={{marginHorizontal: 35, marginTop: 15}}>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tên:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>{item.Name}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Nội dung:
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              width: reponsivewidth(195),
                            }}>
                            <Text>{item.Content}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tổng tiền:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>
                              {Number(item.Total)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              VND
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : Filtermodel == '2' &&
              choosenModel &&
              ArrayExpense.filter(
                item =>
                  new Date(item.CreateDate).getMonth() + 1 ===
                    new Date(choosenModel).getMonth() + 1 &&
                  new Date(item.CreateDate).getFullYear() ===
                    new Date(choosenModel).getFullYear(),
              ).length > 0 ? (
              ArrayExpense.filter(
                item =>
                  new Date(item.CreateDate).getMonth() + 1 ===
                    new Date(choosenModel).getMonth() + 1 &&
                  new Date(item.CreateDate).getFullYear() ===
                    new Date(choosenModel).getFullYear(),
              ).map(item => {
                let check = DelArray.includes(item.id);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginBottom: 15,
                    }}>
                    <Checkbox
                      onPress={() => {
                        oncheck(item.id, check);
                      }}
                      status={check == true ? 'checked' : 'unchecked'}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdateExpenseScreen', {
                          id: item.id,
                        });
                      }}
                      style={[
                        style.Shadowbox,
                        {
                          width: reponsivewidth(320),
                          alignSelf: 'center',
                          paddingBottom: 15,
                          borderRadius: 5,
                          borderLeftColor: '#02569E',
                          borderLeftWidth: 10,
                        },
                      ]}>
                      <View style={{alignItems: 'flex-start', paddingTop: 5}}>
                        <Text style={{fontWeight: '700', marginLeft: 20}}>
                          {tranferday(item.CreateDate)}
                        </Text>
                      </View>
                      <View style={{marginHorizontal: 35, marginTop: 15}}>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tên:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>{item.Name}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Nội dung:
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              width: reponsivewidth(195),
                            }}>
                            <Text>{item.Content}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tổng tiền:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>
                              {Number(item.Total)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              VND
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : Filtermodel == '3' &&
              datepickervalue &&
              ArrayExpense.filter(
                item =>
                  new Date(item.CreateDate).getMonth() + 1 ===
                    new Date(datepickervalue).getMonth() + 1 &&
                  new Date(item.CreateDate).getDate() ===
                    new Date(datepickervalue).getDate() &&
                  new Date(item.CreateDate).getFullYear() ===
                    new Date(datepickervalue).getFullYear(),
              ).length > 0 ? (
              ArrayExpense.filter(
                item =>
                  new Date(item.CreateDate).getMonth() + 1 ===
                    new Date(datepickervalue).getMonth() + 1 &&
                  new Date(item.CreateDate).getDate() ===
                    new Date(datepickervalue).getDate() &&
                  new Date(item.CreateDate).getFullYear() ===
                    new Date(datepickervalue).getFullYear(),
              ).map(item => {
                let check = DelArray.includes(item.id);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginBottom: 15,
                      paddingRight: 10,
                    }}>
                    <Checkbox
                      onPress={() => {
                        oncheck(item.id, check);
                      }}
                      status={check == true ? 'checked' : 'unchecked'}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdateExpenseScreen', {
                          id: item.id,
                        });
                      }}
                      style={[
                        style.Shadowbox,
                        {
                          width: reponsivewidth(350),
                          alignSelf: 'center',
                          paddingBottom: 15,
                          borderRadius: 5,
                          borderLeftColor: '#02569E',
                          borderLeftWidth: 10,
                        },
                      ]}>
                      <View style={{alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: '700', marginLeft: 20}}>
                          {tranferday(item.CreateDate)}
                        </Text>
                      </View>
                      <View style={{marginHorizontal: 35, marginTop: 15}}>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tên:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>{item.Name}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Nội dung:
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              width: reponsivewidth(195),
                            }}>
                            <Text>{item.Content}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tổng tiền:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>
                              {Number(item.Total)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              VND
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : ArrayExpense.length > 0 &&
              Filtermodel === '' &&
              ArrayExpense.filter(
                item =>
                  new Date(item.CreateDate).getDate() ===
                    new Date().getDate() &&
                  new Date(item.CreateDate).getMonth() + 1 ===
                    new Date().getMonth() + 1 &&
                  new Date(item.CreateDate).getFullYear() ===
                    new Date().getFullYear(),
              ).length > 0 ? (
              ArrayExpense.filter(
                item =>
                  new Date(item.CreateDate).getDate() ===
                    new Date().getDate() &&
                  new Date(item.CreateDate).getMonth() + 1 ===
                    new Date().getMonth() + 1 &&
                  new Date(item.CreateDate).getFullYear() ===
                    new Date().getFullYear(),
              ).map(item => {
                let check = DelArray.includes(item.id);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginBottom: 15,
                    }}>
                    <Checkbox
                      onPress={() => {
                        oncheck(item.id, check);
                      }}
                      status={check == true ? 'checked' : 'unchecked'}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdateExpenseScreen', {
                          id: item.id,
                        });
                      }}
                      style={[
                        style.Shadowbox,
                        {
                          width: reponsivewidth(320),
                          alignSelf: 'center',
                          paddingBottom: 15,
                          borderRadius: 5,
                          borderLeftColor: '#02569E',
                          borderLeftWidth: 10,
                        },
                      ]}>
                      <View style={{alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: '700', marginLeft: 20}}>
                          {tranferday(item.CreateDate)}
                        </Text>
                      </View>
                      <View style={{marginTop: 15, marginHorizontal: 35}}>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tên:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>{item.Name}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Nội dung:
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              width: reponsivewidth(195),
                            }}>
                            <Text>{item.Content}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tổng tiền:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>
                              {Number(item.Total)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              VND
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : ArrayExpense.length > 0 && Filtermodel === '0' ? (
              ArrayExpense.map(item => {
                let check = DelArray.includes(item.id);
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                      marginBottom: 15,
                    }}>
                    <Checkbox
                      onPress={() => {
                        oncheck(item.id, check);
                      }}
                      status={check == true ? 'checked' : 'unchecked'}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('UpdateExpenseScreen', {
                          id: item.id,
                        });
                      }}
                      style={[
                        style.Shadowbox,
                        {
                          width: reponsivewidth(350),
                          alignSelf: 'center',
                          paddingBottom: 15,
                          borderRadius: 5,
                          borderLeftColor: '#02569E',
                          borderLeftWidth: 10,
                        },
                      ]}>
                      <View style={{alignItems: 'flex-start'}}>
                        <Text style={{fontWeight: '700', marginLeft: 20}}>
                          {tranferday(item.CreateDate)}
                        </Text>
                      </View>
                      <View style={{marginHorizontal: 35, marginTop: 15}}>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tên:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>{item.Name}</Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Nội dung:
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              width: reponsivewidth(195),
                            }}>
                            <Text>{item.Content} </Text>
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              width: reponsivewidth(80),
                              alignItems: 'center',
                            }}>
                            <Text style={{marginRight: 10, fontWeight: '700'}}>
                              Tổng tiền:
                            </Text>
                          </View>
                          <View style={{width: reponsivewidth(195)}}>
                            <Text>
                              {Number(item.Total)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                              VND
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: reponsiveheight(580),
                }}>
                <AntDesign
                  name="dropbox"
                  size={40}
                  color="#b4b4b4"
                  style={{opacity: 0.4}}
                />
                <Text style={{opacity: 0.4, marginLeft: 8}}>No Data</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <Overlay isVisible={showmodelyear}>
        <View
          style={{
            width: reponsivewidth(300),
            height: reponsiveheight(450),
            marginBottom: -25,
            justifyContent: 'center',
          }}>
          <View style={[style.TitleOverlAdd, {marginTop: -50}]}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
                paddingBottom: 2,
                fontWeight: '700',
              }}>
              Chọn năm
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: reponsiveheight(300),
              marginLeft: 10,
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                width: '20%',
                height: reponsiveheight(300),
                justifyContent: 'center',
              }}>
              <SimpleLineIcons
                onPress={() => {
                  if (ModeYearclick > 1976) {
                    setYearclick((prev: number) => prev - 1);
                  }
                }}
                name="arrow-left"
                size={20}
              />
            </View>
            <View
              style={{alignSelf: 'center', width: '60%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setFilter('1');
                  setYear(ModeYearclick);
                  setshowmodelyear(false);
                }}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  {ModeYearclick}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                height: reponsiveheight(300),
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <SimpleLineIcons
                onPress={() => setYearclick((prev: number) => prev + 1)}
                name="arrow-right"
                size={20}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              {
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginTop: 25,
                marginRight: 15,
              },
            ]}
            onPress={() => setshowmodelyear(false)}>
            <Text style={{fontWeight: '700', color: 'black'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay isVisible={ModelCanlendar}>
        <View
          style={{
            width: reponsivewidth(300),
            height: reponsiveheight(450),
            marginBottom: -25,
          }}>
          <MonthSelector
            onMonthTapped={month => {
              setChoosenModel(month.toDate());
              setModalCalendar(false);
              setModelFilter(false);
              setFilter('2');
            }}
            maxDate={moment(new Date(2099, 10))}
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
            onPress={() => setModalCalendar(false)}>
            <Text style={{fontWeight: '700', color: 'black'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
        {/* <Text>dsadsad</Text> */}
      </Overlay>
      <Overlay isVisible={ModelFilter}>
        <View
          style={{width: reponsivewidth(300), height: reponsiveheight(350)}}>
          <View style={style.TitleOverlAdd}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
                paddingBottom: 2,
                fontWeight: '700',
              }}>
              Chọn chế độ lọc
            </Text>
          </View>

          <ScrollView style={style.TitleOverlAdd_content}>
            <TouchableOpacity
              onPress={() => {
                setFilter('0'), setModelFilter(false);
              }}
              style={[style.btnChoosenAdd, {marginVertical: 10, padding: 15}]}>
              <Text>Tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setshowmodelyear(true), setModelFilter(false), setDelArray([]);
              }}
              style={[style.btnChoosenAdd, {marginVertical: 10, padding: 15}]}>
              <Text>Năm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalCalendar(true);
                setDelArray([]);
              }}
              style={[style.btnChoosenAdd, {padding: 15, marginVertical: 10}]}>
              <Text>Tháng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setshowmodeldate(true);
                setModelFilter(false);
              }}
              style={[style.btnChoosenAdd, {padding: 15, marginVertical: 10}]}>
              <Text>Ngày</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('');
                setModelFilter(false);
                setDelArray([]);
              }}
              style={[style.btnChoosenAdd, {padding: 15, marginVertical: 10}]}>
              <Text>Hôm nay</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={[
              style.btnExit,
              {alignItems: 'center', alignSelf: 'center', marginTop: 25},
            ]}
            onPress={() => setModelFilter(false)}>
            <Text style={{color: '#FFFF'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
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
  containerfiled: {
    borderColor: '#D3D3D3',
    borderWidth: 3,
    borderRadius: 10,
    height: reponsiveheight(600),
  },
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  TitleOverlAdd_content: {
    marginTop: 8,
  },
  btnChoosenAdd: {
    alignItems: 'center',
    borderBottomColor: '#afaeae',
    borderBottomWidth: 0.5,
    borderTopColor: '#afaeae',
    borderTopWidth: 0.5,
  },
  btnExit: {
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
