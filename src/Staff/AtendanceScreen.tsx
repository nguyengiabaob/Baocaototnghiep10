/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';
import moment from 'moment';
import {useAppSelector} from '../redux/hook';
import {selectAuth} from '../redux/reducer/authslice';
import {AttendanceMode} from '../Model/AttendanceModel';
import AuthService from '../services/authService';
import data from '../services/data';
import {CustomNotification} from '../Model/CustomNofication';
import BellNofi from '../asset/svg/bellnotification.svg';
import DataService from '../services/dataservice';
import {Userdata} from '../Model/User';
import {StackNavigationProp} from '@react-navigation/stack';
import {ManageEmployeePramaList} from '../navigation/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
type props = {
  navigation: StackNavigationProp<ManageEmployeePramaList, 'AttendanceScreen'>;
};
// const count = 5;
// const duration = 4000;
// const initialPhase = {scale: 0, opacity: 1};
// const constructAnimation = () =>
//   [...Array(count).keys()].map(() => initialPhase);
const Attendance: React.FC<props> = ({navigation}) => {
  const [visibleAlert, setvisbleAlert] = useState<boolean>(false);
  const {userName} = useAppSelector(selectAuth);
  // const {stateAnimation, setAnimation} = useState<void>(constructAnimation);
  const animation = useRef(new Animated.Value(1.5));
  const [userId, setUserId] = useState<string | null>('');
  const [userInfo, setUserInfo] = useState<Userdata>();
  const [content, setcontent] = useState<string>('');
  const CheckTimeExist = async (userId: string) => {
    let a = await DataService.Getdata_dtService<AttendanceMode>(
      'LogAttendance',
    );
    console.log(new Date().getDate());
    let b = a.find(
      i =>
        new Date(i.date).getDate() == new Date().getDate() &&
        i.userId == userId &&
        new Date(i.date).getMonth() + 1 == new Date().getMonth() + 1 &&
        new Date(i.date).getFullYear() == new Date().getFullYear() &&
        i.type == 'Bắt đầu',
    );
    let c = a.find(
      i =>
        new Date(i.date).getDate() == new Date().getDate() &&
        i.userId == userId &&
        new Date(i.date).getMonth() + 1 == new Date().getMonth() + 1 &&
        new Date(i.date).getFullYear() == new Date().getFullYear() &&
        i.type == 'Kết thúc',
    );
    console.log('13456789', b);
    if (b && !c) {
      onclickAttendance('Kết thúc');
    } else {
      if (b && c) {
        setcontent('Bạn đã điểm danh đủ ngày hôm nay');
        setvisbleAlert(true);
      } else {
        onclickAttendance('Bắt đầu');
      }
    }
  };
  const getuserId = async () => {
    let a = await AuthService.getuserid();
    if (a) {
      let userinfo = await DataService.Getdata_dtServiceById<Userdata>(
        'user',
        a,
      );

      setUserInfo(userinfo);
    }

    setUserId(a);
  };
  const onclickAttendance = (type: string) => {
    console.log('2', type);
    let initalData: AttendanceMode = {
      userId: userId ? userId : '',
      date: new Date().toString(),
      Time: new Date().toString(),
      type: type,
    };

    data.postLogAttendance(initalData).then(res => {
      if (res == true) {
        setcontent(
          `Bạn đã điễm danh giờ ${type} là : ${new Date(
            initalData.Time,
          ).getHours()}: ${new Date(initalData.Time).getMinutes()}`,
        );
        setvisbleAlert(true);
      }
    });
  };
  useEffect(() => {
    getuserId();
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation.current, {
          toValue: 1.7,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(animation.current, {
          toValue: 1.5,
          duration: 900,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#2596be1c'}}>
      <View style={{flexDirection: 'row', marginTop: 25}}>
        <EvilIcons name="calendar" style={{fontSize: 30}} />
        <Text
          style={{
            borderRadius: 10,
            backgroundColor: '#FFFF',
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 15,
          }}>
          {moment(new Date()).format('DD/MM/YYYY')}
        </Text>
        {/* <TextInput style={{borderRadius: 10}}>
          {moment(Date.now(), 'DD/MM/YYYY')}
        </TextInput> */}
      </View>
      <View style={{marginTop: 15}}>
        {console.log('78456', userInfo)}
        <View style={{alignSelf: 'center', alignItems: 'center'}}>
          {userInfo?.Avatar && (
            <Image
              source={{uri: userInfo.Avatar}}
              style={{width: 160, height: 100, borderRadius: 15}}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <FontAwesome name="user" style={{fontSize: 28, marginRight: 15}} />
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
            }}>
             {userName}
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'center', height: reponsiveheight(350)}}>
        <Animated.View style={{transform: [{scale: animation.current}]}}>
          <TouchableOpacity
            onPress={() => {
              if (userId) {
                CheckTimeExist(userId);
              }
            }}
            style={[style.btn_attendance, style.shadowNames]}>
            <Text style={{color: '#FFFF', fontSize: 18, fontWeight: '700'}}>
              Điểm danh
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <CustomNotification
        visible={visibleAlert}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => {
          setvisbleAlert(false);
          navigation.goBack();
        }}
        Content={content}
      />
    </SafeAreaView>
  );
};
export default Attendance;
const style = StyleSheet.create({
  btn_attendance: {
    backgroundColor: '#2596be',
    borderRadius: 50,
    width: reponsivewidth(100),
    alignSelf: 'center',
    height: reponsiveheight(120),
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowNames: {
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 25,
  },
});
