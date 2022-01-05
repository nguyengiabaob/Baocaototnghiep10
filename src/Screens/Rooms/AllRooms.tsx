/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Input, ListItem, Overlay, SpeedDial } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Area } from '../../Model/Area';
import { Table } from '../../Model/Table';
import data from '../../services/data';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomBoxItem from '../../Model/CustomBoxItem';
import { CustomBottomSheet } from '../../Model/CustomBottomSheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { RoomParamList } from '../../navigation/types';
type props= {
    DataArea : Area [];
    DataTable: Table[];
    navigation: StackNavigationProp<RoomParamList,'RoomScreen'>
}
const AllRooms: React.FC<props> = ({DataArea, DataTable, navigation}:props)=>{
// const [dataArea1, setdataArea1]= useState<Area[]>([]);
// const [dataTable, setdataTable]= useState<Table[]>([]);
// const [open, setOpen] = useState(false);
// const [visible, setvisible] = useState(false);
// const [visibleModatable, setvisibleModaltable] = useState(false);
// const [visibleModaArea, setvisibleModalArea] = useState(false);
const isFocused = useIsFocused();
const [visibleEdit, setvisibleEdit]= useState<boolean>(false);
const [TableSelected, setTableSelected]= useState<string>('');
const AreaALL: Area = {id: 'All', Name: 'Tất cả khu vực'};
const [AreaFilter, setAreaFilter] = useState<Area>(AreaALL);
// const Area = [
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
// const Rooms = [
//     {
//         id: '1',
//         name:'Bàn 1',
//         Type: '1',
//         slots:'5',
//         status: 0,

//     },
//     {
//         id: '2',
//         name:'Bàn 2',
//         Type: '1',
//         slots:'5',
//         status: 1,

//     },
//     {
//         id: '3',
//         name:'Bàn 3',
//         Type: '1',
//         slots:'6',
//         status: 1,
//     },
//     {
//         id: '4',
//         name:'Bàn 4',
//         Type: '2',
//         slots:'6',
//         status: 0,

//     },
//     {
//         id: '5',
//         name:'Bàn 5',
//         Type: '1',
//         slots:'6',
//         status: 0,

//     },
//     {
//         id: '6',
//         name:'Bàn 6',
//         Type: '2',
//         slots:'6', 
//         status: 0,

//     },
//     {
//         id: '7',
//         name:'Bàn 7',
//         Type: '2',
//         slots:'6',
//         status: 1,

//     },
//     {
//         id: '8',
//         name:'Bàn 8',
//         Type: '2',
//         slots:'6',
//         status: 1,

//     },
//     {
//         id: '9',
//         name:'Bàn 9',
//         Type: '2',
//         slots:'6',
//         status: 1,

//     },
//     {
//         id: '10',
//         name:'Bàn 10',
//         Type: '2',
//         slots:'6',
//         status: 0,

//     },
//     {
//         id: '11',
//         name:'Bàn 11',
//         Type: '2',
//         slots:'6',
//         status: 0,

//     },
//     {
//         id: '12',
//         name:'Bàn 12',
//         Type: '2',
//         slots:'6',
//         status: 0,

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',
//         status: 0,

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',
//         status: 0,

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',
//         status: 1,

//     },
//     {
//         id: '13',
//         name:'Bàn 13',
//         Type: '2',
//         slots:'6',
//         status: 1,

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
// const DataArea = ()=>{
//     let datarray :any[] = [];
//     data.getdata('Area').then(res=> {for ( let key in res)
//     {
//         if (key !== '0')
//         {
//         datarray.push(
//             {
//                 id: key,
//                 ...res[key],
//             }
//         );
//         }
//     }
//     setdataArea1(datarray);
// });
// }
// const DataTablefun = ()=>{
//     let datarray :any[] = [];
//     data.getdata('Table').then(res=> {for ( let key in res)
//     {
//         if (key !== '0')
//         {
//         datarray.push(
//             {
//                 id: key,
//                 ...res[key],
//             }
//         );
//         }
//     }
//     setdatatable(datarray)
// });
// }
useEffect(()=>{
    if (isFocused === true)
    {
        
        setvisibleEdit(false);
    }
  
},[isFocused,]);
// const [changeArea, setchangeArea] = useState<Table[]>([]);
// function filterArea (id: string)
// {
//   if (id !== 'All')
//   {
//    setchangeArea(DataTable.filter(item=>item.Type === id))
//   }
//   else
//   {
//     setchangeArea([])
//   }
// }
// const ModalTable:React.FC = ()=>{
//     const [dataArea, setdataArea]= useState<Area[]>([]);
//     const [AreaSelected, setAreaSelected]= useState<Area>();
//     const DataArea1 = ()=>{
//       let datarray :any[] = [];
//       data.getdata('Area').then(res=> {for ( let key in res)
//       {
//           if (key !== '0')
//           {
//           datarray.push(
//               {
//                   id: key,
//                   ...res[key],
//               }
//           );
//           }
//       }
//       setdataArea(datarray);
//   });
//   }
//   useEffect(()=>{
//       DataArea1();
//   },[]);
//     const ChoosenArea= (item: Area)=>{
//       setTimeout(()=>setAreaSelected(item),10);
//       setTimeout(()=>setvisibleTable(false),10);
//     }
//     const [visibleTable, setvisibleTable] = useState<boolean>(false);
//     const [nameTable, setnameTable] = useState<string>('');
//     const [TableSlots, setTableSlots] = useState<number>(0);
//     const AddTable=()=>{
//       if (AreaSelected !== undefined && TableSlots !== 0  )
//       {
//         data.postTable(nameTable,AreaSelected.id,TableSlots, 0).then(res=>{
//           if ( res === true)
//         {
//           console.log('Posted Table');
//         }});
//       }
//     }
//     return (
//       <View style={{width:reponsivewidth(320), height: reponsiveheight(450)}}>
//         <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
//         <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Thêm Bàn</Text>
//         </View>
//         <View>
//           <View style={{marginTop:15}}>
//              <Input placeholder="Tên bàn" containerStyle={{width:reponsivewidth(310)}} onChangeText={(text)=>{setnameTable(text)}}/>
//           </View>
//           <View style={{marginTop:35}}>
//              <Input placeholder="Số chỗ" containerStyle={{width:reponsivewidth(310)}} onChangeText={(text)=>{setTableSlots(Number(text))}}/>
//           </View>
//           { AreaSelected !== undefined ?
//             <View style={{flexDirection:'row',marginTop:20}}>
//               <View style={{flexDirection:'row', marginLeft:25}} >
//                 <Text style={{fontWeight:'700', fontSize:18}}>
//                   Khu vực: 
//                 </Text>
//                 <Text style={{marginLeft:25,fontSize:16}}>
//                 {AreaSelected.Name}
//                 </Text>
//                 </View>
//                 <View style={{justifyContent:'center', width:reponsivewidth(50),alignItems:'flex-end'}}>
//                     <TouchableOpacity onPress={()=>{setAreaSelected(undefined);}}><FontAwesome name="remove" size={20} color={'#000000'}/></TouchableOpacity>
//                   </View>
//               </View>
//           :
//           <TouchableOpacity onPress={()=>{setvisibleTable(true)}} style={{marginTop:20, alignItems:'center', backgroundColor:'#c5c2c2', width:reponsivewidth(310),alignSelf:'center',padding:10}}>
//             <Text>Chọn khu vực</Text>
//           </TouchableOpacity>
//           }
//           <View style={{flexDirection:'row',marginTop:50,alignItems:'center',justifyContent:'center'}}>
//             <TouchableOpacity onPress={()=>{
//               AddTable();
//               setvisibleModaltable(false);
//               setvisible(false);
//             }}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
//               <Text style={{color:'#FFFF'}}>
//                 Thêm
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>{setvisibleModaltable(false),setvisible(false)}}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
//               <Text style={{color:'#FFFF'}}>
//                 Thoát
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <Overlay isVisible={visibleTable}>
//         <View style={{width:reponsivewidth(320), height: reponsiveheight(300)}}>
//         <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
//         <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Khu vực</Text>
  
//         </View>
//         <View>
//           <ScrollView>
//             {
//               dataArea.map(item=>{
//                 return (
//                   <TouchableOpacity onPress={()=>{ChoosenArea(item)}} style={{width:reponsivewidth(320), alignSelf:'center'}}>
//                        <CustomBoxItem Style={{backgroundColor:'#e3e2e287',borderColor:'#6666667d', borderWidth:0.45, borderRadius:0}} title={item.Name}/>
//                   </TouchableOpacity>
//                 );
//               })
//             }
//           </ScrollView>
//         </View>
//         <View style={{alignItems:'center', marginTop:15}}>
//             <TouchableOpacity onPress={()=>{setvisibleTable(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}} ><Text style={{color:'#FFFF'}}>Thoát</Text></TouchableOpacity>
//         </View>
//         </View>
//         </Overlay>
//       </View>
//     );
//   };
//   const ModalArea: React.FC = ()=>{
//    const [nameArea, setnameArea] = useState<string>('');
//    const AddArea= ()=>{
//     if ( nameArea !== '')
//     {
//     data.postArea(nameArea).then(res=> {
//       if (res === true)
//       { console.log('posted Area')}
//     });
//     }
//   };
//     return (
//       <View style={{width:reponsivewidth(320), height: reponsiveheight(300)}}>
//           <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
//             <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Thêm Khu vực</Text>
//         </View>
//         <View>
//         <View style={{marginTop:15}}>
//              <Input placeholder="Tên Khu Vực" containerStyle={{width:reponsivewidth(310)}} onChangeText={(text)=>{setnameArea(text)}}/>
//           </View>
//         </View>
//         <View style={{flexDirection:'row',marginTop:50,alignItems:'center',justifyContent:'center'}}>
//             <TouchableOpacity onPress={()=>{
//               AddArea();
//               setvisibleModalArea(false);
//               setvisible(false);
//             }} style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
//               <Text style={{color:'#FFFF'}}>
//                 Thêm
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>{setvisibleModalArea( false); setvisible(false)}}   style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
//               <Text style={{color:'#FFFF'}}>
//                 Thoát
//               </Text>
//             </TouchableOpacity>
//           </View>
//       </View>
//     );
//   };
    return (
        <>
        <View style={styles.ContainterFlastList} >
        
        <FlatList
        scrollEnabled={true}
         horizontal 
        data={[AreaALL,...DataArea]} 
        renderItem={({item})=>
        {
        return (
           <TouchableOpacity onPress={()=>{  
            setAreaFilter(item);

           }} style={[styles.ButtonArea,{backgroundColor: AreaFilter.id === item.id ? '#02569E' : '#FFFF'}]}>
                <Text style={[styles.Styletitle, {color: AreaFilter.id === item .id ? '#FFFF' : '#02569E'}]}>{item.Name}</Text></TouchableOpacity>
        )

           }
        }/>
         { visibleEdit === true &&
                    <EditTable id={TableSelected}  visible={visibleEdit} />
            }
        </View>
        <View style={styles.ContainerRooms}>
            <FlatList 
            scrollsToTop={true}
            scrollEnabled={true}
            data={AreaFilter.id === 'All' ? DataTable : DataTable.filter(item=> item.Type === AreaFilter.id )}
            renderItem={({item})=>{
                return (
                <>
                <TouchableOpacity onPress={()=>{
                    setvisibleEdit(true);
                    setTableSelected(item.id)
                    }} style={[styles.styleRooms , item.Status === 0 ? undefined : {backgroundColor:'#02569E'}  ]}>
                     <Text style={[styles.TitleRooms , item.Status === 0 ? {color:'#000000'} : {color:'#FFFF'}]}>{item.Name}</Text>
                </TouchableOpacity>
                </>
                );
            }
            }
            numColumns={3}
            />
        </View>
        {/* <SpeedDial
      color="#02569E"
     isOpen={open}
    icon={{ name: 'edit', color: '#fff' }}
    openIcon={{ name: 'close', color: '#fff' }}
    onOpen={() => {  setOpen(!open)}}
    onClose={() =>{  setOpen(!open)}}
    >
    <SpeedDial.Action
        color={'#02569E'}
        icon={{ name: 'add', color: '#FFFF' }}
        title="Thêm bàn"
        onPress={() =>{setvisible(true), setvisibleModaltable( true) } }
    />
    <SpeedDial.Action
        color={'#02569E'}
        icon={<MaterialIcons name="add-business" size={25} color={'#FFFF'}/>}
        title="Thêm khu vực"
        onPress={()=>{setvisible(true); setvisibleModalArea( true)}  }
    />
    </SpeedDial>
    <Overlay isVisible={visible}>
    {visibleModatable === true ?
      <ModalTable/>
      : visibleModaArea === true &&
       <ModalArea/> 
   }
  </Overlay> */}
   
        </>
    );

};
export default AllRooms;
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