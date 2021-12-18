/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, View } from 'react-native';
import { Overlay, Text } from 'react-native-elements';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
type props ={
    visible: boolean,
    onCancel?: ()=>void
    iconTitle?:any,
    title?:string
    iconContent?:any,
    Content?:string,
};  
export const CustomNotification:React.FC<props> = ({visible,iconTitle,title, iconContent, Content,onCancel}:props)=>{
    return (
        <Overlay overlayStyle={{height:reponsiveheight(300), width:reponsivewidth(360), borderRadius:5}} isVisible={visible} >
        <View style={{borderBottomColor:'#979797', justifyContent:'center',alignItems:'center', borderBottomWidth:2,flexDirection:'row'}}>
        {/* <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)}/> */}
        {iconTitle}
            <Text style={{fontSize:18, fontWeight:'700',padding:5}}>{title}</Text>
        </View>
        <View style={{justifyContent:'center', alignItems:'center', height:reponsiveheight(180)}}>
            {iconContent}
            <Text style={{justifyContent:'center',fontSize:16.5, marginTop:15, fontWeight:'800', textAlign:"center"}}>{Content}</Text>
        </View>
        <View style={{marginTop:15, justifyContent:'center', alignItems:'center'}} >
            <Pressable onPress={onCancel} style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Thoát</Text>
            </Pressable>
        </View>
</Overlay>
    )
}