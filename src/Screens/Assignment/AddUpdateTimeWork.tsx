/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import CustomInput from '../../Model/CustomInput';
import * as element from 'react-native-elements';
import { useAppSelector } from '../../redux/hook';
import { selectAuth } from '../../redux/reducer/authslice';
import { reponsiveheight, reponsivewidth } from '../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OptionModal from './OptionModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import data from '../../services/data';
import { CustomNotification } from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
type props = {
    Item ? : any;
    visible: boolean;
    onCancel: (val: any)=> void;
    ReadOnly?: boolean
}

const AddUpdateTimeWork :React.FC<props> = ({Item, visible,onCancel,ReadOnly})=>{
console.log(Item);
const [itemDetail,setItemDetail] = useState<any>();
const {typeUser} = useAppSelector(selectAuth);
const [visibleTypeSelection,setvisibleTypeSelection] = useState<boolean>(false);
const [TypeSelection,setTypeSelection] = useState<any>();
const [showdatepicker,setShowDatePicker] = useState<any>(false);
const [showdatepickervalue,setshowdatepickervalue] = useState<Date>( new Date());
const [datepickervalue,setdatepickervalue] = useState<string>();
const [Add, setAdd] = useState<boolean>(false);
const [Update, setUpdate] = useState<boolean>(false);
const [Error,setError] = useState<boolean>(false);
const onChange = (event: Event, selectdate: any) => {
  var currentDate = selectdate || showdatepickervalue;
  setShowDatePicker(false);
  setshowdatepickervalue(currentDate);
  let pickdate = new Date(currentDate);
  let textdate = pickdate.getDate() + '/' + (pickdate.getMonth() + 1) + '/' + pickdate.getFullYear();
  setdatepickervalue(textdate);
};

const ListTypeTimeWork = [
    {
    key: 1,
    id: 1 ,
    title: 'Chung',
    Action: (val: any)=> {setTypeSelection(val); setvisibleTypeSelection(false);},
   },
   {
    key: 2,
     id: 2,
     title: 'Riêng',
     Action: (val: any)=> {setTypeSelection(val); setvisibleTypeSelection(false);},
   },
  ];
const intitalTimeWork = {
    Day: '',
    Name :'',
    Description: '',
    Type: 0,
};
useEffect(()=>{});
useEffect(()=>{
  console.log(showdatepickervalue);
   if (Item)
   {
      let a = ListTypeTimeWork.find(x=>x.id === Item.Type);
      if (a)
      {
        setTypeSelection(a);
      }

      if (Item.Type == 2 )
      {
        let date = new Date();
        if (Item.Day)
        {
         date = new Date(Item.Day);
        }


        let stringDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        console.log(stringDate);
        setdatepickervalue(stringDate);
        setshowdatepickervalue(date);
      }
      setItemDetail(Item);
   }
   else
   {
    let date = new Date();
    let stringDate = date .getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        setItemDetail(intitalTimeWork);
        setshowdatepickervalue(new Date());
        setdatepickervalue(stringDate);
        setTypeSelection(undefined);

   }
},[Item]);
const CheckAddOrUpdate = (val)=>{
  if (val.Name === '' || val.Type === 0)
  {
      return false;
  }
  return true;

};
const addTimeWork = (val:any)=>{
  if (TypeSelection)
  {
    val.Type = TypeSelection.id;
    if (TypeSelection.id === 1)
    {
      delete val.Day;
    }
  }
  if (val.Type === 2 )
  {
    val.Day = new Date(showdatepickervalue).toDateString();
  }
  if (val.Description === '')
  {
    delete val.Description;
  }
  let newdata = {
    ...val,
  };
  console.log('newdata',newdata);
  if (CheckAddOrUpdate(newdata))
  {
    data.PostTimeWork2(newdata).then((res)=>{
      setAdd(true);

    });
  }
  else
  {
    setError(true);
  }
};
const SaveTimeWork = (val)=>{
  if (TypeSelection && TypeSelection !== val.Type )
  {
    if (TypeSelection.id == 1)
      {
        delete val.Day;
      }
    val.Type = TypeSelection.id;
  }
  if (val.Type == 2 )
  {
    val.Day = new Date(showdatepickervalue).toDateString();
  }
  if (val.Description === '')
  {
    delete val.Description;
  }
  let newdata = {
    ...val,
  };
  console.log('newdata',newdata);
  if (CheckAddOrUpdate(newdata))
  {
    data.UpdateTimeWork2(newdata).then((res)=>{
      setUpdate(true);

    });
  }
  else
  {
    setError(true);
  }
};

    return (
    <Overlay isVisible ={visible}>
        <SafeAreaView
        style={{
            width: reponsivewidth(320),
            height: ReadOnly === true ? reponsiveheight(380) :   TypeSelection && TypeSelection.id === 2 ? reponsiveheight(600) : reponsiveheight(500),
          }}
        >
            <View style={styles.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
             {ReadOnly === true ? 'Thông tin ca '  : itemDetail?.id && typeUser == 0 ? 'Chỉnh sửa ca' : (itemDetail?.id  && typeUser && typeUser > 0) ? 'Chi tiết ca' : 'Thêm ca' }
          </Text>
        </View>
        <View style={{marginTop: 25, justifyContent: 'center'}}>
          {ReadOnly ? ReadOnly === true ?
       
            <View style={{flexDirection:'row', marginLeft:5 }}>
              <Text style={{fontWeight:'700', fontSize:15, flex: 0.2}}>
                Tên ca : 
              </Text>
              <Text style={{ flex: 0.8, textAlign:'left' , marginLeft:15}}>
                  {itemDetail?.Name}
              </Text>
              </View>
            :
          <CustomInput
            style={{width: reponsivewidth(300), marginLeft: 5}}
            title="Tên ca"
            onchange={text => {
                let a = itemDetail;
                a.Name = text;
                setItemDetail(a);
            }}
            text={itemDetail?.Name}
          />
          : <CustomInput
          style={{width: reponsivewidth(300), marginLeft: 5}}
          title="Tên ca"
          onchange={text => {
              let a = itemDetail;
              a.Name = text;
              setItemDetail(a);
          }}
          text={itemDetail?.Name}
        />
          }
        </View>
        { ReadOnly!== true && 
        <View style={{marginTop: 25, justifyContent: 'center'}}>
            <TouchableOpacity onPress={()=>setvisibleTypeSelection(true)} style={[styles.Shadowbox,{flexDirection:'row', alignItems:'center', padding:10}]}>
                <View style={{flex: 0.9, alignSelf:'center', alignItems:'center', backgroundColor:'res'}}>
                  <Text style={{marginLeft:18}}>{TypeSelection ? TypeSelection.title : 'Chọn Loại ca' }</Text>
                </View>
                <View style={{flex: 0.1}}>
                  <MaterialIcons name="arrow-drop-down" size={30}/>
                </View>
            </TouchableOpacity>
        
        </View>
        }    
        {  TypeSelection && TypeSelection.id === 2  &&
           <View style={{marginTop: 25, justifyContent: 'center'}}>
           <View style={[{flexDirection:'row', alignItems:'center', padding:10,borderBottomColor:'#000000', borderBottomWidth:0.8}]}>
               <View style={{flex: 0.9, alignItems:'center'}}>
                 <element.Text style={{marginLeft:18 }}>{ datepickervalue ? datepickervalue : 'Chọn ngày' }</element.Text>
               </View>
               <View style={{flex: 0.1}}>
                 <MaterialIcons onPress={()=> setShowDatePicker(true)} name="calendar-today" size={30}/>
               </View>
           </View>
       </View>
        }
        <View style={{marginTop: 25, justifyContent: 'center'}}>
          {
            ReadOnly == true &&
            <Text style={{fontWeight: '700',marginLeft: 5, marginBottom: 15}}>
              Chú thích : 
            </Text>
          }
          <TextInput 
            editable={ReadOnly === true ? false  : true}
            textAlignVertical = "top"
            scrollEnabled={true}
            multiline
            style={[styles.SquareContainer,{ width: reponsivewidth(300), marginLeft: 5, height:reponsiveheight(100) }]}
            placeholder="Chú thích"
            onChange={e => {
                let a = itemDetail;
                a.Description = e.nativeEvent.text;
                setItemDetail(a);
            }}
          >
              {itemDetail?.Description  ?  itemDetail?.Description : ''}
          </TextInput>
        
        </View>

       {
           itemDetail?.id && typeUser == 0 && ReadOnly!= true  ?
           <View
           style={{marginTop: 45, alignItems: 'center', flexDirection: 'row'}}>
           <TouchableOpacity
             onPress={() => {
                SaveTimeWork(itemDetail);
             }}
             style={{
               marginHorizontal: 40,
               backgroundColor: '#226cb3',
               padding: 5,
               width: reponsivewidth(100),
               justifyContent: 'center',
               alignItems: 'center',
               borderRadius: 4,
             }}>
             <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
                 Lưu
             </Text>
           </TouchableOpacity>
           <TouchableOpacity
             onPress={() => {
               onCancel(false);
             }}
             style={{
               backgroundColor: '#226cb3',
               padding: 5,
               width: reponsivewidth(100),
               justifyContent: 'center',
               alignItems: 'center',
               borderRadius: 4,
             }}>
             <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
               Thoát
             </Text>
           </TouchableOpacity>
         </View>
         : itemDetail?.id && typeUser &&  typeUser > 0  || ReadOnly === true ? <View style={{alignItems:'center'}}>
              <TouchableOpacity
             onPress={() => {
                onCancel(false);
             }}
             style={{
               backgroundColor: '#226cb3',
               padding: 5,
               width: reponsivewidth(100),
               justifyContent: 'center',
               alignItems: 'center',
               borderRadius: 4,
               marginTop:45,
             }}>
             <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
               Thoát
             </Text>
           </TouchableOpacity>
         </View>
         :
         <View
           style={{marginTop: 45, alignItems: 'center', flexDirection: 'row'}}>
           <TouchableOpacity
             onPress={() => {
                addTimeWork(itemDetail);
             }}
             style={{
               marginHorizontal: 40,
               backgroundColor: '#226cb3',
               padding: 5,
               width: reponsivewidth(100),
               justifyContent: 'center',
               alignItems: 'center',
               borderRadius: 4,
             }}>
             <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
                 Thêm
             </Text>
           </TouchableOpacity>
           <TouchableOpacity
             onPress={() => {
                onCancel(false);
             }}
             style={{
               backgroundColor: '#226cb3',
               padding: 5,
               width: reponsivewidth(100),
               justifyContent: 'center',
               alignItems: 'center',
               borderRadius: 4,
             }}>
             <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
               Thoát
             </Text>
           </TouchableOpacity>
         </View>
       }
       {showdatepicker &&  (  <DateTimePicker
                        value={showdatepickervalue}
                        display={'calendar'}
                        mode={'date'}
                        is24Hour={true}
                        onChange={onChange}
                        />
      )}
       <OptionModal Selected={TypeSelection} visible={visibleTypeSelection} options={ListTypeTimeWork} title={'Chọn loại'} onCancel={setvisibleTypeSelection} />
        </SafeAreaView>
        <CustomNotification
        visible={Add}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => {setAdd(false);  onCancel(false);}}
        Content="Bạn đã thêm thành công !"
      />
       <CustomNotification
        visible={Update}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => {setUpdate(false); onCancel(false);}}
        Content="Bạn đã cập nhật thành công !"
      />
      <CustomNotification
        visible={Error}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => setError(false)}
        Content="Xin vui lòng nhập đầy đủ thông tin !"
      />
        </Overlay>
    );
};
export default AddUpdateTimeWork;
const styles = StyleSheet.create({
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
    btnDel: {
      marginLeft: 25,
    },
    SquareContainer: {
      borderColor: '#c6c5c5',
      borderWidth: 0.8,
      borderRadius:10,
    },
    Shadowbox: {
      backgroundColor: '#f5f5f5',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  });
