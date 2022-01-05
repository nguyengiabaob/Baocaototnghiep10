/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, View } from 'react-native';
import { MediaType } from 'react-native-image-picker';
import { Button, Dialog, Paragraph, Portal, Provider } from 'react-native-paper';
import MaterialIcon  from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../Model/CustomHeader';
import { Product } from '../../Model/product';
import { ListproductNavigationPramaList } from '../../navigation/types';
import data from '../../services/data';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { Overlay } from 'react-native-elements';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import BellNofi from '../../asset/svg/bellnotification.svg';
import { CustomNotification } from '../../Model/CustomNofication';
import DataService from '../../services/dataservice';
type Props={
    navigation: StackNavigationProp<ListproductNavigationPramaList,'UpdateProductScreen'>,
    route: RouteProp<ListproductNavigationPramaList,'UpdateProductScreen'>
}
const UpdateProductScreen: React.FC<Props> = ({navigation, route}: Props) =>{
    const {id} = route.params;
    const [nameproduct, setnameproduct] = useState<string>('');
    const [priceproduct, setpriceproduct] = useState<number>(-1);
    const [quanity,setquanity] = useState<number>(-1);
    const [image, setimage] = useState<any>(null);
    const [pathimg, setpathimg] = useState<any>(null);
    // const [postimg,setpostimg] = useState<any>(null);
    const [imgopick,setimgpick] = useState<any>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false);
        navigation.navigate('ListProductScreen');
    };
    const [showChooseCate,setShowChooseCate]= useState<boolean>(false);
    const [ChooseCate,setChooseCate]= useState<any>();
    const [DataCate,setDataCate]= useState<any[]>([]);
    const [dataproduct,setdataproduct] = useState<Product[]>([]);
    const [dataProduct,setdataProduct]= useState<Product>();
    const getProduct = useCallback(async()=>{
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
        //     let i= arrayproduct.findIndex(Item => Item.id== id);
        //     console.log('1',arrayproduct[i]);
        //     setdataProduct(arrayproduct[i]);
           
        //     //setdataproduct(arrayproduct);
        // });
        let dta = await DataService.Getdata_dtService<any>('Products');
        let i = dta.findIndex(Item => Item.id == id);
        console.log('1',dta[i]);
        setdataProduct(dta[i]);
        //setdataproduct(arrayproduct);

    },[id])
    useEffect(()=>{
        getProduct();
    },[id,getProduct]);
    //let name ,price, quanity1,img1, CatergoryID;

   

const getNameCate= (id: string|undefined)=>{
    let name;
   let array=  DataCate?.filter(item=> item.id == id);
   console.log('a', array);
    array.forEach(item => {
       name= item.Name;
    });
    return name;
}
    const getCatergory =()=>{
        data.getdata('Catergory'). then(res=> 
            {   var dataArray: any[]= [];
                for (let key in res)
                {
                    if (key!='0')
                    {
                        dataArray.push({
                            id:key,
                            ...res[key]
                        });
                    }
                }
                setDataCate(dataArray);
            });
    };
 useEffect(()=>{
    getCatergory();
 },[])
    async function update()

    {
        // console.log(nameproduct);
        // if (nameproduct === '' && imgopick === null )
        // {
        //     // console.log(postimg);
        //     console.log(nameproduct);
        //     showDialog();
        // }
       // {
        // //  uploadImg(image,pathimg);
        let catergory= DataCate.filter(item=>item.id == dataProduct?.CatergoryID);
        console.log('0',catergory[0]);
        let urlimg;
        if(image !== null)
        {
        const reference = storage().ref(image);
        console.log(reference);
        const pathToFile = pathimg;
        await reference.putFile(pathToFile);
         urlimg =  await reference.getDownloadURL();
        }
        if (dataProduct)
        {
           
         await data.updatedataproduct('Products',id,nameproduct == '' ? dataProduct?.name_product : nameproduct , priceproduct > 0 ? priceproduct : Number(dataProduct.Price_product)  , quanity > 0 ? quanity : Number(dataProduct.Quanity), urlimg ? urlimg : dataProduct.Image, ChooseCate ? ChooseCate.id : catergory[0].id);
        }
         showDialog();

       // }
    }
    const type: MediaType = 'photo';
    const Handlechoosephoto = ()=>{
    const option  = { mediaType: type,
    };
    ImagePicker.launchImageLibrary(option,response=>{console.log('response',response);
    if (response.assets)
        {
             (response.assets.map(
            res=>{setimage(res.fileName);
            setpathimg(res.uri);
            setimgpick(res)
            ;}
            ));
        }
    }
        );
    };
    return (
        <View>
            {console.log('adsadsa',ChooseCate)}
            <CustomHeader title="Cập nhật thông tin sản phẩm " onpress={()=>{navigation.goBack();}}/>
          <View style={{borderColor:'#D3D3D3',
                         borderWidth:3,
                         borderRadius:10,
                         height:500,
                         backgroundColor:'#FFF',
                         }}>
             <View style={{marginTop:10, flexDirection:'row', alignItems:'flex-start', justifyContent:'flex-start'}}>
              <TouchableOpacity onPress={()=>{Handlechoosephoto();}} style={style.Addphoto2}>
              {imgopick ? <Image style={[style.img,{ width:reponsivewidth(150), height: reponsiveheight(150) }]} source={imgopick}/> : <Image style={[style.img,{ width:reponsivewidth(150), height: reponsiveheight(150) }]} source={{uri: dataProduct?.Image}} />

                }
              </TouchableOpacity>
          </View>
          {/* <View style={{marginTop:10}}  >
                <Text style={{fontSize:15,
                            fontWeight:'bold',
                            fontStyle:'italic'}}
                        >Tên sản phẩm </Text>
                <TextInput  onChangeText={(text)=>{setnameproduct(text);}}
                style={{marginTop:5,
                        width:380,
                        borderRadius:10,
                        height:50,
                        borderColor:'#D3D3D3',
                        borderWidth:3,
                        }}>{name}</TextInput>
          </View> */}
          <View style={{marginTop:25, justifyContent:'center', alignItems:'center',  borderBottomWidth:0.5,borderBottomColor:'#c3c3c3',borderTopColor:'#c3c3c3',borderTopWidth:0.5, flexDirection:'row', backgroundColor:'#FFFF',height:70}}  >
                <Text  style={style.titlefiled}>Tên sản phẩm </Text>
                <TextInput onChangeText={(text)=>{setnameproduct(text);}} style={[style.textinput,{width:reponsivewidth(280)}]} placeholder="Tên sản phẩm">{dataProduct?.name_product}</TextInput>
          </View>
          {/* <View style={{marginTop:30}} >
                <Text style={{fontSize:15,
                             fontWeight:'bold',
                             fontStyle:'italic',
                             }}>Giá </Text>
                <TextInput  keyboardType="numeric"  onChangeText={(text)=>{setpriceproduct(Number.parseFloat(text));}}
                style={{marginTop:5,
                        width:150,
                        borderRadius:10,
                        height:50,
                         borderColor:'#D3D3D3',
                        borderWidth:3,
                        }}>{price}</TextInput>
          </View> */}
{console.log(getNameCate(dataProduct?.CatergoryID))}
           <View style={{justifyContent:'center', alignItems:'center',  borderBottomWidth:0.5,borderBottomColor:'#c3c3c3',borderTopColor:'#c3c3c3',borderTopWidth:0.5, flexDirection:'row', backgroundColor:'#FFFF',height:70}}  >
                <Text  style={style.titlefiled}>Nhóm sản phẩm </Text>
                <TouchableOpacity onPress={()=>{
                    setChooseCate(undefined);
                    setShowChooseCate(true)}} style={{width:reponsivewidth(280), flexDirection:'row', alignItems:'center'}}>
                <TextInput   editable={false} style={[style.textinput,{width:reponsivewidth(170)},]} placeholder="Nhóm sản phẩm">{ChooseCate ? ChooseCate.Name : getNameCate(dataProduct?.CatergoryID)}</TextInput>
                <EvilIcons name='chevron-right' size={32} color={'#777777'}/>
                </TouchableOpacity>
        </View>
           <View style={{ justifyContent:'center', alignItems:'center', borderBottomWidth:0.5,borderBottomColor:'#c3c3c3',borderTopColor:'#c3c3c3',borderTopWidth:0.5, flexDirection:'row', backgroundColor:'#FFFF',height:70}} >
          <Text  style={style.titlefiled}>Giá bán </Text>
                <TextInput keyboardType="numeric"  onChangeText={(text)=>{setpriceproduct(Number(isNaN(Number(text))) ? Number(text.replace(/,/g,'')): Number(text));}} style={[style.textinput, {width:reponsivewidth(280)}]}>{priceproduct>=0 ? priceproduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :Number(dataProduct?.Price_product).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TextInput>
          </View>
          {/* <View  style={{marginTop:30}}>
                <Text style={{fontSize:15, fontWeight:'bold',fontStyle:'italic'}}>Số Lượng </Text>
                <TextInput   onChangeText={(text)=>{setquanity(Number.parseInt(text,10));}}  keyboardType="numeric"
                 style={{marginTop:5,
                        width:150,
                        borderRadius:10,
                        height:50,
                        borderColor:'#D3D3D3',
                        borderWidth:3,
                        }}>{quanity1}</TextInput>
          </View> */}
          <View style={{ justifyContent:'center', alignItems:'center', borderBottomWidth:0.5,borderBottomColor:'#c3c3c3',borderTopColor:'#c3c3c3',borderTopWidth:0.5, flexDirection:'row', backgroundColor:'#FFFF',height:70}}>
                {console.log(dataProduct?.Quanity)}
                <Text style={style.titlefiled}>Số Lượng </Text>
                <TextInput onChangeText={(text)=>{setquanity(Number(text));}}  keyboardType="numeric"  style={[style.textinput, {width:reponsivewidth(280)}]}>{dataProduct?.Quanity}</TextInput>
          </View>
          {/* <View style={{marginTop:30, flexDirection:'row'}}>
         { imgopick ? <Image style={[style.img,{ width:reponsivewidth(150), height: reponsiveheight(150) }]} source={imgopick} /> : <Image style={[style.img,{ width:reponsivewidth(150), height: reponsiveheight(150) }]} source={{uri: img1}} />}
              <TouchableOpacity  style={{ height:50,justifyContent:'center', marginLeft:100,alignItems:'center',alignSelf:'center' }}onPress={()=>{Handlechoosephoto();}}>
                    <MaterialIcon name="add-a-photo" size={35} color="black" />
                    <Text>Add photo </Text>
              </TouchableOpacity>
          </View> */}
          </View>
          <View style={{alignItems:'center',
                        marginTop:5,
                        borderColor:'#D3D3D3',
                        borderWidth:3,
                        height:70,
                        justifyContent:'center',
                        backgroundColor:'#FFF'}}>
          <TouchableOpacity style={{alignItems:'center',
                                    backgroundColor:'#ff1414e8',
                                    width:150,borderRadius:80,
                                    flexDirection:'row',
                                    justifyContent:'center'}}
                                    onPress={()=>{update();}}>
              <Text style={{color:'#FFF',
                            alignSelf:'center',
                             fontSize:15,
                             fontWeight:'bold',
                             padding:5}}>Xác nhận</Text>
            </TouchableOpacity>
            </View>
            {/* <Provider >
                          <Portal >
                           <Dialog  visible={visible} onDismiss={hideDialog} style={{borderRadius:25, marginBottom:30}}>
                          <Dialog.Title style={{ justifyContent:'center',alignSelf:'center'}} >Chúc mừng</Dialog.Title>
                           <Dialog.Content style={{backgroundColor:'#FFF',justifyContent:'center',alignItems:'center'}}>
                              <Paragraph style={{fontSize:15}}>Bạn cập nhật thông tin thành công</Paragraph>
                          </Dialog.Content>
                          <Dialog.Actions style={{alignItems:'center',justifyContent:'center'}}>
                          <Button onPress={hideDialog}><Text style={{color:'#3399FF'}}>Thoát</Text></Button>
                          </Dialog.Actions>
                          </Dialog>
                          </Portal>
                          </Provider> */}
                    <Overlay isVisible={showChooseCate}>
                        <View style={{width:reponsivewidth(300), height: reponsiveheight(350)}}>
                    <View style={style.TitleOverlAdd}>
                        <Text style={{fontSize:18, textAlign: 'center', color:'#000000',paddingBottom:2, fontWeight:'700'}}>Chọn nhóm sản phẩm</Text>
                    </View>
                <View style={style.TitleOverlAdd_content}>
                <ScrollView style={{height:reponsiveheight(300)}}> 
                    { DataCate.length > 0 && DataCate.map(item=>{
                        return (
                            <TouchableOpacity 
                                onPress={()=>{  
                                setChooseCate(item);
                                setShowChooseCate(false)
                            } }
                                style={[style.btnChoosenAdd,{padding:15}]}><Text>{item.Name}</Text>
                             </TouchableOpacity>
                        )
                    })
 
                    
                    }       
                </ScrollView>  
                </View>

               </View>
               <TouchableOpacity style={[ style.btnExit,{alignItems:'center', alignSelf:'center'}]} onPress={()=>setShowChooseCate(false)}><Text style={{color:'#FFFF'}}>Thoát</Text></TouchableOpacity>
            </Overlay>
            <CustomNotification visible={visible} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  onCancel={()=>hideDialog() } Content="Bạn đã cập nhật thành công !"/>
        </View>
    );
};
export default UpdateProductScreen;
const style = StyleSheet.create({
    img:{
       
        
        marginLeft:10,
        borderRadius:35,
        width:reponsivewidth(105), 
        height: reponsiveheight(125),
        
    },
    Addphoto:
    {
        backgroundColor:'#848D99',
        borderRadius:15,
        width:reponsivewidth(105), 
        height: reponsiveheight(125),
        justifyContent:'center',
        marginLeft:35,
        alignItems:'center',
        alignSelf:'center',
    },
    Addphoto2:
    {
       
        borderRadius:15,
        width:reponsivewidth(105), 
        height: reponsiveheight(125),
        justifyContent:'center',
        marginLeft:35,
        alignItems:'center',
        alignSelf:'center',
    },
    titlefiled:{
       
        color:'black',
        fontSize:16,
        fontWeight:'bold',
        fontStyle:'italic',
        width:reponsivewidth(150),
        marginLeft:50,
        alignItems:'center',
    },
    textinput:
    {
       
        fontSize:16,
        // marginTop:5,
        // borderRadius:10,
        // height:50,
        // borderColor:'#D3D3D3',
        // borderWidth:3,
        backgroundColor:'#FFF',
        color:'black'
    },
    TitleOverlAdd_content:
    {
        marginTop:8,
    },
    btnChoosenAdd:
    {
        alignItems:'center',
        borderBottomColor: '#afaeae', 
        borderBottomWidth:0.5,
        borderTopColor:'#afaeae',
        borderTopWidth:0.5,
    
    },
    btnExit:
    {
        backgroundColor:'#226cb3',
        padding:10, 
        width:reponsivewidth(100), 
        justifyContent:'center', 
        alignItems:'center',
        borderRadius:4
    },
    TitleOverlAdd: 
    {
        borderBottomColor: "#02569E",
        borderBottomWidth:2,


    },
}
);
