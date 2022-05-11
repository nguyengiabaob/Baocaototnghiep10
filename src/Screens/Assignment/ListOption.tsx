/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import DataService from '../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddUpdateTimeWork from './AddUpdateTimeWork';
import database from '@react-native-firebase/database';
import Loading from '../../Helper/Loader/Loading';
import {Assigment} from '../../Model/Assignment';
import data from '../../services/data';
import {CustomNotificationDel} from '../../Model/CustomNoficationDel';
import Warning from '../../asset/svg/Warning.svg';
import { Consumer } from 'react-native-paper/lib/typescript/core/settings';
const ListOption: React.FC = () => {
  const [ListTimeWork, setListTimeWork] = useState<any[]>([]);
  const [visibleAddUpdate, setVisibleAddUpdate] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [YesorNoModal,setYesorNoModal] = useState<boolean>(false);
  const [itemDeleted, setItemDeleted] = useState<any>();
  const getListTimeWork = async () => {
    let a = await DataService.Getdata_dtService<any>('TimeWork');
    setListTimeWork(a);
  };
  useEffect(() => {
    database()
      .ref('/TimeWork')
      .on('value', snapshot => {
        getListTimeWork();
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    getListTimeWork().then(() => {
      setLoading(false);
    });
  }, []);
  const DeleteTimeWork = async val => {
    data.DeleteTimeWork(val).then(res => {
      if (res == true) {
        setYesorNoModal(false);
     }
    });
  };
  return (
    <SafeAreaView>
      <View>
        <View style={[styles.Shadowbox, {marginTop: 8, padding: 10}]}>
          <TouchableOpacity
            onPress={() => {
              setItemUpdate(undefined);
              setVisibleAddUpdate(true);
            }}
            style={{
              flexDirection: 'row',
              backgroundColor: '#02569E',
              borderRadius: 3,
              width: reponsivewidth(100),
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <MaterialIcons name="add-alarm" size={32} color={'#FFFF'} />
            <Text style={{color: '#FFFF'}}>Thêm ca</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.TitleOverlAdd_content}>
          <ScrollView style={{marginBottom: reponsiveheight(230)}}>
            {ListTimeWork.map(x => {
              return (
                <View
                  style={[
                    styles.btnChoosenAdd,
                    {marginVertical: 10, padding: 15, flexDirection: 'row'},
                  ]}>
                  <View style={{flex: 0.7}}>
                    <Text style={[x.textStyle, {marginLeft: 25}]}>
                      {x.Name}
                    </Text>
                    {/* <View style={{marginTop: 8}}>
                      <Text style={[x.textStyle]}>
                        {x.Description ? x.Description : ''}
                      </Text>
                    </View> */}
                  </View>
                  <View style={{flex: 0.3}}>
                    <TouchableOpacity
                      onPress={() => {
                        setItemUpdate(x);
                        setVisibleAddUpdate(true);
                      }}
                      style={styles.btnDel}>
                      <MaterialIcons name="mode-edit" size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setItemDeleted(x);
                        setYesorNoModal(true);
                      }}
                      style={[styles.btnDel, {marginTop: 8}]}>
                      <MaterialIcons name="delete" size={32} color={'red'} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <AddUpdateTimeWork
        visible={visibleAddUpdate}
        onCancel={setVisibleAddUpdate}
        Item={itemUpdate}
      />
      <CustomNotificationDel
        visible={YesorNoModal}
        iconContent={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        title="Thông báo"
        Content="Bạn có muốn xóa không ?"
        onAction={() => DeleteTimeWork(itemDeleted)}
        onCancel={() => setYesorNoModal(false)}
      />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};
export default ListOption;
const styles = StyleSheet.create({
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  TitleOverlAdd_content: {
    marginTop: 0,
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
  btnDel: {
    marginLeft: 25,
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
    elevation: 4,
  },
});
