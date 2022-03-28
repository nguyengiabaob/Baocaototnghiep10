/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableHighlightComponent, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Area } from '../../Model/Area';
import { CustomBottomSheet } from '../../Model/CustomBottomSheet';
import { Table } from '../../Model/Table';
import { RoomParamList } from '../../navigation/types';
import { reponsivewidth } from '../../theme/Metric';
type props= {
    DataArea : Area [];
    DataTable: Table[];
    navigation: StackNavigationProp<RoomParamList,'RoomScreen'>
}

const EmptyRooms: React.FC<props> = ({DataArea, DataTable,navigation}:props)=>{
const AreaALL: Area = {id: 'All', Name: 'Tất cả khu vực'};
const [visibleEdit, setvisibleEdit]= useState<boolean>(false);
const [AreaFilter, setAreaFilter] = useState<Area>(AreaALL);
const [TableSelected, setTableSelected]= useState<string>('');
const isFocused = useIsFocused();
// const Area =[
//     {   id:'1',
//         name: 'Tầng 1',
//         type: 'Trong nhà',
//     },
//     {   id:'2',
//         name: 'Tầng 2',
//         type: 'Trong nhà',
//     },
//     {   id:'3',
//     name: 'Khu vực A',
//     type: 'Ngoài nhà',
// },
//     {   id:'4',
//         name: 'Khu vực B',
//         type: 'Ngoài nhà',
//     },
// ];
// const Rooms =[
//     {
//         id: '1',
//         name:'Bàn 1',
//         Type: '1',
//         slots:'5',

//     },
//     {
//         id: '2',
//         name:'Bàn 2',
//         Type: '3',
//         slots:'5',

//     },
//     {
//         id: '3',
//         name:'Bàn 3',
//         Type: '5',
//         slots:'6',

//     },
//     {
//         id: '4',
//         name:'Bàn 4',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '5',
//         name:'Bàn 5',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '6',
//         name:'Bàn 6',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '7',
//         name:'Bàn 7',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '8',
//         name:'Bàn 8',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '9',
//         name:'Bàn 9',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '10',
//         name:'Bàn 10',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '11',
//         name:'Bàn 11',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '12',
//         name:'Bàn 12',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',

//     },
// ]
type propsedit= {
    visible: boolean,
    id: string,
}
const EditTable:React.FC<propsedit> = ({visible, id}: propsedit  )=>{
    const listData = [
        {
            title: 'Gọi Nước',
            onPress: ()=>{
                setvisibleEdit(false);
                navigation.navigate('callingWater',{id: id});
            }
        },
        {
            title: 'Chuyển bàn',
            onPress: ()=>{
                setvisibleEdit(false);
                navigation.navigate('SwapTable',{id: id});
            }
        },
        {
            title: 'Đật bàn',
            onPress: ()=>{
                setvisibleEdit(false);
                navigation.navigate('BookTable',{id: id});
            }
        },
        {
            title:'Chỉnh sửa thông tin',
            onPress: ()=>{
                setvisibleEdit(false);
                navigation.navigate('RoomEdit',{id: id})}
        },
        {
            title: 'Thoát',
            onPress: ()=>{ setvisibleEdit(false)}
        },
    ]
    DataTable.forEach(item=>{
        if(item.id=== id && item.Status == 1)
        {
            listData.splice(2,1);
        }
    });
    return (
        <CustomBottomSheet Listitem={listData} Visible={visible}/>
    );
}
useEffect(()=>{
    if (isFocused === true)
    {
        
        setvisibleEdit(false);
    }
},[isFocused]);
    return (
        <SafeAreaView>
        <View style={styles.ContainterFlastList} >
        <FlatList 
        scrollEnabled={true} 
         horizontal
        data={[AreaALL,...DataArea]} 
        renderItem={({item})=>(
           <TouchableOpacity onPress={()=>{setAreaFilter(item);}} style={[styles.ButtonArea,{backgroundColor: AreaFilter.id === item.id ? '#02569E' : '#FFFF'}]}><Text style={[styles.Styletitle,{color: AreaFilter.id === item .id ? '#FFFF' : '#02569E'}]}>{item.Name}</Text></TouchableOpacity>
        )}/>
        </View>
        { visibleEdit === true &&
                    <EditTable id={TableSelected}  visible={visibleEdit} />
            }
        <View style={styles.ContainerRooms}>
           
            <FlatList 
            scrollsToTop={true}
            scrollEnabled={true}
            data={AreaFilter.id === 'All' ? DataTable.filter(item=>item.Status === 0) : DataTable.filter(item=> item.Type === AreaFilter.id && item.Status === 0 )} 
            renderItem={({item})=>(
                <TouchableHighlight onPress={()=>{
                    setvisibleEdit(true);
                    setTableSelected(item.id)
                }} style={styles.styleRooms}>
                     <Text style={styles.TitleRooms}>{item.Name}</Text>
                </TouchableHighlight>
            )}
            numColumns={3}
            />
      
        </View>
        </SafeAreaView>
    )

}
export default EmptyRooms;
const styles = StyleSheet.create(
    {
        ButtonArea:
        {
            borderColor:'#02569E',
            borderWidth:2,
            borderRadius:0.5,
            marginHorizontal:4,
        },
        ContainterFlastList:
        {
            padding:15,
            borderWidth:2,
            borderColor:'#dcdcdc',
            backgroundColor: '#FFFF',
        },
        Styletitle:
        {
            padding:5,
            color:'#02569E',
        },
        ContainerRooms:
        {
            paddingLeft:10,
            paddingRight:10,
            paddingTop:6,
            paddingBottom:60,

        },
        styleRooms:
        {
            borderRadius:8,
            borderColor:'#a7a7a7',
            backgroundColor:'#FFF',
            paddingLeft:33,
            paddingRight:33,
            paddingTop:50,
            paddingBottom:50,
            marginHorizontal:7,
            marginVertical:4,
        },
        TitleRooms:
        {
            width:reponsivewidth(45),
        }
    }
)
