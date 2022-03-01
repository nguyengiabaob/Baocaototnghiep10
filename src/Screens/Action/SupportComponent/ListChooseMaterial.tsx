/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {RadioButton} from 'react-native-paper';
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
type props = {
  visible: boolean;
  Listdata: any[];
  title: string;
  Textstyletitle?: TextStyle;
  save: (value: any) => void;
  // RenderList: (...props: any) => void;
  Cancel: (value: any) => void;
};
const ListChooseMutiple: React.FC<props> = ({
  visible,
  title,
  Textstyletitle,
  Listdata,
  // RenderList,
  save,
  Cancel,
}) => {
  const [listCheck, setListCheck] = useState<any[]>([]);
  function checkItem(check: boolean, itemDefault: any) {
    if (check === true) {
      setListCheck(listCheck.filter(item => item !== itemDefault));
    } else {
      setListCheck([itemDefault, ...listCheck]);
    }
    console.log('123');
  }
  return (
    <Overlay isVisible={visible}>
      <View style={{width: reponsivewidth(320), height: reponsiveheight(500)}}>
        <View style={styles.TitleOverlAdd}>
          <Text
            style={[
              {
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
                paddingBottom: 2,
                fontWeight: '700',
              },
              Textstyletitle,
            ]}>
            {title}
          </Text>
        </View>
        <ScrollView>
          {Listdata.map(item => {
            let check = listCheck.includes(item);
            return (
              <TouchableOpacity
                onPress={() => checkItem(check, item)}
                style={[
                  styles.btnChoosenAdd,
                  {
                    marginVertical: 10,
                    padding: 15,
                    display: 'flex',
                    flexDirection: 'row',
                  },
                ]}>
                <View style={{flex: 0.2}}>
                  <Image source={{uri: item.Img !== 'none' && item.Img}} />
                </View>
                <View style={{flex: 0.7}}>
                  <Text style={{textAlign: 'center'}}>{item.Name}</Text>
                </View>
                <View style={{flex: 0.1}}>
                  <RadioButton
                    onPress={() => checkItem(check, item)}
                    value=""
                    status={check === true ? 'checked' : 'unchecked'}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <TouchableOpacity disabled={listCheck.length > 0 ? false : true}
            style={[
              styles.btnExit,
              {
                alignItems: 'center',
                marginRight: 25,
                backgroundColor: listCheck.length > 0 ? '#226cb3' : '#d8d7d7',
              },
            ]}
            onPress={() => {
              save((prev: any) => [...listCheck, ...prev])
              Cancel(false);
            }}>
            <Text style={{color: '#FFFF'}}>Chọn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnExit,
              {alignItems: 'center', backgroundColor: '#226cb3'},
            ]}
            onPress={() => Cancel(false)}>
            <Text style={{color: '#FFFF'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};
export default ListChooseMutiple;
const styles = StyleSheet.create({
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  btnExit: {
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  btnChoosenAdd: {
    alignItems: 'center',
    borderBottomColor: '#afaeae',
    borderBottomWidth: 0.5,
    borderTopColor: '#afaeae',
    borderTopWidth: 0.5,
  },
});
