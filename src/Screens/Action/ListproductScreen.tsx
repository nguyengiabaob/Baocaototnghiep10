/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useCallback} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {View} from 'react-native';
import {ListproductNavigationPramaList} from '../../navigation/types';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
import {StackNavigationProp} from '@react-navigation/stack';
import CustomHeader from '../../Model/CustomHeader';
import Customitemproduct from '../../Model/customitemproduct';
import data from '../../services/data';
import {useEffect} from 'react';
import {useState} from 'react';
import {Product} from '../../Model/product';
import {
  Button,
  Checkbox,
  Dialog,
  Modal,
  Paragraph,
  Portal,
  Provider,
} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import {Overlay} from 'react-native-elements/dist/overlay/Overlay';
import {CustomNotification} from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomNotificationDel} from '../../Model/CustomNoficationDel';
import {ModelDelete} from '../../Model/ModelDelete';
import {useIsFocused} from '@react-navigation/native';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database';
import Loading from '../../Helper/Loader/Loading';
import storage from '@react-native-firebase/storage';
import ListMaterialView from './SupportComponent/ListMaterialView';
import { ConfigMaterial } from '../../Model/ConfigMaterialModel';
import ListProductMaterial from './SupportComponent/ListProductMaterial';
type Props = {
  navigation: StackNavigationProp<
    ListproductNavigationPramaList,
    'ListProductScreen'
  >;
};

const ListproductScreen: React.FC<Props> = ({navigation}: Props) => {
  // const [visible, setVisible] = useState<boolean>(false);
  // const showDialog = () => setVisible(true);
  // const hideDialog = () => setVisible(false);
  const [idDel, setidDel] = useState<string>('');
  const [valueSearch, setvalueSearch] = useState<string>('');
  const [visibleSearch, setvisibleSearch] = useState<boolean>(false);
  const [visibleoverlayAdd, setvisibleOverplayAdd] = useState<boolean>(false);
  const [visibleoverlayAddCater, setvisibleOverplayAddCater] =
    useState<boolean>(false);
  const [visibleoverlayUpdateCater, setvisibleOverplayUpdateCater] =
    useState<boolean>(false);
  const [Visiblenofitication, setvisibleNofitication] =
    useState<boolean>(false);
  const [VisibleError, setvisibleError] = useState<boolean>(false);
  const [dataproduct, setdataproduct] = useState<Product[]>([]);
  const [ListSearch, setListSearch] = useState<Product[]>([]);
  const [ModelDel, setModelDel] = useState<boolean>(false);
  const [ListCheckProduct, setListCheckProduct] = useState<any[]>([]);
  const [ModalDelete, setModalDelete] = useState<boolean>(false);
  const [CheckAll, setCheckAll] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [Reload, setReload]= useState<boolean>(false);
  const [loading,setLoading]= useState<boolean>(false);
  const [VisibleMaterial, setVisibleMaterial] = useState<boolean>(false);
  const [AllListMaterial,setAllMaterial]= useState<any[]>([]);
  const [selectedItem,SetselectedItem]= useState<any>();
  
  const getMaterial = async ()=>{
    let newData= await DataService.Getdata_dtService<ConfigMaterial>('ConfigMaterial');
    setAllMaterial(newData);
  }
  const getDataProduct = async () => {
    let dta = await DataService.Getdata_dtService<Product>('Products');
    // console.log('123456789',dta);
    setdataproduct(dta);
  };
  const DelImage= (url:string)=>{
    const imgref = storage().refFromURL(url);
    imgref.delete().then(()=>{console.log('del Success')}).catch(e=> console.log(e));
  }
  useEffect(()=>{
    database().ref('/Products').on('value', snapshot=>{
      getDataProduct()
    })
    database().ref('/ConfigMaterial').on('value', snapshot=>{
      getMaterial()
    })
  },[])
  useEffect(() => {
    if (isFocused === true && ModalDelete == false) {
      setLoading(true);
     Promise.all([getDataProduct(), getMaterial()])
      .then(()=> setLoading(false) );
      // let arrayproduct:any[] = [];
      // data.getdata('Products').then(res=>{
      //     for (let key in res)
      //     {
      //         arrayproduct.push(
      //             {
      //                 id: key,
      //                 ...res[key],
      //             }
      //         );
      //     }
      //     setdataproduct(arrayproduct);
      // });
     
    }
  }, [isFocused, ModalDelete]);
  useEffect(() => {
    if (ListCheckProduct.length === 0) {
      setModelDel(false);
    }
  }, [ListCheckProduct]);
  const oncheckproduct = (id: any, check: boolean) => {
    if (check) {
      setListCheckProduct(ListCheckProduct.filter(item => item !== id));
    } else {
      setListCheckProduct([id, ...ListCheckProduct]);
    }
    console.log('yes');
  };
  function edit(key: string) {
    navigation.navigate('UpdateProductScreen', {id: key});
  }
  function deleteproduct() {
    if (ListCheckProduct.length > 0) {
      ListCheckProduct.map(item => {
        DelImage(item.Image);
        data.deletedataproduct('Products', item.id);
      });
    }

    setListCheckProduct([]);
    setModalDelete(false);
  }
  function del() {
    //setidDel(key);
    setModalDelete(true);
  }
  const oncheckAll = (check: boolean) => {
    if (check) {
      setCheckAll(false);
      setListCheckProduct([]);
    } else {
      setCheckAll(true);
      setModelDel(true);
      let datacheck: any[] = [];
      if (ListSearch.length > 0) {
        ListSearch.forEach(item => {
          datacheck.push(item);
        });
        setListCheckProduct(datacheck);
      } else {
        dataproduct.forEach(item => {
          datacheck.push(item);
        });
        setListCheckProduct(datacheck);
      }
    }
  };
  const searchProduct = useCallback(
    (value: string) => {
      if (dataproduct.length > 0) {
        if (
          dataproduct.filter(item =>
            item.name_product.toLowerCase().search(value.toLowerCase()),
          ).length > 0
        ) {
          setListSearch(
            dataproduct.filter(item => item.name_product.includes(value)),
          );
        } else {
          setListSearch([]);
        }
      }
    },
    [dataproduct],
  );
  useEffect(() => {
    searchProduct(valueSearch);
  }, [valueSearch, searchProduct]);
  const ModalAddCatergory: React.FC = () => {
    const [InputValue, setInputValue] = useState<string>('');
    const saveCatergory = (value: string) => {
      data.getdata('Catergory').then(res => {
        var dataArray: any[] = [];
        for (let key in res) {
          if (key !== '0') {
            console.log('123456',res[key]);
            dataArray.push({
              id: key,
              ...res[key],
            });
          }
        }
        if (
          dataArray.filter(
            item =>
              item.Name.toLocaleLowerCase('en-VN') ===
              value.toLocaleLowerCase('en-VN'),
          ).length === 0
        ) {
          data.PostCatergory(value).then(result => {
            if (result === true) {
              console.log('Data Post');
              setvisibleNofitication(true);
            }
          });
        } else {
          setvisibleError(true);
        }
      });
    };
    return (
     
           <Overlay isVisible={visibleoverlayAddCater} >
         <SafeAreaView style={{width: reponsivewidth(300), height: reponsiveheight(250)}}>
        <View style={style.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
            Th??m nh??m s???n ph???m
          </Text>
        </View>
        <View style={[style.styletxtInput, {marginTop: 28, borderRadius: 4}]}>
          <TextInput
            onChangeText={text => {
              setInputValue(text);
            }}
            style={{padding: 18}}
            placeholder="T??n nh??m s???n ph???m"
          />
        </View>
        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 35}}>
          <TouchableOpacity
            style={[
              style.btnExit,
              {alignItems: 'center', alignSelf: 'center', marginRight: 25},
            ]}
            onPress={() => {
              saveCatergory(InputValue);
              setvisibleOverplayAddCater(false);
              setvisibleOverplayAdd(false);
            }}>
            <Text style={{color: '#FFFF'}}>L??u</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
            onPress={() => {
              setvisibleOverplayAddCater(false);
              setvisibleOverplayAdd(false);
            }}>
            <Text style={{color: '#FFFF'}}>Tho??t</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </Overlay>
    );
  };
  
  return (
    <SafeAreaView style={style.container}>
      <CustomHeader
        title="Danh s??ch s???n ph???m"
        onpress={() => {
          navigation.goBack();
        }}
      />
      {visibleSearch === false ? (
        <View
          style={[
            style.Shadowbox,
            {
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 10,
              backgroundColor: '#02569E',
              height: 50,
            },
          ]}>
          <View style={{justifyContent: 'flex-start', width: '50%'}}>
            <TouchableOpacity
              onPress={() => {
                setvisibleOverplayAdd(true);
              }}
              style={{marginLeft: 15}}>
              <MaterialIcons name="menu" size={32} color={'#ffff'} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '50%',
              },
            ]}>
            {ModelDel === true && (
              <TouchableOpacity
                onPress={() => {
                  del();
                }}
                style={{marginRight: 25}}>
                <MaterialIcons name="delete" size={32} color={'#ffff'} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddproductScreen');
              }}
              style={{marginRight: 25}}>
              <MaterialIcons name="library-add" size={32} color={'#ffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setvisibleSearch(true)}
              style={{marginRight: 20}}>
              <Ionicons name="search" size={32} color={'#ffff'} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={[
            style.Shadowbox,
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10,
              backgroundColor: '#02569E',
              height: 50,
            },
          ]}>
          <SearchBar
            lightTheme={true}
            containerStyle={{
              width: reponsivewidth(300),
              height: reponsiveheight(55),
              borderRadius: 5,
              backgroundColor: '#ffff',
            }}
            inputContainerStyle={{
              height: reponsiveheight(30),
              backgroundColor: '#ffff',
            }}
            onChange={e => {
              setvalueSearch(e.nativeEvent.text);
            }}
            placeholder="Nh???p t??n s???n ph???m..."
            value={valueSearch}
          />
          <View
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'center',
              alignItems: 'center',
              width: reponsivewidth(50),
              height: reponsiveheight(60),
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
              onPress={() => setvisibleSearch(false)}>
              <Text style={{fontSize: 16, color: '#efefef', fontWeight: '700'}}>
                H???y
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={style.containerScrollview}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 16,
            marginTop: 10,
          }}>
          <Checkbox
            color="#02569E"
            onPress={() => {
              oncheckAll(CheckAll);
            }}
            status={CheckAll ? 'checked' : 'unchecked'}
          />
          <Text style={{marginLeft: 5}}> Ch???n t???t c???</Text>
        </View>
        <ScrollView style={{marginTop: -10}}>
          <View style={style.ContainerButton}>
            {ListSearch.length > 0
              ? ListSearch.map(item => {
                  let check = ListCheckProduct.includes(item);
                  return (
                    <Customitemproduct
                      onClickImage={()=>{SetselectedItem(item); setVisibleMaterial(true)}}
                      item={item}
                      checked={check}
                      oncheck={oncheckproduct}
                      setmodelDel={setModelDel}
                      key={item.id}
                      icon={
                        <Image
                          style={{
                            width: reponsivewidth(100),
                            height: reponsiveheight(100),
                          }}
                          source={{uri: item.Image}}
                        />
                      }
                      title={item.name_product}
                      price={item.Price_product}
                      quanity={item.Quanity}
                      onpressedit={() => {
                        edit(item.id);
                      }}
                    />
                   
                  );
                })
              : dataproduct.map(item => {
                  let check = ListCheckProduct.includes(item);
                  return (
                    <Customitemproduct
                      onClickImage={()=>{SetselectedItem(item); setVisibleMaterial(true)}}
                      item={item}
                      checked={check}
                      oncheck={oncheckproduct}
                      setmodelDel={setModelDel}
                      key={item.id}
                      icon={
                        <Image
                          style={{
                            width: reponsivewidth(100),
                            height: reponsiveheight(100),
                          }}
                          source={{uri: item.Image}}
                        />
                      }
                      title={item.name_product}
                      price={item.Price_product}
                      quanity={item.Quanity}
                      onpressedit={() => {
                        edit(item.id);
                      }}
                    />
                
                  );
                })}
          </View>
        </ScrollView>
        {/* <Provider>
                          <Portal>
                           <Dialog visible={visible} onDismiss={hideDialog} style={{borderRadius:25,marginBottom:100}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Th??ng b??o</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:'#FFF',justifyContent:'center',alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>B???n c?? mu???n x??a s???n ph???m n??y kh??ng ?</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:'center',justifyContent:'center'}}>
                          <Button onPress={()=>{deleteproduct(idDel);}}><Text style={{color:'#3399FF'}}>Yes</Text></Button>
                          <Button onPress={hideDialog}><Text style={{color:'#3399FF'}}>No</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider> */}
            
            <Overlay isVisible={visibleoverlayAdd}>
        {/* {visibleoverlayAddCater === true ? (
          <ModalAddCatergory />
        ) : visibleoverlayUpdateCater === true ? (
          <ModalUpdateCatergory />
        ) :  */}
          <>
            <View
              style={{
                width: reponsivewidth(300),
                height: reponsiveheight(300),
              }}>
              <View style={style.TitleOverlAdd}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'center',
                    color: '#000000',
                    paddingBottom: 2,
                    fontWeight: '700',
                  }}>
                  Ch???n ch??? ?????
                </Text>
              </View>
              <View style={style.TitleOverlAdd_content}>
              <TouchableOpacity
                  onPress={() => {
                    setvisibleOverplayAdd(false);
                    navigation.navigate('ListMaterialScreen');

                  }}
                  style={[
                    style.btnChoosenAdd,
                    {marginVertical: 10, padding: 15},
                  ]}>
                  <Text>Danh s??ch nguy??n li???u</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setvisibleOverplayAdd(false);
                    setvisibleOverplayAddCater(true);
                  }}
                  style={[
                    style.btnChoosenAdd,
                    {marginVertical: 10, padding: 15},
                  ]}>
                  <Text>Th??m Nh??m s???n ph???m</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                   setvisibleOverplayAdd(false);
                   navigation.navigate('ListCategoryScreen')
                  }}
                  style={[style.btnChoosenAdd, {padding: 15}]}>
                  <Text>C???p nh???t nh??m s???n ph???m m???i</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity 
              style={[
                style.btnExit,
                {alignItems: 'center', alignSelf: 'center'},
              ]}
              onPress={() => setvisibleOverplayAdd(false)}>
              <Text style={{color: '#FFFF'}}>Tho??t</Text>
            </TouchableOpacity>
          </>

      </Overlay>
      {
        selectedItem && AllListMaterial.filter(x=>x.id === selectedItem.ListMaterial ).length>0   &&  <ListProductMaterial visible={VisibleMaterial} onExit={setVisibleMaterial} List={selectedItem.ListMaterial && AllListMaterial.filter(x=>x.id === selectedItem.ListMaterial )[0].ListMaterial}/>
      }
     
      {visibleoverlayAddCater == true  && <ModalAddCatergory />}
      {/* {visibleoverlayUpdateCater == true  && <ModalUpdateCatergory />} */}
      </View>
      <CustomNotificationDel
        visible={ModalDelete}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => setModalDelete(false)}
        Content="B???n c?? mu???n x??a nh???ng s???n ph???m n??y kh??ng ?"
        onAction={() => deleteproduct()}
      />
      <CustomNotification
        visible={Visiblenofitication}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => setvisibleNofitication(false)}
        Content="B???n ???? th??m  th??nh c??ng !"
      />
      <CustomNotification
        visible={VisibleError}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Th??ng b??o"
        onCancel={() => setvisibleNofitication(false)}
        Content="T??n nh??m s???n ph???m ???? t???n t???i !"
      />
      <Loading visible={loading} />
     
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  ContainerButton: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  containerScrollview: {
    marginTop: 1,
    flex: 1,
    // borderTopRightRadius: 15,
    // borderTopLeftRadius:15,
    // borderColor: '#b6e4ff',
    // borderTopWidth:2,
    marginBottom: 2,
  },
  Shadowbox: {
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  TitleOverlAdd_content: {
    marginTop: 8,
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
  styletxtInput: {
    borderColor: '#afaeae',
    borderWidth: 0.5,
  },
  shadowNames: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
type props ={ 
  navigation: StackNavigationProp<ListproductNavigationPramaList,'ListCategoryScreen'>
}
const ModalUpdateCatergory: React.FC<props> = ({navigation}) => {
  const [ListCheck, setListCheck] = useState<string[]>([]);
  const [Modeldel, setModeldel] = useState<boolean>(false);
  const [notificationldel, setnofiticationdel] = useState<boolean>(false);
  const [UpdateDetail, setupdatedetail] = useState<boolean>(false);
  const [valInput, setValInput] = useState<string>('');
  const [ChoosenItem, setChoosenItem] = useState<any>();
  const [visibleNofiticationUpdate, setvisibleNotificationUpdate] =
    useState<boolean>(false);
  const [visibleNofiError, setvisibleNofiError] = useState<boolean>(false);
  const oncheck = (id: string, check: boolean) => {
    if (check) {
      setListCheck(ListCheck.filter(item => item !== id));
    } else {
      setListCheck([id, ...ListCheck]);
    }
  };
  const [DataCatergory, setDataCatergory] = useState<any[]>([]);
  const GetCatergory = () => {
    data.getdata('Catergory').then(res => {
      var dataArray: any[] = [];
      for (let key in res) {
        if (key != '0') {
          dataArray.push({
            id: key,
            ...res[key],
          });
        }
      }
      setDataCatergory(dataArray);
    });
  };
  useEffect(()=>{
    if(ListCheck.length == 0)
    {
      setModeldel(false);
    }
  },[ListCheck])
  useEffect(() => {
    if (notificationldel === false) {
      GetCatergory();
    }
  }, [notificationldel]);
  useEffect(() => {
    if (visibleNofiticationUpdate === false) {
      console.log('123');
      GetCatergory();
    }
  }, [visibleNofiticationUpdate]);
  const DeleCatergory = () => {
    if (ListCheck.length > 0) {
      ListCheck.forEach(item => {
        data.deletedData('Catergory', item);
      });
    }
    setnofiticationdel(false);
  };
  const UpdateCatergory = (text: string) => {
    data.getdata('Catergory').then(res => {
      var dataArray: any[] = [];
      for (let key in res) {
        if (key !== '0') {
          dataArray.push({
            id: key,
            ...res[key],
          });
        }
      }
      if (
        dataArray.filter(
          item =>
            item.Name.toLocaleLowerCase('en-VN') ===
            text.toLocaleLowerCase('en-VN'),
        ).length === 0
      ) {
        data.UpdateCatergory(ChoosenItem.id, text).then(result => {
          if (result === true) {
            console.log('Data Update');
            setvisibleNotificationUpdate(true);
          }
        });
      } else {
        setvisibleNofiError(true);
      }
    });
  };
  return (
    <SafeAreaView
      style={{
        width: getwidth(),
        height: getheight(),
        flex: 1,
        marginTop: -10.5,
      }}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 18,
            backgroundColor: '#67bff3',
            borderColor: '#e5e5e5',
            borderWidth: 2,
          },
        ]}>
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            width: reponsivewidth(50),
          }}>
          <TouchableOpacity
            onPress={() => {
              // setvisibleOverplayUpdateCater(false);
              // setvisibleOverplayAdd(false);
              navigation.navigate('ListProductScreen');
            }}>
            <MaterialIcons name="arrow-back" size={28} color="#efefef" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 17,
            width: reponsivewidth(250),
            textAlign: 'left',
            color: '#FFFF',
            fontWeight: '700',
          }}>
          C???p nh???t nh??m s???n ph???m
        </Text>
      </View>
      {Modeldel === true && (
        <View
          style={[
            style.shadowNames,
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              backgroundColor: '#02569E',
              marginTop: 15,
              padding: 10,
            },
          ]}>
          <Pressable
            onPress={() => {
              setnofiticationdel(true);
            }}>
            <MaterialIcons name="delete" size={32} color={'#FFFF'} />
          </Pressable>
          <Text style={{marginRight: 20, color: '#FFFF'}}>X??a</Text>
          <Pressable
            onPress={() => {
              setModeldel(false), setListCheck([]);
            }}>
            <MaterialIcons name="clear" size={30} color={'#FFFF'} />
          </Pressable>
        </View>
      )}
      <View>
        <ScrollView style={{height: reponsiveheight(580), marginTop: 20}}>
          {DataCatergory.length > 0 ? (
            DataCatergory.map(item => {
              let checked = ListCheck.includes(item.id);
              return (
                <View
                  style={[
                    style.shadowNames,
                    {
                      flexDirection: 'row',
                      borderTopColor: '#e8e8e8',
                      borderTopWidth: 0.1,
                      alignItems: 'center',
                      padding: 15,
                      marginTop: 8,
                    },
                  ]}>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      width: '40%',
                      alignItems: 'center',
                    }}>
                    <Checkbox
                      color={'#02569E'}
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        if (Modeldel === false) {
                          setModeldel(true);
                        }
                        oncheck(item.id, checked);
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setChoosenItem(item);
                      setupdatedetail(true);
                    }}
                    disabled={Modeldel}
                    style={{width: '60%', alignItems: 'flex-start'}}>
                    <Text style={{textAlign: 'center', fontSize: 18}}>
                      {item.Name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: reponsiveheight(580),
              }}>
              <AntDesign
                name="dropbox"
                size={40}
                color="#b4b4b4"
                style={{opacity: 0.4}}
              />
              <Text style={{opacity: 0.4, marginLeft: 8}}>No Data</Text>
            </View>
          )}
        </ScrollView>
        {/* { DataCatergory.length > 0 &&
          <View style={{flexDirection:'row', alignSelf:'center', marginTop:35}}>
              <TouchableOpacity style={[ style.btnExit,{alignItems:'center', alignSelf:'center', marginRight:25}]} onPress={()=>setvisibleOverplayUpdateCater(false)}><Text style={{color:'#FFFF'}}>L??u</Text></TouchableOpacity>
              <TouchableOpacity style={[ style.btnExit,{alignItems:'center', alignSelf:'center'}]} onPress={()=>{setvisibleOverplayUpdateCater(false); setvisibleOverplayAdd(false)}}><Text style={{color:'#FFFF'}}>Tho??t</Text></TouchableOpacity>
          </View>
          } */}
        <CustomNotificationDel
          visible={notificationldel}
          onAction={() => DeleCatergory()}
          onCancel={() => {
            setnofiticationdel(false);
          }}
          iconTitle={
            <BellNofi
              width={reponsivewidth(30)}
              height={reponsiveheight(30)}
            />
          }
          Content="B???n c?? th???c s??? mu???n x??a? "
        />
        <Overlay isVisible={UpdateDetail}>
          <View
            style={{
              width: reponsivewidth(300),
              height: reponsiveheight(250),
            }}>
            <View style={style.TitleOverlAdd}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#000000',
                  paddingBottom: 2,
                  fontWeight: '700',
                }}>
                Th??m nh??m s???n ph???m
              </Text>
            </View>
            <View
              style={[style.styletxtInput, {marginTop: 28, borderRadius: 4}]}>
              <TextInput
                defaultValue={ChoosenItem?.Name}
                onChangeText={text => {
                  setValInput(text);
                }}
                style={{padding: 18}}
                placeholder="T??n nh??m s???n ph???m"
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
                  {
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginRight: 25,
                  },
                ]}
                onPress={() => {
                  UpdateCatergory(valInput);
                  setupdatedetail(false);
                }}>
                <Text style={{color: '#FFFF'}}>L??u</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.btnExit,
                  {alignItems: 'center', alignSelf: 'center'},
                ]}
                onPress={() => {
                  setupdatedetail(false);
                }}>
                <Text style={{color: '#FFFF'}}>Tho??t</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
        <CustomNotification
          visible={visibleNofiticationUpdate}
          iconTitle={
            <BellNofi
              width={reponsivewidth(30)}
              height={reponsiveheight(30)}
            />
          }
          title="Th??ng b??o"
          onCancel={() => setvisibleNotificationUpdate(false)}
          Content="B???n ???? c???p nh???t th??nh c??ng !"
        />
        <CustomNotification
          visible={visibleNofiError}
          iconTitle={
            <Warning
              width={reponsivewidth(30)}
              height={reponsiveheight(30)}
            />
          }
          title="Th??ng b??o"
          onCancel={() => setvisibleNofiError(false)}
          Content="T??n nh??m s???n ph???m ???? t???n t???i !"
        />
      </View>
    </SafeAreaView>
  );
};
export  {
  ListproductScreen,
  ModalUpdateCatergory,

};
