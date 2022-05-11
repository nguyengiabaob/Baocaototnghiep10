/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode } from "react";
import { ImageSourcePropType, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { reponsiveheight, reponsivewidth } from "../theme/Metric";
type props ={
    Avatarimg ?: any,
    title?: string,
    subtitle?: string
    isBadge?: boolean,
    BadgeSucess?: number,
    BadgeDontRead?: number,
    BadgeUnAccept?:number,
    onPress?: ()=>void,
    Style?: StyleProp<ViewStyle>,
    newButton?: ReactNode,
    IsnotButton?: boolean,
}
const CustomBoxItem: React.FC <props> =  ({Avatarimg, title,isBadge, BadgeSucess, BadgeDontRead,onPress,BadgeUnAccept,Style,newButton,IsnotButton}:props)=> {
    return (
        IsnotButton === true ? (
        <View style={[style.container, Style]}>
            <View style={{paddingLeft:25, paddingTop:15, paddingBottom:15}}>
            <Avatar containerStyle={{width:reponsivewidth(45), height:reponsiveheight(45)}} avatarStyle={{width:reponsivewidth(45), height:reponsiveheight(45)}} rounded source={Avatarimg}
                />
            </View>
            <View style={style.containerTitle}>
                <Text style={style.title}>{title}</Text>
            </View>
            {isBadge ? <View style={{display: 'flex', flexDirection:'row', alignSelf:'center'}}>
                <Badge status="primary" badgeStyle={{marginLeft:5}} value={BadgeSucess}/>
                <Badge status="warning" badgeStyle={{marginLeft:5}} value={BadgeDontRead}/>
                <Badge status="error" badgeStyle={{marginLeft:5}} value={BadgeUnAccept}/>
            </View> : undefined}
            {newButton ? newButton : undefined}
        </View>
        )
        : (
        <TouchableOpacity style={[style.container, Style]} onPress={onPress}>
            <View style={{paddingLeft:25, paddingTop:15, paddingBottom:15}}>
                {Avatarimg}
            </View>
            <View style={style.containerTitle}>
                <Text style={style.title}>{title}</Text>
            </View>
            {isBadge ? <View style={{display: 'flex', flexDirection:'row', alignSelf:'center'}}>
                <Badge status="primary" badgeStyle={{marginLeft:5}} value={BadgeSucess}/>
                <Badge status="warning" badgeStyle={{marginLeft:5}} value={BadgeDontRead}/>
                <Badge status="error" badgeStyle={{marginLeft:5}} value={BadgeUnAccept}/>
            </View> : undefined}
            {newButton ? newButton : undefined}
        </TouchableOpacity>
        )
    );
};
export default CustomBoxItem;
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
            marginTop:15,
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
            marginHorizontal:'10%',
            paddingTop:10,
            paddingLeft:10,
            paddingBottom:10,
            alignSelf:'center',
        }

    }
) 