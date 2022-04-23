/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
import NoImage from '../../../asset/svg/no-Image.svg';
import {ScrollView} from 'react-native-gesture-handler';
type props = {
  visible: boolean;
  List: any[];
  onExit: (val: any) => void;
};
const ListProductMaterial: React.FC<props> = ({visible, List, onExit}) => {
  return (
    <Overlay isVisible={visible}>
      <SafeAreaView>
        <View
          style={{
            width: reponsivewidth(300),
            height: reponsiveheight(300),
          }}>
          <View style={[styles.TitleOverlAdd]}>
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
          <View style={styles.TitleOverlAdd_content}>
            {List.length > 0 ? (
              <ScrollView>
                {List.map(x => {
                  console.log(x);
                  return (
                    <View
                      style={[
                        styles.btnChoosenAdd,
                        {
                          marginVertical: 10,
                          padding: 15,
                          flexDirection: 'row',
                        },
                      ]}>
                      {console.log(x.Img !== 'none')}
                      <View style={{flex: 0.3}}>
                        {x.Img !== 'none' ? (
                          <Image source={{uri: x.Img}} />
                        ) : (
                          <NoImage
                            width={reponsivewidth(80)}
                            height={reponsiveheight(80)}
                          />
                        )}
                      </View>
                      <View
                        style={{
                          flex: 0.7,
                          alignSelf: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{marginBottom: 8, textAlign: 'center'}}>
                          {x.Name}
                        </Text>
                        <Text style={{textAlign: 'center'}}>
                          {x.Number} {x.Unit}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            ) : (
              <View style={{flex: 0.7}}>
                <Text
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.4,
                    fontSize: 18,
                  }}>
                  Chưa có nguyên liệu
                </Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            onExit(false);
          }}
          style={[styles.btnExit, {alignItems: 'center', alignSelf: 'center'}]}>
          <Text style={{color: '#FFFF'}}>Thoát</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Overlay>
  );
};
export default ListProductMaterial;
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
