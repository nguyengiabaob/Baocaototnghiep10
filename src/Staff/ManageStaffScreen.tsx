/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomBox from '../Model/CustomBox';
import CustomBoxItem from '../Model/CustomBoxItem';
// import ManageRequest from '../asset/svg/signing.svg';
import CalculateWages from '../asset/svg/employee.svg';
import AssignmentSchedule from '../asset/svg/calendar.svg';
import CreateAccount from '../asset/svg/CreaAccount.svg';
// import Assign from '../asset/svg/rotation.svg';
import EmployeeList from '../asset/svg/test.svg';
import Attendance from '../asset/svg/attendance.svg';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';
import CustomHeader from '../Model/CustomHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {ManageEmployeePramaList} from '../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {selectAuth} from '../redux/reducer/authslice';
import { useAppSelector } from '../redux/hook';
type props = {
  navigation: StackNavigationProp<ManageEmployeePramaList, 'MainScreen'>;
};
const ManageStaffScreen: React.FC<props> = ({navigation}: props) => {
  const {typeUser, userName} = useSelector(selectAuth);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Quản lý nhân sự"
        onpress={() => navigation.goBack()}
      />
      <View style={{marginTop: 25}}>
        <ScrollView>
          <CustomBox
            styles={[styles.shadowNames]}
            isAvatar={true}
            avatar={require('../asset/Images/logo_new.png')}
            title={userName}
            subtitle={typeUser == 0 ? 'Quản lý' : 'Nhân viên'}
          />

          {/* <CustomBoxItem Avatarimg={<ManageRequest width={reponsivewidth(50)} height={reponsiveheight(50)}/>} title="Quản lý yêu cầu" isBadge={true} BadgeSucess={30} BadgeDontRead={50} BadgeUnAccept={5}/> */}
         

         
          {
            // Phân quyền admin
          typeUser ==0 && <>
          <CustomBoxItem
            Style={{marginTop: 25}}
            onPress={() => {
              navigation.navigate('CreateAccount');
            }}
            Avatarimg={
              <CreateAccount
                width={reponsivewidth(50)}
                height={reponsiveheight(50)}
              />
            }
            title="Tạo tài khoản"
          />
          <CustomBoxItem
            Style={{marginTop: 25}}
            onPress={() => {
              navigation.navigate('Wages');
            }}
            Avatarimg={
              <CalculateWages
                width={reponsivewidth(50)}
                height={reponsiveheight(50)}
              />
            }
            title="Chấm công"
          />
          </>
          }
          
          <CustomBoxItem
            Style={{marginTop: 25}}
            onPress={() => {
              navigation.navigate('AssignmentParamaList');
            }}
            Avatarimg={
              <AssignmentSchedule
                width={reponsivewidth(50)}
                height={reponsiveheight(50)}
              />
            }
            title="Lịch công trong tuần "
          />
        
          {/* <CustomBoxItem Avatarimg={<Assign  width={reponsivewidth(50)} height={reponsiveheight(50)} />} title="Phân công"/> */}
          <CustomBoxItem
            Style={{marginTop: 25}}
            Avatarimg={
              <EmployeeList
                width={reponsivewidth(50)}
                height={reponsiveheight(50)}
              />
            }
            title="Danh sách nhân viên"
            onPress={() => {
              navigation.navigate('EmployeeInformationParamList');
            }}
          />
          <CustomBoxItem
            Style={{marginTop: 25}}
            Avatarimg={
              <Attendance
                width={reponsivewidth(50)}
                height={reponsiveheight(50)}
              />
            }
            title="Điểm danh "
            onPress={() => {
              navigation.navigate('AttendanceScreen');
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ManageStaffScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  shadowNames: {
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
