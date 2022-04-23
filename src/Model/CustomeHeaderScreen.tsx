/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {reponsivewidth} from '../theme/Metric';
type props = {
  onCancel: (val: any) => void;
  title: string;
};
const CustomHeaderScreen: React.FC<props> = ({onCancel, title}) => {
  return (
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
        <TouchableOpacity onPress={() => onCancel(false)}>
          <MaterialIcons name="arrow-back" size={28} color="#efefef" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 17,
          width: reponsivewidth(180),
          textAlign: 'center',
          color: '#FFFF',
          fontWeight: '700',
        }}>
        {title}
      </Text>
    </View>
  );
};
export default CustomHeaderScreen;
