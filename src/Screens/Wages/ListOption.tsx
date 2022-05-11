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
  item: any;
  Action: (val: any) => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
};
type props = {
  visible: boolean;
  options: option[];
  onCancel: (val: any) => void;
  title: string;
  Selected?: any;
};
const ListOptionModal: React.FC<props> = ({
  visible,
  options,
  onCancel,
  title,
  Selected,
}) => {
 
  return (
    <Overlay isVisible={visible}>
      {console.log('options', options)}
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
            {title}
          </Text>
        </View>
        <View style={styles.TitleOverlAdd_content}>
          <ScrollView>
            {options.map(x => {
              return (
                <TouchableOpacity
                  onPress={() => x.Action(x)}
                  style={[
                    x.viewStyle,
                    styles.btnChoosenAdd,
                    {
                      marginVertical: 10,
                      padding: 15,
                      backgroundColor: Selected
                        ? Selected.id === x.item?.id
                          ? '#02569E'
                          : '#FFFF'
                        : '#FFFF',
                    },
                  ]}>
                  <Text
                    style={[
                      x.textStyle,
                      {
                        color: Selected
                          ? Selected.id === x.item?.id
                            ? '#FFFF'
                            : '#000000'
                          : '#000000',
                      },
                    ]}>
                    {x.item.name}
                  </Text>
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
export default ListOptionModal;
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
