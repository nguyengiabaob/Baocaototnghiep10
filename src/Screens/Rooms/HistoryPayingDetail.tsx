/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
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
import Loading from '../../Helper/Loader/Loading';
import DataService from '../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
type props = {
  visible: boolean;
  viewStyle?: ViewStyle;
  idBill: any;
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
  const [loading, setloading] = useState<boolean>(false);
  const getBill = useCallback(async () => {
    let bill = await DataService.Getdata_dtServiceById<any>('Bill', idBill.id);
    let listProduct = await DataService.Getdata_dtService<any>('ListProduct');
    let Products = await DataService.Getdata_dtService<any>('Products');
    let newListProduct = listProduct.filter(x => x.billID === bill?.id);
    if (newListProduct.length > 0) {
      newListProduct.forEach(x => {
        let a = Products.find(i => i.id === x.productID);
        console.log('a', a);
        if (a) {
          x.product = {...a};
        }
      });
    }
    setBill(bill);
    setListProduct(newListProduct);
  }, [idBill]);
  useEffect(() => {
    setloading(true);
    Promise.resolve(getBill()).then(() => {
      setloading(false);
    });
  }, [getBill]);
  return (
    <Overlay isVisible={visible}>
      <SafeAreaView style={[viewStyle]}>
        <View style={[styles.title_Header]}>
          <Text style={styles.title_Font}>{Bill?.billID}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 25, marginTop: 15}}>
          <Text style={{fontWeight: '700', marginRight: 10}}>Người lập :</Text>
          <Text>{idBill ? idBill.createrID.Name : ''}</Text>
        </View>
        <View>
          {ListProduct &&
            ListProduct.filter(x => x.billID === Bill?.id).map(x => {
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
                      source={{uri: x.product?.Image}}
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
                        Số lượng {x.Number}
                      </Text>
                      <Text>
                        {' '}
                        Giá :{' '}
                        {Number(x.product?.Price_product)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        {''} VND
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
        </View>
        <View style={{alignItems: 'flex-end', marginTop: 15}}>
          <Text style={{fontWeight: '700', fontSize: 15}}>
            Tổng cộng{' '}
            {Number(Bill?.Total)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {''} VND
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 25}}>
          <TouchableOpacity
            style={styles.btnExit}
            onPress={() => {
              onCancel(false);
            }}>
            <Text style={{color: '#FFFF'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
        <Loading visible={loading}/>
      </SafeAreaView>
    </Overlay>
  );
};
export default HistoryPayingDetail;
const styles = StyleSheet.create({
  title_Header: {
    backgroundColor: '#02569E',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  title_Font: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFF',
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
