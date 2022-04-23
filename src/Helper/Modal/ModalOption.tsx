/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
type Modal = {
  key: number;
  nameTitle: string;
  Action: () => void;
};
type props = {
  arrayOption: Modal[];
  visibleModdal: boolean;
  onExit: (value: any) => void;
  titleModal: string;
  HeightModal: number;
  WidthModal: number;
};
const ModalMultipleOption: React.FC<props> = ({
  arrayOption,
  visibleModdal,
  onExit,
  titleModal,
  HeightModal,
  WidthModal,
}) => {
  const [ModalChoosing, setModalChoosing] = useState<any>(1);
  return (
    <Overlay isVisible={visibleModdal}>
      <View
        style={{
          width: reponsivewidth(WidthModal),
          height: reponsiveheight(HeightModal),
        }}>
        <View style={style.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
            {titleModal}
          </Text>
        </View>
        <View style={style.TitleOverlAdd_content}>
          <ScrollView>
            {arrayOption.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setModalChoosing(item.key);
                    item.Action();
                    onExit(false);
                  }}
                  style={[
                    style.btnChoosenAdd,
                    style.shadowNames,
                    {
                      marginVertical: 10,
                      padding: 15,
                      backgroundColor:
                        ModalChoosing === item.key ? '#226cb3' : '#FFFF',
                    },
                  ]}>
                  <Text
                    style={{
                      color: ModalChoosing === item.key ? '#FFFF' : '#000000',
                    }}>
                    {item.nameTitle}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          {/* <TouchableOpacity
            onPress={() => {
              setModalChoosing(1);
            }}
            style={[
              style.btnChoosenAdd,
              {
                marginVertical: 10,
                padding: 15,
                backgroundColor: ModalChoosing === 1 ? '#226cb3' : '#FFFF',
              },
            ]}>
            <Text>Tạo tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalChoosing(2);
            }}
            style={[
              style.btnChoosenAdd,
              {
                padding: 15,
                backgroundColor: ModalChoosing === 2 ? '#226cb3' : '#FFFF',
              },
            ]}>
            <Text>Tạo tài khoản cho nhân viên</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <TouchableOpacity
        style={[style.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
        onPress={() => onExit(false)}>
        <Text style={{color: '#FFFF'}}>Thoát</Text>
      </TouchableOpacity>
    </Overlay>
  );
};
const style = StyleSheet.create({
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
export default ModalMultipleOption;
