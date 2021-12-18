/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getheight, getwidth, reponsiveheight, reponsivewidth } from '../../theme/Metric';
import Logoimg from '../../asset/svg/logo.svg';
import CustomInput from '../../Model/CustomInput';
import CustomHyperLink from '../../Model/CustomHyperLink';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import data from '../../services/data';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginstackParamList } from '../../navigation/types';
import { Overlay } from 'react-native-elements';
import { CustomNotification } from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
type Props= {
  navigation: StackNavigationProp<LoginstackParamList, 'RegisterScreen'>
}
export const Register :React.FC<Props>= ({navigation})=>{
    const [user, setusername] = useState<string>('');
    const [Email, setemail] = useState<string>('');
    const [ErrorEmail, setErroremail] = useState<string>('');
    const [Erroruser, setErrorusername] = useState<string>('');
    const [pass, setpassword] = useState<string>('')
    const [Errorpass, setErrorpassword] = useState<string>('')
    const [confirmpass, setconfirmpassword] = useState<string>('');
    const [Errorconfirmpass, setErrorconfirmpassword] = useState<string>('');
    const [visble, setvisble] = useState<boolean>(false);
    const checkpassword =(pass: string):boolean=>{
      var i= 0;
      let low=false;
      let up= false;
      let special= false;
      var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
      while (i<pass.length)
      {
        if( pass.charAt(i)==pass.charAt(i).toUpperCase() )
        {
          up=true;
        }
        if( pass.charAt(i)==pass.charAt(i).toLowerCase())
        {
          low=true;
        }
        if(format.test(pass.charAt(i)))
          {
            special= true;
          }
          i++;
      }
      if(up == true && low==true && special== true && pass.length>=8 )
      {
        return true;
      }
      return false;
    }
    const register =(value: string)=>{
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(checkpassword(value)&& user != "" && confirmpass === value && re.test(Email)&& Email!=="")
      {
        setErrorpassword("");
        setErrorusername("");
        setErrorconfirmpassword("");
        data.postdatauser('user',user,value,"none",Email, "none","none","none",1,"none","none").then(res=> {
          if( res == true)
          {
            console.log("Thành công")
            setvisble(true);
          }
        })
      }
      else
      {
        if(user =="")
        {
          setErrorusername("Username không được trống");
        
        }
        else{
          setErrorusername("");
        
        }
        
        if(!checkpassword(value))
        {
            setErrorpassword("Mật khẩu phải lớn hơn 8 và có kí tự hoa thường và kí tự đặc như @... ")
        }
        else
        {
          setErrorpassword("")
        }
          
        
        if(checkpassword(value))
        {
          if(confirmpass != value)
          {
            setErrorconfirmpassword("Mật khẩu nhập lại không chính xác")
          }
         
        }
        if(Email=="" || !re.test(Email) )
        {
          
          setErroremail("Email không hợp lệ")
        }
        else
        {
          setErroremail("");
        }
      }
      
    }
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View style={style.containter}>
          <View style={style.container_logo}>
            <Logoimg width={reponsivewidth(150)} height={reponsiveheight(150)}/>
           </View>
             <View >
             <CustomInput errormes={Erroruser}  title="Username" icon={<FontAwesome size={20} name="user-o"/>} onchange={text=>setusername(text)}/>
             </View>
             <View >
             <CustomInput errormes={ErrorEmail}  title="Email" icon={<FontAwesome size={20} name="user-o"/>} onchange={text=>setemail(text)}/>
             </View>
             <View>
               <CustomInput errormes={Errorpass} title="Password" icon={<Feather size={20} name="lock"/>} onchange={text=>setpassword(text)} secureTextEntry={true} />
             </View>
             <View>
               <CustomInput errormes={Errorconfirmpass} title="Confirm password" icon={<Feather size={20} name="lock"/>} onchange={text=>setconfirmpassword(text)} secureTextEntry={true} />
             </View>
             <View style={style.view_btndangky}>
               <TouchableOpacity onPress={()=>{register(pass);}} ><Text style={{fontSize:18,color:'#000000',backgroundColor:'#d0d0d0'}}>{'Đăng ký'}</Text></TouchableOpacity>
             </View>
             <View style={style.view_btndangnhap}>
               <TouchableOpacity onPress={()=>navigation.goBack()} ><Text style={{fontSize:18,color:'#FFFFFFFF',backgroundColor:'#3c72c3'}}>{'Đăng nhập'}</Text></TouchableOpacity>
             </View>
            
             {/* <Text style={{alignSelf:'center',marginTop:20,fontSize:16}}>Hoặc đăng nhập bằng</Text> */}
              {/* <View style={{marginTop:22,flexDirection:'row'}}>
               <ButtonFacebook style={{marginRight:15}}/>
               <ButtonGoogle/>
             </View> */}
             {/* <CustomHyperLink style={{marginTop:10}} title="Đăng ký tài khoản mới"/> */}
             </View>
             <CustomNotification visible={visble} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  onCancel={()=>{setvisble(false);navigation.goBack();}} Content="Bạn đã đăng ký thành công !"/>
        </KeyboardAvoidingView>
    )
}
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
        backgroundColor:'#FFFF',
    },
    container_logo:
    {
     
        //alignItems: 'center',
        justifyContent: 'center',
        marginBottom:10,
        marginTop: -80,
       
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
    width:reponsivewidth(300),
    alignItems:'center',
    borderWidth: 0.5,
    borderColor: '#03000000',
    height:reponsiveheight(60),
    backgroundColor:'#d0d0d0',
    borderRadius: 8,
    justifyContent:'center',
    marginTop:18,
  },

});
