/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Overlay, SearchBar, Text} from 'react-native-elements';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import storage from '@react-native-firebase/storage';
import { ScrollView } from 'react-native-gesture-handler';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import { Modalize } from 'react-native-modalize';
import ListChooseMutiple from './SupportComponent/ListChooseMaterial';
import DataService from '../../services/dataservice';
import { Material } from '../../Model/Material';
import { RadioButton } from 'react-native-paper';
import { Units } from '../../Model/Unit';
// import data from '../../services/data';
import { CustomNotification } from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
// import { CustomNotificationDel } from '../../Model/CustomNoficationDel';
import Warning from '../../asset/svg/Warning.svg';
import AddMaterial from '../Material/AddMaterial';
import { Product } from '../../Model/product';
import { CustomNotificationDel } from '../../Model/CustomNoficationDel';
import UpdateMaterial from '../Material/UpdateMaterial';
type props = {
  getArrayItem:(value:any)=> void
  visible: boolean;
  cancel: (value: any) => void;
  dataMaterial: any [] | undefined;
};
const ChooseMaterial: React.FC<props> = ({visible, cancel,getArrayItem, dataMaterial}) => {
  // const [ProductItem, setProductItem]= useState<Product>()
  const [containerData,setContainerData] = useState<any[]>([]);
  const [UnitsData,setUnitsData] = useState<Units[]>([]);
  const [valueQuality, setvaluequality] = useState<number>(1);
  const [valuesea ,setvaluesea] = useState<string>('');
  const [visibleAdd, setvisibleAdd] = useState<boolean>(false);
  // const [dataMaterial,setDataMaterial] = useState<Material[]>([]);
  const modalizeRef = useRef<Modalize>(null);
  const [visibleDel,setvisibleDel] = useState<boolean>(false);
  const [ItemAdding, setItemAdding]= useState<any[]>([]);
  const [visbleSucces, setvisbleSucces] = useState<boolean>(false);
  const [visbleError, setvisbleError] = useState<boolean>(false);
  const [DelItem, setDelItem] = useState<any>();
  const [ItemIndex,setItemIndex]= useState<number>(-1);
  const [visibleEdit, setvisibleEdit] = useState<boolean>(false);
  const openModalize = ()=>{
    modalizeRef.current?.open();
  };
  const cancelModalize = ()=>{
    modalizeRef.current?.close();
  };
  const getListMaterial=useCallback(()=>{
    if(dataMaterial)
    {
      setItemAdding(dataMaterial);
    }
  },[dataMaterial])
  const DelImage= (url:string)=>{
    const imgref = storage().refFromURL(url);
    imgref.delete().then(()=>{console.log('del Success')}).catch(e=> console.log(e));
  }
  // const getListMaterial= async ()=>
  // {
  //   if (id)
  //   {
  //     let a  = await  DataService.Getdata_dtServiceById<Product>('Products',id);
  //       setProductItem(a);
  //   }
  // }
//   const getDataMaterial = async()=>{
//     let data:Material[] = await DataService.Getdata_dtService<Material>('Material');
//     setDataMaterial(data);
//   };
//   const getDataUnit= async()=>{
//       let name = await DataService.Getdata_dtService<Units>('Units');
//       setUnitsData(name);
//   }
//   const getNameUnit= (id:string)=>{
//    let a: Units[] =  UnitsData.filter(item=>item.id === id);
//    return a[0].Name;
// }
// const getNNumberMaterial = (id:string)=>{
//  let a =  dataMaterial.filter(i => i.id === id)
//   return a[0].Number;
// }
// const convertArrayToObject = (array:any, key:any) => {
//   const initialValue = {};
//   return array.reduce((obj:any, item:any) => {
//     return {
//       ...obj,
//       [item[key]]: item,
//     };
//   }, initialValue);
// };
const  onDelete=(index: number, arr:any[] )=>
{
  if(arr[index].Img !=="none")
  {
  DelImage(arr[index].Img)
  }
  arr.splice(index,1)
  setItemAdding(arr);
  setvisibleDel(false)

}
const onEdit=(index: number )=>
{
   setItemIndex(index);
   setvisibleEdit(true);
}
// const SaveMaterial = (dataMaterial: Material [])=>{
//   if(dataMaterial.filter(item=> item.Number <0).length > 0)
//   {
//     setvisbleError(true);
//   }
//   else
//   {
//     const initialValue = {};
//    let a = dataMaterial.reduce((obj:any, item:any)=>{
//          let i = {
//          Name: item.Name,
//          Number: item.Number,
//          Img: item.Img,
//          Unit: item.Unit,
//          MaterialGroup : item.MaterialGroup,
//          BuyingPrice: item.BuyingPrice,

//        }
//       return {
//         ...obj,
//         [item.id]: i,
//       };
//     },initialValue)

//   }
// }

  useEffect(()=>{
    getListMaterial();
    // setContainerData([1,2,3]);
    // getDataMaterial();
    // getDataUnit();
  },[getListMaterial]);
  return (
    <Overlay isVisible={visible}>
      <SafeAreaView
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
            ItemAdding &&  ItemAdding.length > 0 && ItemAdding.map((_item)=>{
                console.log(_item);
                // let nameUnits= await getNameUnit(_item.Unit);
                  return (
                      <View style={[Styles.shadowContainer, Styles.ContainerBox]} >
                          <View style={{ flex:1}}>
                             <Image style={{width: reponsivewidth(80), height: reponsiveheight(80)}} source={{uri: _item.Img}}/>
                           
                          </View>
                          <View >
                              <Text style={Styles.titleStyle}>{_item.Name}</Text>
                              <View >
                              <View style={{flexDirection:'row', width:reponsivewidth(200), alignItems:'center', justifyContent:'center'}}>
                        {/* <View style={{width:reponsivewidth(60),justifyContent:'flex-start', alignItems:'flex-start'}}>
                        <TouchableOpacity onPress={()=>{
                            if (valueQuality >= 1)
                            {
                                setvaluequality(prev=>prev + 1);
                            }
                        }}><Ionicons name="add" size={30}/></TouchableOpacity>
                        </View> */}
                        <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                       <TextInput   style={{justifyContent:'flex-end',backgroundColor:'#e7e7e7', borderRadius:5,paddingRight:10, paddingLeft:10, paddingBottom:5, paddingTop:5, fontSize:16,textAlign:'center', marginRight:5}}>{_item.Total}</TextInput>
                       <Text>{_item.Unit &&_item.Unit }</Text>
                       </View>
                       {/* <View style={{width:reponsivewidth(60),justifyContent:'flex-end', alignItems:'flex-end'}}>
                       <TouchableOpacity onPress={()=>{
                            if (valueQuality > 1)
                            {
                                setvaluequality(prev=>prev - 1);
                            }
                        }} style={{justifyContent:'flex-end'}}>
                        <AntDesign
                         name="minus" size={30}/></TouchableOpacity>
                       </View> */}
                       </View>
                              </View>
                          </View>
                          <View>
                          <TouchableOpacity style={Styles.btnDel}>
                              <MaterialIcons onPress={()=>{
                                 onEdit(ItemAdding.findIndex(item=> item == _item))
                              }}  name="mode-edit" size={32} />
                          </TouchableOpacity>
                          <TouchableOpacity style={[Styles.btnDel,{marginTop:8}]}>
                              <MaterialIcons onPress={()=>{
                                 setDelItem(ItemAdding.findIndex(item=> item == _item))
                                 setvisibleDel(true);
                              }}  name="delete" size={32} color={'red'}/>
                          </TouchableOpacity>
                          </View>
                      </View>
                  );
              })
          }
         <Overlay isVisible={visibleAdd}>
              <AddMaterial oncancel={setvisibleAdd} onItemArray={setItemAdding} />
         </Overlay>
         <Overlay isVisible={visibleEdit}>
              <UpdateMaterial onCancel={setvisibleEdit} onArrayData={setItemAdding} index={ItemIndex} arrayData={ItemAdding} />
         </Overlay>
          {/* <ListChooseMutiple Cancel={setvisibleAdd}  title="Danh sách nguyên liệu" Listdata={dataMaterial} visible={visibleAdd} save={setListCheck} /> */}
          <View style={{marginTop:5}}>
                <TouchableOpacity onPress={()=> setvisibleAdd(true)} style={{alignItems:'center'}} >
                    <MaterialIcons name="add-box" size={32} color={'#02569E'}/>
                    <Text>Thêm mới nguyên liệu</Text>

              </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>{
                // SaveMaterial(listCheck)
                getArrayItem(ItemAdding);
                cancel(false);
            }}  style={[
              Styles.btnExit,
              {alignItems: 'center', backgroundColor: '#226cb3'},
            ]}>
              <Text style={{color:'#FFFF'}}>Lưu</Text>
              </TouchableOpacity>
            </View>
        </View>
        <CustomNotificationDel visible={visibleDel} title="Thông báo" Content='Bạn có muốn xóa nguyên liệu' iconTitle={<Warning width={reponsivewidth(30)} height={reponsiveheight(30)}/>} onCancel={()=>setvisibleDel(false)} onAction={()=>onDelete(DelItem,ItemAdding)} />
        <CustomNotification visible={visbleSucces} title="Thông báo" Content='Bạn đã thêm thành công' iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} onCancel={()=>setvisbleSucces(false)} />
        <CustomNotification onCancel={()=>setvisbleError(false)} visible={visbleError} title="Thông báo" Content='Thêm không thành công' iconTitle={<Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />} />
      </SafeAreaView>

          {/* Tạo component cho modalize */}



          <Modalize ref={modalizeRef} modalHeight={reponsiveheight(750)}  onClosed={cancelModalize } rootStyle={{height:reponsiveheight(800)}} >
          <SafeAreaView >
              <View style={{borderBottomColor:'#b7b7b7',borderWidth:1, width:reponsivewidth(400)}}>
                  <Text style={{fontSize:18, fontWeight:'700',textAlign:'center', padding:8}}>{'Nguyên liệu'}</Text>
              </View>
              <View style={{justifyContent:'center', alignItems:'center', marginTop:8}}>
                  <SearchBar  containerStyle={{ borderBottomColor: '#838282', borderWidth: 0.8, width: reponsivewidth(380), height: reponsiveheight(50), alignItems: 'center', justifyContent: 'center', borderRadius: 4 }} onChange={(e)=>{e.nativeEvent.text;}} value={valuesea} placeholder={'Nhập tên nguyện liệu'} platform="android" round={true} />
              </View>
              <View>
                 <ScrollView />
              </View>
          </SafeAreaView>
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
    titleStyle : {
      textAlign:'center', 
      marginBottom:15,
       fontWeight:'700',
    },
    btnDel:{
      marginLeft: 25
    },
    btnExit: {
      padding: 10,
      width: reponsivewidth(100),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
});
