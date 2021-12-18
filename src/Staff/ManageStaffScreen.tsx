/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomBox from '../Model/CustomBox';
import CustomBoxItem from '../Model/CustomBoxItem';
import ManageRequest from '../asset/svg/signing.svg';
import CalculateWages from '../asset/svg/employee.svg';
import AssignmentSchedule from '../asset/svg/calendar.svg';
import Assign from '../asset/svg/rotation.svg';
import EmployeeList from '../asset/svg/test.svg';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
import CustomHeader from '../Model/CustomHeader';
import { ScrollView } from 'react-native-gesture-handler';
import { ManageEmployeePramaList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
type props= {
    navigation: StackNavigationProp<ManageEmployeePramaList,'MainScreen'>
}
const ManageStaffScreen :React.FC<props> = ({navigation}:props)=> {
    return (
        <View style={styles.container}>
            <CustomHeader title="Quản lý nhân sự" onpress={()=>navigation.goBack()}/>
            <View style={{marginTop:25}}>
            <ScrollView>
            <CustomBox styles={[styles.shadowNames]} isAvatar={true} avatar={require('../asset/Images/logo_new.png')} title="Admin" subtitle="Quản lý"/>
            
            {/* <CustomBoxItem Avatarimg={<ManageRequest width={reponsivewidth(50)} height={reponsiveheight(50)}/>} title="Quản lý yêu cầu" isBadge={true} BadgeSucess={30} BadgeDontRead={50} BadgeUnAccept={5}/> */}
            <CustomBoxItem Style={{marginTop:25}} onPress={()=>{navigation.navigate('Wages');}} Avatarimg={<CalculateWages  width={reponsivewidth(50)} height={reponsiveheight(50)} />} title="Chấm công"/>
            <CustomBoxItem Style={{marginTop:25}} onPress={()=>{navigation.navigate('Assignment')}} Avatarimg={<AssignmentSchedule width={reponsivewidth(50)} height={reponsiveheight(50)} />} title="Lịch công trong tuần "/>
            {/* <CustomBoxItem Avatarimg={<Assign  width={reponsivewidth(50)} height={reponsiveheight(50)} />} title="Phân công"/> */}
            <CustomBoxItem Style={{marginTop:25}} Avatarimg={<EmployeeList width={reponsivewidth(50)} height={reponsiveheight(50)} />} title="Danh sách nhân viên"  onPress={()=>{navigation.navigate('EmployeeInformationParamList')}}/>
            </ScrollView>
            </View>
        </View>
    );
};
export default ManageStaffScreen;
const styles = StyleSheet.create(
    {
        container:
        {  
            flex:1,
            backgroundColor:'#ebebeb',
        },
        shadowNames:{
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation:10
        },

    }

)