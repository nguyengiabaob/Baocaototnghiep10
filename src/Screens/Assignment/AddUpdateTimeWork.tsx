/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Overlay } from "react-native-elements";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import CustomInput from "../../Model/CustomInput";
import { useAppSelector } from "../../redux/hook";
import { selectAuth } from "../../redux/reducer/authslice";
import { reponsiveheight, reponsivewidth } from "../../theme/Metric";
type props = {
    Item ? : any;
    visible: boolean;
    onCancel: (val: any)=> void;
}

const AddUpdateTimeWork :React.FC<props> = ({Item, visible,onCancel})=>{
const [itemDetail,setItemDetail]= useState<any>();
const {typeUser}= useAppSelector(selectAuth);
const intitalTimeWork ={
    Day: '',
    Name :'',
    Description: ''
};

useEffect(()=>{
   if (Item)
   {
       setItemDetail(Item);
   }
   else
   {
        setItemDetail(intitalTimeWork);
   }
},[Item, setItemDetail]);
    return (
    <Overlay isVisible ={visible}>
        <SafeAreaView
        style={{
            width: reponsivewidth(320),
            height: reponsiveheight(400),
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
             {itemDetail?.id && typeUser == 0 ? 'Chỉnh sửa ca' : (itemDetail?.id  && typeUser && typeUser > 0) ? 'Chi tiết ca' : 'Thêm ca' }
          </Text>
        </View>
        <View style={{marginTop: 25, justifyContent: 'center'}}>
          <CustomInput
            style={{width: reponsivewidth(300), marginLeft: 5}}
            title="Tên ca"
            onchange={text => {
                let a= itemDetail ;
                a.Name = text; 
                setItemDetail(a);
            }}
            text={itemDetail?.Name}
          />
        </View>
        <View style={{marginTop: 25, justifyContent: 'center'}}>

          <TextInput
            style={{width: reponsivewidth(300), marginLeft: 5}}
            placeholder="Chú thích"
            multiline={true}
            numberOfLines={5}
            onChange={text => {
                let a= itemDetail;
                a.Description = text;
                setItemDetail(a);
            }}
          >
              {itemDetail?.Description ?  itemDetail?.Description : ''}
          </TextInput>
        </View>
       {
           itemDetail?.id && typeUser ==0  ? 
           <View
           style={{marginTop: 30, alignItems: 'center', flexDirection: 'row'}}>
           <TouchableOpacity
             onPress={() => {
              
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
         : itemDetail?.id && typeUser &&  typeUser > 0 ? <View style={{alignItems:'center'}}>
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
         :
         <View
           style={{marginTop: 30, alignItems: 'center', flexDirection: 'row'}}>
           <TouchableOpacity
             onPress={() => {
                
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
        </SafeAreaView>
        </Overlay>
    )
}
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
  });