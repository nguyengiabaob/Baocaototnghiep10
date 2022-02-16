/* eslint-disable react-native/no-inline-styles */
import React, {ReactChild, ReactChildren, ReactNode, useState} from 'react';
import {ReactText} from 'react';
import {ReactElement} from 'react';
import {JSXElementConstructor} from 'react';
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
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
type props = {
  visible: boolean;
  Listdata: any[];
  title: string;
  Textstyletitle?: TextStyle;
  RenderList: (...props: any) => void;
  Cancel: (value: any) => void;
};
const ListChooseMutiple: React.FC<props> = ({
  visible,
  title,
  Textstyletitle,
  Listdata,
  RenderList,
  Cancel,
}) => {
  // const [listCheck, setListCheck] = useState<any[]>([]);
  // function checkItem(check: boolean, id: any) {
  //   if (check === true) {
  //     setListCheck(listCheck.filter((item: any) => item !== id));
  //   } else {
  //     setListCheck([id, ...listCheck]);
  //   }
  //   console.log('123');
  // }
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
        <ScrollView>{RenderList(Listdata)}</ScrollView>
        <View>
          <TouchableOpacity
            style={[
              styles.btnExit,
              {alignItems: 'center', alignSelf: 'center'},
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
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
