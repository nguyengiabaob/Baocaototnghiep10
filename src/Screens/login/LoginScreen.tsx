/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Logoimg from '../../asset/svg/logo.svg';
import {Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import { getheight, getwidth, reponsiveheight, reponsivewidth } from '../../theme/Metric';
import { useState } from 'react';
import { useEffect } from 'react';
// import postdata from '../services/data';
import data from '../../services/data';
import { StackNavigationProp } from '@react-navigation/stack';
import {  LoginstackParamList } from '../../navigation/types';
import { Userdata } from '../../Model/User';
import Feather from 'react-native-vector-icons/Feather';
import { intialIsLogging, selectAuth, SigIn } from '../../redux/reducer/authslice';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import CustomInput from '../../Model/CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Link } from '@react-navigation/native';
import HyperLink from 'react-native-hyperlink';
import CustomHyperLink from '../../Model/CustomHyperLink';
import ButtonFacebook from '../../Model/ButtonFacebook';
import ButtonGoogle from '../../Model/ButtonGoogle';
type Props= {
  navigation: StackNavigationProp<LoginstackParamList, 'TabNavigator'>
}
const LoginScreen: React.FC<Props> = ({navigation}:Props) => {
  const [user, setusername] = useState<string>('');
  const [pass, setpassword] = useState<string>('');
  const [arrayuser,setarrayuser] = useState<Userdata[]>([]);
  const [usernameError,setusernameError] = useState<boolean>(false);
  const [passwordError,setpasswordError] = useState<boolean>(false);
  const [hiddenPassword, sethiddenPassword] = useState<boolean>(false); 
  const dispatch = useAppDispatch();
  const {isLogging} = useAppSelector(selectAuth);
  // const selector= useAppSelector(selectAuth);

  useEffect(()=>{
    if (usernameError === true || passwordError === true || isLogging === true)
    {
    Toast.show({
      type : 'error',
      text1 : 'Đăng nhập thất bại',
      text2 : 'Tên đăng nhâp hoặc mật khẩu không đúng',
    });
    setusernameError(false);
    setpasswordError(false);
    dispatch(intialIsLogging());
  }

},[passwordError, usernameError, isLogging]);
  // useEffect(()=>{
  // //   var data_fetch: any[] = [];
  // //   data.getdata('user').then(data_f=>{ for (let key in data_f)
  // //   { data_fetch.push({
  // //       id: key,
  // //       ...data_f[key],
  // //     });
  // //   }
  // //     // console.log(data_fetch);
  // //     setarrayuser(data_fetch);
  // // });
  // },[]);
 const showPassword = ()=>{
    sethiddenPassword(prev=>!prev);
 }
 function checkInput() :boolean
  {
    let usernameInputError = false;
    let passwordInputError = false;
    // let check = false;
    if (user.length === 0)
    {

      usernameInputError  = true;
    }
    if (pass.length === 0)
    {
      // setpasswordError(true);
      passwordInputError = true;
    }
    // console.log(passwordError);
    //   arrayuser.forEach((value)=>{
    //   if (value.username === user && value.password == pass)
    //       {
    //         check = true;
    //       }
    // } );
    // if (check === false)
    // {
    //   usernameInputError = true;
    //   passwordInputError = true;
    // }
    setpasswordError(passwordInputError);
    setusernameError(usernameInputError);
    return usernameInputError && passwordInputError;
  }
  const  onLogin  = async (username:string , password:string)=>
  {
    if (checkInput() === true)
     {
        console.log(' không thành công');
     }
    else
    {
      dispatch(
      SigIn(username,password)
      );
      
    }
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={{flex: 1}}>
    <SafeAreaView style={style.containter}>
      <View style={style.container_logo}>
        <Logoimg width={reponsivewidth(350)} height={reponsiveheight(350)}/>
       </View>
         <View >
         <CustomInput  title="Username" icon={<FontAwesome size={20} name="user-o"/>} onchange={text=>setusername(text)}/>
         </View>
         <View>
           <CustomInput title="Password" icon={<Feather size={20} name="lock"/>} onchange={text=>setpassword(text)} secureTextEntry={hiddenPassword ? true : false} iconRight={hiddenPassword ? <Feather onPress={()=>showPassword()} name="eye-off" size={20}/> : <Feather onPress={()=>showPassword()}  name="eye" size={20}/>} />
         </View>
         {/* <View style={{alignSelf:'flex-end', marginRight:15}}>
           <CustomHyperLink onPress={()=>{navigation.navigate('ForgotPasswordSceen')}} title="Bạn quên mật khẩu ?"/>
         </View> */}
         <View style={style.view_btndangnhap}>
           <TouchableOpacity onPress ={()=>onLogin(user, pass)}><Text style={{fontSize:18,color:'#FFFFFFFF',backgroundColor:'#3c72c3'}}>{'Đăng nhập'}</Text></TouchableOpacity>
         </View>
         {/* <Text style={{alignSelf:'center',marginTop:20,fontSize:16}}>Hoặc đăng nhập bằng</Text>
          <View style={{marginTop:22,flexDirection:'row'}}>
           <ButtonFacebook style={{marginRight:15}}/>
           <ButtonGoogle/>
         </View> */}
         {/* <CustomHyperLink onPress={()=>{navigation.navigate('RegisterScreen')}} style={{marginTop:10}} title="Đăng ký tài khoản mới"/> */}
         <CustomHyperLink onPress={()=>{navigation.navigate('ForgotPasswordSceen')}} title="Bạn quên mật khẩu ?"/>
         </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
const style = StyleSheet.create({
    logo:
    {
        width:300,
        height:300,
    },
    containter:
    {
        flex :1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFF',
    },
    container_logo:
    {
        flex:0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:70,
        marginTop: 90,
    },
    background_img:
    {
      width: getwidth(),
      height: getheight(),
      flex: 1,
      alignItems:'center',
      zIndex: -1,
      elevation:-1,
    },
    container_account:
    {
        flex :0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    account:
    {
      marginHorizontal:5,
      flex: 1,
      width:reponsivewidth(500),
    },
    sectionStyle: {
      width:reponsivewidth(320),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderColor: '#000',
      height: reponsiveheight(52),
      borderRadius: 15,
      margin: 15,
    },
    imageStyle: {
      padding: 10,
      margin: 2,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
    },
    view_btndangnhap:
  {
    alignSelf:'center',
    width:reponsivewidth(300),
    alignItems:'center',
    borderWidth: 0.5,
    borderColor: '#03000000',
    height:reponsiveheight(60),
    backgroundColor:'#3c72c3',
    borderRadius: 8,
    justifyContent:'center',
    marginTop:18,
  },
  view_btndangky:
  {
    alignSelf:'center',
    width:reponsivewidth(210),
    alignItems:'center',
    borderWidth: 0.5,
    borderColor: '#03000000',
    height:reponsiveheight(200),
    backgroundColor:'#5cca8d',
    borderRadius: 15,
    justifyContent:'center',
    marginTop:25,
  },

});
