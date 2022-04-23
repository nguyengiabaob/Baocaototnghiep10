/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomHeader from '../../../Model/CustomHeader';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ChooseMaterial from '../ChooseMaterial';
import AddConfigMaterial from '../AddConfigMaterial';
import ChoosenConfigMaterial from '../ChoosenConfigMaterial';
import {Overlay} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';
import {ListproductNavigationPramaList} from '../../../navigation/types';
import DataService from '../../../services/dataservice';
import {ConfigMaterial} from '../../../Model/ConfigMaterialModel';
import Loading from '../../../Helper/Loader/Loading';
import database from '@react-native-firebase/database';
import data from '../../../services/data';
import {CustomNotification} from '../../../Model/CustomNofication';
import BellNofi from '../../../asset/svg/bellnotification.svg';
import {CustomNotificationDel} from '../../../Model/CustomNoficationDel';
import storage from '@react-native-firebase/storage';
import {Product} from '../../../Model/product';
import NoImages from '../../../asset/svg/no-Image.svg';
type props = {
  // List: any[];
  // onCancel: (value: any) => void;
  navigation: StackNavigationProp<
    ListproductNavigationPramaList,
    'ListMaterialScreen'
  >;
};
const ListMaterialView: React.FC<props> = ({navigation}) => {
  const [VisibleAddition, setVisibleAddition] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [UpdateItem, setUpdateItem] = useState<any>();
  const [List, setList] = useState<any[]>([]);
  const [itemDelete, setItemDelete] = useState<any>();
  const [visibleDelete, setvisibleDelete] = useState<boolean>(false);
  const [visibleDeleteSuccess, setvisibleDeleteSuccess] =
    useState<boolean>(false);
  const getListMaterial = async () => {
    let a = await DataService.Getdata_dtService<ConfigMaterial>(
      'ConfigMaterial',
    );
    setList(a);
  };
  useEffect(() => {
    database()
      .ref()
      .on('value', snapshot => {
        setReload(prev => !prev);
      });
  }, []);
  useEffect(() => {
    getListMaterial().then(() => {
      setReload(false);
    });
  }, [reload]);
  const DelImage = (url: string) => {
    const imgref = storage().refFromURL(url);
    imgref
      .delete()
      .then(() => {
        console.log('del Success');
      })
      .catch(e => console.log(e));
  };
  const DeleteConfig = async (item: any) => {
    //

    Promise.all(
      item.ListMaterial.map(x => {
        if (x.Img !== 'none') {
          DelImage(x.Img);
        }
      }),
    ).then(() => {
      data.deletedData('ConfigMaterial', item.id).then(res => {
        if (res === true) {
          setvisibleDeleteSuccess(true);
        }
      });
    });
  };
  return (
    <SafeAreaView style={{width: getwidth(), height: getheight(), flex: 1}}>
      <CustomHeader
        title="Danh sách nguyên liệu"
        onpress={() => navigation.goBack()}
      />

      <View style={[styles.container_Header, {alignItems: 'flex-end'}]}>
        <TouchableOpacity
          onPress={() => {
            setVisibleAddition(true);
            setUpdateItem(undefined);
          }}>
          <MaterialIcons
            style={{marginRight: 10}}
            name="post-add"
            size={35}
            color={'#FFFF'}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={style.TitleOverlAdd}>
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
        </View> */}
      <View>
        <TextInput />
        <ScrollView style={{height: reponsiveheight(600)}}>
          {List.length > 0 ? (
            List.map(item => {
              return (
                <View
                  style={[
                    styles.shadowContainer,
                    styles.ContainerBox,
                    ,
                    {alignSelf: 'center'},
                  ]}>
                  <View style={{flex: 0.2}}>
                    {item.ListMaterial ? (
                      item.ListMaterial[0].Img !== 'none' ? (
                        <Image
                          style={{
                            width: reponsivewidth(80),
                            height: reponsiveheight(80),
                          }}
                          source={{uri: item.ListMaterial[0].Img}}
                        />
                      ) : (
                        <NoImages
                          width={reponsivewidth(80)}
                          height={reponsiveheight(80)}
                        />
                      )
                    ) : (
                      <NoImages
                        width={reponsivewidth(80)}
                        height={reponsiveheight(80)}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      width: reponsivewidth(120),

                      flex: 0.5,
                    }}>
                    <View style={{height: 35}}>
                      <Text
                        style={{
                          fontWeight: '700',
                          textAlign: 'center',
                          justifyContent: 'center',
                        }}>
                        Tiêu đề :{item.title}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      width: reponsivewidth(100),
                      flex: 0.3,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setUpdateItem(item);
                        setVisibleAddition(true);
                      }}
                      style={styles.btnDel}>
                      <MaterialIcons name="mode-edit" size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setItemDelete(item);
                        setvisibleDelete(true);
                      }}
                      style={[styles.btnDel, {marginTop: 8}]}>
                      <MaterialIcons name="delete" size={32} color={'red'} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <View
              style={{
                height: reponsiveheight(600),
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={{opacity: 0.35}}> Chưa có nguyên liệu</Text>
            </View>
          )}
        </ScrollView>
        {/* <View style={{alignItems: 'center', marginTop: 35}}>
            <TouchableOpacity
              style={[
                style.btnExit,
                {alignItems: 'center', backgroundColor: '#226cb3'},
              ]}
              onPress={() => onCancel(false)}>
              <Text style={{color: '#FFFF'}}>Thoát</Text>
            </TouchableOpacity>
          </View> */}
      </View>
      <ChoosenConfigMaterial
        visible={VisibleAddition}
        OnExit={setVisibleAddition}
        UpdateConfig={UpdateItem}
      />
      <CustomNotification
        onCancel={() => setvisibleDeleteSuccess(false)}
        visible={visibleDeleteSuccess}
        title={'Thông báo'}
        Content={'Bạn đã xóa thành công '}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
      />
      <CustomNotificationDel
        visible={visibleDelete}
        title={'Thông báo'}
        Content={'Bạn có muốn xóa không ? '}
        onCancel={() => setvisibleDelete(false)}
        onAction={() => {
          DeleteConfig(itemDelete.id);
          setvisibleDelete(false);
        }}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
      />
      <Loading visible={reload} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container_Header: {
    backgroundColor: '#02569E',
    padding: 3,
    justifyContent: 'center',
    marginTop: 10,
  },
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
  btnDel: {
    marginLeft: 25,
  },
});
export default ListMaterialView;
