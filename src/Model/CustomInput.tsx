/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { KeyboardTypeOptions, NativeSyntheticEvent, StyleProp, StyleSheet, Text, TextInputEndEditingEventData, TextStyle, View, ViewStyle } from 'react-native';
import { Input, TextProps } from 'react-native-elements';
import { IconNode } from 'react-native-elements/dist/icons/Icon';
import { reponsivewidth } from '../theme/Metric';
type props ={
    title?:string,
    icon?:IconNode,
    style?:ViewStyle,
    errormes?:string,
    secureTextEntry?:boolean,
    onchange?: (text:string)=>void,
    iconRight?:IconNode,
    inputstyle?: StyleProp<TextStyle>,
    keyboardstyle?:KeyboardTypeOptions,
    text?: string
    onendEdit?:(e: NativeSyntheticEvent<TextInputEndEditingEventData>)=>void
 
}
const CustomInput : React.FC<props> = ({
    title,
    icon,
    errormes,
    secureTextEntry,
    onchange,
    style,
    iconRight,
    inputstyle,
    keyboardstyle,
    onendEdit,
    text
  
}:props)=>{
    return (
        <View>
            <Input 
                onEndEditing={onendEdit}
                keyboardType={keyboardstyle}
                inputStyle={inputstyle}
                inputContainerStyle={[styles.container,style]}
                placeholder={title}
                leftIcon={icon}
                
                errorMessage={errormes}
                errorStyle={{color:'red', width:reponsivewidth(200)}}
                secureTextEntry={secureTextEntry}
                underlineColorAndroid="transparent"
                onChangeText={onchange}
                rightIcon={iconRight}
            >
            {text}
            </Input>
        </View>
    );
};
const styles = StyleSheet.create(
    {
        container:
        {
            width:reponsivewidth(300),
            alignSelf:'flex-start',
            
        },
    }
);
export default CustomInput;