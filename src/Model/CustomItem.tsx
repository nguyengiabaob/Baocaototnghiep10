/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
type Props={
    textStyle?: StyleProp<TextStyle>,
    viewstyle?: StyleProp<ViewStyle>,
    icon?: any,
    onpress?: ()=> void ,
    title: string,

}
const Customitem: React.FC<Props> = ({

    textStyle,
    viewstyle,
    onpress,
    icon,
    title,
}:Props) =>{
    return (
        <View style={style.container}>
            <TouchableOpacity onPress={onpress ? onpress : undefined } style={[style.button, viewstyle]}>
                <View style={{flexDirection: 'row', flex: 1, alignItems: 'center',}}>
                   <View style={{marginHorizontal:15}}> 
                       {icon}
                   </View>
                    <Text style={[style.title, textStyle]}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

};
const style = StyleSheet.create({
    container: {
          flex: 1,
          marginTop: 15,
          marginLeft: 5,
    },
    title:
    {
        color: 'black',
        marginTop: 5,
        fontWeight: 'bold',
        fontSize:17,
        marginLeft: 8,
        paddingHorizontal: 40,
    },
    button:{
        borderRadius: 30,
        borderWidth:1,
        borderColor:'#7c7c7c',
        width: reponsivewidth(380),
        height: reponsiveheight(60),
    },
});
export default Customitem;
