/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, Text, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import { Overlay, SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { overlay } from 'react-native-paper';
import { getheight, reponsiveheight, reponsivewidth } from '../theme/Metric';
import CustomBox from './CustomBox';
import Entypo from 'react-native-vector-icons/Entypo';

type props={
  Visible :boolean,
  onClosed: ()=>void,
  title?: string,
  valueSearch: string, 
  placeHolder: string,
  onChangeText: (e: NativeSyntheticEvent<TextInputChangeEventData>) => any,
  Data: any[];

}

export const ModalMutipleSelected: React.FC<props> = ({Visible, onClosed,title,valueSearch,placeHolder, onChangeText,Data}:props)=>{
const modalizeRef = useRef<Modalize>(null);
const [valueSearching,setvalueSearching] = useState<string>();
const [dataSelected, setdataSelected]  = useState<string []>([]);
const [dataQuery,setdataquery]= useState<any[]>([]);
useEffect(()=>{
    if (Visible === true)
    {
        modalizeRef.current?.open();
    }
},[Visible]);
const onsearch = useCallback((valuesearch: string)=>
{  
    if (valuesearch.length > 0)
    {
       var user= Data.filter(item=> item.Name.toLowerCase().includes(valuesearch));
       if (user.length>0)
       {
           setdataquery(user);
       }
       else
       {
           setdataquery([{error: 'Nhân viên không tìm thấy'}]);
       }
    }
    else
    {
        if (valuesearch.length < 0 || valuesearch === '' || valueSearch === null)
        { 
            setdataquery([]);
        }
    }
}
,[valueSearch,Data]);
useEffect (()=>
{
    onsearch(valueSearch.toLowerCase());
}
,[onsearch, valueSearch]);
const onPress =( id:string,pressed:boolean)=>{
  
        if (pressed)
        {
            setdataSelected(dataSelected.filter(item=>item !== id));
        }
        else
        {
            setdataSelected([id, ...dataSelected]);
        }
}
 const onFinishChoose =()=>{
    let DataSelected : any[]=[];
    for ( let i = 0 ; i < dataSelected.length ; i++ )
  {
    Data.forEach( item => {if ( item.id === dataSelected[i] )
    
    {
        DataSelected.push(item);
    }
    });
  }


}
    return (
         <Modalize ref={modalizeRef} modalHeight={reponsiveheight(750)}  onClosed={onClosed} rootStyle={{height:reponsiveheight(800)}} >
        <View >
            <View style={{borderBottomColor:'#b7b7b7',borderWidth:1, width:reponsivewidth(400)}}>
                <Text style={{fontSize:18, fontWeight:'700',textAlign:'center', padding:8}}>{title}</Text>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:8}}>
                <SearchBar  containerStyle={{borderBottomColor:'#838282', borderWidth:0.8    , width:reponsivewidth(380), height:reponsiveheight(50),alignItems:'center', justifyContent:'center',borderRadius:4}} onChange={onChangeText}  value={valueSearch} placeholder={placeHolder} platform="android" />
            </View>
            <View>
               <ScrollView>
                    {  console.log(dataQuery.length <= 0 )}
                    {/* {console.log('data',Data)}; */}
                    {dataQuery.length > 0  && !dataQuery[0]?.error ? ( dataQuery.map(item=>{
                        const pressedbox = dataSelected.includes(item.id);
                        //console.log(dataSelected);
                        return (
                            <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                    <CustomBox stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                            </TouchableOpacity>
                        );
                    }))
                        :
                        dataQuery[0]?.error ? <Text style={{fontSize:16, alignSelf:'center', textAlign:'center', marginTop:18}}>{ dataQuery[0].error}</Text>:
                       ( Data.map(item=>{
                            const pressedbox = dataSelected.includes(item.id);
                            //console.log(dataSelected);
                            return (
                                <TouchableOpacity key={item.id}  onPress={()=>{onPress(item.id, pressedbox)}}  style={{ width:reponsivewidth(370) ,flexDirection:'row',borderColor:'#c1bbbb', borderWidth:0.6, marginTop:15, marginLeft:10, height:reponsiveheight(85), justifyContent:'center', alignItems:'center' ,borderRadius:4}}>
                                        <CustomBox stylecontainet={{padding:10}} pressed={pressedbox} isAvatar={true} title={item.Name} subtitle={item.service} avatar={{uri:item.Avatar}}/>
                                </TouchableOpacity>
                            );
                        })
                       )
                    }
               </ScrollView>

            </View>
            <View style={{marginTop:15, justifyContent:'center', alignItems:'center'}} >
            <TouchableOpacity onPress={

            ()=>{
            }

            } style={{ backgroundColor:'#226cb3',padding:5, width:reponsivewidth(100), justifyContent:'center', alignItems:'center',borderRadius:4}}>
                <Text style={{fontSize:16,color:'#FFF',fontWeight:'700'}}>Thoát</Text>
            </TouchableOpacity>
        </View>
        </View>
        </Modalize>
    )
}