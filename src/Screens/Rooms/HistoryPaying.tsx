/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View,ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import data from '../../services/data';
import { getheight, getwidth, reponsiveheight, reponsivewidth } from '../../theme/Metric';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomNotificationDel } from '../../Model/CustomNoficationDel';
import BellNofi from '../../asset/svg/bellnotification.svg';
type props ={
    getvisible: (data: any)=>void
}

export const HistoryPaying: React.FC<props>= ({getvisible})=> {
    const [datapaying,setdatapaying]=useState<any[]>([]);
    const [visbleModalDel,setvisibleModalDel]=useState<boolean>(false);
    const [itemSelected,setitemSelectedl]=useState<any>();
    const tranferday = (d:string)=>{
        var month = new Date(d).getMonth() + 1;
        var date = new Date(d).getDate();
        var year = new Date(d).getFullYear();
       return date + '/' + month + '/' + year;
    };
    const getPaying= useCallback(()=>{
        data.getdata('Bill').then(res=> {
            var dataArray1: any[]= [];
            for ( let key in res)
            {
                if (key !== '0')
                {
                    dataArray1.push({
                        id: key,
                        ...res[key]
                    })
                }
            }
        data.getdata('Table').then(res=>{
            var dataArray2: any[]= [];
            for ( let key in res)
            {
                if (key !== '0')
                {
                    dataArray2.push({
                        id: key,
                        ...res[key]
                    })
                }
            }
            dataArray1.forEach(item=>{
                dataArray2.forEach(i=>{
                    if (item.TableID === i.id)
                    {
                        item.TableID =i.Name;
                    }
                })
            })
           
            data.getdata('user').then(res=>{
                var dataArray3: any[]= [];
                for (let key in res)
                {
                    dataArray3.push({
                        id: key,
                        ...res[key]
                    })
                }
            
                dataArray1.forEach(item=>{
                    dataArray3.forEach(i=>{
                        if (item.createrID == i.id)
                        {
                            item.createrID = i.Name;
                        }
                    })
                })
            setdatapaying(dataArray1);
            })
        })
        })
    },[]) 
useEffect(()=>{
    getPaying()
},[getPaying]);
const onDelPaying=()=>{
    data.deletedData('Bill',itemSelected.id);
    data.getdata('ListProduct').then(res=>{
        let dataArray: any[]= [];
        for( let key in res)
        {
            if( key !='0')
            {
                dataArray.push({
                    id: key,
                    ...res[key]
                })
            }
        }
        var listitem= dataArray.filter(item=> item.billID === itemSelected.billID);
        listitem.forEach(item=>{
            data.deletedData('ListProduct',item.id);
        })
    })
}
    return (
            <View style={{width:getwidth(), height:getheight(),flex:1, marginTop:-9.5}}>
                <View style={[{flexDirection:'row', justifyContent:'flex-start',padding:18, backgroundColor:'#67bff3', borderColor:'#e5e5e5', borderWidth:2}]}>
                <View style={{alignSelf:'flex-start', justifyContent:'flex-start', width:reponsivewidth(50)}}>
                <TouchableOpacity onPress={()=>getvisible(false)}>
                <MaterialIcons name="arrow-back" size={28} color='#efefef'/>
                </TouchableOpacity>
                </View>
                <Text style={{alignSelf:'center',fontSize:17, width:reponsivewidth(300), textAlign:'left', color:'#FFFF', fontWeight:'700'}}>Lịch sử thanh toán</Text>
                </View>
                <ScrollView>
                {console.log(datapaying.length > 0)}
                {datapaying.length > 0 && datapaying.map(item=>{
                    return (
                <View style={[ styles.Shadowbox ,{justifyContent:'center',alignItems:'center',width: reponsivewidth(350),alignSelf:'center', paddingRight:25, marginLeft:15, paddingTop:15, paddingBottom:20, marginTop:15, height:reponsiveheight(180),borderLeftColor: item.Status === 1 ? '#3ca739' : '#eb792d', borderLeftWidth:10, borderRadius:5, }]}>
                <View  style={{justifyContent:'center', alignItems:'center', marginLeft:70, width:reponsivewidth(380)}}>
                <View style={[{justifyContent:'flex-end',alignItems:'flex-start', width:reponsivewidth(380),marginBottom:10, marginLeft:5 }]}>
                    <Text style={{fontWeight:'700'}}>{tranferday(item.CreateDate)}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={{width:reponsivewidth(260), }}>
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
                <Text style={{marginLeft:5}}>{item.createrID}</Text>
                </View>
                
                 </View>
                 <View style={{justifyContent:'center', alignItems:'flex-start', width:reponsivewidth(75),}}>
                     <TouchableOpacity onPress={()=>{setitemSelectedl(item); setvisibleModalDel(true)} }>
                        <MaterialCommunityIcons size={32} name="delete" color={'#999999'}/>
                     </TouchableOpacity>
                 </View>
                 </View>
                </View>

                 </View>
                    )
                })
                    } 
                </ScrollView>
                <CustomNotificationDel visible={visbleModalDel} iconTitle={<BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/>} Content={"Bạn có thực sự muốn xóa hóa đơn này không"} title="Thông báo"  onCancel={()=>setvisibleModalDel(false)} onAction={onDelPaying}/>
            </View>
        )
}
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
    elevation:10
    }
})