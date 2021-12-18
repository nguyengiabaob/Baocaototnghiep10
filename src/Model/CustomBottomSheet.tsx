/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { BottomSheet, ListItem } from 'react-native-elements';
type props= {
    Listitem: any[],
    Visible: boolean,
}
 export const CustomBottomSheet : React.FC<props> = ({Listitem, Visible}:props)=>{
    return (
        <BottomSheet 
        isVisible={Visible}
        containerStyle={{borderRadius:2}}
        >
         {Listitem.map((item,index)=>{
             return (
             <ListItem key={index} containerStyle={item.containerStyle} onPress={item.onPress} >
                   <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
             </ListItem>
             )
         })}
        </BottomSheet>
    )
}