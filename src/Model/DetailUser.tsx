/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Pressable } from 'react-native';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
import Usericon from '../asset/svg/user.svg';
import { Avatar, CheckBox, Input } from 'react-native-elements';
import { Userdata } from './User';
import { CustomNotification } from './CustomNofication';
import BellNofi from '../asset/svg/bellnotification.svg';
import IconCheck from '../asset/svg/check.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'react-native-image-picker';
import { MediaType } from 'react-native-image-picker';
import { ImageData } from './Image';
import storage from '@react-native-firebase/storage';
import data from '../services/data';
import { StackNavigationProp } from '@react-navigation/stack';
import { EmployeeInformationParamList } from '../navigation/types';
import { useAppSelector } from '../redux/hook';
import { selectAuth } from '../redux/reducer/authslice';
type props ={
    user: Userdata,
    navigation : StackNavigationProp<EmployeeInformationParamList,'UserInformation'>
}
export const DetailUser: React.FC<props> = ({user, navigation}:props)=>{
const {typeUser} = useAppSelector(selectAuth);
const [Name, setName] = useState<string>('');
const [Service, setService] = useState<string>('');
const [errorphone, seterrorphone]= useState<string>('');
const [ErrorName, setErrorName] = useState<string>('');
const [ErrorSerivce, setErrorService] = useState<string>('');
const [erroremail, seterroremail]= useState<string>('');
const [phone,setphone] = useState<string>('');
const [Email,setEmail] = useState<string>('');
const [showdatepicker,setshodatepicker] = useState<boolean>(false);
const [showdatepickervalue,setshodatepickervalue] = useState<Date>(new Date(user.dateofbirth));
const [datepickervalue,setdatepickervalue] = useState<string>();
const [pickImg, setPickImage] = useState<ImageData[]>([]);
const [visible, setvisible] = useState<boolean>(false);
const [male,setmale] = useState<boolean>(user.Gender === 'nam' ? true : false);
const [female,setfemale] = useState<boolean>(user.Gender === 'n???' ? true : false);
const onChange = (event: Event, selectdate: any) => {
    var currentDate = selectdate || showdatepickervalue; 
    setshodatepicker(false);
    setshodatepickervalue(currentDate);
  };
function transferday (currentDate:any){
    if (isNaN(Number(currentDate)) === true)
    {
        return '';
    }
    let pickdate = new Date(currentDate);
    let textdate = pickdate.getDate() + '/' + (pickdate.getMonth() + 1) + '/' + pickdate.getFullYear();
    return textdate;
}
console.log(user.id);
async function UpdateStaff (){
    let gen = '';
    let img ='';
    let name = '';
    let phonepick  = '';
    let emailpick  = '';
    //let service='';
   if (male === true)
    {
       gen = 'nam';
    }
    else
    {
        gen = 'n???';
    }
    if (Name ==='')
    {
        name = user.Name;
    }
    else
    {
        name = Name;
    }
    if (phone === '')
    {
        phonepick = user.phone;
    }
    else
    {
        phonepick = phone;
    }
    if (Email === '')
    {
        emailpick = user.Email;
    }
    else
    {
        emailpick= Email;
    }
    if ( pickImg.length > 0)
    {
    const reference = storage().ref(pickImg[0].fileName);
    console.log(reference);
    const pathToFile = pickImg[0].uri;
    await reference.putFile(pathToFile);
    img =  await reference.getDownloadURL();
    }
    else
    {
        img = user.Avatar;
    }
    data.updateuser('user',phonepick,emailpick, gen, img, name,new Date(showdatepickervalue).toDateString(),user.id).then(res=>{if (res === true)
    {
       setvisible(true);
    }});
};
  const type: MediaType = 'photo';
  const Handlechoosephoto = ()=>{
      const option  = { mediaType: type,
      };
      ImagePicker.launchImageLibrary(option,response=>{console.log('response',response);
      if (response.assets)
          {
            let img: ImageData  = { fileName: null, uri:null, img:null};
            let imgarray: ImageData[]  = [];
               response.assets.map((res:any)=>
                    {
                        img.img = res;
                        img.fileName = res.fileName;
                        img.uri = res.uri;
                        imgarray.push(img);
                    }
              );
            setPickImage(imgarray);
          }
            }
        );
    };
    return (
        <View style={style.container}>
        <View style={style.containericon}>
           {/* <Usericon width={reponsivewidth(110)} height={reponsiveheight(110)}/>    */}
           { pickImg.length >0 ? 
            <>
            <Avatar containerStyle={{height:reponsiveheight(120), width:reponsivewidth(120),borderRadius:50}} avatarStyle={{width:reponsivewidth(120), height:reponsiveheight(120),borderRadius:50}}
             source={pickImg[0].img}
                 >
            
         {typeUser==0 &&<Avatar.Accessory onPress={()=>Handlechoosephoto()} style={{height:reponsiveheight(30), width:reponsivewidth(30)}} {...{size:25}} />}
         </Avatar>
         </>
         :
           <>
           <Avatar containerStyle={{height:reponsiveheight(120), width:reponsivewidth(120),borderRadius:50}} avatarStyle={{width:reponsivewidth(120), height:reponsiveheight(120),borderRadius:50}}
            source={{
                 uri:user.Avatar !== 'none' ? user.Avatar : 'none',
            }}
                >
           
        {typeUser==0 && <Avatar.Accessory onPress={()=>Handlechoosephoto()} style={{height:reponsiveheight(30), width:reponsivewidth(30)}} {...{size:25}} />}
        </Avatar>
        </>
            }
        </View>
        <View style={style.container2}>
            <Text style={{fontWeight:'bold', fontSize:18}}>Th??ng tin nh??n vi??n </Text>
            <ScrollView>
            {/* <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} > */}
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   {/* <Text style={{marginHorizontal:8}}>T??n ????ng nh???p</Text> */}
               {/* </View>
               <View style={{flex:0.8, marginTop:10}}>
                   <Input  inputStyle={{fontSize:16,marginBottom:-10}}></Input>
               </View>
            </View> */}
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} >
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   <Text style={{marginHorizontal:8}}>H??? t??n</Text>
               </View>
               <View style={{flex:0.8, justifyContent:'center'}}>
                    <Input onChangeText={(text)=>{setName(text)}}

                    inputStyle={{fontSize:16,marginBottom:-10}}>{user.Name  == 'none' ? 'Kh??ng c??' : user.Name }</Input>
               </View>
            </View>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.35, marginLeft:6}} > 
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   <Text style={{marginHorizontal:8}}>Ng??y sinh</Text>
               </View>
               <View style={{flex:0.7, flexDirection:'row', alignItems:'center'}}>
                  <Text style={{flex:0.8}}>{transferday(showdatepickervalue ) ? transferday(showdatepickervalue )  : '' }</Text>
                   <Pressable style={{justifyContent:'flex-end',flex:0.2}} onPress={()=>setshodatepicker(true)}>
                        <MaterialCommunityIcons name="calendar-today" size={30}/>
                   </Pressable>
                {showdatepicker &&  (  <DateTimePicker
                        value={showdatepickervalue}
                        display={"calendar"}
                        mode={"date"}
                        is24Hour={true}
                        onChange={onChange}
                        />
                )}
               </View>
            </View>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} >
                   {/* <MaterialIcons name="home-repair-service" size={20} color="#fb7a7a"/> */}
                   <Text style={{marginHorizontal:8}}>Gi???i t??nh</Text>
               </View>
               <View style={{flex:0.8, justifyContent:'center', display:'flex', flexDirection:'row'}}>

                  <CheckBox onPress={()=>{
                      if ( !male === true)
                      {
                          setfemale(false);
                      }
                     setmale(!male);
                      }} checked={male} containerStyle={{backgroundColor:'#FFFF', borderColor:'#FFFF',justifyContent:'center'}} title="Nam"/>
                  <CheckBox onPress={()=>{
                        if ( !female === true)
                        {
                            setmale(false);
                        }
                        setfemale(!female);
                      }} checked={female} containerStyle={{backgroundColor:'#FFFF', borderColor:'#FFFF',justifyContent:'center'}} title="N???"/>
               </View>
            </View>
            {/* <View style={style.fieldinfo}> */}
               {/* <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} > */}
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   {/* <Text style={{marginHorizontal:8}}>M?? nh??n vi??n</Text>
               </View>
               <View style={{flex:0.8, marginTop:10}}>
                   <Input disabled={true} inputStyle={{fontSize:16,marginBottom:-10}} />
               </View> */}
            {/* </View> */}
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} >
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   <Text style={{marginHorizontal:8}}>Ch???c v???</Text>
               </View>
               <View style={{flex:0.8, justifyContent:'center'}}>
                    <Input disabled={true} onChangeText={(text)=>{setService(text)}} inputStyle={{fontSize:16,marginBottom:-10}}>{user.type ==1 ? 'Nh??n vi??n' : user.type ==0 ? 'Qu???n l??' : 'Kh??ng c??' }</Input>
               </View>
            </View>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} >
                   {/* <Fethericon name="phone" size={20} color="#b5e5b9"/> */}
                   <Text style={{marginHorizontal:8}}>S??? ??i???n tho???i </Text>
               </View>
               <View style={{flex:0.8, justifyContent:'center'}}>
                    <Input keyboardType={'number-pad'} errorMessage={errorphone} errorStyle={{color:'red'}} onEndEditing={(e)=>{
                       if (isNaN(Number(e.nativeEvent.text) ))
                       {
                           seterrorphone('S??? ??i???n tho???i kh??ng h???p l???');
                           console.log(Number(e.nativeEvent.text));
                       }
                       else
                       {
                        if (errorphone !== '')
                            {seterrorphone('');
                        }
                        setphone(e.nativeEvent.text);
                       }
                   }} inputStyle={{fontSize:16,marginBottom:-10}}>{user.phone === 'none' ? 'kh??ng c??' : user.phone }</Input>
               </View>
            </View>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} >
                   {/* <FontAwesome name="envelope-o" size={20} color="#f1c77b"/> */}
                   <Text style={{marginHorizontal:8}}>Email </Text>
               </View>
                <View style={{flex:0.8, justifyContent:'center'}}>
                    <Input errorMessage={erroremail} errorStyle={{color:'red'}} onEndEditing={(e)=>{
                       const format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (format.test(e.nativeEvent.text))
                      {
                          if (erroremail !== '')
                          {
                            seterroremail('');
                          }
                          setEmail(e.nativeEvent.text);

                      }
                      else
                      {
                            seterroremail('Email kh??ng h???p l??? !');
                      }
                   }}  inputStyle={{fontSize:16,marginBottom:-10}}>{user.Email == 'none' ? 'kh??ng c??' : user.Email }</Input>
               </View>
            </View>
            </ScrollView>
            { typeUser == 0  &&
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>UpdateStaff()} style={style.button}>
                {/* <Fethericon name="log-out" size={20} color="#FFF"/> */}
                <View style={{flex:1}}>
                <Text style={{ color:'#FFF', marginHorizontal:8, alignSelf:'center'}}>L??u</Text>
                </View>
                </TouchableOpacity>
            </View>
            }
            <CustomNotification visible={visible} title="Th??ng b??o"  iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} iconContent={ <IconCheck   width={reponsivewidth(150)} height={reponsiveheight(60)} /> } onCancel={()=>{setvisible(false); navigation.goBack()}} Content="L??u th??ng tin th??nh th??nh c??ng !"/>
        </View>

   </View>
    );
};
const style = StyleSheet.create(
    {
        container:
            {
                backgroundColor: '#e8e8e8',
                flex:1,
                marginTop:15,
            },
        container2:
        {
            flex:0.8,
            alignItems:'center',
            marginTop:25,
        },
        containerfield:
        {
            backgroundColor:'#FFF',

        },
        fieldinfo:
        {
            paddingRight:15,
            marginVertical:10,
            backgroundColor:'#FFF',
            flexDirection:'row',
            borderRadius:40,
            alignSelf:'center',
            width: reponsivewidth(380),
            height: reponsiveheight(80),

        },
        info:
        {
            flexDirection:'row',

        },
        containericon:
        {
           
            flex:0.2,
            justifyContent:'center',
            alignItems:'center' ,
            alignSelf:'center',
            width: reponsivewidth(360),
          
        },
        title:
        {
            marginRight:10,
        },
        button:
        {
            flexDirection:'row',
            marginVertical:5,
            padding:15,
            width:reponsivewidth(150),
            backgroundColor:'#ef7d7d',
            color:'#FFF',
        },
    }
);
