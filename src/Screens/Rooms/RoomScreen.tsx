/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View,ScrollView } from 'react-native';
import CustomHeader from '../../Model/CustomHeader';
import { RoomParamList } from '../../navigation/types';
import { Input, Overlay, Tab, TabView} from 'react-native-elements';
// import Allrooms from './AllRooms';
import AllRooms from './AllRooms';
import UsingRooms from './UsingRoom';
import EmptyRooms from './EmptyRooms';
import { SpeedDial } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import data from '../../services/data';
import { Area } from '../../Model/Area';
import CustomBox from '../../Model/CustomBox';
import CustomBoxItem from '../../Model/CustomBoxItem';
import { useIsFocused } from '@react-navigation/native';
import { Table } from '../../Model/Table';
import { CustomNotification } from '../../Model/CustomNofication';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { HistoryBookTable } from './HisotyBookTable';
import { HistoryPaying } from './HistoryPaying';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Warning from '../../asset/svg/Warning.svg';
import DataService from '../../services/dataservice';
import database from '@react-native-firebase/database';
type props ={
    navigation: StackNavigationProp<RoomParamList,'RoomScreen'>
}
const RoomScreen: React.FC<props> = ({navigation}:props)=>
{
const [index, setIndex] = useState(0);
const [open, setOpen] = useState(false);
const [openhistory, setOpenHistory] = useState(false);
const [visible, setvisible] = useState(false);
const [visibleModatable, setvisibleModaltable] = useState(false);
const [visibleModaArea, setvisibleModalArea] = useState(false);
const [dataArea1, setdataArea1] = useState<Area[]>([]);
const [dataTable, setdataTable] = useState<Table[]>([]);
const [visibleModaAreaDel, setvisibleModalAreaDel] = useState(false);
const [visibleModaATableDel, setvisibleModalTableDel] = useState(false);
const [checkArea, setcheckArea] = useState(false);
const isFocused= useIsFocused();
const [visibleModalDetail, setvisibleModalDetail] = useState(false);
const [visibleModaEdit, setvisibleModalEdit] = useState(false);
const [IDArea, setIDArea] = useState<Area>();
const [visibleHisTable, setvisibleHisTable]= useState<boolean>(false);
const [visibleHisPaying, setvisibleHisPaying]= useState<boolean>(false);
const [Reload, setReload]= useState<boolean>('false');
type propsModal={
  Visible: boolean,
}
useEffect(()=>{
  database().ref().on('value',()=>{
    setReload(prev => !prev);
  })
},[])
const DataArea1 =async ()=>{
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
  let dta = await DataService.Getdata_dtService<any>('Area');
  setdataArea1(dta);
}
const DataTable =async()=>{
    let datarray = await DataService.Getdata_dtService<any>('Table');
    let datarraytable = await DataService.Getdata_dtService<any>('BookTable');
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
    // let datarraytable :any[] = [];
    // data.getdata('BookTable').then(res=> {for ( let key in res)
    //   {
    //       if (key !== '0')
    //       {
    //       datarraytable.push(
    //           {
    //               id: key,
    //               ...res[key],
    //           }
    //       );
    //       }
    //   }
    datarray.forEach(item=>{
      datarraytable.forEach(i=>{
        if(i.TableID == item.id && new Date(i.BookDate) == new Date())
        {
          item.Status= 1;
          data.UpdateTable(item.Name,item.id,item.Type, item.Slots,item.Status).then(res=>{if(res=== true){
            console.log("update");
          }})
        }
      })
    })
    setdataTable(datarray);
// });
// })
}
// useEffect(()=>{
//   let time =setTimeout(DataTable(),9000);
//   clearTimeout(time);
// })
useEffect(()=>{
    if (visible === false)
    {
     DataArea1();
     DataTable();
    }
},[visible]);
useEffect(()=>{
  if (isFocused === true || Reload == false || Reload == true)
  {

   DataArea1();
   DataTable();
  }
},[isFocused,Reload]);

const ModalAreaDeleted: React.FC = ()=>{
  const [visiblenotification, setvisiblenotification] = useState(false);
  const [AreaDeleted, setAreaDeleted] = useState<Area[]>([]);
  const onPress = ( item: Area ,pressed:boolean)=>{
    if (pressed)
    {
        setAreaDeleted(AreaDeleted.filter(i=>i !== item));
    }
    else
    {
        setAreaDeleted([...AreaDeleted, item]);
    }
};
const DetalArea = ()=>{
  if ( AreaDeleted.length>0)
  {
   AreaDeleted.forEach(item=>{
     data.DeleteArea(item.id);
   })
}
}
type props ={
  Visible: boolean

}

const NotificationDel: React.FC <props> = ({Visible}: props)=>{
 
  return (
    <View>

    { Visible === true && checkArea === false &&
    <View style={{width:reponsivewidth(330), height: reponsiveheight(165)}}>
        <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
          <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Thông báo</Text>
      </View>
      <View style={{justifyContent:'center', alignItems:'center', padding:15}}>
          <Text style={{fontSize:17}}>Bạn muốn có xóa ? </Text>
      </View>
      <View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>{
            // if (visibleModaATableDel === true)
            // {
            //   Deletetable();
            //   setvisiblenotification(false);
            //   setvisibleModalTableDel(false);
            //   setvisible(false);
            // }
            if ( visibleModaAreaDel === true)
            {
  
              DetalArea();
              setvisiblenotification(false);
              setvisibleModalAreaDel(false);
              setvisible(false);
            }
          }} style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
            <Text style={{color:'#FFFF'}}>
              Xác nhận
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setvisibleModalAreaDel( false); setvisible(false)}}   style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
            <Text style={{color:'#FFFF'}}>
              Thoát
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  
}
</View>
  ) 
}
  return (

    <View style={{width:reponsivewidth(330), height: reponsiveheight(520)}}>
          <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
          <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Khu vực</Text>
      </View>
        <View style={{justifyContent:'center', alignItems:'center', marginLeft:-10}}>
          <ScrollView style={{height:reponsiveheight(400)}}>
              {
               dataArea1. map(item=>{
                const pressedbox = AreaDeleted.includes(item);
                 return (
                  <TouchableOpacity  key={item.id} onPress={()=>{onPress(item,pressedbox)}}    style={{ width:reponsivewidth(315) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(90), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                  <CustomBox  stylecontainet={{padding:5, width:reponsiveheight(240)}} pressed={pressedbox}  isAvatar={false} title={item.Name}  />
                 </TouchableOpacity>
                 );
               })
              }
          </ScrollView>
        </View>
        <View style={{flexDirection:'row',alignItems:'flex-end', justifyContent:'flex-end', marginRight:5}}>
          <Text>Đã chọn </Text><Text style={{fontWeight:'700', marginLeft:5}}>{AreaDeleted.length}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>{
            let a = false;
            AreaDeleted.forEach(item=> {
              let tables = dataTable.filter(i=> i.Type === item.id )
              if (tables.length > 0 )
                { setcheckArea(true);
                  a =true;
                  return;
                }

            })
            if(a ===false)
              setvisiblenotification(true);
          }} style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
            <Text style={{color:'#FFFF'}}>
              Xóa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setAreaDeleted([]); setvisibleModalAreaDel( false); setvisible(false)}}   style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
            <Text style={{color:'#FFFF'}}>
              Thoát
            </Text>
          </TouchableOpacity>
        </View>
        <Overlay isVisible={visiblenotification}>
             <NotificationDel Visible={visiblenotification}/>
        </Overlay>
        { checkArea === true && <CustomNotification visible={checkArea}  onCancel={()=> setcheckArea(false)} iconTitle={<Warning width={reponsivewidth(30)} height={reponsiveheight(30)}/>} title="Thông báo"  Content="Không thể xóa vì trong khu vực vẫn còn bàn " />}
    </View>
  );

};

const DelTable: React.FC =()=>{
  const [visiblenotification, setvisiblenotification] = useState(false);
  const [TableDeleted, setTableDeleted]= useState<Table[]>([]);
  const onPress = async( item: Table ,pressed:boolean)=>{
    if (pressed)
    {
       await  setTableDeleted(TableDeleted.filter(i=>i !== item));
    }
    else
    {
      console.log('array', [...TableDeleted, item])
        await setTableDeleted([...TableDeleted, item]);
    }
    
};
const Deletetable = ()=>{
  console.log('tab',TableDeleted);
  if (TableDeleted.length>0)
  {
   
   TableDeleted.forEach(item=>{
     data.deletedData('Table',item.id);
   })
}
};
// type props ={
//   Visible: boolean
//   table : any
// }

// const NotificationDel: React.FC <props> = ({Visible,table}: props)=>{
 
//   return (
   
//   ) 
// }
return (
  <View style={{width:reponsivewidth(330), height: reponsiveheight(520)}}>
  <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
  <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Bàn</Text>
</View>
<View style={{justifyContent:'center', alignItems:'center', marginLeft:-20}}>
  <ScrollView style={{height:reponsiveheight(400)}}>
      {
       dataTable. map(item=>{
        const pressedbox = TableDeleted.includes(item);
         return (
          <TouchableOpacity  key={item.id} onPress={async()=>{await onPress(item,pressedbox)}}    style={{ width:reponsivewidth(315) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(90), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
          <CustomBox  stylecontainet={{padding:5, width:reponsiveheight(240)}} pressed={pressedbox}  isAvatar={false} title={item.Name}  />
         </TouchableOpacity>
         );
       })
      }
  </ScrollView>
</View>
  
<View style={{flexDirection:'row',alignItems:'flex-end', justifyContent:'flex-end', marginRight:5}}>
  <Text>Đã chọn </Text><Text style={{fontWeight:'700', marginLeft:5}}>{TableDeleted.length}</Text>
</View>
<View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
  <TouchableOpacity onPress={()=>{
    setvisiblenotification(true);
    
  }} style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
    <Text style={{color:'#FFFF'}}>
      Xóa
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>{setvisibleModalTableDel( false); setvisible(false)}}   style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
    <Text style={{color:'#FFFF'}}>
      Thoát
    </Text>
  </TouchableOpacity>
</View>
<Overlay isVisible={visiblenotification}>
<View>

{ visiblenotification === true && checkArea === false &&
<View style={{width:reponsivewidth(330), height: reponsiveheight(165)}}>
    <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
      <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Thông báo</Text>
      {console.log('123',TableDeleted)}
  </View>
  <View style={{justifyContent:'center', alignItems:'center', padding:15}}>
      <Text style={{fontSize:17}}>Bạn muốn có xóa ? </Text>
  </View>
  <View style={{flexDirection:'row',marginTop:20,alignItems:'center',justifyContent:'center'}}>
      <TouchableOpacity onPress={()=>{
        if (visibleModaATableDel === true)
        {
          Deletetable();
          setvisiblenotification(false);
          setvisibleModalTableDel(false);
          setvisible(false);
        }
        // if ( visibleModaAreaDel === true)
        // {

        //   DetalArea();
        //   setvisiblenotification(false);
        //   setvisibleModalAreaDel(false);
        //   setvisible(false);
        // }
      }} style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
        <Text style={{color:'#FFFF'}}>
          Xác nhận
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{setvisibleModalAreaDel( false); setvisible(false)}}   style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
        <Text style={{color:'#FFFF'}}>
          Thoát
        </Text>
      </TouchableOpacity>
    </View>
</View>

}
</View>
</Overlay>
</View>
)
}
const ModalTable:React.FC = ()=>{
  const [dataArea, setdataArea]= useState<Area[]>([]);
  const [AreaSelected, setAreaSelected]= useState<Area>();
  const DataArea = ()=>{
    let datarray :any[] = [];
    data.getdata('Area').then(res=> {for ( let key in res)
    {
        if (key !== '0')
        {
        datarray.push(
            {
                id: key,
                ...res[key],
            }
        );
        }
    }
    setdataArea(datarray);
});
};
useEffect(()=>{
    DataArea();
},[]);
  const ChoosenArea = (item: Area)=>{
    setTimeout(()=>setAreaSelected(item),10);
    setTimeout(()=>setvisibleTable(false),10);
  }
  const [visibleTable, setvisibleTable] = useState<boolean>(false);
  const [nameTable, setnameTable] = useState<string>('');
  const [TableSlots, setTableSlots] = useState<number>(0);
  const AddTable=()=>{
    if (AreaSelected !== undefined && TableSlots !== 0  )
    {
      data.postTable(nameTable,AreaSelected.id,TableSlots, 0).then(res=>{
        if ( res === true)
      {
        console.log('Posted Table');
      }});
    }
  }
  return (
    <View style={{width:reponsivewidth(320), height: reponsiveheight(450)}}>
      <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
      <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Thêm Bàn</Text>
      </View>
      <View>
        <View style={{marginTop:15}}>
           <Input placeholder="Tên bàn" containerStyle={{ width: reponsivewidth(310) }} onChangeText={(text) => { setnameTable(text); } } autoCompleteType={undefined}/>
        </View>
        <View style={{marginTop:35}}>
           <Input keyboardType={'number-pad'} placeholder="Số chỗ" containerStyle={{ width: reponsivewidth(310) }} onChangeText={(text) => { setTableSlots(Number(text)); } } autoCompleteType={undefined}/>
        </View>
        { AreaSelected !== undefined ?
          <View style={{flexDirection:'row',marginTop:20}}>
            <View style={{flexDirection:'row', marginLeft:25}} >
              <Text style={{fontWeight:'700', fontSize:18}}>
                Khu vực:
              </Text>
              <Text style={{marginLeft:25,fontSize:16}}>
              {AreaSelected.Name}
              </Text>
              </View>
              <View style={{justifyContent:'center', width:reponsivewidth(50),alignItems:'flex-end'}}>
                  <TouchableOpacity onPress={()=>{setAreaSelected(undefined);}}><FontAwesome name="remove" size={20} color={'#000000'}/></TouchableOpacity>
                </View>
            </View>
        :
        <TouchableOpacity onPress={()=>{setvisibleTable(true)}} style={{marginTop:20, alignItems:'center', backgroundColor:'#c5c2c2', width:reponsivewidth(310),alignSelf:'center',padding:10}}>
          <Text>Chọn khu vực</Text>
        </TouchableOpacity>
        }
        <View style={{flexDirection:'row',marginTop:50,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>{
            AddTable();
            setvisibleModaltable(false);
            setvisible(false);
          }}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
            <Text style={{color:'#FFFF'}}>
              Thêm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setvisibleModaltable(false),setvisible(false)}}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
            <Text style={{color:'#FFFF'}}>
              Thoát
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Overlay isVisible={visibleTable}>
      <View style={{width:reponsivewidth(320), height: reponsiveheight(360)}}>
      <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
      <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Khu vực</Text>

      </View>
      <View style={{height:reponsiveheight(250) }}>
        <ScrollView>
          {
            dataArea.map(item=>{
              return (
                <TouchableOpacity key={item.id} onPress={()=>{ChoosenArea(item)}} style={{width:reponsivewidth(320), alignSelf:'center'}}>
                     <CustomBoxItem Style={{backgroundColor:'#e3e2e287',borderColor:'#6666667d', borderWidth:0.45, borderRadius:0}} title={item.Name}/>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </View>
      <View style={{alignItems:'center', marginTop:25}}>
          <TouchableOpacity onPress={()=>{setvisibleTable(false)}} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}} ><Text style={{color:'#FFFF'}}>Thoát</Text></TouchableOpacity>
      </View>
      </View>
      </Overlay>
    </View>
  );
};
const ModalArea: React.FC = ()=>{
 const [nameArea, setnameArea] = useState<string>('');
 const AddArea= ()=>{
  if ( nameArea !== '')
  {
  data.postArea(nameArea).then(res=> {
    if (res === true)
    { console.log('posted Area')}
  });
  }
};
  return (
    <View style={{width:reponsivewidth(320), height: reponsiveheight(300)}}>
        <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
          <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Thêm Khu vực</Text>
      </View>
      <View>
      <View style={{marginTop:15}}>
           <Input placeholder="Tên Khu Vực" containerStyle={{ width: reponsivewidth(310) }} onChangeText={(text) => { setnameArea(text); } } autoCompleteType={undefined}/>
        </View>
      </View>
      <View style={{flexDirection:'row',marginTop:50,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity onPress={()=>{
            AddArea();
            setvisibleModalArea(false);
            setvisible(false);
          }} style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4,marginRight:40}}>
            <Text style={{color:'#FFFF'}}>
              Thêm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setvisibleModalArea( false); setvisible(false)}}   style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
            <Text style={{color:'#FFFF'}}>
              Thoát
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};
const ModalEditArea:React.FC =()=>{
  const ModalDetalEdit:React.FC= ()=>{
    const SaveArea= (id :string)=>{
      if ( IDArea !== undefined)
      {
        
        data.UpdateArea(valueAreaName === '' ? IDArea.Name : valueAreaName, id).then(res=> {if ( res === true){
          console.log('Update Area');
        }});
        let area : Area = IDArea;
        if ( valueAreaName !== '')
        {
        area.Name = valueAreaName;
        setIDArea(area);
        }
      }
    };
    const [valueAreaName, setValueAreaName] = useState<string>('');
    return (
      <View style={{justifyContent:'flex-start',flex:1, marginTop:25}}>
        {console.log('IDAREA', IDArea)}
      <View style={{marginLeft:15}} >
      <Text style={{fontSize:18, fontWeight:'700'}}>Tên Bàn :</Text>
      <Input containerStyle={{ width: reponsivewidth(300) }} onChange={(e) => { setValueAreaName(e.nativeEvent.text); } } autoCompleteType={undefined}>
          {IDArea?.Name}
      </Input>
      </View>
      <View style={{marginTop:65, justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{
                    if (IDArea !== undefined)
                      {
                        SaveArea(IDArea.id);
                        setvisibleModalDetail(false);
                        setvisibleModalEdit(false);
                        setvisible(false);
                      }}}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4, marginRight:40}}>
                   <Text style={{color:'#FFFF'}}>
                      Lưu
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{setvisibleModalDetail(false)}}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                   <Text style={{color:'#FFFF'}}>
                      Thoát
                  </Text>
               </TouchableOpacity>
              </View>
  </View>
    )
  }
  return (
    <View>
      <View style={{justifyContent:'center', alignItems:'center',borderBottomColor:'#67bff3', borderBottomWidth:2}}>
          <Text style={{fontSize:16, paddingBottom:5, fontWeight:'700'}}>Khu vực</Text>
      </View>
      <View style={{height:reponsiveheight(280) }}>
        <ScrollView>
          {
            dataArea1.map(item=>{
              return (
                <TouchableOpacity key={item.id} onPress={async()=>{ await setIDArea(item); setvisibleModalDetail(true)}} style={{width:reponsivewidth(340), alignSelf:'center', flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                     <CustomBoxItem Style={{backgroundColor:'#e3e2e287',borderColor:'#6666667d', borderWidth:0.45, borderRadius:0, width:reponsivewidth(280)}} title={item.Name}/>
                     <View style={{justifyContent:'center', alignItems:'center'}} >
                       <AntDesign name="edit"  size={28}/>
                     </View>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </View>
      <View style={{marginTop:65, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{setvisibleModalEdit(false); setvisible(false)}}  style={{ backgroundColor:'#226cb3',padding:10, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                 <Text style={{color:'#FFFF'}}>
                    Thoát
                </Text>
             </TouchableOpacity>
      
      </View>
      <Overlay  isVisible={visibleModalDetail}>
          <View style={{width:reponsivewidth(320), height: reponsiveheight(300)}}>
          <ModalDetalEdit/>
          </View>
      </Overlay>
    </View>
  )
}
    return (
        <>
            <CustomHeader title="Danh sách phòng bàn" onpress={()=>navigation.goBack()}/>
            <Tab indicatorStyle={{backgroundColor:'#67bff3'}}  value={index} onChange={setIndex}>
  <Tab.Item containerStyle={{backgroundColor: '#02569E' }} titleStyle={{color:'#fff',fontSize:14}}  title="Tất cả" />
  <Tab.Item containerStyle={{backgroundColor: '#02569E' }} titleStyle={{color:'#fff',fontSize:14}}  title="Sử dụng" />
  <Tab.Item containerStyle={{backgroundColor: '#02569E' }} titleStyle={{color:'#fff',fontSize:14}}  title="Còn Trống" />
</Tab>
 <TabView value={index} onChange={setIndex}  >
 <TabView.Item style={{  width: '100%' }}>
      <AllRooms navigation={navigation} DataArea={dataArea1} DataTable={dataTable}/>
  </TabView.Item>
  <TabView.Item style={{  width: '100%' }}>
    <UsingRooms  navigation={navigation} DataArea={dataArea1} DataTable={dataTable} />
  </TabView.Item>
  <TabView.Item style={{  width: '100%' }}>
    <EmptyRooms  navigation={navigation} DataArea={dataArea1} DataTable={dataTable} />
    </TabView.Item>
 </TabView>
 <SpeedDial containerStyle={{marginBottom:75}}
  color="#02569E"
  isOpen={openhistory}
  icon={<MaterialCommunityIcons name="note-multiple-outline" size={25} color={'#FFFF'}/>}
  openIcon={{ name: 'close', color: '#fff' }}
  onOpen={() => {setOpenHistory(!openhistory); setOpen(false)}}
  onClose={() => setOpenHistory(!openhistory)}
  transitionDuration={30}
>

   <SpeedDial.Action
    color={'#02569E'}
    icon={<AntDesign name="profile" size={22} color={'#FFFF'}/>}
    title="Lịch sử đặt bàn"
    onPress={()=>{setvisibleHisTable(true)}}
  />
   <SpeedDial.Action
    color={'#02569E'}
    icon={<FontAwesome5 name="money-check-alt" size={22} color={'#FFFF'}/>}
    title="Lịch sử thanh toán"
    onPress={()=>{setvisibleHisPaying(true)}}
  />
</SpeedDial>
 <SpeedDial
  color="#02569E"
  isOpen={open}
  icon={{ name: 'edit', color: '#fff' }}
  openIcon={{ name: 'close', color: '#fff' }}
  onOpen={() => {setOpen(!open); setOpenHistory(false)}}
  onClose={() => setOpen(!open)}
  transitionDuration={30}
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
  <SpeedDial.Action
    color={'#02569E'}
    icon={<MaterialIcons name="delete" size={25} color={'#FFFF'}/>}
    title="Xóa khu vực"
    onPress={()=>{setvisible(true); setvisibleModalAreaDel( true); }  }
  />
   <SpeedDial.Action
    color={'#02569E'}
    icon={<MaterialCommunityIcons name="table-remove" size={25} color={'#FFFF'}/>}
    title="Xóa bàn"
    onPress={()=>{setvisible(true); setvisibleModalTableDel( true)}  }
  />
   <SpeedDial.Action
    color={'#02569E'}
    icon={<MaterialCommunityIcons name="table-remove" size={25} color={'#FFFF'}/>}
    title="Chỉnh sửa Khu vực"
    onPress={()=>{setvisible(true); setvisibleModalEdit( true)}  }
  />
</SpeedDial>
  <Overlay isVisible={visible}>
    {visibleModatable === true ?
      <ModalTable/>
      : visibleModaArea === true ?
       <ModalArea/>
       : visibleModaAreaDel === true ?
       <ModalAreaDeleted/>
       : visibleModaATableDel === true  ?
       <DelTable/>
       : visibleModaEdit === true ? 
       <ModalEditArea/> : undefined
   }
  </Overlay>
  <Overlay isVisible={visibleHisTable}>
      <HistoryBookTable getvisible={setvisibleHisTable}/>
  </Overlay>
  <Overlay isVisible={visibleHisPaying}>
      <HistoryPaying getvisible={setvisibleHisPaying}/>
  </Overlay>
</>

    );

};
export default RoomScreen;
