/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {CustomNotification} from '../../Model/CustomNofication';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import Warning from '../../asset/svg/Warning.svg';
import {Userdata} from '../../Model/User';
import DataService from '../../services/dataservice';
type field = {
  placeholder: string;
  getValue: (value: any) => void;
  CheckAvailable: RegExp;
};
type props = {
  title: string;
  ArrayField: field[];
  visibleModal: boolean;
  onExit: (value: any) => void;
  height: number;
  width: number;
  titleError: string;
};
const ModalInput: React.FC<props> = ({
  title,
  ArrayField,
  visibleModal,
  height,
  width,
  onExit,
  titleError,
}) => {
  const Reset = () => {
    ArrayField.forEach(i => i.getValue(''));
  };
  const [ListUser, setListUser] = useState<Userdata[]>();
  const [Error, setError] = useState<boolean>(false);
  const getListuser = async () => {
    let a = await DataService.Getdata_dtService<Userdata>('user');
    setListUser(a);
  };
  let ArrayNew: any[] = [];
  if (ArrayField.length > 0) {
    ArrayField.forEach(i => {
      let obj = {
        ...i,
        value: '',
      };
      ArrayNew.push(obj);
    });
  }
  const checkExistEmail = (Email: string) => {
    let t = 0;
    if (ListUser) {
      ListUser.forEach(i => {
        if (i.Email === Email) {
          t = 1;
        }
      });
    }
    if (t == 1) {
      return true;
    }
    return false;
  };
  const checkValue = () => {
    // if (Email !== '') {
    //   return false;
    // }
    // return true;
    // console.log('123456');
    let t = 0;

    // if (ArrayNew.length > 0) {
    //   console.log(ArrayNew);
    ArrayNew.forEach(i => {
      console.log('check', checkExistEmail(i));
      if (
        i.CheckAvailable.test(i.value) === false ||
        checkExistEmail(i.value) === true
      ) {
        t = 1;
      }
    });
    //   console.log(t);
    if (t == 1) {
      return true;
    }
    return false;
    // }
  };
  useEffect(() => {
    getListuser();
  }, []);
  return (
    <Overlay isVisible={visibleModal}>
      <View
        style={{height: reponsiveheight(height), width: reponsivewidth(width)}}>
        <View style={styles.TitleOverlAdd}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: '#000000',
              paddingBottom: 2,
              fontWeight: '700',
            }}>
            {title}
          </Text>
        </View>
        <View>
          {ArrayNew.length > 0 &&
            ArrayNew.map(item => {
              return (
                <View
                  style={[
                    styles.styletxtInput,
                    {marginTop: 28, borderRadius: 4},
                  ]}>
                  <TextInput
                    onChangeText={text => {
                      item.value = text;
                    }}
                    style={{marginBottom: 10}}
                    placeholder={item.placeholder}
                  />
                </View>
              );
            })}
        </View>
      </View>
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <TouchableOpacity
          style={[
            styles.btnExit,
            {alignItems: 'center', alignSelf: 'center', marginRight: 15},
          ]}
          onPress={() => {
            console.log(checkValue());
            if (checkValue() === true) {
              setError(true);
            }
            // if (checkValue() === true) {
            //   setError(true);
            else {
              if (ArrayNew.length > 0) {
                ArrayNew.forEach(i => {
                  i.getValue(i.value);
                });
                onExit(false);
              }
            }
          }}>
          <Text style={{color: '#FFFF'}}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnExit, {alignItems: 'center', alignSelf: 'center'}]}
          onPress={() => {
            Reset();
            onExit(false);
          }}>
          <Text style={{color: '#FFFF'}}>Thoát</Text>
        </TouchableOpacity>
      </View>
      <CustomNotification
        visible={Error}
        Content={titleError}
        onCancel={() => setError(false)}
        title={'Thông báo'}
        iconContent={
          <Warning width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
      />
    </Overlay>
  );
};
export default ModalInput;
const styles = StyleSheet.create({
  style_header: {
    backgroundColor: '#226cb3',
    height: reponsiveheight(30),
    justifyContent: 'center',
  },
  btnExit: {
    backgroundColor: '#226cb3',
    padding: 10,
    width: reponsivewidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  styletxtInput: {
    borderColor: '#afaeae',
    borderWidth: 0.5,
  },
  TitleOverlAdd: {
    borderBottomColor: '#02569E',
    borderBottomWidth: 2,
  },
  TitleOverlAdd_content: {
    marginTop: 8,
  },
});
