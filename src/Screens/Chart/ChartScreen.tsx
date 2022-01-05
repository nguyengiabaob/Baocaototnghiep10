/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Overlay, Text} from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Product} from '../../Model/product';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import data from '../../services/data';
import {getwidth, reponsiveheight, reponsivewidth} from '../../theme/Metric';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MonthSelector from 'react-native-month-selector';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import DataService from '../../services/dataservice';
export const ChartScreen: React.FC = () => {
  const [labelmonth, setlabelmonth] = useState<any>([]);
  const [labelyear, setlabelyear] = useState<any>([]);
  const [arrayBill, setarrayBill] = useState<any[]>([]);
  const [arrayExpense, setarrayExpense] = useState<any[]>([]);
  const [arrayWages, setarrayWages] = useState<any[]>([]);
  const [arrayTotal, setarrayTotal] = useState<any[]>([]);
  const [arrayProduct, setarrayProduct] = useState<Product[]>([]);
  const [optionDay, setoptionDay] = useState<Date>(new Date());
  const [valueInventory, setValueInventory] = useState<number>(0);
  const [quanityInventory, setquanityInventory] = useState<number>(0);
  const [unit, setunit] = useState<string>('');
  const [topseller, settopseller] = useState<any[]>([]);
  const [arrayListProduct, setarrayListProduct] = useState<any[]>([]);
  const [ModelFilter, setModelFilter] = useState<boolean>(false);
  const [ModelCanlendar, setModalCalendar] = useState<boolean>(false);
  const [Filtermodel, setFilter] = useState<string>('');
  const [ModeYearclick, setYearclick] = useState<any>(new Date().getFullYear());
  const [showmodelyear, setshowmodelyear] = useState<boolean>(false);

  const createLabel = () => {
    let dataArray: any[] = [];
    let dataArrayyear: any[] = [];
    for (let i = 1; i <= 31; i++) {
      if (
        i == 1 ||
        i == 6 ||
        i == 11 ||
        i == 21 ||
        i == 26 ||
        i == 31 ||
        i == 16
      )
        dataArray.push(`${i}`);
      else {
        dataArray.push(' ');
      }
    }
    for (let i = 1; i <= 12; i++) {
      if (i == 1 || i == 2 || i == 4 || i == 6 || i == 8 || i == 10 || i == 12)
        dataArrayyear.push(`${i}`);
      else {
        dataArrayyear.push(' ');
      }
    }
    setlabelyear(dataArrayyear);
    setlabelmonth(dataArray);
  };

  const getunit = (arraydata: any): string => {
    let max = Math.max(...arraydata);
    // console.log(max);
    let count = 0;
    while (max > 10) {
      max = max / 10;
      console.log(max);
      count++;
    }
    console.log(count);
    if (count === 4 || count === 5) return 'ng';
    // else
    //   if (count === 5)
    //     return "trm";
    else if (count === 6) return 'tr';
    else if (count === 9) return 'tỷ';
    return '';
  };
  const getBill = async() => {
    let dataArray = await DataService.Getdata_dtService<any>('Bill');
    // data.getdata('Bill').then(res => {
    //   let dataArray: any[] = [];
    //   for (let key in res) {
    //     if (key !== '0') {
    //       dataArray.push({
    //         id: key,
    //         ...res[key],
    //       });
    //     }
    //   }
      setarrayBill(dataArray);
    // });
  };
  const getLisProduct = async() => {
    let dataArray = await DataService.Getdata_dtService<any>('ListProduct');
    // data.getdata('ListProduct').then(res => {
    //   let dataArray: any[] = [];
    //   for (let key in res) {
    //     if (key !== '0') {
    //       dataArray.push({
    //         id: key,
    //         ...res[key],
    //       });
    //     }
    //   }
      setarrayListProduct(dataArray);
    // });
  };
  const getProduct = async() => {
    let dataArray = await DataService.Getdata_dtService<any>('Products');
    // data.getdata('Products').then(res => {
    //   let dataArray: any[] = [];
    //   for (let key in res) {
    //     if (key !== '0') {
    //       dataArray.push({
    //         id: key,
    //         ...res[key],
    //       });
    //     }
    //   }
      setarrayProduct(dataArray);
    // });
  };
  const getExpense = async() => {
    let dataArray = await DataService.Getdata_dtService<any>('Expense');
    // data.getdata('Expense').then(res => {
    //   let dataArray: any[] = [];
    //   for (let key in res) {
    //     if (key !== '0') {
    //       dataArray.push({
    //         id: key,
    //         ...res[key],
    //       });
    //     }
    //   }
      setarrayExpense(dataArray);
    // });
  };
  const getWages = async() => {
    let dataArray = await DataService.Getdata_dtService<any>('Wages');
    // data.getdata('Wages').then(res => {
    //   let dataArray: any[] = [];
    //   for (let key in res) {
    //     if (key !== '0') {
    //       dataArray.push({
    //         id: key,
    //         ...res[key],
    //       });
    //     }
    //   }
      setarrayWages(dataArray);
    // });
  };
  const getinventory = useCallback(() => {
    let totalquanity = 0;
    let total = 0;
    arrayProduct.forEach(item => {
      totalquanity += item.Quanity;
      total += item.Quanity * item.Price_product;
    });
    setValueInventory(total);
    setquanityInventory(totalquanity);
  }, [arrayProduct]);
  const GetdatasetfilterMonth = useCallback(
    (date: number, month: number, year: number) => {
      console.log('month', month);
      let totalBill = 0;
      let totalExpense = 0;
      let totalWages = 0;
      if (Filtermodel == '2' || Filtermodel == '') {
        arrayBill.forEach(item => {
          if (
            new Date(item.CreateDate).getDate() == date &&
            new Date(item.CreateDate).getMonth() + 1 == month &&
            new Date(item.CreateDate).getFullYear() == year &&
            item.Status == 1
          ) {
            totalBill += item.Total;
            console.log('Bill', totalBill);
          }
        });
        arrayExpense.forEach(item => {
          if (
            new Date(item.CreateDate).getDate() == date &&
            new Date(item.CreateDate).getMonth() + 1 == month &&
            new Date(item.CreateDate).getFullYear() == year
          ) {
            totalExpense += item.Total;
          }
        });
        arrayWages.forEach(item => {
          if (
            new Date(item.Day).getDate() == date &&
            new Date(item.Day).getMonth() + 1 == month &&
            new Date(item.Day).getFullYear() == year
          ) {
            totalExpense += item.TotalSalary;
          }
        });
      } else {
        if (Filtermodel == '1') {
          arrayBill.forEach(item => {
            if (
              new Date(item.CreateDate).getMonth() + 1 == month &&
              new Date(item.CreateDate).getFullYear() == year &&
              item.Status == 1
            ) {
              totalBill += item.Total;
              console.log('Bill', totalBill);
            }
          });
          arrayExpense.forEach(item => {
            if (
              new Date(item.CreateDate).getMonth() + 1 == month &&
              new Date(item.CreateDate).getFullYear() == year
            ) {
              totalExpense += item.Total;
              console.log('Expense', totalExpense);
            }
          });
          arrayWages.forEach(item => {
            if (
              new Date(item.CreateDate).getMonth() + 1 == month &&
              new Date(item.Day).getFullYear() == year
            ) {
              totalWages += item.TotalSalary;
              console.log('wages', totalWages);
            }
          });
        }
      }

      let result = totalBill - (totalExpense + totalWages);
      return result;
    },
    [arrayBill, arrayExpense, arrayWages, Filtermodel],
  );

  const getquanity = useCallback(
    (id: string) => {
      let total = 0;
      if (Filtermodel == '2' || Filtermodel == '') {
        arrayListProduct.forEach(item => {
          if (
            new Date(item.CreateDate).getMonth() + 1 ===
              optionDay.getMonth() + 1 &&
            new Date(item.CreateDate).getFullYear() ===
              optionDay.getFullYear() &&
            item.productID == id
          ) {
            console.log('Number', item.Number);
            total += item.Number;
          }
        });
      } else {
        if (Filtermodel == '1') {
          arrayListProduct.forEach(item => {
            if (
              new Date(item.CreateDate).getFullYear() === Number(optionDay) &&
              item.productID == id
            ) {
              console.log('Number', item.Number);
              total += item.Number;
            }
          });
        }
      }
      return total;
    },
    [arrayListProduct, optionDay, Filtermodel],
  );
  const getTopSeller = useCallback(() => {
    let dataArray: any[] = [];
    let dataArraynew: any[] = [];
    arrayProduct.forEach(item => {
      let value = getquanity(item.id);
      if (value != 0) {
        console.log('Number', value);
        dataArray.push({
          name: item.name_product,
          img: item.Image,
          quanity: value,
        });
      }
    });
    dataArray.sort((a, b) => {
      return a.quanity - b.quanity;
    });
    dataArray.reverse();
    if (dataArray.length > 10) {
      for (let i = 0; i < 10; i++) {
        dataArraynew.push(dataArray[i]);
      }
    } else {
      dataArraynew = dataArray;
    }
    console.log();
    settopseller(dataArraynew);
  }, [arrayProduct, getquanity]);
  const Total = (d: Date) => {
    var total = 0;
    if (Filtermodel == '2' || Filtermodel == '') {
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      for (let i = 1; i <= 31; i++) {
        let res = GetdatasetfilterMonth(i, month, year);

        total += res;
      }
    } else {
      if (Filtermodel == '1') {
        for (let i = 1; i <= 12; i++) {
          let res = GetdatasetfilterMonth(0, i, Number(d));
          console.log('res', res);
          console.log('Năm', Number(d));
          total += res;
        }
      }
    }
    return total;
  };
  const DataChart = useCallback(
    (d: Date) => {
      let dataArray: any[] = [];
      if (Filtermodel == '2' || Filtermodel == '') {
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        for (let i = 1; i <= 31; i++) {
          let res = GetdatasetfilterMonth(i, month, year);

          if (res < 0) {
            res = 0;
          }
          dataArray.push(res);
        }
      } else {
        if (Filtermodel == '1') {
          for (let i = 1; i <= 12; i++) {
            let res = GetdatasetfilterMonth(0, i, Number(d));
            console.log('res', res);
            console.log('Năm', Number(d));
            if (res < 0) {
              res = 0;
            }
            dataArray.push(res);
          }
        }
      }
      let unit = getunit(dataArray);
      if (unit == 'ng') {
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = dataArray[i] / 1000;
        }
      }
      // if(unit=="trm")
      // {
      //   for(let i= 0 ;i< dataArray.length;i++)
      //   {
      //       dataArray[i]= dataArray[i]/1000
      //   }

      // }
      if (unit == 'tr') {
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = dataArray[i] / 1000000;
        }
      }
      if (unit == 'tỷ') {
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = dataArray[i] / 1000000000;
        }
      }
      console.log(unit);
      setunit(unit);
      setarrayTotal(dataArray);
    },
    [GetdatasetfilterMonth, Filtermodel],
  );
  useEffect(() => {
    createLabel();
    getBill();
    getExpense();
    getWages();
    getProduct();
    getLisProduct();
    getProduct();
  }, []);
  useEffect(() => {
    DataChart(optionDay);
    getinventory();
    getTopSeller();
  }, [DataChart, optionDay, getinventory, getTopSeller]);
  return (
    <View style={{flex: 1}}>
      {console.log(arrayTotal)}
      <View style={styles.container}>
        <View
          style={[
            styles.Shadowtop,
            {
              backgroundColor: '#EBEBEB',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: '#9b9b9b',
              height: reponsiveheight(55),
              padding: 10,
            },
          ]}>
          <TouchableOpacity
            onPress={() => setModelFilter(true)}
            style={[
              {
                backgroundColor: '#EBEBEB',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#9b9b9b',
                height: reponsiveheight(55),
                padding: 10,
                width: reponsivewidth(100),
              },
            ]}>
            <FontAwesome name="calendar-o" size={25} color={'#7C7C7C'} />
            <View style={{marginLeft: 5}}>
              <Text>
                {Filtermodel == '2'
                  ? `Tháng ${optionDay.getMonth() + 1}`
                  : Filtermodel == '1'
                  ? `Năm ${Number(optionDay)}`
                  : 'Tháng này'}
              </Text>
            </View>
            <View style={{width: reponsivewidth(50), marginLeft: 5}}>
              <MaterialIcons name="arrow-drop-down" size={25} />
            </View>
          </TouchableOpacity>
        </View>
        {console.log(arrayTotal)}
        <View style={[{alignItems: 'center', width: getwidth() - 10}]}>
          <BarChart
            data={{
              labels:
                Filtermodel == '2' || Filtermodel == ''
                  ? labelmonth
                  : Filtermodel == '1' && labelyear,
              datasets: [
                {
                  color: (opacity = 1) => `rgba(2, 86, 185, ${opacity})`,
                  data: arrayTotal,
                },
              ],
            }}
            width={getwidth() - 10} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix={unit}
            //yLabelsOffset={1}
            yAxisInterval={0.5} // optional, defaults to 1
            chartConfig={{
              scrollableInfoSize: {width: reponsivewidth(700), height: 220},
              scrollableInfoViewStyle: {backgroundColor: 'red'},
              height: 5000,
              barPercentage: 0.3,
              fillShadowGradient: '#02569E',
              fillShadowGradientOpacity: 1,
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(2, 86, 185, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {},

              propsForBackgroundLines: {
                strokeWidth: 1,
                stroke: '#e3e3e3',
                strokeDasharray: '0',
              },
              propsForDots: {
                r: '2',
                strokeWidth: '10',
                stroke: '#ffa726',
              },
            }}
            style={{
              marginVertical: 5,
              borderRadius: 2,
            }}
          />
        </View>
        {/* <BarChart style={styles.chart}
            data={{dataSets:[{label: 'demo', values: [{y: 1}, {y: 2}, {y: 1}]},{label: 'demo1', values: [{y: 2}, {y: 2}, {y: 2}]}]}}
          /> */}
        <View
          style={[
            styles.Shadowtop,
            {padding: 15, backgroundColor: '#efefef', marginBottom: 5},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Tổng doanh thu
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                color: '#02569E',
                fontWeight: '700',
              }}>
              {Number(Total(optionDay))
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          {/* <View style={{flexDirection:'row', marginTop:2}}>
              <Text style={{fontSize:16,color:'#737272'}}>{quanityInventory.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
              <Text style={{fontSize:16,color:'#737272', marginLeft:10}}>sản phẩm</Text>
            </View> */}
        </View>
        <View
          style={[
            styles.Shadowtop,
            {padding: 8, backgroundColor: '#efefef', marginLeft: 6},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Tồn kho</Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 18,
                color: '#02569E',
                fontWeight: '700',
              }}>
              {valueInventory.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 2}}>
            <Text style={{fontSize: 16, color: '#737272'}}>
              {quanityInventory
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
            <Text style={{fontSize: 16, color: '#737272', marginLeft: 10}}>
              sản phẩm
            </Text>
          </View>
        </View>

        <View style={{backgroundColor: '#FFFF', marginTop: 7}}>
          <Text style={{fontWeight: '700', marginLeft: 10, fontSize: 16}}>
            Top 10 hàng bán chạy
          </Text>
          <View style={{marginTop: 25}}>
            <ScrollView
              style={{height: reponsiveheight(250), marginBottom: 50}}>
              {topseller.length > 0 ? (
                topseller.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 10,
                        alignItems: 'center',
                        paddingBottom: 10,
                        paddingTop: 10,
                        borderBottomColor: '#afafaf',
                        borderBottomWidth: 0.5,
                      }}>
                      <View style={{width: reponsivewidth(80)}}>
                        <Image
                          style={{
                            width: reponsivewidth(60),
                            height: reponsiveheight(60),
                          }}
                          source={{uri: item.img}}
                        />
                      </View>
                      <View
                        style={{
                          width: reponsivewidth(240),
                          alignItems: 'center',
                        }}>
                        <Text>{item.name}</Text>
                      </View>
                      <View
                        style={{
                          width: reponsivewidth(80),
                          alignItems: 'center',
                        }}>
                        <Text>{item.quanity}</Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: reponsiveheight(250),
                  }}>
                  <AntDesign
                    name="dropbox"
                    size={40}
                    color="#b4b4b4"
                    style={{opacity: 0.4}}
                  />
                  <Text style={{opacity: 0.4, marginLeft: 8}}>No Data</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
      <Overlay isVisible={showmodelyear}>
        <View
          style={{
            width: reponsivewidth(300),
            height: reponsiveheight(450),
            marginBottom: -25,
            justifyContent: 'center',
          }}>
          <View style={[styles.TitleOverlAdd, {marginTop: -50}]}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
                paddingBottom: 2,
                fontWeight: '700',
              }}>
              Chọn năm
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: reponsiveheight(300),
              marginLeft: 10,
            }}>
            <View
              style={{
                alignSelf: 'flex-start',
                width: '20%',
                height: reponsiveheight(300),
                justifyContent: 'center',
              }}>
              <SimpleLineIcons
                onPress={() => {
                  if (ModeYearclick > 1976) {
                    setYearclick((prev: number) => prev - 1);
                  }
                }}
                name="arrow-left"
                size={20}
              />
            </View>
            <View
              style={{alignSelf: 'center', width: '60%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setFilter('1');
                  setoptionDay(ModeYearclick);
                  setshowmodelyear(false);
                }}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  {ModeYearclick}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
                height: reponsiveheight(300),
                width: '20%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <SimpleLineIcons
                onPress={() => setYearclick((prev: number) => prev + 1)}
                name="arrow-right"
                size={20}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              {
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginTop: 25,
                marginRight: 15,
              },
            ]}
            onPress={() => setshowmodelyear(false)}>
            <Text style={{fontWeight: '700', color: 'black'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay isVisible={ModelCanlendar}>
        <View
          style={{
            width: reponsivewidth(300),
            height: reponsiveheight(450),
            marginBottom: -25,
          }}>
          <MonthSelector
            onMonthTapped={month => {
              setoptionDay(month.toDate());
              setModalCalendar(false);
              setModelFilter(false);
              setFilter('2');
            }}
            maxDate={moment(new Date(2099, 10))}
            selectedBackgroundColor="#02569E"
            prevIcon={
              <EvilIcons name="chevron-left" size={32} color={'#757575'} />
            }
            nextIcon={
              <EvilIcons name="chevron-right" size={32} color={'#757575'} />
            }
          />
          <TouchableOpacity
            style={[
              {
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginTop: 25,
                marginRight: 15,
              },
            ]}
            onPress={() => setModalCalendar(false)}>
            <Text style={{fontWeight: '700', color: 'black'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
        {/* <Text>dsadsad</Text> */}
      </Overlay>
      <Overlay isVisible={ModelFilter}>
        <View
          style={{width: reponsivewidth(300), height: reponsiveheight(350)}}>
          <View style={styles.TitleOverlAdd}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: '#000000',
                paddingBottom: 2,
                fontWeight: '700',
              }}>
              Chọn chế độ lọc
            </Text>
          </View>

          <ScrollView style={styles.TitleOverlAdd_content}>
            {/* <TouchableOpacity onPress={()=>{  setFilter('0'), setModelFilter(false)}} style={[styles.btnChoosenAdd,{marginVertical:10, padding:15}]}><Text>Tất cả</Text></TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                setshowmodelyear(true);
                setModelFilter(false);
              }}
              style={[styles.btnChoosenAdd, {padding: 15, marginVertical: 10}]}>
              <Text>Chọn Năm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalCalendar(true);
                setModelFilter(false);
              }}
              style={[styles.btnChoosenAdd, {padding: 15, marginVertical: 10}]}>
              <Text>Chọn Tháng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('');
                setoptionDay(new Date());
                setModelFilter(false);
              }}
              style={[styles.btnChoosenAdd, {padding: 15, marginVertical: 10}]}>
              <Text>Tháng này</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={[
              styles.btnExit,
              {alignItems: 'center', alignSelf: 'center', marginTop: 25},
            ]}
            onPress={() => setModelFilter(false)}>
            <Text style={{color: '#FFFF'}}>Thoát</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
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
    elevation: 10,
  },
  Shadowtop: {
    backgroundColor: '#EBEBEB',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
  },
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
