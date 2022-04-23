/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { ImageSourcePropType, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { reponsiveheight, reponsivewidth } from "../theme/Metric";
import Entypo from 'react-native-vector-icons/Entypo';
type props ={
    avatar ?: ImageSourcePropType,
    title?: string,
    subtitle?: string
    onpresslong?: ()=>void,
    isAvatar: boolean,
    pressed?: boolean,
    stylecontainet?: StyleProp<ViewStyle>
    styles? : StyleProp<ViewStyle>
}
const CustomBox: React.FC <props> =  ({avatar, title, subtitle, isAvatar, pressed, stylecontainet, styles}:props)=> {
    return (
        <View style={[style.container, styles] }>
             { isAvatar === true ? (
            <View style={{paddingLeft:25, paddingTop:15, alignSelf:'center', alignItems:'center'}}>
                <Avatar containerStyle={{width:reponsivewidth(45), height:reponsiveheight(45)}} avatarStyle={{width:reponsivewidth(45), height:reponsiveheight(45)}} rounded source={avatar}
                />
                {/* <Badge
                    badgeStyle={{width:reponsivewidth(10), height:reponsiveheight(10)}}
                    status="success"
                    containerStyle={{right:-20, top:-5 }}
                /> */}
            </View>)
            : undefined
             }
            <View style={[style.containerTitle, stylecontainet]}>
                <Text style={style.title}>{title== 'none' ? '' :title }</Text>
                <Text style={style.subtitle}>{subtitle == 'none' ? '' : subtitle}</Text>
            </View>

            {pressed === true && <View style={{width:reponsivewidth(65), alignItems:'center'}}><Entypo style={ {alignSelf:'center'}} name="check" color="#1b9d2f" size={30}/></View> }
        </View>
    );
}
export default CustomBox
const style = StyleSheet.create(
    {
        container:
        {
            display:'flex',
            backgroundColor:'#FFF',
            flexDirection:'row',
            width:'90%',
            alignSelf:'center',
            borderRadius:10,
            marginTop:10,
            marginBottom:8,
        },
        title:
        {
            fontSize:16,
            fontWeight: '700',
          

        },
        subtitle:
        {
            color:'#9b9b9b',
            fontSize:14,

        },
        containerTitle:
        {
            marginHorizontal:'5%',
            padding:25,
            width:reponsivewidth(180)
        }

    }
) 