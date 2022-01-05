/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import {WagesHistory} from './HistoryWages';
import {Wages} from './Wages';
export const TimeKeeping: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [load, setload] = useState(true);
  useEffect(() => {
    setload(prev => !prev);
  }, [index]);
  return (
    <View style={{flex: 1}}>
      <Tab
        indicatorStyle={{backgroundColor: '#67bff3'}}
        value={index}
        onChange={setIndex}>
        <Tab.Item
          containerStyle={{backgroundColor: '#02569E'}}
          titleStyle={{color: '#fff', fontSize: 14}}
          title="Chấm công"
        />
        <Tab.Item
          containerStyle={{backgroundColor: '#02569E'}}
          titleStyle={{color: '#fff', fontSize: 14}}
          title="Lịch sử chấm công"
        />
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{width: '100%'}}>
          <Wages />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <WagesHistory visible={load} />
        </TabView.Item>
      </TabView>
    </View>
  );
};
