/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View ,ScrollView, TouchableOpacity, Pressable, Image, SafeAreaView} from 'react-native';
import { CheckBox, Overlay, Text } from 'react-native-elements';
import CustomInput from '../Model/CustomInput';
import Imageadd from '../asset/svg/images-interface-symbol.svg';
import TakeImage from '../asset/svg/photo.svg';
import IconTitle from '../asset/svg/teamwork.svg';
import { EmployeeInformationParamList, ManageEmployeePramaList } from '../navigation/types';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
import CustomHeader from '../Model/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ImageData } from '../Model/Image';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { MediaType } from 'react-native-image-picker';
import data from '../services/data';
import { Userdata } from '../Model/User';
import BellNofi from '../asset/svg/bellnotification.svg';
import IconCheck from '../asset/svg/check.svg';
import { CustomNotification } from '../Model/CustomNofication';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { requestLogout, selectAuth } from '../redux/reducer/authslice';
import Warning from '../asset/svg/Warning.svg';
import { RouteProp } from '@react-navigation/native';
type props ={
    navigation: StackNavigationProp<EmployeeInformationParamList,'AddstaffScreen'>
    route: RouteProp<EmployeeInformationParamList,'AddstaffScreen'>
}
export const AddStaffScreen :React.FC<props> = ({navigation,route}:props)=>{
const [Name, setName] = useState<string>('');
const [ErrorName, setErrorName] = useState<string>('');
const [errorphone, seterrorphone]= useState<string>('');
const [erroremail, seterroremail]= useState<string>('');
const {isAdd}= route.params;
// const [errorservice, seterrorservice]= useState<string>('');
const [male,setmale] = useState<boolean>(true);
const [female,setfemale] = useState<boolean>(false);
const [phone,setphone] = useState<string>('');
const [Email,setEmail] = useState<string>('');
const [showdatepicker,setshodatepicker] = useState<boolean>(false);
const [showdatepickervalue,setshodatepickervalue] = useState<Date>(new Date());
const [datepickervalue,setdatepickervalue] = useState<string>();
const [pickImg, setPickImage] = useState<ImageData[]>([]);
const [visible, setvisible] = useState<boolean>(false);
const [service,setservice] = useState<string>('');
const {userToken}=useAppSelector(selectAuth);
const [Error,setError]= useState<boolean>(false);
const dispatch = useAppDispatch();
  function onLogOut() {
    dispatch(requestLogout());
  }

const openModal = ()=>{
    setvisible(true);
};
const cancelModal = ()=>
{
    setvisible(false);
};
const onChange = (event: Event, selectdate: any) => {
    var currentDate = selectdate || showdatepickervalue; 
    setshodatepicker(false);
    setshodatepickervalue(currentDate);
    let pickdate = new Date(currentDate);
    let textdate = pickdate.getDate() + '/' + (pickdate.getMonth() + 1) + '/' + pickdate.getFullYear();
    setdatepickervalue(textdate);
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
async function addDataStaff (){
    let urlimg='none';
    let gen = '';
    if (male === true)
    {
       gen = 'nam';
    }
    else
    {
        gen = 'nữ';
    }
    if (pickImg.length > 0 )
    {
    const reference = storage().ref(pickImg[0].fileName);
    console.log(reference);
    const pathToFile = pickImg[0].uri;
    await reference.putFile(pathToFile);
    urlimg =  await reference.getDownloadURL();
    }
    if(isAdd == true)
    {
        if(phone !== ''  && Name !==''  && errorphone=='' && ErrorName=='' && userToken && datepickervalue && gen!= '' )
        {
            let newData = {
                phone: phone,
                Gender: gen,
                Avatar: urlimg,
                Name: Name,
                dateofbirth: showdatepickervalue.toDateString(),
            }
            data.Patchuser(newData,userToken).then(res=>{if (res === true)
            {
                console.log('true');
                openModal();
            }});
        }
        else
        {
            setError(true);
        }
    }
    else
    {
        if(phone !== ''  && Name !=='' && Email!== ''  && errorphone=='' &&erroremail==''&& ErrorName=='' && datepickervalue && gen!= '' )
        {
            let newData = {
                type: 1,
                Email:Email,
                phone: phone,
                Gender: gen,
                Avatar: urlimg,
                Name: Name,
                dateofbirth: showdatepickervalue.toDateString(),
            }
            data.postAccountnew(newData).then(res=>{if (res === true)
            {
                console.log('true');
                openModal();
            }});
        }
        else
        {
            setError(true);
        }
    }
   
};
    return (
        <SafeAreaView style={style.container}>
            {/* <CustomHeader title="Thêm nhân viên"  onpress={()=>{navigation.goBack()}}/> */}
            <View style={{flexDirection:'row', justifyContent:'center' ,alignItems:'center', marginTop:12, backgroundColor:'#226cb3', width:reponsivewidth(395),borderRadius:5}}>
                <IconTitle width={reponsivewidth(40)} height={reponsiveheight(40)}/>
                <Text style={{color:'#FFF'}}>Thông tin nhân viên</Text>
            </View>
            <ScrollView>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.35, marginLeft:6}} >
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   <Text style={{marginHorizontal:8}}>Họ và tên</Text>
               </View>
               <View style={{flex:0.7, marginTop:10}}>
                   <CustomInput onendEdit={(e)=>{
                        if(e.nativeEvent.text== '')
                        {
                            setErrorName('Họ tên không được trống')
                        }
                        else
                        {
                            setName(e.nativeEvent.text);
                            setErrorName('');
                        }

                   }} errormes={ErrorName} style={{width:reponsivewidth(230)}} inputstyle={{fontSize:16,marginBottom:-10}} />
               </View>
            </View>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.35, marginLeft:6}} > 
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   <Text style={{marginHorizontal:8}}>Ngày sinh</Text>
               </View>
               <View style={{flex:0.7, flexDirection:'row', alignItems:'center'}}>
                  <Text style={{flex:0.8}}>{datepickervalue}</Text>
                   <Pressable style={{justifyContent:'flex-end',flex:0.2}} onPress={()=>setshodatepicker(true)}>
                        <MaterialCommunityIcons name="calendar-today" size={30}/>
                   </Pressable>
                   {/* <CustomInput errormes={ errordateofbirth !== '' ? errordateofbirth : ''} onendEdit={(e)=>{ 
                       if ( new Date(e.nativeEvent.text) !==  new Date(NaN.toString()))
                       {
                        //    setdateofbirth(new Date(e.target.valueOf()));
                           console.log( new Date(e.nativeEvent.text).toDateString());
                           seterrordateofbirth('');
                       }
                       else
                       {
                           seterrordateofbirth('Ngày sinh không hợp lệ');
                       }}} style={{width:reponsivewidth(230)}} inputstyle={{fontSize:16,marginBottom:-10}} /> */}
                {showdatepicker &&  (  <DateTimePicker
                        value={showdatepickervalue}
                        display={'calendar'}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                        />
                )}
               </View>
            </View>
            <View style={style.fieldinfo}>
            <View style={{flexDirection: 'row', alignItems:'center', flex:0.38, marginLeft:5}} >
                   {/* <MaterialIcons name="home-repair-service" size={20} color="#fb7a7a"/> */}
                   <Text style={{marginHorizontal:8}}>Giới tính</Text>
               </View>
               <View style={{flex:0.8, justifyContent:'center', display:'flex', flexDirection:'row'}}>
                  <CheckBox onPress={()=>{
                       if ( !male === true)
                       {
                           setfemale(false);
                       }
                      setmale(!male)}} checked={male} containerStyle={{backgroundColor:'#FFFF', borderColor:'#FFFF',justifyContent:'center'}} title="Nam"/>
                  <CheckBox onPress={()=>{ 
                      if ( !female === true)
                      {
                          setmale(false);
                      }

                      setfemale(!female)}} checked={female}  containerStyle={{backgroundColor:'#FFFF', borderColor:'#FFFF',justifyContent:'center'}} title="Nữ"/>
               </View>
            </View>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.35, marginLeft:6}} >
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   <Text style={{marginHorizontal:8}}>Số điên thoại</Text>
               </View>
               <View style={{flex:0.7, marginTop:10}}>
                   <CustomInput errormes={errorphone} onendEdit={(e)=>{
                       if (isNaN(Number(e.nativeEvent.text) ))
                       {
                           seterrorphone('Số điện thoại không hợp lệ');

                       }
                       else
                       {
                        if (errorphone !== '')
                            {seterrorphone('');
                        }
                        setphone(e.nativeEvent.text);
                       }
                   }} keyboardstyle="number-pad" style={{width:reponsivewidth(230)}} inputstyle={{fontSize:16,marginBottom:-10}} />
               </View>
            </View>
            <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.35, marginLeft:6}} >
                  
                   <Text style={{marginHorizontal:8}}>Email</Text>
               </View>
               <View style={{flex:0.7, marginTop:10}}>
                   <CustomInput errormes={erroremail} onendEdit={(e)=>{
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
                            seterroremail('Email không hợp lệ !');
                      }
                   }} style={{width:reponsivewidth(230)}} inputstyle={{fontSize:16,marginBottom:-10}} />
               </View>
            </View>
            {/* <View style={style.fieldinfo}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.35, marginLeft:6}} >
             
                   <Text style={{marginHorizontal:8}}>Chức vụ</Text>
               </View>
               <View style={{flex:0.7, marginTop:10}}>
                   <CustomInput errormes={errorservice} onendEdit={(e)=>{
                        if(e.nativeEvent.text=='')
                        {
                            seterrorservice('Chức vụ không được để trống');
                        }
                        else
                        {
                            setservice(e.nativeEvent.text);
                            seterrorservice('');
                        }

                   }} style={{width:reponsivewidth(230)}} inputstyle={{fontSize:16,marginBottom:-10}} />
               </View>
            </View> */}
            <View style={[style.fieldinfo, { height:reponsiveheight(150),}]}>
               <View style={{flexDirection: 'row', alignItems:'center', flex:0.35, marginLeft:6}} >
                   {/* <Fethericon name="user" size={20} color="#94cdf5"/> */}
                   <Text style={{marginHorizontal:8}}>Hình nền</Text>
               </View>
               <View style={{flex:0.7, marginTop:10, justifyContent:'center',flexDirection:'row'}}>
                 { pickImg.length > 0  ?  <View style={{alignItems:'center', justifyContent:'center'}}>
                            <Image source={pickImg[0].img} style={{ width: reponsivewidth(95), height:reponsiveheight(95)}}/>
                    </View>
                    : <View>
                    <Imageadd width={reponsivewidth(50)} height={reponsiveheight(100)}/>
                    </View>
                
                    }
                    <Pressable onPress={()=>Handlechoosephoto()} style={{marginLeft:30,justifyContent:'center'}}>
                        <TakeImage width={reponsivewidth(50)} height={reponsiveheight(50)}/>
                    </Pressable>
               </View>
            </View>
            </ScrollView>
            <View style={{alignItems:'center',marginTop:5, height: reponsiveheight(110)}}>
            <TouchableOpacity onPress={()=>{addDataStaff()}} style={style.button}>
                {/* <Fethericon name="log-out" size={20} color="#FFF"/> */}
                <View style={{flex:1}}>
                <Text style={{ color:'#FFF', marginHorizontal:8, alignSelf:'center'}}>{isAdd == true ? ' Thêm ': 'Cập nhật'}</Text>
                </View>
                </TouchableOpacity>
            </View>
            {/* <Overlay overlayStyle={{height:reponsiveheight(300), width:reponsivewidth(300), borderRadius:5}} isVisible={visible} onBackdropPress={()=>cancelModal()}>
                    <View style={{borderBottomColor:'#979797', justifyContent:'center',alignItems:'center', borderBottomWidth:2,flexDirection:'row'}}>
                    <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>
                        <Text style={{fontSize:18, fontWeight:'700',padding:5}}>Thông báo</Text>
                    </View>
                    <View style={{ justifyContent:'center', alignItems:'center', height:reponsiveheight(180)}}>
                        <IconCheck   width={reponsivewidth(150)} height={reponsiveheight(60)} />
                        <Text style={{justifyContent:'center',fontSize:16.5, marginTop:15, fontWeight:'800', }}>Bạn thêm một nhân viên thành công !</Text>
                    </View>
                    <View style={{marginTop:15, justifyContent:'center', alignItems:'center'}} >
                        <Pressable onPress={()=>setvisible(false)} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                            <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Thoát</Text>
                        </Pressable>
                    </View>
            </Overlay> */}
            <CustomNotification visible={Error} iconTitle={<Warning width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title={'Thông báo'} Content={'Vui lòng nhập thông tin đầy đủ'} onCancel={()=>setError(false)}/>
            <CustomNotification visible={visible} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo" iconContent={ <IconCheck   width={reponsivewidth(150)} height={reponsiveheight(60)} /> } onCancel={()=>{cancelModal(); onLogOut() }} Content="Bạn đã cập nhật thành công !"/>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    container:
    {
        flex:1,
      
    },
    fieldinfo:
        {
            paddingRight:15,
            marginVertical:6,
            backgroundColor:'#FFF',
            flexDirection:'row',
            borderRadius:15,
            alignSelf:'center',
            justifyContent:'center',
            width: reponsivewidth(380),
            height:reponsiveheight(100),

        },
        button:
        {
            flexDirection:'row',
            marginVertical:2,
            padding:15,
            width:reponsivewidth(150),
            backgroundColor:'#226cb3',
            color:'#FFF',
            borderRadius:10
        },
    
})