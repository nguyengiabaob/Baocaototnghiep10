/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
type props= {
    title?:string,
    onPress?:()=>void,
    style?:ViewStyle
}
const CustomHyperLink: React.FC<props> = ({
    title,
    onPress,
    style
}:props)=>{
    const [hover,sethover] = useState<boolean>(false);
    return (
        <View style={style}>
            <Text style={hover ? styles.red : styles.normal } onPress={onPress}>
                {title}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create(
    {
        red:
        {
            color:'red',
        },
        normal:
        {
            color:'#19a9d6',
            fontSize:16,
        }  
    }
)
export default CustomHyperLink