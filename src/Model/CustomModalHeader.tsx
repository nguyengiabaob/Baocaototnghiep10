/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SearchBar, Text } from "react-native-elements";
import { reponsiveheight, reponsivewidth } from "../theme/Metric";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
type props ={
    onvisible?: ()=>void,
    parentcallback: (child: any)=>void
}
export const ModalHeader: React.FC<props> = ({onvisible, parentcallback}:props)=>{
    const [visibleSearch,setvisibleSearch]= useState<boolean>(false);
    const [Search,setSearch]= useState<string>('');
    return (
        <View style={{backgroundColor:'#67bff3',padding:15}}>
            { visibleSearch === false ?
            <View style={{flexDirection:'row', justifyContent:'center'}}>
                <View style={{alignSelf:'flex-start', justifyContent:'flex-start', width:reponsivewidth(50)}}>
                <TouchableOpacity onPress={onvisible}>
                   <MaterialIcons name="clear" size={28} color='#efefef'/>
                </TouchableOpacity>
                </View>
                <Text style={{alignSelf:'center',fontSize:17, width:reponsivewidth(250), textAlign:'center'}}> Mã Đơn hàng</Text>
                <View style={{alignSelf:'flex-start', justifyContent:'flex-start', width:reponsivewidth(50)}}>
                <TouchableOpacity style={{alignSelf:'flex-end', justifyContent:'flex-end'}} onPress={()=>setvisibleSearch(true)}>
                <EvilIcons name="search" size={28} color='#efefef'/>
                </TouchableOpacity>
                </View>
            
            </View>
           : 
           <View style={{flexDirection:'row', justifyContent:'center'}}>
               <SearchBar 
               lightTheme={true}
               containerStyle={{width:reponsivewidth(300),height:reponsiveheight(60),borderRadius:5}}
               inputContainerStyle={{height:reponsiveheight(40)}}
               onChange={(e)=>{parentcallback(e.nativeEvent.text) ; setSearch(e.nativeEvent.text)}}
               placeholder="Type Here..."
                
               value={Search}
              />
                <View style={{alignSelf:'flex-start', justifyContent:'center',alignItems:'center', width:reponsivewidth(50), height:reponsiveheight(60) }}>
                <TouchableOpacity  style={{alignSelf:'flex-end', justifyContent:'center', alignItems:'center'}} onPress={()=>setvisibleSearch(false)}>
                 <Text style={{fontSize:16,color:'#efefef', fontWeight:'700' }}>Hủy</Text>
                </TouchableOpacity>
                </View>
            
            </View>
           }
        </View>
    )
}