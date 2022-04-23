/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import DataService from '../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
type props = {
  visible: boolean;
  viewStyle?: ViewStyle;
  idBill: string;
  onCancel: (value: any) => void;
};
const HistoryPayingDetail: React.FC<props> = ({
  visible,
  viewStyle,
  idBill,
  onCancel,
}) => {
  const [Bill, setBill] = useState<any>();
  const [ListProduct, setListProduct] = useState<any[]>();
  const getBill = async () => {
    let bill = await DataService.Getdata_dtServiceById('Bill', idBill);
    let listProduct = await DataService.Getdata_dtService('listProduct');
    setBill(bill);
    setListProduct(listProduct);
  };
  useEffect(() => {
    getBill();
  }, []);
  return (
    <Overlay isVisible={visible}>
      <SafeAreaView style={[viewStyle]}>
        <View style={[styles.title_Header]}>
          <Text style={styles.title_Font}>{Bill.BillId}</Text>
        </View>
        <View>
          {ListProduct &&
            ListProduct.filter(x => x.BillId == Bill.id).map(x => {
              return (
                <View
                  style={{
                    backgroundColor: '#FFFFF',
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomColor: '#d6d6d6',
                    borderBottomWidth: 1,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: reponsivewidth(80),
                      height: reponsiveheight(80),
                    }}>
                    <Image
                      style={{
                        width: reponsivewidth(80),
                        height: reponsiveheight(80),
                      }}
                      source={{uri: x.Image}}
                    />
                  </TouchableOpacity>
                  <View style={{marginLeft: 15, width: reponsivewidth(150)}}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        marginBottom: 15,
                      }}>
                      {x.name_product}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{marginRight: 15}}>
                        {' '}
                        Số lượng {x.Quanity}
                      </Text>
                      <Text>
                        {' '}
                        Giá :{' '}
                        {x.Price_product.toString().replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ',',
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={{justifyContent: 'flex-end'}}>
          <Text style={{fontWeight: '700'}}>Tổng cộng {Bill.Total}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.btnExit}
            onPress={() => {
              onCancel(false);
            }}>
            <Text>thoát</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Overlay>
  );
};
export default HistoryPayingDetail;
const styles = StyleSheet.create({
  title_Header: {
    backgroundColor: '#02569E',
    textAlign: 'center',
  },
  title_Font: {
    fontSize: 18,
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
