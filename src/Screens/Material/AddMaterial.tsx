/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import storage from '@react-native-firebase/storage';
import data from '../../services/data';
import {MediaType} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import DataService from '../../services/dataservice';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {MaterialParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {CustomNotification} from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import {Material} from '../../Model/Material';
import {Units} from '../../Model/Unit';
type Props = {
  navigation: StackNavigationProp<MaterialParamList, 'AddMaterialScreen'>;
};
const AddMaterial: React.FC<Props> = ({navigation}: Props) => {
  const [nameproduct, setnameproduct] = useState<string>('');
  const [priceproduct, setpriceproduct] = useState<number>(0);
  const [quantity, setquantity] = useState<number>(1);
  const [image, setimage] = useState<any>(null);
  const [pathimg, setpathimg] = useState<any>(null);
  const [imgopick, setimgpick] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [showChooseCate, setShowChooseCate] = useState<boolean>(false);
  const [showChooseUnit, setShowChooseUnit] = useState<boolean>(false);
  const [ChooseCate, setChooseCate] = useState<any>();
  const [ChooseUnit, setChooseunit] = useState<any>();
  const [DataCate, setDataCate] = useState<any[]>([]);
  const [DataUnit, setDataUnit] = useState<Units[]>([]);
  const [showError, setshowError] = useState<boolean>(false);
  const [NameUnit, setNameUnit] = useState<string>('');
  const [showAddUnit, setAddUnit] = useState<boolean>(false);
  // const [showMaterial, setShowMaterial] = useState<boolean>(false);
  const addproduct = async () => {
    if (nameproduct === '' || priceproduct <= 0 || quantity < 1) {
      setshowError(true);
    } else {
      let urlimg;
      if (image === null) {
        urlimg = 'none';
      } else {
        const reference = storage().ref(image);
        console.log(reference);
        const pathToFile = pathimg;
        await reference.putFile(pathToFile);
        urlimg = await reference.getDownloadURL();
      }
      let initaldata: Material = {
        id: '',
        Name: nameproduct,
        Number: quantity,
        MaterialGroup: ChooseCate.id,
        Img: urlimg,
        Unit: ChooseUnit.id,
        BuyingPrice: priceproduct,
      };
      data.AddMaterial(initaldata).then(result => {
        if (result === true) {
          showDialog();
        }
      });
    }
  };
  const type: MediaType = 'photo';
  const Handlechoosephoto = () => {
    const option = {mediaType: type};
    ImagePicker.launchImageLibrary(option, response => {
      console.log('response', response);
      if (response.assets) {
        response.assets.map(res => {
          setimage(res.fileName);
          setpathimg(res.uri);
          setimgpick(res);
        });
      }
    });
  };
  const getCatergory = async () => {
    // data.getdata('Catergory').then(res => {
    //   var dataArray: any[] = [];
    //   for (let key in res) {
    //     if (key !== '0') {
    //       dataArray.push({
    //         id: key,
    //         ...res[key],
    //       });
    //     }
    //   }
    //   setDataCate(dataArray);
    // });
    let dta = await DataService.Getdata_dtService<any>('MaterialCatergory');
    setDataCate(dta);
  };
  const getUnits = async () => {
    // data.getdata('Catergory').then(res => {
    //   var dataArray: any[] = [];
    //   for (let key in res) {
    //     if (key !== '0') {
    //       dataArray.push({
    //         id: key,
    //         ...res[key],
    //       });
    //     }
    //   }
    //   setDataCate(dataArray);
    // });
    let dta = await DataService.Getdata_dtService<any>('Units');
    setDataUnit(dta);
  };
  const SaveUnits = (name: string) => {
    if (name) {
      let intialUnit: Units = {
        id: '',
        Name: name,
      };
      data.AddUnit(intialUnit).then(res => {
        if (res === true) {
          setAddUnit(false);
          setVisible(true);
        }
      });
    }
  };
  useEffect(() => {
    if (showAddUnit === false) {
      getUnits();
    }
  }, [showAddUnit]);
  useEffect(() => {
    getCatergory();
    getUnits();
  }, []);
  return (
    <View>
      <View style={style.containerfiled}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={() => {
              Handlechoosephoto();
            }}
            style={imgopick ? undefined : style.Addphoto}>
            {imgopick ? (
              <Image
                style={[
                  style.img,
                  {width: reponsivewidth(150), height: reponsiveheight(150)},
                ]}
                source={imgopick}
              />
            ) : (
              <MaterialIcon name="add-a-photo" size={50} color="#FFFF" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
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
          }}>
          <Text style={style.titlefiled}>Tên nguyên liệu </Text>
          <TextInput
            onChangeText={text => {
              setnameproduct(text);
            }}
            style={[style.textinput, {width: reponsivewidth(280)}]}
            placeholder="Tên nguyên liệu"
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: 70,
          }}>
          <Text style={style.titlefiled}>Nhóm nguyên liệu</Text>
          <TouchableOpacity
            onPress={() => {
              setChooseCate(undefined);
              setShowChooseCate(true);
            }}
            style={{
              width: reponsivewidth(280),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              editable={false}
              style={[style.textinput, {width: reponsivewidth(170)}]}
              placeholder="Nhóm nguyên liệu">
              {ChooseCate ? ChooseCate.Name : ''}
            </TextInput>
            <EvilIcons name="chevron-right" size={32} color={'#777777'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: 70,
          }}>
          <Text style={style.titlefiled}>Giá mua </Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => {
              setpriceproduct(
                Number(isNaN(Number(text)))
                  ? Number(text.replace(/,/g, ''))
                  : Number(text),
              );
            }}
            style={[style.textinput, {width: reponsivewidth(280)}]}>
            {priceproduct
              ? priceproduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : 0}
          </TextInput>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: 70,
          }}>
          <Text style={style.titlefiled}>Đơn vị tính</Text>
          <TouchableOpacity
            onPress={() => {
              // setChooseunit(undefined);
              setShowChooseUnit(true);
            }}
            style={{
              width: reponsivewidth(280),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              editable={false}
              style={[style.textinput, {width: reponsivewidth(170)}]}
              placeholder="Chọn đơn vị tính">
              {ChooseUnit ? ChooseUnit.Name : ''}
            </TextInput>
            <EvilIcons name="chevron-right" size={32} color={'#777777'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: 70,
          }}>
          <Text style={style.titlefiled}>Số Lượng </Text>
          <TextInput
            onChangeText={text => {
              setquantity(Number.parseInt(text, 10));
            }}
            keyboardType="numeric"
            style={[style.textinput, {width: reponsivewidth(280)}]}
          />
        </View>
      </View>
      <View style={style.containerbutton}>
        <TouchableOpacity
          style={style.btn_add}
          onPress={() => {
            addproduct();
          }}>
          <Text style={style.titleadd}>Lưu</Text>
        </TouchableOpacity>
      </View>
      {/* <Provider>
              <Portal >
                             <Dialog  visible={visible} onDismiss={hideDialog} style={{borderRadius:25, marginBottom:30}}>
                             { (nameproduct !== '' && priceproduct  &&  quantity && image) ?
                            <Dialog.Title style={style.titledialog} >Chúc mừng</Dialog.Title> :  <Dialog.Title style={style.titledialog} >Thông báo</Dialog.Title>}
                             <Dialog.Content style={style.contentdialog}>
                                { (nameproduct !== '' && priceproduct  &&  quantity && image) ? <Paragraph style={{fontSize:15}}>Bạn đã thêm một sản phẩm</Paragraph> : <Paragraph style={{fontSize:15}}>Vui lòng nhập đủ thông tin !</Paragraph> }
                            </Dialog.Content>
                            <Dialog.Actions style={style.actiondialog}>
                            <Button onPress={hideDialog}><Text style={{color:'#3399FF'}}>Thoát</Text></Button>
                            </Dialog.Actions>
                            </Dialog>
                            </Portal>
              </Provider> */}
      <Overlay isVisible={showChooseCate}>
        <View
          style={{width: reponsivewidth(300), height: reponsiveheight(350)}}>
          <View style={style.TitleOverlAdd}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
                paddingBottom: 2,
                fontWeight: '700',
              }}>
              Chọn nhóm nguyên liệu
            </Text>
          </View>
          <View style={style.TitleOverlAdd_content}>
            <ScrollView style={{height: reponsiveheight(300)}}>
              {DataCate.length > 0 &&
                DataCate.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setChooseCate(item);
                        setShowChooseCate(false);
                      }}
                      style={[style.btnChoosenAdd, {padding: 15}]}>
                      <Text>{item.Name}</Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          style={[style.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
          onPress={() => setShowChooseCate(false)}>
          <Text style={{color: '#FFFF'}}>Thoát</Text>
        </TouchableOpacity>
      </Overlay>
      <Overlay isVisible={showChooseUnit}>
        <View
          style={{width: reponsivewidth(300), height: reponsiveheight(350)}}>
          <View style={style.TitleOverlAdd}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
                paddingBottom: 2,
                fontWeight: '700',
              }}>
              Chọn đơn vị tính
            </Text>
          </View>
          <View style={style.TitleOverlAdd_content}>
            <ScrollView style={{height: reponsiveheight(300)}}>
              {DataUnit.length > 0 &&
                DataUnit.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setChooseunit(item);
                        setShowChooseUnit(false);
                      }}
                      style={[style.btnChoosenAdd, {padding: 15}]}>
                      <Text>{item.Name}</Text>
                    </TouchableOpacity>
                  );
                })}
              <View style={{marginTop: 5}}>
                <TouchableOpacity style={{alignItems: 'center'}}>
                  <MaterialIcon
                    onPress={() => {
                      setAddUnit(true);
                    }}
                    name="add-box"
                    size={32}
                    color={'#02569E'}
                  />
                  <Text>Thêm đơn vị</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          style={[style.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
          onPress={() => setShowChooseUnit(false)}>
          <Text style={{color: '#FFFF'}}>Thoát</Text>
        </TouchableOpacity>
        <Overlay isVisible={showAddUnit}>
          <View
            style={{width: reponsivewidth(300), height: reponsiveheight(250)}}>
            <View style={style.TitleOverlAdd}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#000000',
                  paddingBottom: 2,
                  fontWeight: '700',
                }}>
                Thêm đơn vị
              </Text>
            </View>
            <View
              style={[style.styletxtInput, {marginTop: 28, borderRadius: 4}]}>
              <TextInput
                onChangeText={text => {
                  setNameUnit(text);
                }}
                style={{padding: 18}}
                placeholder="Tên đơn vị"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 35,
              }}>
              <TouchableOpacity
                style={[
                  style.btnExit,
                  {alignItems: 'center', alignSelf: 'center', marginRight: 25},
                ]}
                onPress={() => {
                  SaveUnits(NameUnit);
                  setAddUnit(false);
                }}>
                <Text style={{color: '#FFFF'}}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.btnExit,
                  {alignItems: 'center', alignSelf: 'center'},
                ]}
                onPress={() => {
                  setAddUnit(false);
                }}>
                <Text style={{color: '#FFFF'}}>Thoát</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
      </Overlay>
      <CustomNotification
        visible={visible}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => hideDialog()}
        Content="Bạn đã thêm thành công !"
      />
      <CustomNotification
        visible={showError}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => setshowError(false)}
        Content="Xin vui lòng nhập lại"
      />
    </View>
  );
};
const style = StyleSheet.create({
  containerfiled: {
    borderColor: '#D3D3D3',
    borderWidth: 3,
    borderRadius: 10,
    height: reponsiveheight(600),
  },
  styletxtInput: {
    borderColor: '#afaeae',
    borderWidth: 0.5,
  },
  titlefiled: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: reponsivewidth(150),
    marginLeft: 50,
    alignItems: 'center',
  },
  TitleOverlAdd_content: {
    marginTop: 8,
  },
  img: {
    marginLeft: 10,
    borderRadius: 35,
    width: reponsivewidth(105),
    height: reponsiveheight(125),
  },
  Addphoto: {
    backgroundColor: '#848D99',
    borderRadius: 15,
    width: reponsivewidth(105),
    height: reponsiveheight(125),
    justifyContent: 'center',
    marginLeft: 35,
    alignItems: 'center',
    alignSelf: 'center',
  },
  containerbutton: {
    alignItems: 'center',
    marginTop: 5,
    borderColor: '#D3D3D3',
    borderWidth: 3,
    height: reponsiveheight(70),
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  btn_add: {
    alignItems: 'center',
    backgroundColor: '#02569E',
    width: reponsivewidth(150),
    borderRadius: 80,
    flexDirection: 'row',
    justifyContent: 'center',
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
  titleadd: {
    color: '#FFF',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
  titledialog: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentdialog: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actiondialog: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  btnChoosenAdd: {
    alignItems: 'center',
    borderBottomColor: '#afaeae',
    borderBottomWidth: 0.5,
    borderTopColor: '#afaeae',
    borderTopWidth: 0.5,
  },
  btnExit: {
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
export default AddMaterial;
