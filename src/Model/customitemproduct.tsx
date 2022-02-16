/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle, TouchableOpacity, Text } from 'react-native';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Anticon from 'react-native-vector-icons/AntDesign';
import { Checkbox } from 'react-native-paper';
import DataService from '../services/dataservice';
import { Units } from './Unit';
type Props={
    textStyle?: StyleProp<TextStyle>,
    viewstyle?: StyleProp<ViewStyle>,
    item?: any,
    icon?: any,
    onpressedit?: ()=> void ,
    //onpressdel?: ()=> void ,
    title: string,
    price: number,
    quanity: number,
    checked: boolean,
    oncheck?: (id:string , check: boolean)=> void
    setmodelDel: (value: any)=>void
    unitId?: string

}
const Customitemproduct: React.FC<Props> = ({
    textStyle,
    viewstyle,
    onpressedit,
    setmodelDel,
    oncheck,
    //onpressdel,
    item,
    icon,
    title,
    price,
    quanity,
    checked,
    unitId
}:Props) =>{
    const [nameunit, setNameUnit]= useState<string>();
    console.log('56456456',unitId)
    const getNameUnit=useCallback( async()=>{
        if (unitId)
        {
          
           let a =  await DataService.Getdata_dtServiceById<Units>('Units',unitId);
           setNameUnit(a.Name);
        }

    },[unitId])
    useEffect(()=>{
        getNameUnit();
    },[getNameUnit]);
    
    return (
        <View style={style.container}>
            <View style={[style.button, viewstyle]}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                    <View style={{marginRight:4, marginLeft:15}}>
                        <Checkbox onPress={()=>{setmodelDel(true); oncheck && oncheck(item.id,checked)}} color="#02569E" status={checked === true ? 'checked' : 'unchecked' }/>
                    </View>
                   <View style={{marginHorizontal:0.3, flex:0.2}}>
                       {icon}
                   </View>
                   <View style={{flexDirection: 'column',  alignItems: 'center', justifyContent:'center',flex:0.7}}>
                   <Text style={[style.title, textStyle,{fontWeight:'bold',fontSize:16, width:reponsivewidth(210),textAlign:'center'}]}>{title}</Text>
                   <View style={{marginTop:15}}>
                   <Text style={[style.title2, textStyle, {fontStyle:'italic'}]}>Giá  : {Number(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text style={[style.title2, textStyle,{fontStyle:'italic'}]}>KL / SL: {quanity} {unitId && nameunit}</Text>
                   </View>
                    </View>
                    <View style={{flex:0.2, flexDirection: 'column',marginRight:10 }}>
                    <TouchableOpacity onPress={onpressedit ? onpressedit : undefined} style={style.buttonedit}>
                        <FontAwesome5 style={{marginLeft:1}} name ="edit" size={20} color="#FFF"/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity  onPress={onpressdel ? onpressdel : undefined} style={[style.buttondel, {marginRight:5}]}>
                        <Anticon style={{marginLeft:2}} name ="delete" size={20}  color="#FFF"/>
                    </TouchableOpacity> */}
                    </View>
                </View>
            </View>
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
        fontSize:20,
        marginLeft: 8,
        paddingHorizontal: 40,
    },
    title2:
    {
        color: 'black',
        marginTop: 5,
        fontWeight: 'bold',
        fontSize:15,
        marginLeft:10,
        paddingHorizontal: 40,
    },
    button:{
        borderRadius: 20,
        // borderWidth:1,
        // borderColor:'#7c7c7c',
        backgroundColor:'#FFF',
        width: reponsivewidth(380),
        height: reponsiveheight(140),
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonedit:
    {
        borderRadius:50,
        backgroundColor: '#44b0fb',
        padding: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttondel:
    {
        borderRadius:50,
        backgroundColor: '#ff4b4b',
        padding: 10,
        alignItems: 'center',
        justifyContent:'center',
        marginTop:10,
    },
});
export default Customitemproduct;
