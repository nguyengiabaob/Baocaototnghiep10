/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Userdata} from '../Model/User';
import DataService from '../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loading from '../Helper/Loader/Loading';
import OptionModal from '../Screens/Assignment/OptionModal';
import {CustomNotification} from '../Model/CustomNofication';
import BellNofi from '../asset/svg/bellnotification.svg';
import ModalizeEmployee from '../Helper/Modal/ModalLize';
import data from '../services/data';
import {AttendanceMode} from '../Model/AttendanceModel';
import {StackNavigationProp} from '@react-navigation/stack';
import {AttendanceParamaList} from '../navigation/types';
type props = {
  navigation: StackNavigationProp<AttendanceParamaList, 'AddAttedance'>;
};
const AddLogAttendance: React.FC<props> = ({navigation}) => {
  const [Item, setItem] = useState<any>();
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
  const [ListUser, setLisUser] = useState<any>();
  const [UserSelected, setUserSelected] = useState<any>();
  const [modalLizeVisible, setModalLizeVisible] = useState<any>();
  //   const {item} = route.params;
  const getItem = useCallback(async () => {
    // let a = await DataService.Getdata_dtServiceById<any>('LogAttendance', item);
    let b = await DataService.Getdata_dtService<Userdata>('user');
    setLisUser(b);
    setdatepickervalue(tranferday(new Date().toString()));
    setshowdatepickervalue(new Date());

    setshowtimepickervalue(new Date());
    settimevalue(transferTime(new Date().toString()));

    // setTypeSelected(type);
  }, []);
  useEffect(() => {
    setloading(true);
    getItem().then(() => {
      setloading(false);
    });
  }, [getItem]);
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
      // textdate =
      //   datepickervalue + pickdate.getHours() + ': ' + pickdate.getMinutes();
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
    setshowdatepickervalue(new Date(textdate));
    settimevalue(pickdate.getHours() + ': ' + pickdate.getMinutes());
  };
  const Save = () => {
    if (UserSelected && TypeSelected) {
      let newData: AttendanceMode = {
        userId: UserSelected.id,
        date: new Date(showdatepickervalue).toString(),
        time: new Date(showtimepickervalue).toString(),
        type:
          TypeSelected.id == 1
            ? 'Bắt đầu'
            : TypeSelected.id == 2
            ? 'Kết thúc'
            : '',
      };
      data.postLogAttendance(newData).then(res => {
        if (res == true) {
          Setsuccess(true);
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
  const transferTime = (d: string) => {
    var Hours = new Date(d).getHours();
    var Minutes = new Date(d).getMinutes();
    return Hours + ':' + Minutes;
  };
  const typeAttedance = [
    {
      key: 1,
      id: 1,
      title: 'Bắt đầu',
      Action: (val: any) => {
        setTypeSelected(val);
        setVisibleModalType(false);
      },
    },
    {
      key: 2,
      id: 2,
      title: 'Kết thúc',
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
            <Text style={{fontWeight: '700'}}>Nhân viên</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TextInput
              onTouchStart={() => {
                setModalLizeVisible(true);
              }}
              showSoftInputOnFocus={false}
              placeholder="Tên khách hàng"
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(280), height: reponsiveheight(80)}}
              autoCompleteType={undefined}
              value={UserSelected ? UserSelected.Name : ''}></TextInput>
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
            <Text style={{fontWeight: '700'}}>Loại</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TouchableOpacity
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
                {TypeSelected?.id > 0 ? TypeSelected?.title : 'Chọn loại'}
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
            <Text style={{fontWeight: '700'}}>Ngày</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TextInput
              onTouchStart={() => setShowDatePicker(true)}
              showSoftInputOnFocus={false}
              enablesReturnKeyAutomatically={true}
              value={datepickervalue ? datepickervalue : ''}
              placeholder="Ngày"
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
            <Text style={{fontWeight: '700'}}>Thời gian</Text>
          </View>
          <View style={{flex: 0.8}}>
            <TextInput
              onTouchStart={() => {
                setShowTime(true);
              }}
              showSoftInputOnFocus={false}
              onKeyPress={e => e.cancelable == true}
              placeholder="Ngày"
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(280), height: reponsiveheight(80)}}
              autoCompleteType={undefined}
              value={Timervalue ? Timervalue : ''}
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
          <Text style={{color: '#FFFF'}}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <Loading visible={loading} />
      <OptionModal
        title={'Danh sách loại'}
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
        title="Thông báo"
        onCancel={() => {
          Setsuccess(false);
          navigation.goBack();
        }}
        Content="Bạn đã cập nhật thành công !"
      />
      <ModalizeEmployee
        Visible={modalLizeVisible}
        onClosed={() => setModalLizeVisible(false)}
        ongetItem={setUserSelected}
        selected={UserSelected}
      />
    </SafeAreaView>
  );
};
export default AddLogAttendance;
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
