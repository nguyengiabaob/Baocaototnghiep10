/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import Logoimg from '../../asset/svg/logo.svg';
import Bell from '../../asset/svg/Bell_1.svg';
import CustomButton from '../../Model/CustomButton';
// import Desk from '../../asset/svg/dinning-table.svg';
// import PackgeIcon from '../../asset/svg/package.svg';
// import People from '../../asset/svg/team.svg';
// import Charicon from '../../asset/svg/trend.svg';
import {DashboardNavigationParamList} from '../../navigation/types';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import {StackNavigationProp} from '@react-navigation/stack';
import AuthService from '../../services/authService';
import {useAppSelector} from '../../redux/hook';
import {selectAuth} from '../../redux/reducer/authslice';
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import {Product} from '../../Model/product';
// import DataService from '../../services/dataservice';
// import data from '../../services/data';
// import DataService from '../../services/dataservice';
// import data from '../../services/data';
type Props = {
  navigation: StackNavigationProp<
    DashboardNavigationParamList,
    'DashboardScreen'
  >;
  route: RouteProp<DashboardNavigationParamList, 'DashboardScreen'>;
};
const DashboardScreen: React.FC<Props> = ({navigation, route}: Props) => {
  const [username, setusername] = useState<string | null | undefined>('');
  const {isLoggedGoogle, isLoggedIn, typeUser} = useAppSelector(selectAuth);
  async function fetchUsename() {
    const user = await AuthService.getusername();
    setusername(user);
  }
  React.useEffect(() => {
    if (isLoggedGoogle === true) {
      setusername(auth().currentUser?.displayName);
    } else if (isLoggedIn === true) {
      fetchUsename();
    }
  }, [isLoggedGoogle, isLoggedIn, username]);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.Top}>
        <View>
          <Logoimg width={reponsivewidth(150)} height={reponsiveheight(150)} />
          <Text style={style.Title}>Xin Chào, {username}</Text>
        </View>
        <View style={{marginTop: 15, flex: 1}}>
          <Pressable>
            <Bell
              style={{alignSelf: 'flex-end'}}
              width={reponsivewidth(35)}
              height={reponsiveheight(35)}
            />
          </Pressable>
        </View>
      </View>
      <View style={style.containerScrollview}>
        <ScrollView style={{marginTop: 25, flex: 1}}>
          <View style={style.ContainerButton}>
            <CustomButton
              textStyle={{color: '#02569E'}}
              viewstyle={[style.shadowsContainer, {backgroundColor: '#ffff'}]}
              title="Quản lý Bàn"
              onpress={() => {
                navigation.navigate('RoomNavigation');
              }}
              icon={
                <MaterialCommunityIcons
                  name="file-table-box-multiple"
                  color={'#02569E'}
                  size={65}
                />
              }
            />
            <CustomButton
              textStyle={{color: '#02569E'}}
              viewstyle={[style.shadowsContainer, {backgroundColor: '#ffff'}]}
              title="Quản lý Nhân sự"
              icon={<FontAwesome name="users" size={65} color={'#02569E'} />}
              onpress={() => {
                navigation.navigate('ManageStaff');
              }}
            />
          </View>
          <View style={style.ContainerButton}>
            <CustomButton
              textStyle={{color: '#02569E'}}
              onpress={() => {
                navigation.navigate('ProductNavigation');
              }}
              viewstyle={[style.shadowsContainer, {backgroundColor: '#ffff'}]}
              title="Quản lý sản phẩm "
              icon={<Feather name="box" size={65} color={'#02569E'} />}
            />
            {typeUser == 0 ? (
              <CustomButton
                textStyle={{color: '#02569E'}}
                onpress={() => {
                  navigation.navigate('ChartNavigation');
                }}
                viewstyle={[style.shadowsContainer, {backgroundColor: '#ffff'}]}
                title="Thống kê doanh thu"
                icon={
                  <FontAwesome name="pie-chart" size={65} color={'#02569E'} />
                }
              />
            ) : (
              <CustomButton
                textStyle={{color: '#02569E'}}
                onpress={() => {
                  navigation.navigate('ExpenseManager');
                }}
                viewstyle={[style.shadowsContainer, {backgroundColor: '#ffff'}]}
                title="Quản lý Nguồn chi "
                icon={
                  <FontAwesome5 name="box-open" size={65} color={'#02569E'} />
                }
              />
            )}
          </View>
          <View style={style.ContainerButton}>
            {typeUser == 0 && (
              <CustomButton
                textStyle={{color: '#02569E'}}
                onpress={() => {
                  navigation.navigate('ExpenseManager');
                }}
                viewstyle={[style.shadowsContainer, {backgroundColor: '#ffff'}]}
                title="Quản lý Nguồn chi "
                icon={
                  <FontAwesome5 name="box-open" size={65} color={'#02569E'} />
                }
              />
            )}

            {/* <CustomButton
              textStyle={{color: '#02569E'}}
              onpress={() => {
                navigation.navigate('MaterialManager');
              }}
              viewstyle={[style.shadowsContainer, {backgroundColor: '#ffff'}]}
              title="Quản lý kho "
              icon={
                <FontAwesome5 name="box-open" size={65} color={'#02569E'} />
              }
            /> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  introduction: {
    flex: 0.3,
  },
  Top: {
    flexDirection: 'row',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#b6e4ff',
    paddingHorizontal: 25,
  },
  Title: {
    fontWeight: '700',
    fontSize: 25,
    paddingVertical: 10,
    marginTop: -25,
  },
  ContainerButton: {
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  containerScrollview: {
    marginTop: 5,
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: '#b6e4ff',
    borderTopWidth: 2,
    marginBottom: 5,
  },
  shadowsContainer: {
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
export default DashboardScreen;
