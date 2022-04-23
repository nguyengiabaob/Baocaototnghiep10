/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ConfigMaterial} from '../../../Model/ConfigMaterialModel';
import CustomHeaderScreen from '../../../Model/CustomeHeaderScreen';
import DataService from '../../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../../theme/Metric';
type props = {
  visible: boolean;
  onExit: (val: any) => void;
  getselectedItem: (val: any) => void;
  selectedItem: any;
};
const ChoosenConfigMaterialOverplay: React.FC<props> = ({
  visible,
  onExit,
  selectedItem,
  getselectedItem,
}) => {
  const [ListConfig, setListConfig] = useState<any[]>([]);
  const getConfigMaterial = async () => {
    let newData = await DataService.Getdata_dtService<ConfigMaterial>(
      'ConfigMaterial',
    );
    setListConfig(newData);
  };
  useEffect(() => {
    getConfigMaterial();
  }, []);
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
              Danh sách bảng nguyên liệu
            </Text>
          </View>
          {console.log('selectedItem', selectedItem)}
          <View style={styles.TitleOverlAdd_content}>
            {ListConfig.length > 0 &&
              ListConfig.map(x => {
                console.log(x);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      getselectedItem(x);
                      onExit(false);
                    }}
                    style={[
                      styles.btnChoosenAdd,
                      {
                        marginVertical: 10,
                        padding: 15,
                        backgroundColor: selectedItem
                          ? selectedItem.id === x.id
                            ? '#02569E'
                            : '#FFFF'
                          : '#FFFF',
                      },
                    ]}>
                    <Text
                      style={{
                        color: selectedItem
                          ? selectedItem.id === x.id
                            ? '#FFFF'
                            : '#000000'
                          : '#000000',
                      }}>
                      {x.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
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
export default ChoosenConfigMaterialOverplay;
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
