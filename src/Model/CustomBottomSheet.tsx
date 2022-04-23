/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
type dataOption= {
    title: string, 
    onPress: ()=> void
}
import { BottomSheet, ListItem } from 'react-native-elements';
type props= {
    Listitem: dataOption [],
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
            <TouchableOpacity onPressIn={()=>{item.onPress();}}>
             <ListItem  key={index} hasTVPreferredFocus={undefined} tvParallaxProperties={undefined} >
                   <ListItem.Content>
                        <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
             </ListItem>
             </TouchableOpacity>
             )
         })}
        </BottomSheet>
    )
}