/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle,TouchableOpacity } from 'react-native';
import  AntIcon from 'react-native-vector-icons/AntDesign';
import Materiallcons from 'react-native-vector-icons/MaterialIcons';
import { getwidth, reponsiveheight, reponsivewidth } from '../theme/Metric';
type props ={
    onpress?: ()=>void
    textStyle?: StyleProp<TextStyle>,
    viewstyle?: StyleProp<ViewStyle>,
    textcount?: string
    onpressdel?:()=>void
}
export const  ModelDelete: React.FC<props> = ({onpress,
viewstyle,textcount,onpressdel}:props)=>{
    return (
        <View style={[styles.styledetail ,viewstyle ]}>
            <Pressable style={{marginLeft:13}}  onPress={onpress ? onpress : undefined }>
                    <AntIcon style={{marginLeft:10}} onPress={onpress ? onpress : undefined } name="arrowleft" size={30} color="#454444"/>
            </Pressable>
            <Text style={{fontSize:16,marginLeft:20}}>{textcount}</Text>
            <TouchableOpacity onPress={onpressdel} style={{display:'flex', flexDirection:'row', marginLeft:200 ,alignItems:'center'}}>
                    <Materiallcons  name="delete"  size={30} color="#454444"/>
                    <Text style={{fontSize:16}}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create(
    {
        styledetail:{
            backgroundColor:'#e9e9e9',
            width: getwidth(),
            height: reponsiveheight(80),
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            display:'flex',
            flexDirection:'row',
            borderColor:'#a5a5a5',
            borderWidth:1,
            alignItems:'center',
        },
    }
)