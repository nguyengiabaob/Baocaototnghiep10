/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CustomBottomSheet} from '../../Model/CustomBottomSheet';
import {Table} from '../../Model/Table';
import data from '../../services/data';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
import CustomBoxItem from '../../Model/CustomBoxItem';
import {CustomNotification} from '../../Model/CustomNofication';
import BellNofi from '../../asset/svg/bellnotification.svg';
import {CustomNotificationDel} from '../../Model/CustomNoficationDel';
import DataService from '../../services/dataservice';
type props = {
  getvisible: (data: any) => void;
};

export const HistoryBookTable: React.FC<props> = ({getvisible}) => {
  const [dataBooktable, setdataBookTable] = useState<any[]>([]);
  const [visible, setvisible] = useState<boolean>(false);
  const [BookTableSelected, setBookTableSelected] = useState<any>();
  const [datatable, setdataTable] = useState<any[]>([]);
  const [visibleModal, setvisibleModal] = useState<boolean>(false);
  const [visibleModalDel, setvisibleModalDel] = useState<boolean>(false);
  const tranferday = (d: string) => {
    var month = new Date(d).getMonth() + 1;
    var date = new Date(d).getDate();
    var year = new Date(d).getFullYear();
    return date + '/' + month + '/' + year;
  };
  const tranferTime = (d: string) => {
    var Hours = new Date(d).getHours();
    var Minutes = new Date(d).getMinutes();
    if (Minutes < 10) {
      return Hours + ': 0' + Minutes;
    }

    return Hours + ':' + Minutes;
  };
  const getNameTable = (item: any) => {
    let name;
    var a: any[] = datatable.filter(i => i.id === item.TableID);
    a.forEach(item => {
      name = item.Name;
    });
    return name;
  };
  const gettable = () => {
    data.getdata('Table').then(res => {
      var dataArray2: any[] = [];
      for (let key in res) {
        if (key !== '0') {
          dataArray2.push({
            id: key,
            ...res[key],
          });
        }
      }
      setdataTable(dataArray2);
    });
  };
  const getBookTable = async () => {
    var dataArray1 = await DataService.Getdata_dtService('BookTable');
    // data.getdata('BookTable').then(res=> {
    //     var dataArray1: any[]= [];
    //     for ( let key in res)
    //     {
    //         if (key !== '0')
    //         {
    //             dataArray1.push({
    //                 id: key,
    //                 ...res[key]
    //             })
    //         }
    //     }
    // data.getdata('Table').then(res=>{
    //     var dataArray2: any[]= [];
    //     for ( let key in res)
    //     {
    //         if (key !== '0')
    //         {
    //             dataArray2.push({
    //                 id: key,
    //                 ...res[key]
    //             })
    //         }
    //     }
    // dataArray1.forEach(item=>{
    //     dataArray2.forEach(i=>{
    //         if (item.TableID === i.id)
    //         {
    //             item.TableID =i.Name;
    //         }
    //     })
    // })
    setdataBookTable(dataArray1);
    // })
    // })
  };
  useEffect(() => {
    if (visibleModal === false) {
      getBookTable();
      gettable();
    }
  }, [visibleModal]);
  type propsedit = {
    visible: boolean;
  };
  const EditbooktableCom: React.FC<propsedit> = ({visible}: propsedit) => {
    const listData = [
      {
        title: 'Chỉnh sửa thông tin',
        onPress: () => {
          setvisible(false);
          setvisibleModal(true);
        },
      },
      {
        title: 'Xóa',
        onPress: () => {
          setvisible(false);
          setvisibleModalDel(true);
        },
      },

      {
        title: 'Thoát',
        onPress: () => {
          setvisible(false);
        },
      },
    ];
    return <CustomBottomSheet Listitem={listData} Visible={visible} />;
  };
  type propschild = {
    getvisibleChild: (data: any) => void;
  };
  const EditBooktable: React.FC<propschild> = ({getvisibleChild}) => {
    const [showtime, setshowtime] = useState<boolean>(false);
    const [time, settime] = useState<Date>(
      new Date(BookTableSelected.BookDate),
    );
    const [Slots, setSlots] = useState<number>(Number(BookTableSelected.Slots));
    const [VisibleTable, setVisibleTable] = useState<boolean>(false);
    const [TableSelected, setTableSelected] = useState<Table>();
    const [VisibleNotifi, setVisibleNotifi] = useState<boolean>(false);
    const onChangetime = (event: Event, selectdate: any) => {
      var currentDate = selectdate || time;
      setshowtime(false);
      console.log('change', selectdate);
      settime(currentDate);
    };
    const cancelModal = () => {
      setVisibleNotifi(false);
      setvisibleModal(false);
    };
    const onSave = () => {
      console.log('tbsave', TableSelected !== undefined);
      if (
        (time !== undefined && time !== new Date(BookTableSelected.Booktime)) ||
        Slots > 0
      ) {
        if (TableSelected !== undefined) {
          data
            .UpdateBookTable(
              BookTableSelected.id,
              BookTableSelected.CustomerName,
              BookTableSelected.BookDate,
              time,
              Slots,
              TableSelected.id,
              0,
            )
            .then(res => console.log(res));
        } else {
          data
            .UpdateBookTable(
              BookTableSelected.id,
              BookTableSelected.CustomerName,
              BookTableSelected.BookDate,
              time,
              Slots,
              BookTableSelected.TableID,
              0,
            )
            .then(res => console.log(res));
        }
        setVisibleNotifi(true);
      }

      console.log('gio', time.toTimeString());
      console.log('slots', Slots);
      console.log('tab', TableSelected);
    };

    useEffect(() => {
      setTableSelected(undefined);
    }, []);
    return (
      <View style={{flex: 1}}>
        <View style={{marginTop: -12}}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                padding: 18,
                backgroundColor: '#67bff3',
                borderColor: '#e5e5e5',
                borderWidth: 2,
              },
            ]}>
            <View
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
                width: reponsivewidth(50),
              }}>
              <TouchableOpacity onPress={() => getvisibleChild(false)}>
                <MaterialIcons name="arrow-back" size={28} color="#efefef" />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                width: reponsivewidth(300),
                textAlign: 'left',
                color: '#FFFF',
                fontWeight: '700',
              }}>
              Chỉnh sử thông tin
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
            }}>
            <TextInput
              disabled={true}
              placeholder="Tên khách hàng"
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(350)}}
              autoCompleteType={undefined}>
              {BookTableSelected.CustomerName}
            </TextInput>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
            }}>
            <TextInput
              disabled={true}
              editable={false}
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(350)}}
              right={<TextInput.Icon name="calendar-today" />}
              autoCompleteType={undefined}>
              {tranferday(BookTableSelected.BookDate)}
            </TextInput>
          </View>
          {console.log('tbs', TableSelected)}
          <TouchableOpacity
            onPress={() => setVisibleTable(true)}
            style={[
              styles.Shadowbox,
              {
                marginTop: 35,
                alignItems: 'center',
                backgroundColor: '#ffffff',
                width: reponsivewidth(350),
                alignSelf: 'center',
                padding: 10,
              },
            ]}>
            <Text>
              {TableSelected
                ? TableSelected.Name
                : BookTableSelected && getNameTable(BookTableSelected)}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
            }}>
            {console.log(tranferday(BookTableSelected.BookTime))}
            <TextInput
              editable={false}
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(350)}}
              right={
                <TextInput.Icon
                  onPress={() => setshowtime(true)}
                  name="clock"
                />
              }
              autoCompleteType={undefined}>
              {tranferTime(time.toString())}
            </TextInput>
            {showtime && (
              <DateTimePicker
                value={time}
                display={'clock'}
                mode={'time'}
                is24Hour={true}
                onChange={onChangetime}
              />
            )}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
            }}>
            <TextInput
              keyboardType={'numeric'}
              value={Slots.toString()}
              onChangeText={text => setSlots(Number(text))}
              placeholder="Số người "
              mode="outlined"
              outlineColor="#02569E"
              style={{width: reponsivewidth(350)}}
              autoCompleteType={undefined}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
            }}>
            <TouchableOpacity
              onPress={() => {
                onSave();
              }}
              style={{
                backgroundColor: '#226cb3',
                padding: 10,
                width: reponsivewidth(100),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
              }}>
              <Text style={{color: '#FFFF'}}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Overlay isVisible={VisibleTable}>
          <View
            style={{width: reponsivewidth(320), height: reponsiveheight(360)}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: '#67bff3',
                borderBottomWidth: 2,
              }}>
              <Text style={{fontSize: 16, paddingBottom: 5, fontWeight: '700'}}>
                Khu vực
              </Text>
            </View>
            <View style={{height: reponsiveheight(250)}}>
              <ScrollView>
                {datatable
                  .filter(
                    item =>
                      item.id !== BookTableSelected.TableID &&
                      item.Status === 0,
                  )
                  .map(item => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          setTableSelected(item);
                          setVisibleTable(false);
                        }}
                        style={{
                          width: reponsivewidth(320),
                          alignSelf: 'center',
                        }}>
                        <CustomBoxItem
                          Style={{
                            backgroundColor: '#e3e2e287',
                            borderColor: '#6666667d',
                            borderWidth: 0.45,
                            borderRadius: 0,
                          }}
                          title={item.Name}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
            <View style={{alignItems: 'center', marginTop: 25}}>
              <TouchableOpacity
                onPress={() => {
                  setVisibleTable(false);
                }}
                style={{
                  backgroundColor: '#226cb3',
                  padding: 5,
                  width: reponsivewidth(100),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                }}>
                <Text style={{color: '#FFFF'}}>Thoát</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>

        <CustomNotification
          visible={VisibleNotifi}
          iconTitle={
            <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
          }
          title="Thông báo"
          onCancel={() => cancelModal()}
          Content="Cập nhật thành công !"
        />
      </View>
    );
  };
  const onDelBookTable = () => {
    data.deletedData('BookTable', BookTableSelected.id);
  };
  return (
    <View
      style={{
        width: getwidth(),
        height: getheight(),
        flex: 1,
        marginTop: -9.5,
      }}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 18,
            backgroundColor: '#67bff3',
            borderColor: '#e5e5e5',
            borderWidth: 2,
          },
        ]}>
        <View
          style={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            width: reponsivewidth(50),
          }}>
          <TouchableOpacity onPress={() => getvisible(false)}>
            <MaterialIcons name="arrow-back" size={28} color="#efefef" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 17,
            width: reponsivewidth(300),
            textAlign: 'left',
            color: '#FFFF',
            fontWeight: '700',
          }}>
          Lịch sử đặt bàn
        </Text>
      </View>
      <ScrollView>
        {dataBooktable.length > 0 &&
          dataBooktable.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setBookTableSelected(item);
                  setvisible(true);
                }}
                style={[
                  styles.Shadowbox,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: reponsivewidth(350),
                    alignSelf: 'center',
                    paddingRight: 25,
                    marginLeft: 15,
                    paddingTop: 15,
                    paddingBottom: 20,
                    marginTop: 15,
                    height: reponsiveheight(180),
                    borderLeftColor: item.Status === 1 ? 'red' : '#0d80bf',
                    borderLeftWidth: 10,
                    borderRadius: 5,
                  },
                ]}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 70,
                    width: reponsivewidth(380),
                  }}>
                  <View
                    style={[
                      {
                        justifyContent: 'flex-end',
                        alignItems: 'flex-start',
                        width: reponsivewidth(380),
                        marginBottom: 10,
                        marginLeft: 5,
                      },
                    ]}>
                    <Text style={{fontWeight: '700'}}>
                      {tranferday(item.BookDate)}
                    </Text>
                  </View>
                  <View style={{width: reponsivewidth(280)}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text>Tên khách hàng:</Text>
                      <Text style={{marginLeft: 5}}>{item.CustomerName}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Text>Tên Bàn :</Text>
                      <Text style={{marginLeft: 5}}>{getNameTable(item)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Text style={{fontWeight: '700'}}>Thời gian :</Text>
                      <Text>{tranferTime(item.BookTime)}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      {visible === true && <EditbooktableCom visible={visible} />}
      <Overlay isVisible={visibleModal}>
        <EditBooktable getvisibleChild={setvisibleModal} />
      </Overlay>
      <CustomNotificationDel
        visible={visibleModalDel}
        iconTitle={
          <BellNofi width={reponsivewidth(30)} height={reponsiveheight(30)} />
        }
        Content={'Bạn có thực sự muốn xóa lịch đặt bàn này không'}
        title="Thông báo"
        onCancel={() => setvisibleModalDel(false)}
        onAction={onDelBookTable}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Shadowbox: {
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
});
