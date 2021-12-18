/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState }  from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CustomNotification } from "../../Model/CustomNofication";
import { getheight, getwidth, reponsiveheight, reponsivewidth } from "../../theme/Metric";
import BellNofi from '../../asset/svg/bellnotification.svg';
import Logoimg from '../../asset/svg/logo.svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInput from "../../Model/CustomInput";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginstackParamList } from "../../navigation/types";
import RNSmtpMailer from "react-native-smtp-mailer";
import Fontisto from 'react-native-vector-icons/Fontisto';
import RNFS  from 'react-native-fs'
import data from "../../services/data";
import { Userdata } from "../../Model/User";
type Props= {
    navigation: StackNavigationProp<LoginstackParamList, 'ForgotPasswordSceen'>
  }
export const ForgotPassword:React.FC<Props> =({navigation})=>{

    const [Email, setemail] = useState<string>('');
    const [ErrorEmail, setErroremail] = useState<string>('');
    const [visible, setvisible] = useState<boolean>(false);
   
    const sendMail= (pass:string)=>{
        RNSmtpMailer.sendMail({
            mailhost: "smtp.gmail.com",
            port: "465",
            ssl: true, // optional. if false, then TLS is enabled. Its true by default in android. In iOS TLS/SSL is determined automatically, and this field doesn't affect anything
            username: "choigamesss000@gmail.com",
            password: "nmzx1593tmb",
            fromName: "choigamesss000@gmail.com", // optional
            replyTo: "choigamesss000@gmail.com", // optional
            recipients: Email,
            subject: "Lấy lại mật khẩu",
            htmlBody: `Mật khẩu của bạn đã được đổi thành ${pass}`,
            // attachmentPaths: [
            //   RNFS.ExternalDirectoryPath + "/image.jpg",
            //   RNFS.DocumentDirectoryPath + "/test.txt",
            //   RNFS.DocumentDirectoryPath + "/test2.csv",
            //   RNFS.DocumentDirectoryPath + "/pdfFile.pdf",
            //   RNFS.DocumentDirectoryPath + "/zipFile.zip",
            //   RNFS.DocumentDirectoryPath + "/image.png"
            // ], // optional
            // attachmentNames: [
            //   "image.jpg",
            //   "firstFile.txt",
            //   "secondFile.csv",
            //   "pdfFile.pdf",
            //   "zipExample.zip",
            //   "pngImage.png"
            // ], // required in android, these are renames of original files. in ios filenames will be same as specified in path. In a ios-only application, no need to define it
          })
            .then(success => console.log(success))
            .catch(err => console.log(err));
    }
    const ForgotPassword=(Email:string)=>{
      let mk = (Math.random() + 1).toString(36).substring(8);
      let Item: Userdata;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(Email))
        {
          let dataarray:any[]=[];
          data.getdata('user').then(res=>{
            for(let key in res)
            {
              if(key !="0")
              {
                dataarray.push({
                  id: key,
                  ...res[key],
                })
              }
            }
            dataarray.forEach(item=>{
              if(item.Email=== Email)
              {
                Item=item;
              }
            })
            data.updateuser("user", Item.username,mk,Item.phone,Item.Email,Item.Gender,Item.Avatar,Item.Name,1,Item.dateofbirth,Item.service,Item.id)
          })
            sendMail(mk);
           
            setvisible(true);
        }
        else
        {
            setErroremail("Email không hợp lệ");
        }
    }
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}>
        <View style={style.containter}>
          <View style={style.container_logo}>
            <Logoimg width={reponsivewidth(150)} height={reponsiveheight(150)}/>
           </View>
             <View >
             <CustomInput errormes={ErrorEmail}  title="Email" icon={<Fontisto size={20} name="email"/>} onchange={text=>setemail(text)}/>
             </View>
             <View style={style.view_btndangky}>
               <TouchableOpacity onPress={()=>{ForgotPassword(Email)}} ><Text style={{fontSize:18,color:'#000000',backgroundColor:'#d0d0d0'}}>{'Lấy lại mật khẩu'}</Text></TouchableOpacity>
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
             <CustomNotification visible={visible} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  onCancel={()=>{setvisible(false);navigation.goBack();}} Content="Mật khẩu được gửi tới mail của bạn !"/>
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
