/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CustomHeader from '../../Model/CustomHeader';
import {MaterialParamList} from '../../navigation/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OpitonOverplay from './SubComponent/OptionOverplay';
import AddMaterialCategory from './SubComponent/AddMaterialCastegory';
import data from '../../services/data';
import DataService from '../../services/dataservice';
import { Material } from '../../Model/Material';
import Customitemproduct from '../../Model/customitemproduct';
import { useIsFocused } from '@react-navigation/native';
import UpdateMaterialCategory from './SubComponent/UpdateMaterialCatergory';
import BellNofi from '../../asset/svg/bellnotification.svg';
import { CustomNotification } from '../../Model/CustomNofication';
type props = {
  navigation: StackNavigationProp<MaterialParamList, 'ListMaterialScreen'>;
};
const ListMaterial: React.FC<props> = ({navigation}) => {
  const [valueSearch, setvalueSearch] = useState<string>('');
  const [visibleSearch, setvisibleSearch] = useState<boolean>(false);
  const [ModelDel, setModelDel] = useState<boolean>(false);
  const [visibleOverPlay,setVisibleOverPlay] = useState<boolean>(false);
  const [visibleOverOption,setVisibleOption] = useState<boolean>(false);
  const [visibleOverAddCatergory,setVisibleoverAdd] = useState<boolean>(false);
  const [visibleOverUpdate,setVisibleOverUpdate] = useState<boolean>(false);
  const [visibleDelSucess,setVisibleDelSucess] = useState<boolean>(false);
  const [dataMaterial,setDataMaterial]= useState<Material[]>([]);
  const [dataMaterialSearch,setDataMaterialSearch]= useState<Material[]>([]);
  const [listCheckMaterial,setListCheckMaterial]= useState<any[]>([]);
  const isFocused= useIsFocused();
  const getDataMaterial = async()=>{
    let d = await DataService.Getdata_dtService<Material>('Material');
    setDataMaterial(d);
  };
  useEffect(()=>{
    if (valueSearch === '')
    {
      setDataMaterialSearch([]);

    }
    else
    {
      setDataMaterialSearch(dataMaterial.filter(item=> item.Name.toLowerCase().includes(valueSearch.toLowerCase())));
    }
  },[valueSearch, dataMaterial])
  useEffect(()=>{
    if (isFocused === true || visibleDelSucess===false)
    {
      getDataMaterial();
    }
  },[isFocused, visibleDelSucess])
  useEffect(() => {
    if (listCheckMaterial.length === 0) {
      setModelDel(false);
    }
  }, [listCheckMaterial]);
  useEffect(()=>{
    if (visibleOverOption === false)
        {
            setVisibleOverPlay(false);
        }
  },[visibleOverOption]);
  function edit(key: string) {
    navigation.navigate('UpdateMaterialScreen', {id: key});
  }
  const oncheckMaterial = (id: string, check: boolean) => {
    if (check) {
      setListCheckMaterial(listCheckMaterial.filter(item => item !== id));
    } else {
      setListCheckMaterial([id, ...listCheckMaterial]);
    }
  };
  let dataOption :any[] = [
      {
          key :1,
          title : 'Thêm nguyên liệu',
          mission: ()=>{
              setVisibleOption(false);
              setVisibleoverAdd(true);
          },

      },
      {
        key : 2,
        title : 'Cập nhật nguyên liệu',
        mission: ()=>{
            setVisibleOption(false);
            setVisibleOverUpdate(true);
        },
      },
  ];
  return (
    <View style={style.container}>
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
            <TouchableOpacity onPress={()=>{setVisibleOverPlay(true); setVisibleOption( true);}} style={{marginLeft: 15}}>
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
              <TouchableOpacity onPress={()=>{
                Promise.all( 
                  listCheckMaterial.map(item=>{
                  data.deletedData('MaterialCatergory',item);
                })).then((()=> setVisibleDelSucess(true))).catch(e=> console.log(e));
                
                 
              }} style={{marginRight: 25}}>
                <MaterialIcons name="delete" size={32} color={'#ffff'} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={()=>{navigation.navigate('AddMaterialScreen');}} style={{marginRight: 25}}>
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
            placeholder="Nhập tên sản phẩm..."
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
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
        { 
        dataMaterial && <FlatList data={dataMaterialSearch.length ===0 ? dataMaterial : dataMaterialSearch} 
        numColumns={1}
        renderItem={({item})=>{

          let check = listCheckMaterial.includes(item.id);
          return (
            <Customitemproduct oncheck={()=>oncheckMaterial(item.id, check)} onpressedit={()=> {edit(item.id)}} item={item} checked={check}  setmodelDel={setModelDel} key={item.id} icon={<Image style={{width: reponsivewidth(100), height: reponsiveheight(100)}} source={{uri:item.Image}}/>} title={item.Name} price={item.BuyingPrice} quanity={item.Number} unitId={item.Unit} />
          )
        }
        }
        />
        }
        <AddMaterialCategory visible={visibleOverAddCatergory} cancel={(setVisibleoverAdd)}/>
        <UpdateMaterialCategory title='Danh sách nhóm nguyên liệu' visible={visibleOverUpdate} onExit={setVisibleOverUpdate}/>
        <OpitonOverplay cancel={setVisibleOption} mainTitle="Chọn chế độ" visible={visibleOverOption} data={dataOption}/>
        <CustomNotification
          visible={visibleDelSucess}
          iconTitle={
            <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
          }
          title="Thông báo"
          onCancel={() => {
            setVisibleDelSucess(false);
          }}
          Content="Bạn đã cập nhật thành công !"
        />
    </View>
  );
};
export default ListMaterial;
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
