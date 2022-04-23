/* eslint-disable react-native/no-inline-styles */
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
type option = {
  title: string;
  Action: () => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
};
type props = {
  visible: boolean;
  options: option[];
  navigation2: any;
  onCancel: (val: any) => void;
};
const OptionModal: React.FC<props> = ({
  visible,
  options,
  onCancel,
  navigation2,
}) => {
  return (
    <Overlay isVisible={visible}>
      <SafeAreaView
        style={{
          width: reponsivewidth(300),
          height: reponsiveheight(300),
        }}>
        <View style={styles.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
            Chọn chế độ
          </Text>
        </View>
        <View style={styles.TitleOverlAdd_content}>
          <ScrollView>
            {options.map(x => {
              return (
                <TouchableOpacity
                  onPress={() => x.Action()}
                  style={[
                    x.viewStyle,
                    styles.btnChoosenAdd,
                    {marginVertical: 10, padding: 15},
                  ]}>
                  <Text style={[x.textStyle]}>{x.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        style={[styles.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
        onPress={() => onCancel(false)}>
        <Text style={{color: '#FFFF'}}>Thoát</Text>
      </TouchableOpacity>
    </Overlay>
  );
};
export default OptionModal;
const styles = StyleSheet.create({
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  TitleOverlAdd_content: {
    marginTop: 8,
  },

  btnChoosenAdd: {
    alignItems: 'center',
    borderBottomColor: '#afaeae',
    borderBottomWidth: 0.5,
    borderTopColor: '#afaeae',
    borderTopWidth: 0.5,
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
