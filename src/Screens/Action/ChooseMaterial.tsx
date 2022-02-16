/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Overlay, SearchBar, Text} from 'react-native-elements';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Modalize } from 'react-native-modalize';
import ListChooseMutiple from './SupportComponent/ListChooseMaterial';
import DataService from '../../services/dataservice';
import { Material } from '../../Model/Material';
import { RadioButton } from 'react-native-paper';
type props = {
  visible: boolean;
  cancel: (value: any) => void;
};
const ChooseMaterial: React.FC<props> = ({visible, cancel}) => {
  const [containerData,setContainerData] = useState<any[]>([]);
  const [valueQuality, setvaluequality] = useState<number>(1);
  const [valuesea ,setvaluesea] = useState<string>('');
  const [visibleAdd, setvisibleAdd] = useState<boolean>(false);
  const [dataMaterial,setDataMaterial] = useState<Material[]>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [listCheck, setListCheck] = useState<any[]>([]);
  function checkItem(check: boolean, id: any) {
    if (check === true) {
      setListCheck(listCheck.filter((item: any) => item !== id));
    } else {
      setListCheck([id, ...listCheck]);
    }
  }
  const openModalize = ()=>{
    modalizeRef.current?.open();
  };
  const cancelModalize = ()=>{
    modalizeRef.current?.close();
  };
  const getDataMaterial = async()=>{
    let data:Material[] = await DataService.Getdata_dtService<Material>('Material');
    setDataMaterial(data);
  };
  useEffect(()=>{
    setContainerData([1,2,3]);
    getDataMaterial();
  },[]);
  return (
    <Overlay isVisible={visible}>
      <View
        style={{
          width: getwidth(),
          height: getheight(),
          flex: 1,
          marginTop: -10.5,
        }}>
        <View style={{height: reponsiveheight(755)}}>

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
              <TouchableOpacity onPress={() => cancel(false)}>
                <MaterialIcons name="arrow-back" size={28} color="#efefef" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                width: reponsivewidth(150),
                textAlign: 'center',
                color: '#FFFF',
                fontWeight: '700',
              }}>
              Chọn nguyên liệu
            </Text>
          </View>
          <ScrollView>
              <View style={{alignItems:'center'}}>
          {
              containerData && containerData.map(_item=>{
                  return (
                      <View style={[Styles.shadowContainer, Styles.ContainerBox]} >
                          <View>
                            <Text>Hinh</Text>
                          </View>
                          <View>
                              <Text>Tên nguyên liệu</Text>
                              <View>
                              <View style={{flexDirection:'row', width:reponsivewidth(200), alignItems:'center'}}>
                        <View style={{width:reponsivewidth(60),justifyContent:'flex-start', alignItems:'flex-start'}}>
                        <TouchableOpacity onPress={()=>{
                            if (valueQuality >= 1)
                            {
                                setvaluequality(prev=>prev + 1);
                            }
                        }}><Ionicons name="add" size={30}/></TouchableOpacity>
                        </View>
                       <Text style={{justifyContent:'flex-end',backgroundColor:'#e7e7e7', borderRadius:5,paddingRight:10, paddingLeft:10, paddingBottom:5, paddingTop:5, fontSize:16, width:reponsivewidth(50),textAlign:'center'}}>{valueQuality}</Text>
                       <View style={{width:reponsivewidth(60),justifyContent:'flex-end', alignItems:'flex-end'}}>
                       <TouchableOpacity onPress={()=>{
                            if (valueQuality > 1)
                            {
                                setvaluequality(prev=>prev - 1);
                            }
                        }} style={{justifyContent:'flex-end'}}>
                        <AntDesign
                         name="minus" size={30}/></TouchableOpacity>
                       </View>
                       </View>
                              </View>
                          </View>
                          <TouchableOpacity>
                              <MaterialIcons name="delete" size={32} color={'red'}/>
                          </TouchableOpacity>
                      </View>
                  );
              })
          }
          <ListChooseMutiple Cancel={setvisibleAdd}  title="Danh sách nguyên liệu" Listdata={dataMaterial} visible={visibleAdd} RenderList={(Listdata)=>{
             Listdata.map(item => {
              let check = listCheck.includes(item.id);
                  return (<TouchableOpacity style={[
                    Styles.btnChoosenAdd,
                    { marginVertical: 10, padding: 15, display: 'flex', flexDirection: 'row' },
                  ]}>

                    <View style={{ flex: 0.2 }}>
                      <Image source={{ uri: item.Img !== 'none' && item.Img }} />

                    </View>
                    <View style={{ flex: 0.7 }}>
                      <Text style={{ textAlign: 'center' }}>{item.Name}</Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                      <RadioButton value='' status={check} />
                    </View>
                  </TouchableOpacity>);
                });
          }
        }/>
          <View style={{marginTop:5}}>
                <TouchableOpacity onPress={()=> setvisibleAdd(true)} style={{alignItems:'center'}} >
                    <MaterialIcons name="add-box" size={32} color={'#02569E'}/>
                    <Text>Thêm mới nguyên liệu</Text>

              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
        </View>
      </View>

          {/* Tạo component cho modalize */}



          <Modalize ref={modalizeRef} modalHeight={reponsiveheight(750)}  onClosed={cancelModalize } rootStyle={{height:reponsiveheight(800)}} >
          <View >
              <View style={{borderBottomColor:'#b7b7b7',borderWidth:1, width:reponsivewidth(400)}}>
                  <Text style={{fontSize:18, fontWeight:'700',textAlign:'center', padding:8}}>{'Nguyên liệu'}</Text>
              </View>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:8}}>
                  <SearchBar  containerStyle={{ borderBottomColor: '#838282', borderWidth: 0.8, width: reponsivewidth(380), height: reponsiveheight(50), alignItems: 'center', justifyContent: 'center', borderRadius: 4 }} onChange={(e)=>{e.nativeEvent.text;}} value={valuesea} placeholder={'Nhập tên nguyện liệu'} platform="android" round={true} />
              </View>
              <View>
                 <ScrollView />
              </View>
          </View>
          </Modalize>
    </Overlay>
  );
};
export default ChooseMaterial;
const Styles = StyleSheet.create({
    shadowContainer: {
            backgroundColor:'#FFFF',
            shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation:4,

    },
    ContainerBox: {
        flexDirection:'row',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        marginBottom:10,
        marginTop:5,
        width:reponsivewidth(340),
    },
    btnChoosenAdd: {
      alignItems: 'center',
      borderBottomColor: '#afaeae',
      borderBottomWidth: 0.5,
      borderTopColor: '#afaeae',
      borderTopWidth: 0.5,
    },
});
