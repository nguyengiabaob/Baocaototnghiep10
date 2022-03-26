import React, { useEffect, useState } from 'react'
import {StyleSheet,View, Text, TextStyle, ViewStyle} from'react-native',
import DataService from '../services/dataservice';
import {Userdata} from './User'
type  Col ={
    name:string,
    key: string| number,
    width: string| number

}
type props={
    columns: Col [],
    data: any [],
    textStyle?: TextStyle,
    ViewStyle?: ViewStyle,
}
const TableComponent: React.FC<props> =({columns,data})=>{
    const [ListCheck,setListCheck]= useState<any[]> (); 
    const [ListUser,setListUser]= useState<any[]>();
    const getUser = async()=>{
        let a = await DataService.Getdata_dtService<Userdata>('user');
        let b : any[];
        a.forEach(i=>{
            if(i.type==0)
            {
                b.push(i);
            }
        })
        setListCheck(b);
        setListUser(a);
    }
    useEffect(()=>{
        getUser();
    },[])
    const changeSwitch=(data: any, check:boolean)=>{
        if(check== true)
        {
            setListCheck(ListCheck.filter(i=>i != data))
        }
        else
        {
            setListCheck([data,...ListCheck])
        }
    }
    return (
        <View style={[styles.header_column]}>
          {columns.map( i=> {
              <View  style={{width: i.width}}>
                <Text >{i.name}</Text>
              </View>
          })}
          <View>
              {
                  columns.map(i=>{
                      data.map(data=>{
                          let check = ListCheck.includes(data);
                       return (
                           <View>
                               {
                                   data[i.key]== '2' ?
                                   <View style={{width:i.width}}>
                                         <Switch
                                                value={check}
                                                onValueChange={(value) =>changeSwitch(data,value) }
                                            />
                                    </View>
                                   :
                                   <View style={{width:i.width}}>
                                        <Text>{data[i.key]}</Text>
                                 </View>
                                  
                               }
                           </View>
                       )
                        
                      })
                  })
              }
          </View>
        </View>
    )
}
export default TableComponent
const styles = StyleSheet.create({
    header_column: {
        flexDirection: 'row', 
    }
})