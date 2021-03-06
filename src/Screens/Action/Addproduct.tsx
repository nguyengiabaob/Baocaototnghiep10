/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {Image, SafeAreaView, TouchableOpacity} from 'react-native';
import {Text, TextInput, View} from 'react-native';
// import Addproduct from '../asset/svg/box.svg';
import CustomHeader from '../../Model/CustomHeader';
// import Customitem from '../Model/CustomItem';
import {
  ListproductNavigationPramaList,
  // ProductNavigationPramaList,
} from '../../navigation/types';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
// import Gallery from '../../asset/svg/image-gallery.svg';
import data from '../../services/data';
// import {Button, Dialog, Paragraph, Portal, Provider} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {MediaType} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Overlay} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import {CustomNotification} from '../../Model/CustomNofication';
import DataService from '../../services/dataservice';
import ChooseMaterial from './ChooseMaterial';

type Props = {
  navigation: StackNavigationProp<
    ListproductNavigationPramaList,
    'AddproductScreen'
  >;
};
const Addproductscreen: React.FC<Props> = ({navigation}: Props) => {
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
  const [ChooseCate, setChooseCate] = useState<any>();
  const [DataCate, setDataCate] = useState<any[]>([]);
  const [showError, setshowError] = useState<boolean>(false);
  const [showMaterial,setShowMaterial] = useState<boolean>(false);
  const [ListMaterial, setListMaterial]= useState<any[]>([]);
  const [stringMaterial,setStringMaterial]= useState<string>('');
  const getStringMaterial=useCallback(()=>{
      let a ='';
      if (ListMaterial.length > 0)
      {
        const textMaterial = ListMaterial.reduce((previous,current)=> previous + current.Name + ', '
        ,a);
        // console.log('78465',textMaterial);
        // console.log('78465789',ListMaterial);
        setStringMaterial(textMaterial);
      }
  },[ListMaterial])
  const addproduct = async () => {
    if (
      nameproduct === '' ||
      priceproduct <= 0 ||
      quantity < 1 ||
      image === null
    ) {
      setshowError(true);
    } else {
      const reference = storage().ref(image);
      console.log(reference);
      const pathToFile = pathimg;
      await reference.putFile(pathToFile);
      let urlimg = await reference.getDownloadURL();
      if(ListMaterial.length> 0)
      {
        ListMaterial.forEach(item=>{
          item.Number=  item.Number *  quantity;
        })
      }
      data
        .postdataproduct(
          'Products',
          nameproduct,
          priceproduct,
          quantity,
          urlimg,
          ChooseCate.id,
          ListMaterial.length > 0 ? ListMaterial : []
        )
        .then(result => {
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
    let dta = await DataService.Getdata_dtService<any>('Catergory');
    setDataCate(dta);
  };
  useEffect(() => {
    getCatergory();
  }, []);
  useEffect(()=>{
    getStringMaterial();
  },[getStringMaterial])
  return (
    <SafeAreaView>
      <CustomHeader
        title="Th??m s???n ph???m"
        onpress={() => {
          navigation.goBack();
        }}
      />
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
          <Text style={style.titlefiled}>T??n s???n ph???m </Text>
          <TextInput
            onChangeText={text => {
              setnameproduct(text);
            }}
            style={[style.textinput, {width: reponsivewidth(280)}]}
            placeholder="T??n s???n ph???m"
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
          <Text style={style.titlefiled}>Nh??m s???n ph???m </Text>
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
              placeholder="Nh??m s???n ph???m">
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
          <Text style={style.titlefiled}>Gi?? b??n </Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => {
              setpriceproduct(
                Number(isNaN(Number(text)))
                  ? Number(text.replace(/,/g, ''))
                  : Number(text),
              );
            }}
            style={[style.textinput, {width: reponsivewidth(280)}]}
          >
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
          <Text style={style.titlefiled}>S??? L?????ng </Text>
          <TextInput
            onChangeText={text => {
              setquantity(Number.parseInt(text, 10));
            }}
            defaultValue="1"
            keyboardType="numeric"
            style={[style.textinput, {width: reponsivewidth(280)}]}
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
          <Text style={style.titlefiled}>Nguy???n li???u </Text>
          <TouchableOpacity
            onPress={()=>{
              setShowMaterial(true);
            }}
            style={{
              width: reponsivewidth(280),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              editable={false}
              style={[style.textinput, {width: reponsivewidth(170)}]}
              placeholder="Ch???n nguy??n li???u">
              { stringMaterial ? stringMaterial : ''}
            </TextInput>
            <EvilIcons name="chevron-right" size={32} color={'#777777'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.containerbutton}>
        <TouchableOpacity
          style={style.btn_add}
          onPress={() => {
            addproduct();
          }}>
          <Text style={style.titleadd}>L??u</Text>
        </TouchableOpacity>
      </View>
      {/* <Provider>
            <Portal >
                           <Dialog  visible={visible} onDismiss={hideDialog} style={{borderRadius:25, marginBottom:30}}>
                           { (nameproduct !== '' && priceproduct  &&  quantity && image) ?
                          <Dialog.Title style={style.titledialog} >Ch??c m???ng</Dialog.Title> :  <Dialog.Title style={style.titledialog} >Th??ng b??o</Dialog.Title>}
                           <Dialog.Content style={style.contentdialog}>
                              { (nameproduct !== '' && priceproduct  &&  quantity && image) ? <Paragraph style={{fontSize:15}}>B???n ???? th??m m???t s???n ph???m</Paragraph> : <Paragraph style={{fontSize:15}}>Vui l??ng nh???p ????? th??ng tin !</Paragraph> }
                          </Dialog.Content>
                          <Dialog.Actions style={style.actiondialog}>
                          <Button onPress={hideDialog}><Text style={{color:'#3399FF'}}>Tho??t</Text></Button>
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
              Ch???n nh??m s???n ph???m
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
          <Text style={{color: '#FFFF'}}>Tho??t</Text>
        </TouchableOpacity>
      </Overlay>
      <ChooseMaterial visible={showMaterial} cancel={setShowMaterial} dataMaterial={ListMaterial} getArrayItem={setListMaterial}/>
      <CustomNotification
        visible={visible}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => hideDialog()}
        Content="B???n ???? th??m th??nh c??ng !"
      />
      <CustomNotification
        visible={showError}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => setshowError(false)}
        Content="Xin vui l??ng nh???p l???i"
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
export default Addproductscreen;
