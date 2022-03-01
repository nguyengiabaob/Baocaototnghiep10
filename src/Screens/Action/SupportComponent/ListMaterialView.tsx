/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
type props = {
  List: any[];
  visible: boolean;
  onCancel: (value: any) => void;
};
const ListMaterialView: React.FC<props> = ({List, visible, onCancel}) => {
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
            Danh sách nguyên liệu
          </Text>
        </View>
        <View>
          <ScrollView>
            {List &&
              List.map(item => {
                return (
                  <View style={[style.shadowContainer, style.ContainerBox]}>
                    <View style={{flex: 0.2}}>
                      <Image
                        style={{
                          backgroundColor: 'red',
                          width: reponsivewidth(80),
                          height: reponsiveheight(80),
                        }}
                        source={{uri: item.Img}}
                      />
                    </View>
                    <View
                      style={{
                        width: reponsivewidth(120),

                        flex: 0.5,
                      }}>
                      <Text style={{fontWeight: '700', textAlign: 'center'}}>
                        {item.Name}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: reponsivewidth(100),
                        flex: 0.3,
                      }}>
                      <Text>
                        {item.Number}
                        {item.Unit}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
          <View style={{alignItems: 'center', marginTop: 35}}>
            <TouchableOpacity
              style={[
                style.btnExit,
                {alignItems: 'center', backgroundColor: '#226cb3'},
              ]}
              onPress={() => onCancel(false)}>
              <Text style={{color: '#FFFF'}}>Thoát</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Overlay>
  );
};
const style = StyleSheet.create({
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  shadowContainer: {
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  ContainerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    marginTop: 5,
    width: reponsivewidth(340),
  },
  btnExit: {
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
export default ListMaterialView;
