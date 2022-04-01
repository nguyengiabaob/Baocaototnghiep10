/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import BellNofi from '../../asset/svg/bellnotification.svg';
import Warning from '../../asset/svg/Warning.svg';
import {CustomNotification} from '../../Model/CustomNofication';
import data from '../../services/data';
import { StackNavigationProp } from '@react-navigation/stack';
import { ExpenseParamList } from '../../navigation/types';
type props ={
  navigation: StackNavigationProp<ExpenseParamList, 'AddExpenseScreen'>
}
export const AddExpenseManager: React.FC<props> = ({navigation}) => {
  
  const [ExpenseName, setExpenseName] = useState<string>('');
  const [ExpenseContent, setExpenseContent] = useState<string>('');
  const [ExpenseTotal, setExpenseTotal] = useState<number>(0);
  const [AddSuccess, setAddSuccess] = useState<boolean>(false);
  const [AddError, setAddError] = useState<boolean>(false);
  const tranferday = (d: string) => {
    var month = new Date(d).getMonth() + 1;
    var date = new Date(d).getDate();
    var year = new Date(d).getFullYear();
    return date + '/' + month + '/' + year;
  };
  const AddExpense = () => {
    console.log(ExpenseContent);
    console.log(ExpenseName);
    console.log(isNaN(ExpenseTotal));
    if (
      ExpenseName === '' ||
      ExpenseContent === '' ||
      ExpenseTotal <= 0 ||
      isNaN(ExpenseTotal)
    ) {
      setAddError(true);
    } else {
      data
        .PostExpense(
          ExpenseName,
          ExpenseContent,
          ExpenseTotal,
          new Date().toDateString(),
        )
        .then(res => {
          if (res === true) {
            setAddSuccess(true);
            navigation.goBack();
          }
        });
    }
  };
  return (
    <SafeAreaView>
      <View style={style.containerfiled}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
            borderColor: '#606060',
            borderWidth: 1,
            width: reponsivewidth(150),
            backgroundColor: '#fbfbfb',
            borderRadius: 5,
            marginTop: 15,
          }}>
          <EvilIcons name="calendar" size={32} />
          <Text>{tranferday(new Date().toDateString())}</Text>
        </View>
        <View
          style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: reponsiveheight(80),
          }}>
          <Text style={style.titlefiled}>Tên </Text>
          <TextInput
            style={[style.textinput, {width: reponsivewidth(220)}]}
            placeholder="Tên nguồn chi"
            onChangeText={text => {
              setExpenseName(text);
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: reponsiveheight(160),
          }}>
          <Text style={style.titlefiled}>Nội dung </Text>
          <TextInput
            multiline={true}
            style={[
              style.textinput,
              {width: reponsivewidth(220), height: reponsiveheight(150)},
            ]}
            placeholder="Nội dung nguồn chi"
            onChangeText={text => {
              setExpenseContent(text);
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#c3c3c3',
            borderTopColor: '#c3c3c3',
            borderTopWidth: 0.5,
            flexDirection: 'row',
            backgroundColor: '#FFFF',
            height: reponsiveheight(80),
          }}>
          <Text style={style.titlefiled}>Tổng tiền </Text>
          <TextInput
            keyboardType="numeric"
            style={[style.textinput, {width: reponsivewidth(220)}]}
            onChangeText={text => {
              setExpenseTotal(
                Number(isNaN(Number(text)))
                  ? Number(text.replace(/,/g, ''))
                  : Number(text),
              );
            }}>
            {ExpenseTotal
              ? ExpenseTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : 0}
          </TextInput>
        </View>
        {/* <View style={{ justifyContent:'center', alignItems:'center', borderBottomWidth:0.5,borderBottomColor:'#c3c3c3',borderTopColor:'#c3c3c3',borderTopWidth:0.5, flexDirection:'row', backgroundColor:'#FFFF',height:70}}>
                <Text style={style.titlefiled}>Số Lượng </Text>
                <TextInput onChangeText={(text)=>{setquantity(Number.parseInt(text, 10));}} defaultValue="1" keyboardType="numeric"  style={[style.textinput, {width:reponsivewidth(280)}]}   />
          </View> */}
      </View>
      <View style={style.containerbutton}>
        <TouchableOpacity
          style={style.btn_add}
          onPress={() => {
            AddExpense();
          }}>
          <Text style={style.titleadd}>Lưu</Text>
        </TouchableOpacity>
      </View>
      <CustomNotification
        visible={AddSuccess}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => setAddSuccess(false)}
        Content="Bạn đã thêm thành công !"
      />
      <CustomNotification
        visible={AddError}
        iconTitle={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        onCancel={() => setAddError(false)}
        Content="Xin vui lòng nhập lại"
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  containerfiled: {
    borderColor: '#D3D3D3',
    borderWidth: 3,
    borderRadius: 10,
    height: reponsiveheight(600),
  },
  titlefiled: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    width: reponsivewidth(100),
    marginLeft: -15,
    alignItems: 'center',
  },
  textinput: {
    fontSize: 16,
    // marginTop:5,
    // borderRadius:10,
    // height:50,
    // borderColor:'#D3D3D3',
    // borderWidth:3,
    backgroundColor: '#FFF',
    color: 'black',
  },
  btn_add: {
    alignItems: 'center',
    backgroundColor: '#02569E',
    width: reponsivewidth(150),
    borderRadius: 80,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerbutton: {
    alignItems: 'center',
    marginTop: 5,
    borderColor: '#D3D3D3',
    borderWidth: 3,
    height: reponsiveheight(70),
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  titleadd: {
    color: '#FFF',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
});
