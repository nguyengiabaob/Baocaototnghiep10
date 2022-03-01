/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Badge, Input, SearchBar, Tab, Text} from 'react-native-elements';
import IconTable from '../../asset/svg/Table.svg';
import {Table} from '../../Model/Table';
import {RoomParamList} from '../../navigation/types';
import data from '../../services/data';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
import Entypo from 'react-native-vector-icons/Entypo';
import {ModalHeader} from '../../Model/CustomModalHeader';
import {Overlay} from 'react-native-elements/dist/overlay/Overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Product} from '../../Model/product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomBoxItem from '../../Model/CustomBoxItem';
import {Button} from 'react-native-elements/dist/buttons/Button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import {CustomNotification} from '../../Model/CustomNofication';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import AuthService from '../../services/authService';
import DataService from '../../services/dataservice';
import ListMaterialView from '../Action/SupportComponent/ListMaterialView';

type props = {
  navigation: StackNavigationProp<RoomParamList, 'callingWater'>;
  route: RouteProp<RoomParamList, 'callingWater'>;
};
export const BookWater: React.FC<props> = ({route, navigation}: props) => {
  const [Table, setTable] = useState<Table>();
  const [flag, setflag] = useState<boolean>(false);
  const [visible, setvisible] = useState<boolean>(false);
  const [UpdateProductSelected, setupdateProducted] = useState<Product[]>([]);
  const [CodeBill, setcodeBill] = useState<string>('');
  const [CodeBillfact, setcodeBillfact] = useState<string>('');
  const [billproduct, setBillProduct] = useState<any>();
  const [visiblePaying, setvisiblePaying] = useState<any>();
  const {id} = route.params;
  const [AddError, setAddError] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [createrID, setCreaterID] = useState<string>();
  const [visibleSuccess, setvisibleSuccess] = useState<boolean>(false);
  const [visibleTurial, setVisibleTurial] = useState<boolean>(false);
  const [clickItem, setclickItem] = useState<any>();
  const fetchId = async () => {
    let a = await AuthService.getuserid();
    if (a != null) {
      setCreaterID(a);
    }
  };

  // const checkCodeBill= (code:string)=>{
  //     data.getdata('Bill').then(res=>{
  //         var datacode: any[]=[];
  //         for ( let key in res )
  //     {
  //         if (key != "0")
  //         {
  //             datacode.push({
  //                 id: key,
  //                 ...res[key],
  //             })
  //         }
  //     }
  //     datacode.forEach(item=> {
  //         if ( item.billID === `HD ${code}`)
  //         {
  //             checkCodeBill((Math.floor(Math.random()* (999999-1000))+1000).toString())
  //             return ;
  //         }
  //     })
  // })
  //     setcodeBill(code);
  // }
  const getTable = useCallback(async () => {
    let datarray = await DataService.Getdata_dtService<any>('Table');
    // let datarray :any[] = [];
    // data.getdata('Table').then(res=> {for ( let key in res)
    // {
    //     if (key !== '0')
    //     {
    //     datarray.push(
    //         {
    //             id: key,
    //             ...res[key],
    //         }
    //     );
    //     }
    // }
    datarray.forEach(item => {
      if (item.id === id) {
        setTable(item);
      }
    });
    // });
  }, [id]);
  useEffect(() => {
    getTable();
  }, [getTable]);
  const checktableBill = useCallback(async () => {
    setflag(false);
    let datarray = await DataService.Getdata_dtService<any>('Table');
    // data.getdata('Table').then(res=> {for ( let key in res)
    // {
    //     if (key !== '0')
    //     {
    //     datarray.push(
    //         {
    //             id: key,
    //             ...res[key],
    //         }
    //     );
    //     }
    // }
    let idtable = datarray.filter(item => item.id === id);
    // data.getdata('Bill').then(res => {
    //     var dataarrayBill: any [] = [];
    //     for (let key in res)
    //     {
    //         dataarrayBill.push({
    //             id: key,
    //             ...res[key],
    //         });
    //     }
    let dataarrayBill = await DataService.Getdata_dtService<any>('Bill');
    var billChooosen = dataarrayBill.filter(
      item => item.TableID === idtable[0].id && item.Status === 0,
    );
    console.log('billchoosen', billChooosen);
    if (billChooosen.length > 0) {
      setcodeBillfact('');
      let billID: any;
      billChooosen.forEach(item => {
        setcodeBill(item.id);
        billID = item.id;
      });
      // data.getdata('ListProduct').then(res=> {
      //     var arraylist: any[]=[];
      //     for (let key in res)
      //     {
      //             arraylist.push(
      //                 {
      //                     id: key,
      //                     ...res[key]
      //                 }
      //             );
      //     }
      let arraylist = await DataService.Getdata_dtService<any>('ListProduct');
      var arrayb = arraylist.filter(item => item.billID === billID);
      console.log('arrayb', arrayb);
      var a = await DataService.Getdata_dtService<any>('Products');
      // data.getdata('Products').then(res=> {
      //     var a: any[] =[];
      //     for(  let key in res)
      // {
      //     a.push(
      //         {
      //             id: key,
      //             ...res[key],
      //         }
      //     );
      // }
      console.log('a', a);
      var arrrayProductNews: any[] = [];
      a.forEach(item => {
        console.log('item', item);
        arrayb.forEach(i => {
          if (i.productID === item.id) {
            item.Quanity = i.Number;
            console.log(item);
            // setupdateProducted(prev=>prev.concat(...item));
            arrrayProductNews.push(item);
          }
        });
      });
      console.log('ttt', arrrayProductNews);
      setupdateProducted(arrrayProductNews);
      // });
      // });
    } else {
      var code = (
        Math.floor(Math.random() * (999999 - 1000)) + 1000
      ).toString();
      var billChooosen = dataarrayBill.filter(
        item => item.billID === `HD ${code}`,
      );
      if (billChooosen.length == 0) {
        setcodeBillfact(`HD ${code}`);
      }
    }
    // });

    // });
  }, [id]);
  const [dataproduct, setdataproduct] = useState<Product[]>([]);
  const [datatable, setdatatable] = useState<Table[]>([]);
  const getdataproduct = () => {
    var dataarray: any[] = [];
    data.getdata('Products').then(res => {
      for (let key in res) {
        if (key != '0') {
          dataarray.push({
            id: key,
            ...res[key],
          });
        }
      }
      setdataproduct(dataarray);
    });
  };
  const getdatatable = () => {
    var dataarray: any[] = [];
    data.getdata('Table').then(res => {
      for (let key in res) {
        if (key != '0') {
          dataarray.push({
            id: key,
            ...res[key],
          });
        }
      }
      setdatatable(dataarray);
    });
  };
  useEffect(() => {
    getdataproduct();
    getdatatable();
  }, []);
  useEffect(() => {
    if (isFocused === true) {
      checktableBill();
    }
  }, [isFocused, checktableBill]);
  useEffect(() => {
    if (flag === true) {
      checktableBill();
    }
  }, [checktableBill, flag]);
  const DeleteProduct = (productid: string) => {
    if (UpdateProductSelected.length > 0) {
      setupdateProducted(prev => prev.filter(item => item.id !== productid));
    }
  };
  const saveListProduct = async (ProductArray: any[]) => {
    var check = false;
    console.log('789456', ProductArray);
    if (ProductArray.length > 0) {
      var check = false;
      if (CodeBillfact !== '') {
        let total = 0;
        ProductArray.forEach(item => {
          total += item.Quanity * item.Price_product;
        });
        await data
          .PostBill(
            total,
            CodeBillfact,
            createrID ? createrID : '',
            0,
            new Date(),
            id,
          )
          .then(async () => {
            // data.getdata('Bill').then(res=> {
            //     var arrayBill: any[]=[];
            //     for (let key in res)
            //     {
            //             arrayBill.push(
            //                 {
            //                     id: key,
            //                     ...res[key]
            //                 }
            //             );
            //     }
            let arrayBill = await DataService.Getdata_dtService<any>('Bill');
            let a = arrayBill.filter(
              item => item.TableID === id && item.Status == 0,
            );
            datatable.forEach(item => {
              if (item.id === id) {
                data
                  .UpdateTable(item.Name, item.id, item.Type, item.Slots, 1)
                  .catch(() => {
                    check = true;
                  });
              }
            });
            ProductArray.forEach(item => {
              data
                .PostListProduct(item.id, a[0].id, item.Quanity, new Date())
                .then(res => {
                  if (res === true) console.log('Product Posted');
                })
                .catch(() => {
                  check = true;
                });
            });
            // data.getdata("Products").then(res=>{
            //     let datapro: any[] =[];
            //     for (let key in res)
            //     {
            //         if( key != "0")
            //         {
            //             datapro.push({
            //                 id:key,
            //                 ...res[key]
            //             });
            //         }

            //     }
            let datapro = await DataService.Getdata_dtService<any>('Products');
            ProductArray.forEach(item => {
              datapro.forEach(i => {
                if (i.id == item.id) {
                  let quanity = Number(i.Quanity) - Number(item.Quanity);
                  console.log('array', [
                    item.id,
                    i.name_product,
                    item.Price_product,
                    quanity,
                    i.Image,
                    i.CatergoryID,
                  ]);

                  data
                    .updatedataproduct(
                      'Products',
                      item.id,
                      i.name_product,
                      item.Price_product,
                      quanity,
                      i.Image,
                      i.CatergoryID,
                      item.ListMaterial,
                    )
                    .catch(() => {
                      check = true;
                    });
                }
              });
            });
            // });

            // });
            setupdateProducted([]);
            setflag(true);
            if (check == false) {
              setvisibleSuccess(true);
            }
          })

          .catch(() => {
            check = true;
          });
      } else {
        if (CodeBill !== '') {
          console.log('456');
          // data.getdata('ListProduct').then(res=> {
          //     var arraylist: any[]=[];
          //     for (let key in res)
          //     {
          //             arraylist.push(
          //                 {
          //                     id: key,
          //                     ...res[key]
          //                 }
          //             );
          //     }
          var arraylist = await DataService.Getdata_dtService<any>(
            'ListProduct',
          );
          arraylist.forEach(item => {
            ProductArray.forEach(i => {
              if (i.id === item.productID && item.billID == CodeBill) {
                data
                  .UpdateListProduct(
                    item.id,
                    item.productID,
                    CodeBill,
                    i.Quanity,
                    new Date(),
                  )
                  .then(res => {
                    if (res === true) {
                      console.log('update Product');
                    }
                  });
              }
            });
          });
          // data.getdata("Products").then(res=>{
          // let datapro: any[] =[];
          // for(let key in res)
          // {
          //     if( key != "0")
          //     {
          //         datapro.push({
          //             id:key,
          //             ...res[key]
          //         });
          //     }

          // }
          let datapro1 = await DataService.Getdata_dtService<any>('Products');
          arraylist.forEach(item => {
            ProductArray.forEach(i => {
              if (i.id === item.productID && item.billID == CodeBill) {
                datapro1.forEach(j => {
                  if (i.id == j.id) {
                    let quanity =
                      Number(j.Quanity) -
                      (Number(i.Quanity) - Number(item.Number));
                    data.updatedataproduct(
                      'Products',
                      j.id,
                      j.name_product,
                      j.Price_product,
                      quanity,
                      j.Image,
                      j.CatergoryID,
                      j.ListMaterial,
                    );
                  }
                });
              }
            });
          });

          // });
          // let countadd= 0;
          ProductArray.forEach(item => {
            if (
              arraylist.filter(
                i => i.productID === item.id && i.billID === CodeBill,
              ).length == 0
            ) {
              data
                .PostListProduct(item.id, CodeBill, item.Quanity, new Date())
                .then(res => {
                  if (res === true) {
                    console.log('Post Product');
                  }
                });
              // countadd ++;
            }
          });
          // data.getdata("Products").then(res=>{
          //     let datapro: any[] =[];
          //    for(let key in res)
          //     {
          //         if( key != "0")
          //         {
          //             datapro.push({
          //                 id:key,
          //                 ...res[key]
          //             });
          //         }

          //     }

          ProductArray.forEach(item => {
            if (
              arraylist.filter(
                i => i.productID === item.id && i.billID === CodeBill,
              ).length == 0
            ) {
              datapro1.forEach(i => {
                if (item.id == i.id) {
                  let quanity = Number(i.Quanity) - Number(item.Quanity);
                  data.updatedataproduct(
                    'Products',
                    i.id,
                    i.name_product,
                    item.Price_product,
                    quanity,
                    i.Image,
                    i.CatergoryID,
                    i.ListMaterial,
                  );
                }
              });
            }
          });
          // });

          let count = 0;
          arraylist.forEach(item => {
            if (
              item.billID == CodeBill &&
              ProductArray.filter(i => i.id === item.productID).length === 0
            ) {
              data.DeleteListProduct(item.id);
              count++;
            }
          });
          //  if(ProductArray.length==0)
          //  {
          //     datatable.forEach(item=>{
          //         if(item.id === id)
          //         {
          //             data.UpdateTable(item.Name, item.id,item.Type,item.Slots,0);
          //         }
          //     })
          //    data.deletedData("Bill",CodeBill);
          //  }
          //  data.getdata("Products").then(res=>{
          //     let datapro: any[] =[];
          //      for(let key in res)
          //      {
          //          if( key != "0")
          //          {
          //              datapro.push({
          //                  id:key,
          //                  ...res[key]
          //              });
          //          }

          //      }
          let datapro = await DataService.Getdata_dtService<any>('Products');
          arraylist.forEach(item => {
            if (
              item.billID == CodeBill &&
              ProductArray.filter(i => i.id === item.productID).length === 0
            ) {
              datapro.forEach(i => {
                if (i.id == item.productID) {
                  let quanity = Number(i.Quanity) + Number(item.Number);
                  data.updatedataproduct(
                    'Products',
                    i.id,
                    i.name_product,
                    i.Price_product,
                    quanity,
                    i.Image,
                    i.CatergoryID,
                    i.ListMaterial,
                  );
                }
              });
            }
          });
          //  });

          setupdateProducted([]);
          setflag(true);
          if (check == false) {
            setvisibleSuccess(true);
          }
          // });
        }
      }
    } else {
      datatable.forEach(item => {
        if (item.id === id) {
          data.UpdateTable(item.Name, item.id, item.Type, item.Slots, 0);
        }
      });
      data.deletedData('Bill', CodeBill);
      if (check == false) {
        setvisibleSuccess(true);
      }
    }
  };
  const Arraycatergory = [
    {
      id: '-1',
      Name: 'Tất cả',
    },
  ];
  //component ChoosenWater
  type propsModalChoosenWater = {
    codeBill: string;
    getdataproductSelected: (data: any[]) => void;
    NewsProducted: Product[];
  };
  const ModalChoosenWater: React.FC<propsModalChoosenWater> = ({
    getdataproductSelected,
    NewsProducted,
    codeBill,
  }) => {
    const [visibleSearch, setvisibleSearch] = useState<boolean>(false);
    const [Search, setSearch] = useState<string>('');
    const [CatergorySelected, setcatergoryselected] = useState<string>('-1');
    const [Product, setProduct] = useState<Product[]>([]);
    const [Productseach, setProductsearch] = useState<Product[]>([]);
    const [visbleDetail, setvisibleDetail] = useState<boolean>(false);
    const [valueQuality1, setvaluequality1] = useState<string>('');
    const [ProductSelected, setproductSelected] = useState<Product>();
    const [productSelecteddetail, setarrayproductSelecteddetail] =
      useState<Product>();
    const [arrayproductSelected, setarrayproductSelected] = useState<Product[]>(
      [],
    );
    const [numberChoosen, setnumberChoosen] = useState<number>(0);
    const [bill, setbill] = useState<any>([]);
    const [Catergory, setcatergory] = useState<any[]>();
    const [Productbefore, setProductbefore] = useState<any[]>();
    const isFocused = useIsFocused();
    const getcatergory = async () => {
      let datarray = await DataService.Getdata_dtService<any>('Catergory');
      setcatergory(datarray);
      // data.getdata('Catergory').then(res=> {

      // for ( let key in res)
      // {
      //     if (key !== '0')
      //     {
      //     datarray.push(
      //         {
      //             id: key,
      //             ...res[key],
      //         }
      //     );
      //     }
      // }
      // setcatergory(datarray);
      // })
    };
    const getProduct = async () => {
      let arrayproduct = await DataService.Getdata_dtService<any>('Products');

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
      setProduct(arrayproduct);
      setProductbefore(arrayproduct);
      // });
    };
    const getbill = useCallback(() => {
      data.getdata('Bill').then(res => {
        console.log(res);
        for (let key in res) {
          if (key !== '0') {
            if (key == codeBill) {
              setbill({id: key, ...res[key]});
            }
          }
        }
      });
    }, [codeBill]);
    useEffect(() => {
      getcatergory();
    }, []);
    useEffect(() => {
      getProduct();
      getbill();
    }, [getbill]);
    useEffect(() => {
      if (CatergorySelected == '' || CatergorySelected == '-1') {
        if (Productbefore) setProduct(Productbefore);
      } else {
        if (Productbefore) {
          setProduct(
            Productbefore?.filter(
              item => item.CatergoryID == CatergorySelected,
            ),
          );
        }
      }
    }, [CatergorySelected, Productbefore]);
    useEffect(() => {
      if (isFocused === true && productSelecteddetail) {
        console.log('Them nuoc');
        setarrayproductSelected(prev => prev.concat(productSelecteddetail));
        if (NewsProducted.length > 0) {
          let flag = 0;
          NewsProducted.forEach(item => {
            if (item.id === productSelecteddetail.id) {
              console.log('cong');
              item.Quanity += productSelecteddetail.Quanity;
              flag = 1;
            }
          });
          if (flag === 0) {
            console.log('push');
            NewsProducted.push(productSelecteddetail);
          }
        } else {
          setnumberChoosen(prev => prev + 1);
        }
      }
      if (isFocused === true) {
        if (NewsProducted.length > 0) {
          setnumberChoosen(NewsProducted.length);
        }
      }
    }, [isFocused, productSelecteddetail, NewsProducted]);

    const searchProduct = useCallback(
      (value: string) => {
        if (Product.length > 0) {
          console.log();
          if (
            Product.filter(item =>
              item.name_product.toLowerCase().search(value.toLowerCase()),
            ).length > 0
          ) {
            setProductsearch(
              Product.filter(item => item.name_product.includes(value)),
            );
          } else {
            setProductsearch([]);
          }
        }
      },
      [Product],
    );
    useEffect(() => {
      searchProduct(Search);
    }, [Search, searchProduct]);

    //Component BookWaterDetail
    type propsdetail = {
      // getdata: (data:any)=>void;
      getarrayproduct: (data: any) => void;
      ProductSelected?: Product;
      codeBill: any;
    };
    const BookWaterDetail: React.FC<propsdetail> = ({
      getdata,
      ProductSelected,
      getarrayproduct,
      codeBill,
    }) => {
      const [valueQuality, setvaluequality] = useState<number>(1);
      return (
        <View
          style={{
            width: getwidth(),
            height: getheight(),
            flex: 1,
            marginTop: -9.5,
            backgroundColor: '#e7e7e7',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 18,
              backgroundColor: '#67bff3',
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
                width: reponsivewidth(50),
              }}>
              <TouchableOpacity onPress={() => setvisibleDetail(false)}>
                <MaterialIcons name="clear" size={28} color="#efefef" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                width: reponsivewidth(250),
                textAlign: 'center',
              }}>
              {' '}
              {codeBill.billID}
            </Text>
            <View
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
                width: reponsivewidth(50),
              }}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}
                onPress={() => {
                  if (ProductSelected) {
                    ProductSelected.Quanity = valueQuality;
                    getarrayproduct(ProductSelected);
                  }
                  setvisibleDetail(false);
                }}>
                <Text style={{color: '#FFFF', fontWeight: '700', fontSize: 16}}>
                  Xong
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFF',
              padding: 25,
            }}>
            <Image
              style={{width: reponsivewidth(80), height: reponsiveheight(80)}}
              source={{uri: ProductSelected?.Image}}
            />
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 16, fontWeight: '700', marginBottom: 15}}>
                {ProductSelected?.name_product}
              </Text>
              <Text style={{color: '#67bff3', fontWeight: '700'}}>
                {ProductSelected?.Price_product.toString().replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 35,
              backgroundColor: '#FFFF',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                borderBottomColor: '#c9c9c9',
                borderBottomWidth: 0.75,
              }}>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  width: reponsivewidth(260),
                  fontSize: 16,
                }}>
                Giá bán
              </Text>
              <Text
                style={{
                  justifyContent: 'flex-end',
                  backgroundColor: '#e7e7e7',
                  paddingRight: 25,
                  paddingLeft: 25,
                  paddingBottom: 10,
                  paddingTop: 10,
                  borderRadius: 5,
                  fontWeight: '700',
                }}>
                {ProductSelected
                  ? ProductSelected.Price_product.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    )
                  : 0}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  width: reponsivewidth(170),
                  fontSize: 16,
                }}>
                Số lượng
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: reponsivewidth(200),
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: reponsivewidth(60),
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (valueQuality <= 98) {
                        setvaluequality(prev => prev + 1);
                      }
                    }}>
                    <Ionicons name="add" size={30} />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    justifyContent: 'flex-end',
                    backgroundColor: '#e7e7e7',
                    borderRadius: 5,
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingBottom: 5,
                    paddingTop: 5,
                    fontSize: 16,
                    width: reponsivewidth(50),
                    textAlign: 'center',
                  }}>
                  {valueQuality}
                </Text>
                <View
                  style={{
                    width: reponsivewidth(60),
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (valueQuality >= 2) {
                        setvaluequality(prev => prev - 1);
                      }
                    }}
                    style={{justifyContent: 'flex-end'}}>
                    <AntDesign name="minus" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 40, padding: 5, backgroundColor: '#FFFF'}}>
            <TextInput
              placeholder="Ghi chú"
              style={{padding: 10, fontSize: 16}}
            />
          </View>
          <View style={{marginTop: 40, padding: 20, backgroundColor: '#FFFF'}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  width: reponsivewidth(280),
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Thành Tiền
              </Text>
              <Text style={{fontSize: 17}}>
                {ProductSelected
                  ? (ProductSelected.Price_product * valueQuality)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 0}
              </Text>
            </View>
          </View>
        </View>
      );
    };

    //Component BookWaterDetail
    return (
      <View
        style={{
          width: getwidth(),
          height: getheight(),
          flex: 1,
          marginTop: -9.5,
        }}>
        {console.log(valueQuality1)}
        {console.log(Catergory)}
        {console.log('arrauproductSelected', arrayproductSelected)}
        <View style={{backgroundColor: '#67bff3'}}>
          {visibleSearch === false ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 18,
              }}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  justifyContent: 'flex-start',
                  width: reponsivewidth(50),
                }}>
                <TouchableOpacity onPress={() => setvisible(false)}>
                  <MaterialIcons name="clear" size={28} color="#efefef" />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  width: reponsivewidth(250),
                  textAlign: 'center',
                  fontWeight: '700',
                }}>
                {' '}
                {bill?.billID}
              </Text>
              <View
                style={{
                  alignSelf: 'flex-start',
                  justifyContent: 'flex-start',
                  width: reponsivewidth(50),
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}
                  onPress={() => {
                    setvisibleSearch(true);
                  }}>
                  <EvilIcons name="search" size={28} color="#efefef" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 5,
              }}>
              <SearchBar
                lightTheme={true}
                containerStyle={{
                  width: reponsivewidth(300),
                  height: reponsiveheight(55),
                  borderRadius: 5,
                }}
                inputContainerStyle={{height: reponsiveheight(30)}}
                onChange={e => {
                  setSearch(e.nativeEvent.text);
                }}
                placeholder="Nhập tên nước..."
                value={Search}
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
                  }}
                  onPress={() => setvisibleSearch(false)}>
                  <Text
                    style={{fontSize: 16, color: '#efefef', fontWeight: '700'}}>
                    Hủy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View>
          {Catergory && (
            <FlatList
              style={{backgroundColor: '#529ac5'}}
              scrollEnabled={true}
              horizontal
              data={[...Arraycatergory, ...Catergory]}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => setcatergoryselected(item.id)}
                    style={{
                      padding: 10,
                      borderBottomColor:
                        CatergorySelected === item.id ? '#7ec2eb' : undefined,
                      borderBottomWidth: CatergorySelected === item.id ? 5 : 0,
                    }}>
                    <Text
                      style={{
                        color:
                          CatergorySelected === item.id ? '#FFFF' : '#363636',
                        fontSize: 15,
                      }}>
                      {item.Name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>

        <View style={{marginTop: 15}}>
          {console.log(Product.length)}
          <ScrollView style={{height: reponsiveheight(620)}}>
            {Productseach.length > 0
              ? Productseach.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setproductSelected(item);
                        setvisibleDetail(true);
                      }}
                      style={{
                        flexDirection: 'row',
                        borderBottomColor: '#c1c1c1',
                        borderBottomWidth: 0.75,
                        alignItems: 'center',
                        padding: 15,
                      }}>
                      <Image
                        style={{
                          width: reponsivewidth(80),
                          height: reponsiveheight(80),
                        }}
                        source={{uri: item.Image}}
                      />
                      <View style={{marginLeft: 50}}>
                        <Text
                          style={{
                            marginBottom: 15,
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {item.name_product}
                        </Text>
                        <Text style={{marginBottom: -10}}>
                          Giá:{' '}
                          {item.Price_product.toString().replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ',',
                          )}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : Product.length > 0 &&
                Product.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setproductSelected(item);
                        setvisibleDetail(true);
                      }}
                      style={{
                        flexDirection: 'row',
                        borderBottomColor: '#c1c1c1',
                        borderBottomWidth: 0.75,
                        alignItems: 'center',
                        padding: 15,
                      }}>
                      <Image
                        style={{
                          width: reponsivewidth(80),
                          height: reponsiveheight(80),
                        }}
                        source={{uri: item.Image}}
                      />
                      <View style={{marginLeft: 50}}>
                        <Text
                          style={{
                            marginBottom: 15,
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          {item.name_product}
                        </Text>
                        <Text style={{marginBottom: -10}}>
                          Giá:{' '}
                          {item.Price_product.toString().replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ',',
                          )}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: reponsiveheight(80),
            backgroundColor: '#67bff3',
          }}>
          {/* <View style={{alignSelf:'center', justifyContent:'flex-start',width:reponsivewidth(250), marginLeft:25,}}>
                 <TouchableOpacity style={{flexDirection:'row'}}><MaterialIcons style={{marginRight:5}} name="refresh" size={25} color={'#FFFF'}/><Text style={{color:'#FFFF'}}>Chọn lại</Text></TouchableOpacity>
             </View> */}
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center',
              width: reponsivewidth(360),
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFFF',
                marginRight: 15,
                fontWeight: '700',
              }}>
              {numberChoosen}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (NewsProducted.length > 0) {
                  getdataproductSelected(NewsProducted);
                } else {
                  getdataproductSelected(arrayproductSelected);
                }
                setvisible(false);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#FFFF'}}>Xong</Text>
              <MaterialIcons
                style={{marginRight: 5}}
                size={25}
                color={'#FFFF'}
                name="navigate-next"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Overlay isVisible={visbleDetail}>
          <BookWaterDetail
            ProductSelected={ProductSelected}
            getarrayproduct={setarrayproductSelecteddetail}
            codeBill={bill}
          />
        </Overlay>
      </View>
    );
  };

  type propspaying = {
    ListProduct: any[];
    BillCode: string;
    getvisible: (data: any) => void;
  };
  const ShowPaying: React.FC<propspaying> = ({
    ListProduct,
    BillCode,
    getvisible,
  }) => {
    const [FinishPaying, setFinishPaying] = useState<boolean>(false);
    const [CustomerMoney, setCustomerMoney] = useState<number>(0);
    const [databill, setdatabill] = useState<any>();
    const [showError, setShowError] = useState<boolean>(false);
    const [showSuccess, setShowsuccess] = useState<boolean>(false);
    const [changeMoney, setchangeMoney] = useState<Number>(0);
    const [createID, setcreateID] = useState<string>('');
    const fetchId = async () => {
      let a = await AuthService.getuserid();
      if (a != null) {
        setcreateID(a);
      }
    };
    const getDataBill = useCallback(() => {
      data.getdata('Bill').then(res => {
        console.log(res);
        for (let key in res) {
          if (key !== '0') {
            if (key == BillCode) {
              setdatabill({id: key, ...res[key]});
            }
          }
        }
      });
    }, [BillCode]);
    const total = () => {
      let sum = 0;
      if (ListProduct.length > 0) {
        ListProduct.forEach(item => {
          sum += item.Quanity * item.Price_product;
        });
      }
      return sum;
    };
    useEffect(() => {
      getDataBill();
      fetchId();
    }, [getDataBill]);
    const CaculateMoney = async () => {
      if (CustomerMoney >= Number(total())) {
        setchangeMoney(CustomerMoney - Number(total()));
        console.log('update Status');
        databill.Status = 1;
        let datatable = await DataService.Getdata_dtService<any>('Table');
        // data.getdata('Table').then(res => {
        //     console.log(res);
        //     for ( let key in res)
        //     {

        //         if(key!="0")
        //         {
        //             datatable.push({
        //                 id: key,
        //                 ...res[key]
        //             })
        //         }
        //     }
        datatable.forEach(item => {
          if (item.id == databill.TableID) {
            data.UpdateTable(
              item.Name,
              databill.TableID,
              item.Type,
              item.Slots,
              0,
            );
          }
        });
        // });
        data
          .UpdateBill(
            databill.id,
            Number(total()),
            databill.billID,
            createID,
            1,
            databill.TableID,
            databill.CreateDate,
          )
          .then(res => {
            if (res === true) {
              setFinishPaying(true);
              setShowsuccess(true);
            }
          });
      }
    };
    return (
      <View
        style={{
          width: getwidth(),
          height: getheight(),
          flex: 1,
          marginTop: -10.5,
        }}>
        {console.log(databill)}
        {console.log('id', createID)}
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
              <TouchableOpacity onPress={() => setvisiblePaying(false)}>
                <MaterialIcons name="arrow-back" size={28} color="#efefef" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                width: reponsivewidth(100),
                textAlign: 'center',
                color: '#FFFF',
                fontWeight: '700',
              }}>
              Thanh toán
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 25,
                paddingTop: 25,
                paddingLeft: 10,
                paddingRight: 10,
                borderBottomColor: '#d6d6d6',
                borderBottomWidth: 1,
              }}>
              <Text style={{fontSize: 18, marginLeft: 10}}>Mã hóa đơn</Text>
              <View
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  width: reponsivewidth(240),
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  {databill?.billID}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 25,
                paddingTop: 25,
                paddingLeft: 10,
                paddingRight: 10,
                borderBottomColor: '#d6d6d6',
                borderBottomWidth: 1,
              }}>
              <Text style={{fontSize: 18, marginLeft: 10}}>Phương thức</Text>
              <View
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  width: reponsivewidth(240),
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  Tiền Mặt
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 25,
                paddingTop: 25,
                paddingLeft: 10,
                paddingRight: 10,
                borderBottomColor: '#d6d6d6',
                borderBottomWidth: 1,
              }}>
              <Text style={{fontSize: 18, marginLeft: 10}}>Tổng Tiền</Text>
              <View
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  width: reponsivewidth(270),
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  {isNaN(Number(databill?.Total))
                    ? 0
                    : Number(total())
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 25,
                paddingTop: 25,
                paddingLeft: 10,
                paddingRight: 10,
                borderBottomColor: '#d6d6d6',
                borderBottomWidth: 1,
              }}>
              <Text style={{fontSize: 18, marginLeft: 10}}>Khách cần trả</Text>
              <View
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  width: reponsivewidth(240),
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  {isNaN(Number(databill?.Total))
                    ? 0
                    : Number(total())
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 25,
                paddingTop: 25,
                paddingLeft: 10,
                paddingRight: 10,
                borderBottomColor: '#d6d6d6',
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  width: reponsivewidth(240),
                }}>
                Tiền khách Đưa
              </Text>
              {FinishPaying === false ? (
                <View
                  style={{
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    width: reponsivewidth(130),
                    height: reponsiveheight(30),
                    marginTop: 15,
                    marginBottom: -15,
                  }}>
                  <Input
                    onChangeText={text => {
                      let t = '15,000,000';
                      console.log(Number(t.replace(/,/g, '')));
                      setCustomerMoney(
                        Number(isNaN(Number(text)))
                          ? Number(text.replace(/,/g, ''))
                          : Number(text),
                      );
                    }}
                    inputStyle={{textAlign: 'center'}}
                    keyboardType={'numeric'}
                    style={{
                      fontSize: 18,
                      alignSelf: 'flex-end',
                      justifyContent: 'flex-end',
                    }}
                    autoCompleteType={undefined}>
                    {CustomerMoney.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    )}
                  </Input>
                </View>
              ) : (
                <View
                  style={{
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                    width: reponsivewidth(120),
                    height: reponsiveheight(30),
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    {CustomerMoney.toString().replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ',',
                    )}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 25,
                paddingTop: 25,
                paddingLeft: 10,
                paddingRight: 10,
                borderBottomColor: '#d6d6d6',
                borderBottomWidth: 1,
              }}>
              <Text style={{fontSize: 18, marginLeft: 10}}>
                Tiền thừa của khách
              </Text>
              <View
                style={{
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-end',
                  width: reponsivewidth(188),
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    alignSelf: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  {changeMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: '#67bff3'}}>
          <TouchableOpacity
            disabled={FinishPaying == true ? true : false}
            onPress={() => {
              CaculateMoney();
            }}
            style={{padding: 18}}>
            <Text
              style={{
                color: '#FFFF',
                fontWeight: '700',
                textAlign: 'center',
                fontSize: 18,
              }}>
              Hoàn Thành
            </Text>
          </TouchableOpacity>
        </View>
        <CustomNotification
          visible={showSuccess}
          iconTitle={
            <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
          }
          title="Thông báo"
          onCancel={() => {
            setShowsuccess(false);
            getvisible(false);
            navigation.goBack();
          }}
          Content="Bạn đã thanh toán thành công !"
        />
        <CustomNotification
          visible={showError}
          iconTitle={
            <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
          }
          title="Thông báo"
          onCancel={() => setShowError(false)}
          Content=" Số tiền không đủ thanh toán xin vui lòng nhập lại"
        />
      </View>
    );
  };

  //Component BookWater
  return (
    <View style={{flex: 1}}>
      {console.log('codeBill', CodeBill)}
      {console.log('UpdateProductselected', UpdateProductSelected)}
      <View
        style={[{marginTop: 15, backgroundColor: '#FFFF'}, styles.shadowNames]}>
        <View
          style={[{alignItems: 'center', flexDirection: 'row', padding: 12}]}>
          <View style={{marginLeft: 15}}>
            <IconTable
              width={reponsivewidth(100)}
              height={reponsiveheight(100)}
            />
            <Badge
              badgeStyle={{
                width: reponsivewidth(11),
                height: reponsiveheight(11),
              }}
              status="success"
              containerStyle={{position: 'absolute', bottom: 0, right: 15}}
            />
          </View>
          <View>
            <Text
              style={{
                marginLeft: 35,
                fontSize: 16,
                fontWeight: '700',
                marginBottom: 25,
              }}>
              {Table?.Name}
            </Text>
            <View
              style={{
                alignSelf: 'flex-end',
                justifyContent: 'flex-end',
                marginLeft: 20,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setvisible(true);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#226cb3',
                  padding: 8,
                  borderRadius: 5,
                }}>
                <Entypo name="add-to-list" size={20} color={'#FFFF'} />
                <Text style={{color: '#FFFF'}}>Thêm nước</Text>
              </TouchableOpacity>
              {UpdateProductSelected.length > 0 && CodeBill !== '' ? (
                <TouchableOpacity
                  onPress={() => {
                    setvisiblePaying(true);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#e86b6b',
                    padding: 8,
                    borderRadius: 5,
                    marginLeft: 10,
                  }}>
                  <FontAwesome5
                    name="money-check-alt"
                    size={15}
                    color={'#FFFF'}
                  />
                  <Text style={{color: '#FFFF'}}>Thanh Toán</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={true}
                  onPress={() => {
                    setvisible(true);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#c9c9c9',
                    padding: 8,
                    borderRadius: 5,
                    marginLeft: 10,
                  }}>
                  <FontAwesome5
                    name="money-check-alt"
                    size={15}
                    color={'#FFFF'}
                  />
                  <Text style={{color: '#FFFF'}}>Thanh Toán</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop: 10}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#02569E',
            padding: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#FFFF'}}>
            Danh sách nước
          </Text>
        </View>
        <ScrollView style={{height: reponsiveheight(430)}}>
          {UpdateProductSelected.length > 0
            ? UpdateProductSelected.map(item => {
                console.log(item);
                return (
                  <View
                    style={{
                      backgroundColor: '#FFFFF',
                      flexDirection: 'row',
                      padding: 10,
                      borderBottomColor: '#d6d6d6',
                      borderBottomWidth: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setclickItem(item);
                        setVisibleTurial(true);
                      }}
                      style={{
                        width: reponsivewidth(80),
                        height: reponsiveheight(80),
                      }}>
                      <Image
                        style={{
                          width: reponsivewidth(80),
                          height: reponsiveheight(80),
                        }}
                        source={{uri: item.Image}}
                      />
                    </TouchableOpacity>
                    <View style={{marginLeft: 15, width: reponsivewidth(150)}}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '700',
                          marginBottom: 15,
                        }}>
                        {item.name_product}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 15}}>
                          {' '}
                          Số lượng {item.Quanity}
                        </Text>
                        <Text>
                          {' '}
                          Giá :{' '}
                          {item.Price_product.toString().replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ',',
                          )}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        width: reponsivewidth(110),
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          DeleteProduct(item.id);
                        }}>
                        <MaterialIcons
                          name="delete"
                          size={32}
                          color={'#999999'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            : undefined}
        </ScrollView>
        <ListMaterialView
          List={clickItem?.ListMaterial}
          visible={visibleTurial}
          onCancel={setVisibleTurial}
        />
        <View>
          <TouchableOpacity
            onPress={() => {
              let flag1 = 0;

              dataproduct.forEach(item => {
                UpdateProductSelected.forEach(i => {
                  if (item.Quanity < i.Quanity && i.id == item.id) {
                    setAddError(true);
                    flag1 = 1;
                  }
                });
              });

              if (flag1 == 0) {
                setflag(false);
                saveListProduct(UpdateProductSelected);
              }
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
        <View>
          {visible === true ? (
            <Overlay isVisible={visible}>
              <ModalChoosenWater
                getdataproductSelected={setupdateProducted}
                NewsProducted={UpdateProductSelected}
                codeBill={CodeBill}
              />
            </Overlay>
          ) : (
            visiblePaying === true && (
              <Overlay isVisible={visiblePaying}>
                <ShowPaying
                  ListProduct={UpdateProductSelected}
                  BillCode={CodeBill}
                  getvisible={setvisiblePaying}
                />
              </Overlay>
            )
          )}
        </View>
      </View>
      <CustomNotification
        visible={visibleSuccess}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => {
          setvisibleSuccess(false);
        }}
        Content="Bạn đã lưu thành công !"
      />
      <CustomNotification
        visible={AddError}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => {
          setAddError(false);
        }}
        Content="Xin vui lòng nhập lại"
      />
    </View>
  );
};
const styles = StyleSheet.create({
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
