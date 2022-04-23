/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Fethericon from 'react-native-vector-icons/Feather';
import Usericon from '../../asset/svg/user.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
import {TouchableOpacity} from 'react-native';
import {useEffect} from 'react';
import data from '../../services/data';
import {AccountNavigationParamList} from '../../navigation/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Userdata} from '../../Model/User';
import {useAppDispatch, useAppSelector} from '../../redux/hook';
import {requestLogout, selectAuth, UpdatePermission} from '../../redux/reducer/authslice';
import AuthService from '../../services/authService';
import Feather from 'react-native-vector-icons/Feather';
import {Overlay} from 'react-native-elements/dist/overlay/Overlay';
import CustomInput from '../../Model/CustomInput';
import {CustomNotification} from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
import {TextInput} from 'react-native-paper';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database';
import TableComponent from '../../Model/TableComponent'
type Props = {
  navigation: StackNavigationProp<AccountNavigationParamList, 'AccountScreen'>;
  route: RouteProp<AccountNavigationParamList, 'AccountScreen'>;
};

const AccountScreen: React.FC<Props> = () => {
  const [user, setuser] = useState<Userdata>();
  const [username, setusername] = useState<string | null>();
  const [name, setname] = useState<string>('');
  const [service, setservice] = useState<string>('');
  const [phone, setsphone] = useState<string>('');
  const [email, setemail] = useState<string>('');
  const [visibleSetting, setvisibleSetting] = useState<boolean>(false);
  const [visiblesuccess, setvisiblesuccess] = useState<boolean>(false);
  const [visiblechangesuccess, setvisiblechangesuccess] =
    useState<boolean>(false);
  const [Errorpassword, seterropass] = useState<string>('');
  const [Errorconfirm, seterrorconfirm] = useState<string>('');
  const [Errorphone, seterrorphone] = useState<string>('');
  const [visibleEditinfo, setvisibleEditInfo] = useState<boolean>(false);
  const [visibleEflag, setvisibleflag] = useState<boolean>(false);
  const [visiblechangePass, setvisiblechangePass] = useState<boolean>(false);
  const {isLoggedGoogle} = useAppSelector(selectAuth);
  const [erroremail, seterroremail] = useState<string>('');
  const [newpassword, setNewPassword] = useState<string>('');
  const [confirm, setconfirm] = useState<string>('');
  const [Reload, setReload] = useState<boolean>(false);
  const [visiblePermission, setvisiblePermission]= useState<boolean>(false);
  const {typeUser} =useAppSelector(selectAuth);
  const col= [
    {
      name: 'Người dùng',
      key: 'Name',
      width:'50%'
    },
    {
      name: 'Admin',
      key: '2',
      width:'50%'
    }
  ]


  async function fetchid() {
    const user = await AuthService.getuserid();
    setusername(user);
  }
  const dispatch = useAppDispatch();
  function onLogOut() {
    dispatch(requestLogout());
  }
  const [arrayuser, setarrayuser] = useState<Userdata[]>([]);
  useEffect(()=>{
    database().ref('/user').on('value',()=>{
      setReload(prev=> !prev);
    })
  },[])
  const getUserData= async()=>{
    let d = await DataService.Getdata_dtService<Userdata>('user');
    setarrayuser(d);
  }
  useEffect(() => {
    if (visibleEflag == true) {
      getUserData();
      // var data_fetch: any[] = [];
      // data.getdata('user').then(res => {
      //   for (let key in res) {
      //     data_fetch.push({
      //       id: key,
      //       ...res[key],
      //     });
      //   }
      //   setarrayuser(data_fetch);
      // });
    }
    if (visiblechangePass === true) {
      // console.log('pass');
      seterropass('');
      seterrorconfirm('');
      setNewPassword('');
      setconfirm('');
    }
  }, [visibleEflag, visiblechangePass, Reload]);
  useEffect(() => {
    getUserData();
    // var data_fetch: any[] = [];
    // data.getdata('user').then(res => {
    //   for (let key in res) {
    //     data_fetch.push({
    //       id: key,
    //       ...res[key],
    //     });
    //   }
    //   setarrayuser(data_fetch);
    // });
    fetchid();
  }, [Reload]);
  // useEffect(()=>{
  //     if (isLoggedGoogle === true)
  //     {
  //         setusername(auth().currentUser?.displayName);
  //     }
  //     else
  //     {
  //     fetchUsename();
  //     }
  // },[isLoggedGoogle]);
  const Saveinfo = () => {
    const format =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const formatphone = /[0-9]/g;
    if (email != '') {
      if (!format.test(email)) {
        seterroremail('Email không hợp lệ');
      } else {
        seterroremail('');
      }
    }
    if (phone != '') {
      if (formatphone.test(phone)) {
        seterrorphone('Số điện thoại không hợp lệ');
      } else {
        seterrorphone('');
      }
    }
    if (
      (phone != '' && formatphone.test(phone)) ||
      name != '' ||
      service != '' ||
      (email != '' && format.test(email))
    ) {
      // var data_fetch: any[] = [];
      // data.getdata('user').then(res => {
      //   for (let key in res) {
      //     data_fetch.push({
      //       id: key,
      //       ...res[key],
      //     });
      //   }
        let index = arrayuser.findIndex((item: { id: any; })=> item.id === username);
        let user = arrayuser[index];
        data
          .updateuser(
            'user',
           
            phone !== '' ? phone : user.phone,
            email !== '' ? email : user.Email,
            user.Gender,
            user.Avatar,
            name !== '' ? name : user.Name,
            user.dateofbirth,
            user.id,
          )
          .then(res => {
            if (res === true) {
              setvisiblesuccess(true);
            }
          });
      // });
    }
  };
  const checkpassword = (pass: string): boolean => {
    var i = 0;
    let low = false;
    let up = false;
    let special = false;
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    while (i < pass.length) {
      if (pass.charAt(i) == pass.charAt(i).toUpperCase()) {
        up = true;
      }
      if (pass.charAt(i) == pass.charAt(i).toLowerCase()) {
        low = true;
      }
      if (format.test(pass.charAt(i))) {
        special = true;
      }
      i++;
    }
    if (up == true && low == true && special == true && pass.length >= 8) {
      return true;
    }
    return false;
  };
  const onchangePassword = () => {
    if (newpassword != '') {
      if (
        checkpassword(newpassword) &&
        confirm === newpassword &&
        newpassword != password1
      ) {
        seterropass('');
        seterrorconfirm('');
        // var data_fetch: any[] = [];
        // data.getdata('user').then(res => {
        //   for (let key in res) {
        //     data_fetch.push({
        //       id: key,
        //       ...res[key],
        //     });
        //   }
          let index = arrayuser.findIndex((item: { id: any; }) => item.id === username);
          let user = arrayuser[index];
          data
            .updateuser(
              'user',
              user.phone,
              user.Email,
              user.Gender,
              user.Avatar,
              user.Name,
              user.dateofbirth,
              user.id,
            )
            .then(res => {
              if (res === true) {
                setvisiblechangesuccess(true);
              }
            });
        // });
      } else {
        if (newpassword === password1) {
          seterropass('Mật khẩu mật khẩu trước');
        } else {
          seterropass('');
        }

        if (checkpassword(newpassword) == false) {
          seterropass(
            'Mật khẩu phải có kí tự hoa, thường, đặc biệt và có ít nhất 8 kí tự',
          );
        } else {
          seterropass('');

          if (confirm != '' || confirm !== newpassword)
            seterrorconfirm('Mật khẩu nhập lại không hợp lệ');
          else {
            seterrorconfirm('');
          }
        }
      }
    } else {
      seterropass('Mật khẩu mới không được trống');
    }
  };
  let name1, email1, phone1, service1, username1, password1: string;

  arrayuser.forEach(res => {
    if (res.id === username) {
      console.log('123456',username);
      username1 = res.username;
      name1 = res.Name;
      email1 = res.Email;
      phone1 = res.phone;
      service1 = res.service;
      password1 = res.password;
    }
  });
  return (
    <SafeAreaView style={style.container}>
      <View style={style.containericon}>
        <View style={style.icon_setting}>
          <TouchableOpacity onPress={() => setvisibleSetting(true)}>
            <Feather name="settings" size={32} />
          </TouchableOpacity>
        </View>
        <Usericon width={reponsivewidth(150)} height={reponsiveheight(150)} />
        <Text style={style.txt_username}>{username1}</Text>
      </View>
      <View style={style.container2}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          Thông tin người dùng
        </Text>
        <View style={style.fieldinfo}>
          <View style={style.icon_user}>
            <Fethericon name="user" size={20} color="#94cdf5" />
            <Text style={{marginHorizontal: 8}}>Tên</Text>
          </View>
          <View style={style.container_item_list}>
            <Text style={style.info}>
              {console.log('78486',name1)}
              {name1 !== 'none' && name1 !== '' ? name1 : 'Không có'}
            </Text>
          </View>
        </View>
        <View style={style.fieldinfo}>
          <View style={style.icon_home_repair}>
            <MaterialIcons
              name="home-repair-service"
              size={20}
              color="#fb7a7a"
            />
            <Text style={{marginHorizontal: 8}}>Chức vụ</Text>
          </View>
          <View style={style.container_item_list}>
            <Text style={style.info}>
              {service1 !== 'none' && service1 !== '' ? service1 : 'Không có'}
            </Text>
          </View>
        </View>
        <View style={style.fieldinfo}>
          <View style={style.icon_phone}>
            <Fethericon name="phone" size={20} color="#b5e5b9" />
            <Text style={{marginHorizontal: 8}}>Số điện thoại </Text>
          </View>
          <View style={style.container_item_list}>
            <Text style={style.info}>
              {phone1 !== 'none' && phone1 !== '' ? phone1 : 'không có'}
            </Text>
          </View>
        </View>
        <View style={style.fieldinfo}>
          <View style={style.icon_phone}>
            <FontAwesome name="envelope-o" size={20} color="#f1c77b" />
            <Text style={{marginHorizontal: 8}}>Email </Text>
          </View>
          <View style={style.container_item_list}>
            <Text style={style.info}>
              {email1 != 'none' && email1 !== '' ? email1 : 'không có'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            onLogOut();
          }}
          style={style.button}>
          <Fethericon name="log-out" size={20} color="#FFF" />
          <View style={{flex: 1}}>
            <Text style={style.text_logout}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Overlay isVisible={visibleSetting}>
        <View style={style.container_visbleSetting}>
          <View style={style.container_VisibleSetting2}>
            <View
              style={{justifyContent: 'flex-start', width: reponsivewidth(50)}}>
              <TouchableOpacity onPress={() => setvisibleSetting(false)}>
                <MaterialIcons name="clear" size={28} color="#efefef" />
              </TouchableOpacity>
            </View>
            <View style={style.container_MainSetting}>
              <Text style={style.text_Setting}>Cài đặt</Text>
            </View>
          </View>
          <View style={{backgroundColor: '#FFFF'}}>
            <TouchableOpacity
              onPress={() => setvisibleEditInfo(true)}
              style={style.btn_action}>
              <Text style={{marginLeft: 25, fontSize: 16}}>
                Chỉnh sửa thông tin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setvisiblechangePass(true);
              }}
              style={style.btn_action}>
              <Text style={{marginLeft: 25, fontSize: 16}}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn_action} onPress={()=>{
              setvisiblePermission(true);
            }}>
                <Text style={{marginLeft: 25, fontSize: 16}}>Phân quyền</Text>
            </TouchableOpacity>
          </View>
          <Overlay isVisible={visibleEditinfo}>
            <View style={style.container_visbleSetting}>
              <View style={style.style_other}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    width: reponsivewidth(50),
                  }}>
                  <TouchableOpacity onPress={() => setvisibleEditInfo(false)}>
                    <MaterialIcons name="clear" size={28} color="#efefef" />
                  </TouchableOpacity>
                </View>
                <View style={style.container_MainSetting}>
                  <Text style={style.text_Setting}>Chỉnh sửa thông tin</Text>
                </View>
              </View>
              <View style={{backgroundColor: '#FFFF'}}>
                <View style={style.container_main_user}>
                  <Text style={style.titlefiled}>Tên người dùng </Text>

                  <CustomInput
                    onchange={text => {
                      setname(text);
                    }}
                    style={{width: reponsivewidth(210)}}
                    text={
                      name1 != 'none' && name1 != ''
                        ? name1
                        : name1 == 'none'
                        ? ''
                        : ''
                    }
                  />
                </View>
                <View style={style.container_main2}>
                  <Text style={style.titlefiled}>Chức vụ </Text>
                  <CustomInput
                    onchange={text => {
                      setservice(text);
                    }}
                    style={{width: reponsivewidth(210)}}
                    text={
                      service1 != 'none' && service1 != ''
                        ? service1
                        : service1 == 'none'
                        ? ''
                        : ''
                    }
                  />
                </View>
                <View style={style.container_main2}>
                  <Text style={style.titlefiled}>Điện thoại </Text>
                  <CustomInput
                    errormes={Errorphone}
                    onchange={text => {
                      setsphone(text);
                    }}
                    style={{width: reponsivewidth(210)}}
                    text={
                      phone1 != 'none' && phone1 != ''
                        ? phone1
                        : phone1 == 'none'
                        ? ''
                        : ''
                    }
                  />
                </View>
                <View style={style.container_main2}>
                  <Text style={style.titlefiled}>Email </Text>
                  <CustomInput
                    errormes={erroremail}
                    onchange={text => {
                      setemail(text);
                    }}
                    style={{width: reponsivewidth(210)}}
                    text={
                      email1 != 'none' && email1 != ''
                        ? email1
                        : email1 == 'none'
                        ? ''
                        : ''
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  height: reponsiveheight(350),
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setvisibleflag(false);
                    Saveinfo();
                  }}
                  style={{
                    backgroundColor: '#226cb3',
                    padding: 10,
                    width: reponsivewidth(100),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    alignSelf: 'center',
                  }}>
                  <Text style={{color: '#FFFF'}}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
            <CustomNotification
              visible={visiblesuccess}
              iconTitle={
                <BellNofi
                  width={reponsivewidth(30)}
                  height={reponsiveheight(30)}
                />
              }
              title="Thông báo"
              onCancel={() => {
                setvisibleflag(true);
                setvisiblesuccess(false);
                setvisibleEditInfo(false);
              }}
              Content="Bạn đã cập nhật thành công !"
            />
          </Overlay>
          <Overlay isVisible={visiblechangePass}>
            <View style={style.container_visbleSetting}>
              <View style={style.style_other}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    width: reponsivewidth(50),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setvisiblechangePass(false);
                    }}>
                    <MaterialIcons name="clear" size={28} color="#efefef" />
                  </TouchableOpacity>
                </View>
                <View style={style.container_MainSetting}>
                  <Text style={style.text_Setting}>Đổi mật khẩu</Text>
                </View>
              </View>
              <View style={{backgroundColor: '#FFFF'}}>
                <View style={{marginTop: 55}}>
                  {/* <Text  style={style.titlefiled}>Mật khẩu mới </Text> */}
                  <TextInput
                    onChangeText={text => {
                      setNewPassword(text);
                    } }
                    mode="outlined"
                    style={style.style_other2}
                    label={'Mật khẩu mới'}
                    outlineColor={'#02569E'}
                    secureTextEntry={true} autoCompleteType={undefined}                  />
                  <Text style={style.text_error}>{Errorpassword}</Text>
                </View>
                <View style={{marginTop: 15}}>
                  {/* <Text  style={style.titlefiled}>Xác nhận lại mật khẩu </Text> */}
                  <TextInput
                    onChangeText={text => {
                      setconfirm(text);
                    } }
                    mode="outlined"
                    style={style.style_other2}
                    label={' Xác nhận lại mật khẩu'}
                    outlineColor={'#02569E'}
                    secureTextEntry={true} autoCompleteType={undefined}                  />
                  <Text style={style.text_error}>{Errorconfirm}</Text>
                </View>
              </View>
              <View
                style={{
                  height: reponsiveheight(300),
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    onchangePassword();
                  }}
                  style={style.bnt_save}>
                  <Text style={{color: '#FFFF'}}>Lưu</Text>
                </TouchableOpacity>
              </View>
            </View>
            <CustomNotification
              visible={visiblechangesuccess}
              iconTitle={
                <BellNofi
                  width={reponsivewidth(30)}
                  height={reponsiveheight(30)}
                />
              }
              title="Thông báo"
              onCancel={() => {
                setvisiblechangesuccess(false);
                setvisibleEditInfo(false);
                onLogOut();
              }}
              Content="Bạn đã cập nhật thành công !"
            />
          </Overlay>
          <Overlay isVisible={visiblePermission}>
              <View style={style.container_visbleSetting}>
              <View style={style.style_other}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    width: reponsivewidth(50),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setvisiblePermission(false);
                    }}>
                    <MaterialIcons name="clear" size={28} color="#efefef" />
                  </TouchableOpacity>
                </View>
                <View style={style.container_MainSetting}>
                  <Text style={style.text_Setting}>Phân quyền</Text>
                </View>
              </View>
               <TableComponent columns={col} dataFields={arrayuser}/>
              </View>
          </Overlay>
        </View>
      </Overlay>
    </SafeAreaView>
  );
};
export default AccountScreen;
const style = StyleSheet.create({
  container: {
    backgroundColor: '#94cdf5',
    flex: 1,
  },
  container2: {
    flex: 0.6,
    alignItems: 'center',
    marginTop: 10,
  },
  containerfield: {
    backgroundColor: '#FFF',
  },
  fieldinfo: {
    paddingRight: 15,
    marginVertical: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 40,
    alignSelf: 'center',
    width: reponsivewidth(350),
    height: reponsiveheight(60),
  },
  info: {
    flexDirection: 'row',
  },
  containericon: {
    backgroundColor: '#fff',
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: reponsivewidth(360),
    borderRadius: 30,
  },
  title: {
    marginRight: 10,
  },
  button: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 15,
    width: reponsivewidth(150),
    backgroundColor: '#ef7d7d',
    color: '#FFF',
  },
  titlefiled: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: reponsivewidth(120),
    alignItems: 'center',
    marginLeft: 15,
  },
  textinput: {
    fontSize: 16,
    // marginTop:5,
    // borderRadius:10,
    // height:50,
    // borderColor:'#D3D3D3',
    // borderWidth:3,
    backgroundColor: '#FFF',
    color: 'black',
  },
  icon_setting: {
    alignItems: 'flex-end',
    width: reponsivewidth(300),
    height: reponsiveheight(50),
  },
  txt_username: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 5,
  },
  icon_user: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  container_item_list: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  icon_home_repair: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  icon_phone: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  text_logout: {
    color: '#FFF',
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  container_visbleSetting: {
    width: getwidth(),
    height: getheight(),
    flex: 1,
    marginTop: -9.5,
    backgroundColor: '#FFFF',
  },
  container_VisibleSetting2: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#67bff3',
  },
  container_MainSetting: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text_Setting: {
    fontSize: 17,
    width: reponsivewidth(300),
    textAlign: 'center',
    color: '#FFFF',
  },
  btn_action: {
    borderBottomColor: '#d6d6d6',
    borderBottomWidth: 1,
    height: reponsiveheight(80),
    justifyContent: 'center',
  },
  style_other: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#67bff3',
  },
  container_main_user: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#c3c3c3',
    borderTopColor: '#c3c3c3',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    height: 70,
  },
  container_main2: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#c3c3c3',
    borderTopColor: '#c3c3c3',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    height: 70,
  },
  style_other2: {
    marginTop: 5,
    width: reponsivewidth(350),
    alignSelf: 'center',
  },
  text_error: {
    alignSelf: 'flex-start',
    width: reponsivewidth(350),
    marginLeft: 25,
    color: '#f72b2b',
  },
  bnt_save: {
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    alignSelf: 'center',
  },
});
