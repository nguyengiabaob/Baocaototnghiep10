import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { reponsivewidth } from "../../theme/Metric";

const WageDetail =()=>{
    return (
        <SafeAreaView>
            
            <View style={{flexDirection:'row'}}>
                <Text style={[styles.style_Label]} >
                    Ngày :
                </Text>
                <Text >
                    {'23/12/2021'}
                </Text>
            </View>
            <View style={{flexDirection:'row', marginBottom:15}}>
                <View style={{flex:0.2}}>
                <Text style={[styles.style_Label]} >
                    Nhân viên :
                </Text>
                </View>
                <View style={{flex:0.8}}>
                <Text >
                    {'Nguyễn Văn A'}
                </Text>
                </View>
                
            </View>
            <View style={{flexDirection:'row', marginBottom:15}}>
                <View style={{flex:0.2}}>
                <Text style={[styles.style_Label]} >
                    Chức vụ :
                </Text>
                </View>
                <View style={{flex:0.8}}>
                <Text >
                    {'Nguyễn Văn A'}
                </Text>
                </View>
                
            </View>
            <View style={{flexDirection:'row', marginBottom:15}}>
                <View style={[{flex:0.2}]}>
                    <Text style={[styles.style_Label]}>
                        Thời gian làm việc
                    </Text>
                </View>
                <View style={{flex:0.8}}>
                    <TouchableOpacity style={[styles.btn_shadow,{padding:15}]}>
                        <Text>
                            Nhấp xem thời gian làm việc
                        </Text>
                    </TouchableOpacity>
                
                </View>
             
            </View>
            <View style={{flexDirection:'row', marginBottom:15}}>
                <View style={{flex:0.2}}>
                <Text style={[styles.style_Label]} >
                    Lương cơ bản :
                </Text>
                </View>
                <View style={{flex:0.8}}>
                    <TextInput
                        editable={false}
                        mode="outlined"
                        outlineColor="#02569E"
                        style={{ width: reponsivewidth(350) }} 
                        autoCompleteType={undefined}
                    />
                </View>
                
            </View>
            <View style={{flexDirection:'row', marginBottom:15}}>
                <View style={{flex:0.2}}>
                <Text style={[styles.style_Label]} >
                    Tổng lương :
                </Text>
                </View>
                <View style={{flex:0.8}}>
                    <TextInput
                        editable={false}
                        mode="outlined"
                        outlineColor="#02569E"
                        style={{ width: reponsivewidth(350) }} 
                        autoCompleteType={undefined}
                    />
                </View>
                
            </View>
            <View>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.btn_add}>
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default WageDetail
const styles = StyleSheet.create({
    style_Label: {
        fontWeight: '700',
        marginRight:10,
    },
    btn_shadow: {
        shadowColor:'#000',
            shadowOffset:{
                width:0,
                height:2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 10,
    },
    btn_add: {
        alignItems: 'center',
        backgroundColor: '#02569E',
        width: reponsivewidth(150),
        borderRadius: 80,
        flexDirection: 'row',
        justifyContent: 'center',
      },

})