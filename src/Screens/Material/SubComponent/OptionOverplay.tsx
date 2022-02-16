/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
type optionData = {
  key: number;
  title: string;
  mission: () => void;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
};
type props = {
  data: optionData[];
  mainTitle: string;
  visible: boolean;
  cancel: (value: any) => void;
};
const OpitonOverplay: React.FC<props> = ({
  data,
  mainTitle,
  visible,
  cancel,
}) => {
  if (visible === true) {
  }
  return (
    <Overlay isVisible={visible}>
      <View style={{width: reponsivewidth(300), height: reponsiveheight(250)}}>
        <View style={style.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
            {mainTitle}
          </Text>
        </View>
        <View style={style.TitleOverlAdd_content}>
          {data.map(item => {
            return (
              <>
                <TouchableOpacity
                  key={item.key}
                  onPress={item.mission}
                  style={[
                    style.btnChoosenAdd,
                    item.viewStyle,
                    {marginVertical: 10, padding: 15},
                  ]}>
                  <Text style={item.textStyle}>{item.title}</Text>
                </TouchableOpacity>
              </>
            );
          })}
        </View>
      </View>
      <TouchableOpacity
        style={[style.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
        onPress={() => cancel(false)}>
        <Text style={{color: '#FFFF'}}>Thoát</Text>
      </TouchableOpacity>
    </Overlay>
  );
};
export default OpitonOverplay;
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  ContainerButton: {
    flexDirection: 'column',
    marginVertical: 10,
  },
  containerScrollview: {
    marginTop: 1,
    flex: 1,
    // borderTopRightRadius: 15,
    // borderTopLeftRadius:15,
    // borderColor: '#b6e4ff',
    // borderTopWidth:2,
    marginBottom: 2,
  },
  Shadowbox: {
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
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
  styletxtInput: {
    borderColor: '#afaeae',
    borderWidth: 0.5,
  },
  shadowNames: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
