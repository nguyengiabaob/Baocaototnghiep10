/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TextStyle, ViewStyle} from 'react-native';
import {Switch} from 'react-native-elements';
import { useAppDispatch } from '../redux/hook';
import { UpdatePermission } from '../redux/reducer/authslice';
import data from '../services/data';
import DataService from '../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';
import {Userdata} from './User';
type Col = {
  name: string;
  key: string;
  width: string | number;
};
type props = {
  columns: Col[];
  dataFields: any[];
  textStyle?: TextStyle;
  ViewStyle?: ViewStyle;
};
const TableComponent: React.FC<props> = ({columns, dataFields}) => {
  const dispatch = useAppDispatch();
  const [ListCheck, setListCheck] = useState<any[]>([]);
  const getUser = (data: any[]) => {
    let b: any[] = [];
    data.forEach(i => {
      if (i.type === 0 && i.Name !== 'none') {
        b.push(i);
      }
    });
    console.log('b', data);
    setListCheck(b);
    
  };
  useEffect(() => {
    getUser(dataFields);
  }, [dataFields]);
  function changePermission() {
    dispatch(UpdatePermission());
  }

  // eslint-disable-next-line no-shadow
  const updateType = (val: any, type: number) => {
    data.updatePermission(val.id, type).then(res => {
      if (res === true) {
        console.log('update');
      }
    });
  };
  const changeSwitch = (data: any, check: boolean) => {
    console.log(check);
    if (check === false) {
      updateType(data, 1);
      setListCheck(ListCheck.filter(i => i !== data));
    } else {
      updateType(data, 0);
      setListCheck([data, ...ListCheck]);
    }
    changePermission();
  };
  return (
    <View>
      <View style={[styles.header_column]}>
        {columns.map(i => {
          return (
            <View style={{width: i.width}}>
              <Text style={{textAlign: 'center', color: '#FFFF'}}>
                {i.name}
              </Text>
            </View>
          );
        })}
      </View>
      <View style={{marginTop: 15}}>
        {dataFields &&
          dataFields
            .filter(x => x.Name !== 'none')
            .map(data => {
              return (
                <View
                  style={{flexDirection: 'row', height: reponsiveheight(75)}}>
                  {columns.map(col => {
                    let check = ListCheck.includes(data);
                    return (
                      <>
                        {col.key == '2' ? (
                          <View
                            style={{
                              alignItems: 'center',
                              width: col.width,
                            }}>
                            <Switch
                              style={{
                                transform: [{scaleX: 1.5}, {scaleY: 1.5}],
                              }}
                              value={check}
                              onValueChange={value => changeSwitch(data, value)}
                            />
                          </View>
                        ) : (
                          <View
                            style={{
                              width: col.width,

                              alignItems: 'center',
                            }}>
                            <Text>{data[col.key]}</Text>
                          </View>
                        )}
                      </>
                    );
                  })}
                </View>
              );
            })}
      </View>
    </View>
  );
};
export default TableComponent;
const styles = StyleSheet.create({
  header_column: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    backgroundColor: '#02569E',
    paddingTop: 15,
    paddingBottom: 15,
  },
});
