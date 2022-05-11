/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View,ScrollView, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Overlay, SearchBar, Text } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import data from '../../services/data';
import { getheight, getwidth, reponsiveheight, reponsivewidth } from '../../theme/Metric';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomNotificationDel } from '../../Model/CustomNoficationDel';
import BellNofi from '../../asset/svg/bellnotification.svg';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database';
import CustomHyperLink from '../../Model/CustomHyperLink';
import HistoryPayingDetail from './HistoryPayingDetail';
import Loading from '../../Helper/Loader/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomNotification } from '../../Model/CustomNofication';
type props ={
    getvisible: (data: any)=>void
}
export const HistoryPaying: React.FC<props> = ({getvisible})=> {

    const [datapaying,setdatapaying] = useState<any[]>([]);
    const [visbleModalDel,setvisibleModalDel] = useState<boolean>(false);
    const [itemSelected,setitemSelectedl] = useState<any>();
    const [reload,setReload] = useState<boolean>(false);
    const [detail, setDetail] = useState<boolean>(false);
    const [idclick, setidclick] = useState<any>();
    const [loading,setLoading] = useState<boolean>(false);
    const [showSearch,setShowSearch] = useState<boolean>(false);
    const [valueSearch,setValueSearch]= useState<string>('');
    const [dataSearch,setDataSearch]= useState<any>([])
    const [Suscces,setSuccess] = useState<boolean>(false);
    const tranferday = (d:string)=>{
        var month = new Date(d).getMonth() + 1;
        var date = new Date(d).getDate();
        var year = new Date(d).getFullYear();
       return date + '/' + month + '/' + year;
    };
    useEffect(()=>{
        database().ref('/Bill').on('value', ()=>{
            getPaying();
        });
    });
    const getPaying = useCallback(async()=>{
        var dataArray1 = await DataService.Getdata_dtService<any>('Bill');
        // data.getdata('Bill').then(res=> {
        //     var dataArray1: any[]= [];
        //     for ( let key in res)
        //     {
        //         if (key !== '0')
        //         {
        //             dataArray1.push({
        //                 id: key,
        //                 ...res[key]
        //             })
        //         }
        //     }
        var dataArray2 = await DataService .Getdata_dtService<any>('Table');
        // data.getdata('Table').then(res=>{
            // var dataArray2: any[]= [];
            // for ( let key in res)
            // {
            //     if (key !== '0')
            //     {
            //         dataArray2.push({
            //             id: key,
            //             ...res[key]
            //         })
            //     }
            // }
            dataArray1.forEach(item=>{
                dataArray2.forEach(i=>{
                    if (item.TableID === i.id)
                    {
                        item.TableID = i.Name;
                    }
                });
            });
            var dataArray3 = await DataService.Getdata_dtService<any>('user');
            // data.getdata('user').then(res=>{
            //     var dataArray3: any[]= [];
            //     for (let key in res)
            //     {
            //         dataArray3.push({
            //             id: key,
            //             ...res[key]
            //         })
            //     }

                dataArray1.forEach(item=>{
                    dataArray3.forEach(i=>{
                        if (item.createrID == i.id)
                        {
                            item.createrID = i;
                        }
                    });
                });
            setdatapaying(dataArray1);
            // })
        // })
        // })
    },[]);
useEffect(()=>{
    if(valueSearch !=='' && valueSearch !== undefined)
        {
           
            if(datapaying)
            {
                let a =datapaying.filter(x=> x.createrID.Name.toLowerCase().includes(valueSearch.toLowerCase())|| x.
                billID.toLowerCase().includes(valueSearch.toLowerCase())|| x.TableID.toLowerCase().includes(valueSearch.toLowerCase()));
                if(a)
                {
                     setDataSearch(a);
                }
                else
                {
                    setDataSearch([])
                }
               
            }
            else
            {
                setDataSearch([]);
            }
            
        }
        
    else
    {
        setDataSearch(datapaying ? datapaying : []);
    }
},[valueSearch,datapaying])
useEffect(()=>{

    setLoading(true);
    Promise.resolve(getPaying()).then(
        (res)=> {
            setLoading(false);
        }
    );

},[getPaying]);
// const onDelPaying= async()=>{
// },[getPaying, reload]);
const onDelPaying = async()=>{
    setLoading(true);

    data.deletedData('Bill',itemSelected.id);
    let dataArray = await DataService.Getdata_dtService<any>('ListProduct');
    // data.getdata('ListProduct').then(res=>{
    //     let dataArray: any[]= [];
    //     for( let key in res)
    //     {
    //         if( key !='0')
    //         {
    //             dataArray.push({
    //                 id: key,
    //                 ...res[key]
    //             })
    //         }
    //     }
        var listitem = dataArray.filter(item=> item.billID === itemSelected.billID);
        Promise.all(listitem.map(item=>{
            data.deletedData('ListProduct',item.id);
        })).then(
            ()=>{
                setLoading(false);

            }
        );
    // })
};

    return (
            <SafeAreaView style={{width:getwidth(), height:getheight(),flex:1, marginTop:-9.5}}>

                <View style={[{flexDirection:'row', justifyContent:'flex-start',padding:18, backgroundColor:'#67bff3', borderColor:'#e5e5e5', borderWidth:2}]}>
                <View style={{alignSelf:'flex-start', justifyContent:'flex-start', width:reponsivewidth(50)}}>
                <TouchableOpacity onPress={()=>getvisible(false)}>
                <MaterialIcons name="arrow-back" size={28} color="#efefef"/>
                </TouchableOpacity>
                </View>
                <Text style={{alignSelf:'center',fontSize:17, width:reponsivewidth(300), textAlign:'left', color:'#FFFF', fontWeight:'700'}}>Lịch sử thanh toán</Text>
                </View>
                <View style={[styles.Shadowbox,{paddingTop: 8, paddingBottom :8, alignItems:'center'}]}>
                {
                    showSearch == false ?
                    <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={()=>{
                        setShowSearch(true);
                    }}>
                        <Ionicons size={32} name="search"/>

                    </TouchableOpacity>
                    :
                    <View style={{flexDirection:'row', alignItems:'center' , justifyContent:'center'}}>
                        <SearchBar
                            style={{width:reponsivewidth(280)}}
                            placeholder="Nhập mã hóa đơn, tên nhân bàn, tên bàn"
                            lightTheme={true}
                            containerStyle={{
                              width: reponsivewidth(300),
                              height: reponsiveheight(50),
                              borderRadius: 5,
                            }}
                            onClear={()=> setValueSearch('')}
                            onChange={(e)=>{
                                setValueSearch(e.nativeEvent.text);
                            }}
                            value={valueSearch}
                            inputContainerStyle={{height: reponsiveheight(40)}}
                        />
                    <TouchableOpacity onPress={()=>{
                         setValueSearch('');
                         setShowSearch(false);
                    }} style={{marginLeft: 8}}>
                        <Text >
                            Hủy
                        </Text>
                    </TouchableOpacity>
                    </View>
                }

            </View>
                <ScrollView>
                {/* {console.log(datapaying.length > 0)} */}
                {dataSearch.length > 0 ? dataSearch.map(item=>{
                    return (
                <View style={[ styles.Shadowbox ,{justifyContent:'center',alignItems:'center',width: reponsivewidth(350),alignSelf:'center', paddingRight:25, marginLeft:15, paddingTop:15, paddingBottom:20, marginTop:15, height:reponsiveheight(180),borderLeftColor: item.Status === 1 ? '#3ca739' : '#eb792d', borderLeftWidth:10, borderRadius:5 }]}>
                <View  style={{justifyContent:'center', alignItems:'center', marginLeft:70, width:reponsivewidth(380)}}>
                <View style={[{justifyContent:'flex-end',alignItems:'flex-start', width:reponsivewidth(380),marginBottom:10, marginLeft:5 }]}>
                    <Text style={{fontWeight:'700'}}>{tranferday(item.CreateDate)}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={{width:reponsivewidth(260) }}>
                <View style={{flexDirection:'row'}}>
                <Text >Mã hóa đơn:</Text><Text style={{marginLeft:5, fontWeight:'700'}}>{item.billID}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                <Text >Tên Bàn :</Text>
                <Text style={{marginLeft:5}}>{item.TableID}</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{ fontWeight:'700'}}>Tổng tiền :</Text>
                <Text style={{marginLeft:5}}>{item.Total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</Text>
                </View>
                <View style={{flexDirection:'row',marginTop:10}}>
                <Text style={{ fontWeight:'700'}}>Người lập : </Text>
                <Text style={{marginLeft:5}}>{item.createrID.Name} {item.createrID.isDelete == true && '(Đă nghỉ việc)'}</Text>
                </View>

                 </View>
                 <View>
                 <View style={{justifyContent:'center', alignItems:'flex-start', width:reponsivewidth(75)}}>
                     <TouchableOpacity onPress={()=>{setitemSelectedl(item); setvisibleModalDel(true);} }>
                        <MaterialCommunityIcons size={32} name="delete" color={'#999999'}/>
                     </TouchableOpacity>
                 </View>
                 <View style={{marginTop:10,justifyContent:'center', alignItems:'flex-start'}}>
                 <TouchableOpacity onPress={()=>{  setidclick(item); setDetail(true); }}  >
                        <MaterialCommunityIcons size={32} name="text-box-search-outline" color={'#999999'}/>
                     </TouchableOpacity>
                    {/* <CustomHyperLink onPress={()=>{ setDetail(true); setidclick(item.id) }} title={'Xem chi tiết'}/> */}
                </View>
                 </View>
                 </View>
                </View>

                 </View>
                    );
                })
                   : <View style={{height:reponsiveheight(550)}}>
                       <Text style={{opacity:0.4}}>
                           Không có thông tin thanh toán
                       </Text>
                   </View> }
                </ScrollView>
                <CustomNotificationDel visible={visbleModalDel} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} Content={'Bạn có thực sự muốn xóa hóa đơn này không'} title="Thông báo"  onCancel={()=>setvisibleModalDel(false)} onAction={onDelPaying}/>
                <HistoryPayingDetail  visible={detail} idBill={idclick} onCancel={setDetail} viewStyle={{width: reponsivewidth(330)}}/>
                <CustomNotification visible={Suscces} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} Content={'Bạn đã xóa thành công'} title="Thông báo"  onCancel={()=>setSuccess(false)}/>
           <Loading visible={loading}/>
           </SafeAreaView>
        );
};
const styles = StyleSheet.create({
    Shadowbox:
    {
        backgroundColor:'#FFFF',
        shadowColor:'#000',
        shadowOffset:{
            width:2,
            height:2,
        },
        shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation:10,
    },
});
