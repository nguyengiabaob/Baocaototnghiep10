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
const ListOption: React.FC = () => {
  const [ListTimeWork, setListTimeWork] = useState<any[]>([]);
  const [visibleAddUpdate,setVisibleAddUpdate]= useState<boolean>(false);
  const [itemUpdate,setItemUpdate]= useState<any>();
  const getListTimeWork = async () => {
    let a = await DataService.Getdata_dtService<any>('TimeWork');
    setListTimeWork(a);
  };
  useEffect(() => {
    getListTimeWork();
  }, []);
  return (
    <SafeAreaView>
      <View>
        <View style={styles.TitleOverlAdd_content}>
          <ScrollView>
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
                    <View style={{marginTop: 8}}>
                      <Text style={[x.textStyle]}>
                        {x.Description ? x.Description : ''}
                      </Text>
                    </View>
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
                      onPress={() => {}}
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
  btnDel: {
    marginLeft: 25,
  },
});
