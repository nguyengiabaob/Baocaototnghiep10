/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle,  Text, Pressable, TouchableOpacity } from 'react-native';
import { getwidth, reponsiveheight  } from '../theme/Metric';
import  AntIcon from 'react-native-vector-icons/AntDesign';
type Props={
    textStyle?: StyleProp<TextStyle>,
    viewstyle?: StyleProp<ViewStyle>,
    onpress?: ()=> void ,
    title: string,
    viewContainer?: StyleProp<ViewStyle>,
}
const CustomHeader: React.FC<Props> = ({

    textStyle,
    viewstyle,
    onpress,
    viewContainer,
    title,
}:Props) =>{
    return (
        <View style={[style.container, viewContainer]}>
            <View  style={[style.button, viewstyle]}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent:'center'}}>
                    <TouchableOpacity style={{flex:0.1}} onPress={onpress ? onpress : undefined }>
                    <AntIcon style={{marginLeft:10, color:'#FFF'}} onPress={onpress ? onpress : undefined } name="arrowleft" size={30}/>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', marginTop:-15, justifyContent:'center', flex:0.9}}>
                        <Text style={[style.title, textStyle]}>{title}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

};
const style = StyleSheet.create({
    container: {
        //   flex: 1,
    },
    title:
    {
        color: '#FFFF',
        marginTop: 15,
        fontWeight: 'bold',
        fontSize:17,
    },
    button:{
        backgroundColor:'#67bff3',
        width: getwidth(),
        height: reponsiveheight(50),
      
        
    },
});
export default CustomHeader;
