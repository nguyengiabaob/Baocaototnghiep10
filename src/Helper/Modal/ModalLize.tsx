/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  Text,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {Userdata} from '../../Model/User';
import DataService from '../../services/dataservice';
import {reponsiveheight, reponsivewidth} from '../../theme/Metric';
import {Modalize} from 'react-native-modalize';
import {SearchBar} from 'react-native-elements';
import CustomBox from '../../Model/CustomBox';
type props = {
  Visible: boolean;
  onClosed?: () => void;
  title?: string;
  placeHolder?: string;
  ongetItem: (val: any) => void;
  selected: any;
  onChangeText?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => any;
};
const ModalizeEmployee: React.FC<props> = ({
  Visible,
  onClosed,
  ongetItem,
  selected,
}) => {
  const modalizeRef = useRef<Modalize>(null);
  const [dataSelected, setdataSelected] = useState<any[]>([]);
  const [valueSearch, setvalueSearch] = useState<string>('');
  const [dataQuery, setdataQuery] = useState<any[]>([]);
  const [Datauser1, setDatauser1] = useState<any[]>([]);

  const getalluser = async () => {
    let datarray = await DataService.Getdata_dtService<any>('user');
    setDatauser1(datarray);
  };
  useEffect(() => {
    if (Visible === true) {
      modalizeRef.current?.open();
      if (selected) {
        setdataSelected([selected.id]);
      }
      getalluser();
    }
  }, [Visible, selected]);
  const onPress = (id: any, pressed: boolean) => {
    if (pressed) {
      setdataSelected(dataSelected.filter(item => item.id !== id.id));
    } else {
      setdataSelected([id.id]);
    }
  };
  const onsearch = useCallback(
    (valuesearch: string) => {
      if (valuesearch.length > 0 && Datauser1 !== undefined) {
        var user = Datauser1.filter(item =>
          item.Name.toLowerCase().includes(valuesearch),
        );
        if (user.length > 0) {
          setdataQuery(user);
        } else {
          setdataQuery([{error: 'Nhân viên không tìm thấy'}]);
        }
      } else {
        if (
          valuesearch.length < 0 ||
          valuesearch === '' ||
          valuesearch === null
        ) {
          setdataQuery([]);
        }
      }
    },
    [Datauser1],
  );
  useEffect(() => {
    onsearch(valueSearch.toLowerCase());
  }, [valueSearch, onsearch]);

  function onFinishChoose() {
    setTimeout(() => {
      ongetItem(Datauser1.find(x => x.id === dataSelected[0]));
    }, 1000);
    modalizeRef.current?.close();
    //}
  }
  return (
    <Modalize
      modalStyle={{elevation: 10}}
      ref={modalizeRef}
      modalHeight={reponsiveheight(750)}
      onClosed={onClosed}
      rootStyle={{height: reponsiveheight(800), elevation: 20}}>
      <SafeAreaView>
        <View
          style={{
            borderBottomColor: '#b7b7b7',
            borderWidth: 1,
            width: reponsivewidth(400),
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              textAlign: 'center',
              padding: 8,
            }}>
            Danh sách nhân viên
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <SearchBar
            containerStyle={{
              borderBottomColor: '#838282',
              borderWidth: 0.8,
              width: reponsivewidth(380),
              height: reponsiveheight(50),
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
            }}
            platform="android"
            value={valueSearch}
            onChange={e => setvalueSearch(e.nativeEvent.text)}
          />
        </View>
        <View>
          <ScrollView style={{height: reponsiveheight(450)}}>
            {dataQuery.length > 0 && !dataQuery[0]?.error ? (
              dataQuery.map(item => {
                // console.log('123', dataSelected[0]== item);
                // console.log('123', item);
                const pressedBox = dataSelected.includes(item);
                // if (DataAssignment.length > 0) {
                // //   DataAssignment.forEach(i => {
                // //     if (i.id === item.id) {
                // //       check1 = 1;
                // //     }
                // //   });
                //   if (check1 === 1) {
                //     return (
                //       <TouchableOpacity
                //         disabled={true}
                //         key={item.id}
                //         onPress={() => {
                //           onPress(item, pressedBox);
                //         }}
                //         style={{
                //           width: reponsivewidth(370),
                //           flexDirection: 'row',
                //           borderColor: '#c1bbbb',
                //           borderWidth: 0.6,
                //           marginTop: 15,
                //           marginLeft: 10,
                //           height: reponsiveheight(85),
                //           justifyContent: 'center',
                //           alignItems: 'center',
                //           borderRadius: 4,
                //         }}>
                //         <CustomBox
                //           stylecontainet={{padding: 10}}
                //           pressed={pressedBox}
                //           isAvatar={true}
                //           title={item.Name}
                //           subtitle={item.service}
                //           avatar={{uri: item.Avatar}}
                //         />
                //       </TouchableOpacity>
                //     );
                //   } else {
                //     return (
                //       <TouchableOpacity
                //         key={item.id}
                //         onPress={() => {
                //           onPress(item, pressedBox);
                //         }}
                //         style={{
                //           width: reponsivewidth(370),
                //           flexDirection: 'row',
                //           borderColor: '#c1bbbb',
                //           borderWidth: 0.6,
                //           marginTop: 15,
                //           marginLeft: 10,
                //           height: reponsiveheight(85),
                //           justifyContent: 'center',
                //           alignItems: 'center',
                //           borderRadius: 4,
                //         }}>
                //         <CustomBox
                //           stylecontainet={{padding: 10}}
                //           pressed={pressedBox}
                //           isAvatar={true}
                //           title={item.Name}
                //           subtitle={item.service}
                //           avatar={{uri: item.Avatar}}
                //         />
                //       </TouchableOpacity>
                //     );
                //   }
                // }

                // else {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      onPress(item, pressedBox);
                    }}
                    style={{
                      width: reponsivewidth(370),
                      flexDirection: 'row',
                      borderColor: '#c1bbbb',
                      borderWidth: 0.6,
                      marginTop: 15,
                      marginLeft: 10,
                      height: reponsiveheight(85),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}>
                    <CustomBox
                      stylecontainet={{padding: 10}}
                      pressed={pressedBox}
                      isAvatar={true}
                      title={item.Name}
                      subtitle={item.service}
                      avatar={{uri: item.Avatar}}
                    />
                  </TouchableOpacity>
                );
                // }
              })
            ) : dataQuery[0]?.error ? (
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 18,
                }}>
                {dataQuery[0].error}
              </Text>
            ) : (
              Datauser1?.map(item => {
                const pressedBox = dataSelected.includes(item.id);
                // if (DataAssignment.length > 0) {
                // //   DataAssignment.forEach(i => {
                // //     if (i.id === item.id) {
                // //       check = 1;
                // //     }
                // //   });
                //   if (check === 1) {
                //     return (
                //       <TouchableOpacity
                //         key={item.id}
                //         disabled={true}
                //         onPress={() => {
                //           onPress(item, pressedBox);
                //         }}
                //         style={{
                //           width: reponsivewidth(370),
                //           flexDirection: 'row',
                //           borderColor: '#c1bbbb',
                //           borderWidth: 0.6,
                //           marginTop: 15,
                //           marginLeft: 10,
                //           height: reponsiveheight(85),
                //           justifyContent: 'center',
                //           alignItems: 'center',
                //           borderRadius: 4,
                //         }}>
                //         <CustomBox
                //           stylecontainet={{padding: 10}}
                //           pressed={pressedBox}
                //           isAvatar={true}
                //           title={item.Name}
                //           subtitle={item.service}
                //           avatar={{uri: item.Avatar}}
                //         />
                //       </TouchableOpacity>
                //     );
                //   } else {
                //     return (
                //       <TouchableOpacity
                //         key={item.id}
                //         onPress={() => {
                //           onPress(item, pressedBox);
                //         }}
                //         style={{
                //           width: reponsivewidth(370),
                //           flexDirection: 'row',
                //           borderColor: '#c1bbbb',
                //           borderWidth: 0.6,
                //           marginTop: 15,
                //           marginLeft: 10,
                //           height: reponsiveheight(85),
                //           justifyContent: 'center',
                //           alignItems: 'center',
                //           borderRadius: 4,
                //         }}>
                //         <CustomBox
                //           stylecontainet={{padding: 10}}
                //           pressed={pressedBox}
                //           isAvatar={true}
                //           title={item.Name}
                //           subtitle={item.service}
                //           avatar={{uri: item.Avatar}}
                //         />
                //       </TouchableOpacity>
                //     );
                //   }
                // } else {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      onPress(item, pressedBox);
                    }}
                    style={{
                      width: reponsivewidth(370),
                      flexDirection: 'row',
                      borderColor: '#c1bbbb',
                      borderWidth: 0.6,
                      marginTop: 15,
                      marginLeft: 10,
                      height: reponsiveheight(85),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 4,
                    }}>
                    <CustomBox
                      stylecontainet={{padding: 10}}
                      pressed={pressedBox}
                      isAvatar={true}
                      title={item.Name}
                      subtitle={item.service}
                      avatar={{uri: item.Avatar}}
                    />
                  </TouchableOpacity>
                );
                // }
                //console.log(dataSelected);
              })
            )}
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              onFinishChoose();
            }}
            style={{
              backgroundColor: '#226cb3',
              padding: 5,
              width: reponsivewidth(100),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
            }}>
            <Text style={{fontSize: 16, color: '#FFF', fontWeight: '700'}}>
              {' '}
              Chọn
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modalize>
  );
};
export default ModalizeEmployee;
