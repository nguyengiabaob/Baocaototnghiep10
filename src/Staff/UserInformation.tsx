/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CustomHeader from '../Model/CustomHeader';
import { DetailUser } from '../Model/DetailUser';
import { Userdata } from '../Model/User';
import { EmployeeInformationParamList } from '../navigation/types';
import data from '../services/data';
type props ={
    navigation: StackNavigationProp<EmployeeInformationParamList,'UserInformation'>
    route: RouteProp<EmployeeInformationParamList,'UserInformation'>
}

export const UserInformation :React.FC<props> = ({navigation,route}:props)=>{
    const isFocused =useIsFocused();
    const [userPick,setuserpick] = useState<Userdata>();
    const {id} = route.params;
    const getuser = ( ID : string )=>{
        var datarray : Userdata;
        data.getdata('user').then(res=> {for ( let key in res)
        {
            if (key === ID)
            {
              datarray = res[key];
              datarray.id = key;
            }
        }
        setuserpick(datarray);
    });
    };
console.log(userPick?.id);
useEffect(()=>{
    if (isFocused === true)
    {
    getuser(id);
    }
},[id,isFocused]);
    return (
        <SafeAreaView style={styles.container}>
            {userPick && <DetailUser navigation={navigation} user={userPick}/>}
            {/* <CustomH eader title="Thông tin nhân viên" onpress={()=>navigation.goBack()}/> */}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create(
    {
        container: {
            flex:1,
            backgroundColor:'#e8e8e8',
        }
    }
)