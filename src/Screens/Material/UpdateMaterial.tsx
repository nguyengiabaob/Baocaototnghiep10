/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {getwidth, reponsiveheight, reponsivewidth} from '../../theme/Metric';
import * as ImagePicker from 'react-native-image-picker';
import {MediaType} from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Units} from '../../Model/Unit';
import {Overlay} from 'react-native-elements';
import {Material} from '../../Model/Material';
import storage from '@react-native-firebase/storage';
import data from '../../services/data';
import {CustomNotification} from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {MaterialParamList} from '../../navigation/types';
import {RouteProp} from '@react-navigation/native';
import DataService from '../../services/dataservice';
import {MaterialCategory} from '../../Model/MaterialCategory';
type props = {
  index: number;
  arrayData: any[];
  onArrayData: (value: any) => void;
  onCancel: (value: any) => void;
  // navigation: StackNavigationProp<MaterialParamList, 'UpdateMaterialScreen'>;
  // route: RouteProp<MaterialParamList, 'UpdateMaterialScreen'>;
};
const UpdateMaterial: React.FC<props> = ({
  index,
  arrayData,
  onArrayData,
  onCancel,
}) => {
  // const [nameMaterialCatergory, setnameMaterialCatergory] =
  //   useState<string>('');
  // const [nameUnit, setnameUnit] = useState<string>('');
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
  const [ItemEdit, setItemEdit] = useState<Material>();
  const [DataCate, setDataCate] = useState<any[]>([]);
  const [DataUnit, setDataUnit] = useState<Units[]>([]);
  const [showError, setshowError] = useState<boolean>(false);
  const [NameUnit, setNameUnit] = useState<string>('');
  const [showAddUnit, setAddUnit] = useState<boolean>(false);
  const id = index;
  const GetData = useCallback(() => {
    setItemEdit(arrayData[id]);
    setnameproduct(arrayData[id].Name);
    setquantity(arrayData[id].Number);
    setChooseunit(arrayData[id].Unit);
    if (arrayData[id].pathimg) {
      setpathimg(arrayData[id].pathimg);
      setimage(arrayData[id].filename);
    }
  }, [arrayData, id]);
  // const getMaterialById = useCallback(async () => {
  //   let item: Material = await DataService.Getdata_dtServiceById<Material>(
  //     'Material',
  //     id,
  //   );
  //   let MaterialGroup: MaterialCategory =
  //     await DataService.Getdata_dtServiceById<MaterialCategory>(
  //       'MaterialCatergory',
  //       item.MaterialGroup,
  //     );
  //   let unit: Units = await DataService.Getdata_dtServiceById<Units>(
  //     'Units',
  //     item.Unit,
  //   );
  //   setChooseCate(MaterialGroup);
  //   setnameproduct(item.Name);
  //   setpriceproduct(item.BuyingPrice);
  //   setquantity(item.Number);
  //   setChooseunit(unit);
  //   setItemEdit(item);
  // }, [id]);
  // useEffect(() => {
  //   getMaterialById();
  // }, [getMaterialById]);
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
    // let dta = await DataService.Getdata_dtService<any>('MaterialCatergory');
    // setDataCate(dta);
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
    // let dta = await DataService.Getdata_dtService<any>('Units');
    // setDataUnit(dta);
  };
  useEffect(() => {
    GetData();
    // getCatergory();
    // getUnits();
  }, [GetData]);
  const updateProduct = () => {
    if (nameproduct === '' || quantity < 1) {
      setshowError(true);
    } else {
      if (ItemEdit !== undefined) {
        let urlimg: string = 'none';
        if (ItemEdit?.Img === 'none' && image === null) {
          urlimg = 'none';
        }
       
        // else {
        //   if (ItemEdit?.Img === 'none' && image !== null) {
        //     const reference = storage().ref(image);
        //     console.log(reference);
        //     const pathToFile = pathimg;
        //     await reference.putFile(pathToFile);
        //     urlimg = await reference.getDownloadURL();
        //   } else {
        //     if (ItemEdit?.Img !== 'none') {
        //       urlimg = ItemEdit?.Img;
        //     }
        //   }
        // }

        let initaldata = {
          filname: image,
          pathimg: pathimg,
          Name: nameproduct,
          Number: quantity,
          // initaldata.MaterialGroup = ChooseCate.id;
          Img: urlimg,
          Unit: ChooseUnit,
        };
        // initaldata.BuyingPrice = priceproduct;
        // data.UpdateMaterial(initaldata, ItemEdit?.id).then(result => {
        //   if (result === true) {
        //     showDialog();
        //   }
        // });
        arrayData[id] = initaldata;
        console.log(arrayData[id]);
        onArrayData(arrayData);
        onCancel(false);
      }
    }
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
  return (
    <SafeAreaView
      style={{width: reponsivewidth(330), height: reponsiveheight(600)}}>
      <View>
        <View style={style.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
            Cập nhật thông tin
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          {console.log('789456', arrayData[id]?.Img)}
          <TouchableOpacity
            onPress={() => {
              Handlechoosephoto();
            }}
            style={arrayData[id]?.Img === 'none' ? style.Addphoto : undefined}>
            {imgopick ? (
              <Image
                style={[
                  style.img,
                  {width: reponsivewidth(150), height: reponsiveheight(140)},
                ]}
                source={imgopick}
              />
            ) : arrayData[id]?.Img !== 'none' ? (
              <Image
                style={[
                  style.img,
                  {width: reponsivewidth(150), height: reponsiveheight(140)},
                ]}
                source={{uri: arrayData[id]?.Img}}
              />
            ) : arrayData[id]?.pathimg ? (
              <Image
                style={[
                  style.img,
                  {width: reponsivewidth(150), height: reponsiveheight(140)},
                ]}
                source={{uri: arrayData[id]?.pathimg}}
              />
            ) : (
              <MaterialIcon name="add-a-photo" size={50} color="#FFFF" />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 15,
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            height: 70,
          }}>
          <Text style={style.titlefiled}>Tên nguyên liệu </Text>
          <TextInput
            onChangeText={text => {
              setnameproduct(text);
            }}
            style={[style.textinput, {width: reponsivewidth(180)}]}
            placeholder="Tên nguyên liệu">
            {arrayData[id]?.Name}
          </TextInput>
        </View>
        {/* <View
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
              {ChooseCate && ChooseCate.Name}
            </TextInput>
            <EvilIcons name="chevron-right" size={32} color={'#777777'} />
          </TouchableOpacity>
        </View> */}
        {/* <View
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
              : ItemEdit?.BuyingPrice.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
          </TextInput>
        </View> */}
        <View
          style={{
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: 70,
            width: '100%',
          }}>
          <Text style={style.titlefiled}>Đơn vị tính</Text>
          <TextInput
            onChangeText={text => {
              setChooseunit(text);
            }}
            style={[style.textinput, {width: reponsivewidth(180)}]}
            placeholder="Chọn đơn vị tính">
            {ChooseUnit && ChooseUnit}
          </TextInput>
        </View>
        <View
          style={{
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
            style={[style.textinput, {width: reponsivewidth(180)}]}>
            {ItemEdit?.Number}
          </TextInput>
        </View>
      </View>
      <View style={[style.containerbutton, {marginTop: 40}]}>
        <TouchableOpacity
          style={[style.btn_add, {marginBottom: 15}]}
          onPress={() => {
            updateProduct();
          }}>
          <Text style={style.titleadd}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onCancel(false);
          }}
          style={style.btn_add}>
          <Text style={style.titleadd}>Thoát</Text>
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
                      style={[
                        style.btnChoosenAdd,
                        {
                          padding: 15,
                          backgroundColor:
                            ChooseCate?.id === item.id ? '#67bff3' : '',
                        },
                      ]}>
                      <Text
                        style={{
                          color: ChooseCate?.id === item.id ? '#FFFF' : '',
                        }}>
                        {item.Name}
                      </Text>
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
                      style={[
                        style.btnChoosenAdd,
                        {
                          padding: 15,
                          backgroundColor:
                            ChooseUnit?.id === item.id ? '#67bff3' : '',
                        },
                      ]}>
                      <Text
                        style={{
                          color: ChooseUnit?.id === item.id ? '#FFFF' : '',
                        }}>
                        {item.Name}
                      </Text>
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
    </SafeAreaView>
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
    alignItems: 'center',
    backgroundColor: '#FFFF',
    textAlign: 'center',
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
export default UpdateMaterial;
