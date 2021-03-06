/* eslint-disable react-native/no-inline-styles */
import {User} from '@react-native-google-signin/google-signin';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Loading from '../../Helper/Loader/Loading';
import {AttendanceParamaList, WagesParamaList} from '../../navigation/types';
import OptionModal from '../../Screens/Assignment/OptionModal';
import DataService from '../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import DateTimePicker from '@react-native-community/datetimepicker';
import data from '../../services/data';
import {AttendanceMode} from '../../Model/AttendanceModel';
import {CustomNotification} from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
import {StackNavigationProp} from '@react-navigation/stack';
type props = {
  route: RouteProp<AttendanceParamaList, 'AttendanceDetailScreen'>;
  navigation: StackNavigationProp<WagesParamaList, 'LisLogScreen'>;
};
const DetailLog: React.FC<props> = ({route, navigation}) => {
  const [ItemDetail, setItemDetail] = useState<any>();
  const [loading, setloading] = useState<boolean>(false);
  const [TypeSelected, setTypeSelected] = useState<any>();
  const [visibleModalType, setVisibleModalType] = useState<any>(false);
  const [showdatepicker, setShowDatePicker] = useState<any>(false);
  const [showdatepickervalue, setshowdatepickervalue] = useState<Date>(
    new Date(),
  );
  const [datepickervalue, setdatepickervalue] = useState<string>();
  const [showtimepickervalue, setshowtimepickervalue] = useState<Date>(
    new Date(),
  );
  const [Timervalue, settimevalue] = useState<string>();
  const [showtime, setShowTime] = useState<any>(false);
  const [success, Setsuccess] = useState<any>(false);
  const [Error, SetError] = useState<any>(false);
  const isFocused = useIsFocused();
  const {id} = route.params;
  const getItem = useCallback(async () => {
    let a = await DataService.Getdata_dtServiceById<any>('LogAttendance', id);
    if (a) {
      let b = await DataService.Getdata_dtServiceById<User>('user', a.userId);
      a.user = {...b};
      let type = {
        id: a.type === 'B???t ?????u' ? 1 : a.type === 'K???t th??c' ? 2 : 0,
        title: a.type,
      };
      if (a.date) {
        setdatepickervalue(tranferday(a.date));
        setshowdatepickervalue(new Date(a.date));
      }
      if (a.time) {
        setshowtimepickervalue(new Date(a.time));
        settimevalue(transferTime(a.time));
      }
      setTypeSelected(type);
    }
    setItemDetail(a);
  }, [id]);
  useEffect(() => {
    if (isFocused == true) {
      setloading(true);

      getItem().then(() => {
        setloading(false);
      });
    }
  }, [getItem, isFocused]);
  const onChange = (event: Event, selectdate: any) => {
    var currentDate = selectdate || showdatepickervalue;
    setShowDatePicker(false);
    setshowdatepickervalue(currentDate);
    let pickdate = new Date(currentDate);
    let textdate =
      pickdate.getDate() +
      '/' +
      (pickdate.getMonth() + 1) +
      '/' +
      pickdate.getFullYear();
    setdatepickervalue(textdate);
  };
  const onChangeTime = (event: Event, selecttime: any) => {
    var currentDate = selecttime || showtimepickervalue;
    setShowTime(false);
    let pickdate = new Date(currentDate);
    console.log('pickdate', pickdate);
    let textdate = '';
    if (datepickervalue) {
      let a = new Date(datepickervalue);
      console.log('a', a.getMonth() + 1);
      //   textdate =
      //     datepickervalue +
      //     ' ' +
      //     pickdate.getHours() +
      //     ':' +
      //     pickdate.getMinutes();
      textdate = new Date(
        a.getFullYear(),
        a.getDate() - 1,
        a.getMonth() + 1,
        pickdate.getHours(),
        pickdate.getMinutes(),
      ).toString();
    } else {
      textdate = pickdate.getHours() + ': ' + pickdate.getMinutes();
    }
    console.log(textdate);
    setshowtimepickervalue(new Date(textdate));
    settimevalue(pickdate.getHours() + ': ' + pickdate.getMinutes());
  };
  const Save = () => {
    let newData: AttendanceMode = {
      userId: ItemDetail.userId,
      date: new Date(showdatepickervalue).toString(),
      time: new Date(showtimepickervalue).toString(),
      type:
        TypeSelected.id == 1
          ? 'B???t ?????u'
          : TypeSelected.id == 2
          ? 'K???t th??c'
          : '',
    };
    console.log('newData', newData);
    data.putLogAttendance(newData, id).then(res => {
      if (res == true) {
        Setsuccess(true);
      }
    });
  };
  const tranferday = (d: string) => {
    var month = new Date(d).getMonth() + 1;
    var date = new Date(d).getDate();
    var year = new Date(d).getFullYear();
    return date + '/' + month + '/' + year;
  };
  const transferTime = (d: string) => {
    var Hours = new Date(d).getHours();
    var Minutes = new Date(d).getMinutes();
    return Hours + ':' + Minutes;
  };
  const typeAttedance = [
    {
      key: 1,
      id: 1,
      title: 'B???t ?????u',
      Action: (val: any) => {
        setTypeSelected(val);
        setVisibleModalType(false);
      },
    },
    {
      key: 2,
      id: 2,
      title: 'K???t th??c',
      Action: (val: any) => {
        setTypeSelected(val);
        setVisibleModalType(false);
      },
    },
  ];
  return (
    <SafeAreaView>
      <View style={{marginTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            marginBottom: 50,
          }}>
          <View style={{flex: 0.2}}>
            <Text style={{fontWeight: '700'}}>Nh??n vi??n</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TextInput
              editable={false}
              placeholder="T??n kh??ch h??ng"
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(280), height: reponsiveheight(80)}}
              autoCompleteType={undefined}>
              {ItemDetail?.user?.Name}
            </TextInput>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            marginBottom: 50,
          }}>
          <View style={{flex: 0.2}}>
            <Text style={{fontWeight: '700'}}>Lo???i</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TouchableOpacity
              disabled={true}
              onPress={() => {
                setVisibleModalType(true);
              }}
              style={[
                styles.Shadowbox,
                {
                  padding: 15,
                  width: reponsivewidth(280),
                },
              ]}>
              <Text style={{textAlign: 'center'}}>
                {TypeSelected?.id > 0 ? TypeSelected?.title : 'Ch???n lo???i'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            marginBottom: 50,
          }}>
          <View style={{flex: 0.2}}>
            <Text style={{fontWeight: '700'}}>Ng??y</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TextInput
              editable={false}
              onTouchStart={() => setShowDatePicker(true)}
              showSoftInputOnFocus={false}
              enablesReturnKeyAutomatically={true}
              value={
                datepickervalue ? datepickervalue : tranferday(ItemDetail?.date)
              }
              placeholder="Ng??y"
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(280), height: reponsiveheight(80)}}
              autoCompleteType={undefined}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            marginBottom: 15,
          }}>
          <View style={{flex: 0.2}}>
            <Text style={{fontWeight: '700'}}>Th???i gian</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TextInput
              onTouchStart={() => {
                setShowTime(true);
              }}
              showSoftInputOnFocus={false}
              onKeyPress={e => e.cancelable == true}
              placeholder="Ng??y"
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(280), height: reponsiveheight(80)}}
              autoCompleteType={undefined}
              value={Timervalue ? Timervalue : transferTime(ItemDetail?.date)}
            />
          </View>
        </View>
      </View>
      {showdatepicker && (
        <DateTimePicker
          value={showdatepickervalue}
          display={'calendar'}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      {showtime && (
        <DateTimePicker
          value={showtimepickervalue}
          display={'clock'}
          mode={'time'}
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}
      <View style={{alignItems: 'center', marginTop: 40}}>
        <TouchableOpacity
          onPress={() => {
            Save();
          }}
          style={styles.btnExit}>
          <Text style={{color: '#FFFF'}}>L??u</Text>
        </TouchableOpacity>
      </View>
      <Loading visible={loading} />
      <OptionModal
        title={'Danh s??ch lo???i'}
        visible={visibleModalType}
        options={typeAttedance}
        onCancel={setVisibleModalType}
        Selected={TypeSelected}
      />
      <CustomNotification
        visible={success}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => {
          Setsuccess(false);
           navigation.goBack();
        }}
        Content="B???n ???? c???p nh???t th??nh c??ng !"
      />
    </SafeAreaView>
  );
};
export default DetailLog;
const styles = StyleSheet.create({
  btnExit: {
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
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
