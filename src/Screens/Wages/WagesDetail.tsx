/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {User} from '@react-native-google-signin/google-signin';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import {AttendanceMode} from '../../Model/AttendanceModel';
import {Userdata} from '../../Model/User';
import {Wages} from '../../Model/Wages';
import {AttendanceParamaList, WagesParamaList} from '../../navigation/types';
import data from '../../services/data';
import DataService from '../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import OptionModal from '../Assignment/OptionModal';
import ListOptionModal from './ListOption';
import BellNofi from '../../asset/svg/bellnotification.svg';
import {CustomNotification} from '../../Model/CustomNofication';
import Warning from '../../asset/svg/Warning.svg';
import { CustomNotificationDel } from '../../Model/CustomNoficationDel';
type props = {
  route: RouteProp<WagesParamaList, 'WagesDetail'>;
  navigation: StackNavigationProp<WagesParamaList, 'LisLogScreen'>;
};
const WageDetail: React.FC<props> = ({route, navigation}) => {
  const [ItemWages, setItemWages] = useState<any>();
  const [ItemDeleted,setItemDeleted]= useState<any>();
  const [visibleDeleted,setVisibleDeleted]= useState<boolean>(false);
  const [ListUser, setListUser] = useState<Userdata[]>();
  const [loading, setloading] = useState<boolean>(false);
  const [basicSlary, setBasicSalary] = useState<number>(0);
  const [TotalSalary, setTotalSalary] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [Error, setError] = useState<boolean>(false);
  const {id} = route.params;
  const isFocused = useIsFocused();
  const [ListLogAttedance, setLogAttendance] = useState<any[]>();
  // const [visibleListLog, setVisibleListLog] = useState<boolean>(false);
  const tranferday = (d: string) => {
    var month = new Date(d).getMonth() + 1;
    var date = new Date(d).getDate();
    var year = new Date(d).getFullYear();
    return date + '/' + month + '/' + year;
  };
  // const getListLogAttedance = useCallback(async () => {
  //   let a = await DataService.Getdata_dtService<any>('LogAttendance');
  //   if (a) {
  //     a.forEach(item => {
  //       let index = a.findIndex(x => x == item);
  //       let time = new Date(item.time);
  //       a[index] = {
  //         ...item,
  //         name: `${time.getHours()}: ${time.getMinutes()} ${item.type}`,
  //         Action: val =>
  //           navigation.navigate('AttendanceDetailScreen', {item: val.id}),
  //       };
  //     });
  //   }
  //   setLogAttendance(a);
  // }, [navigation]);
  const save = () => {
    if (basicSlary > 0) {
      let newData: any = {
        BasicSalary: basicSlary,
        TotalSalary: TotalSalary,
      };
      data.putWages(id, newData).then(res => {
        if (res == true) {
          setSuccess(true);
        }
      });
    } else {
      setError(true);
    }
  };
  const getItemWages = useCallback(async () => {
    console.log('131546', id);
    let a = await DataService.Getdata_dtServiceById<any>('Wages', id);
    let b = await DataService.Getdata_dtService<Userdata>('user');
    if (b && a) {
      setBasicSalary(a.BasicSalary);
      setTotalSalary(a.TotalSalary);
      let newData = b.find(x => x.id == a.EmployeeID);
      if (newData) {
        a.user = {...newData};
      }
    }
    setItemWages(a);
    // let b = await DataService.Getdata_dtService<any>('LogAttendance');
    // if (b) {
    //   b = b.filter(x => x.userId == a?.EmployeeID);
    //   b.forEach(i => {
    //     let index = b.findIndex(x => x == i);
    //     let time = new Date(i.time);
    //     b[index] = {
    //       item: {
    //         ...i,
    //         name: `${time.getHours()}: ${time.getMinutes()} ${
    //           i.type
    //         } (${tranferday(i.date)})`,
    //       },
    //       Action: val =>
    //         navigation.navigate('AttendanceDetailScreen', {id: i.id}),
    //     };
    //   });
    //   setLogAttendance(b);
    // }
  }, [id]);
  // const getUser = async () => {
  //   let a = await DataService.Getdata_dtService<User>('user');
  //   setListUser(a);
  // };
  const deleteWages = () => {
    data.deletedData('Wages', id).then(res => {
      if (res == true) {
        console.log('Deleted');
      }
    });
  };
  const CaculatedWages = async (item: any, DayCheck: string) => {
    if (item && DayCheck) {
      let a = await DataService.Getdata_dtService<AttendanceMode>(
        'LogAttendance',
      );

      // let countStart = 0;
      let totalTime = 0;
      if (a) {
        a.forEach(i => {
          if (
            i.userId === item.id &&
            new Date(i.date).getMonth() + 1 ==
              new Date(DayCheck).getMonth() + 1 &&
            new Date(i.date).getFullYear() === new Date(DayCheck).getFullYear()
          ) {
            if (i.type == 'B???t ?????u') {
              let time = 0;

              // countStart +=   Number(Number(new Date(i.time).getMinutes() / 60).toFixed(2));
              let b = a.find(
                x =>
                  x.userId == item.id &&
                  new Date(x.date).getMonth() + 1 ==
                    new Date(DayCheck).getMonth() + 1 &&
                  new Date(x.date).getFullYear() ===
                    new Date(DayCheck).getFullYear() &&
                  x.type == 'K???t th??c',
              );

              if (b) {
                let hours =
                  (new Date(b.time).getHours() - new Date(i.time).getHours()) *
                  60;
                let minutes =
                  new Date(b.time).getMinutes() - new Date(i.time).getMinutes();
                time = Number(((hours + minutes) / 60).toFixed(2));
                totalTime += time;
                console.log('hours', new Date(i.time).getHours());
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
      }
      //    console.log('countEnd',   countEnd );
      console.log('countStart', totalTime);
      let userTime = {
        ...item,
        TimeWork: totalTime === 0 ? 0 : totalTime,
        DateLog: new Date(DayCheck).toDateString(),
      };

      console.log('TimeArray', userTime);
      let salary = userTime.TimeWork * Number(basicSlary);
      console.log('salary', userTime.TimeWork);
      setTotalSalary(salary);
    }
  };
  const re_RenderTotalSalary = useCallback(() => {
    // console.log(ItemWages);
    if (isFocused == true) {
      CaculatedWages(ItemWages?.user, ItemWages?.Content);
    }
  }, [isFocused, basicSlary, ItemWages, CaculatedWages]);
  useEffect(() => {
    if (isFocused == true) {
      setloading(true);
      Promise.all([getItemWages()]).then(() => {
        setloading(false);
      });
    }
  }, [getItemWages, isFocused]);
  return (
    <SafeAreaView style={{marginTop: 35}}>
      <View style={{flexDirection: 'row', marginLeft: 8}}>
        <Text style={[styles.style_Label]}>Ng??y :</Text>
        <Text style={[styles.style_input]}>
          {ItemWages?.Day ? tranferday(ItemWages?.Day) : ''}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginBottom: 25,
          marginLeft: 8,
          marginTop: 35,
        }}>
        <View style={{flex: 0.3}}>
          <Text style={[styles.style_Label]}>Nh??n vi??n :</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text style={[styles.style_input]}>
            {ItemWages?.user ? ItemWages.user.Name : ''}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 25, marginLeft: 8}}>
        <View style={{flex: 0.3}}>
          <Text style={[styles.style_Label]}>Ch???c v??? :</Text>
        </View>
        <View style={{flex: 0.7}}>
          <Text style={[styles.style_input]}>
            {console.log('type', ItemWages?.user.type)}
            {ItemWages?.user
              ? ItemWages?.user.type == 0
                ? 'Qu???n l??'
                : 'Nh??n vi??n'
              : ''}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 25,
          marginLeft: 8,
          alignItems: 'center',
        }}>
        <View style={[{flex: 0.3}]}>
          <Text style={[styles.style_Label]}>Th???i gian l??m vi???c</Text>
        </View>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              if (ItemWages) {
                navigation.navigate('LisLogScreen', {
                  Day: ItemWages.Content,
                  userId: ItemWages.user.id,
                });
              }
            }}
            style={[
              styles.btnStaff,
              {padding: 15, width: reponsivewidth(250)},
            ]}>
            <Text>Nh???p xem th???i gian l??m vi???c</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 25,
          marginLeft: 8,
          alignItems: 'center',
        }}>
        <View style={{flex: 0.3}}>
          <Text style={[styles.style_Label]}>L????ng c?? b???n :</Text>
        </View>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <TextInput
            onChange={e => {
              setBasicSalary(
                isNaN(Number(e.nativeEvent.text)) === true
                  ? Number(e.nativeEvent.text.replace(/,/g, ''))
                  : Number(e.nativeEvent.text),
              );
            }}
            value={basicSlary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            mode="outlined"
            outlineColor="#02569E"
            style={{width: reponsivewidth(250)}}
            autoCompleteType={undefined}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 25,
          marginLeft: 8,
          alignItems: 'center',
        }}>
        <View style={{flex: 0.3}}>
          <Text style={[styles.style_Label]}>T???ng l????ng :</Text>
        </View>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <TextInput
            editable={false}
            value={TotalSalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            mode="outlined"
            outlineColor="#02569E"
            style={{width: reponsivewidth(250)}}
            autoCompleteType={undefined}
          />
        </View>
      </View>
      <View style={{alignItems: 'center', marginTop: 25}}>
        <TouchableOpacity
          onPress={() => {
            save();
          }}
          style={[
            styles.btn_add,
            {justifyContent: 'center', alignItems: 'center', padding: 8},
          ]}>
          <Text style={{color: '#FFFF'}}>L??u</Text>
        </TouchableOpacity>
      </View>
      {console.log('list', ListLogAttedance)}
      {re_RenderTotalSalary()}
      {/* {ListLogAttedance && (
        <ListOptionModal
          visible={visibleListLog}
          options={ListLogAttedance}
          title="Danh s??ch th???i gian"
          onCancel={() => setVisibleListLog(false)}
        />
      )} */}
      <CustomNotification
        visible={success}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => {
          setSuccess(false);
          navigation.goBack();
        }}
        Content="B???n ???? c???p nh???t th??nh c??ng !"
      />
      <CustomNotification
        visible={Error}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => {
          setError(false);
        }}
        Content="Vui l??ng nh???p th??ng tin ?????y ?????"
      />
      <CustomNotificationDel
        visible={visibleDeleted}
        Content={'B???n c?? mu???n x??a ? '}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        onCancel={() => setVisibleDeleted(false)}
        onAction={() => {
          () => deleteWages();
        }}
      />
    </SafeAreaView>
  );
};
export default WageDetail;
const styles = StyleSheet.create({
  style_Label: {
    fontWeight: '700',
    marginRight: 10,
  },
  btn_shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
  btn_add: {
    alignItems: 'center',
    backgroundColor: '#02569E',
    width: reponsivewidth(150),
    borderRadius: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  style_input: {
    alignSelf: 'center',
  },
  btnStaff: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    width: reponsivewidth(300),
    height: reponsiveheight(75),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
});
