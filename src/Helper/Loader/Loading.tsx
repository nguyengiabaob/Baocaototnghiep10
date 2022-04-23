/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {
  getheight,
  getwidth,
  reponsiveheight,
  reponsivewidth,
} from '../../theme/Metric';
type props = {
  visible: boolean;
};
const Loading: React.FC<props> = ({visible}) => {
  return (
    <Overlay
      overlayStyle={{backgroundColor: '#ffffff08'}}
      isVisible={visible}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          height: getheight(),
          width: getwidth(),
          backgroundColor: '#ffffff08',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            animating={true}
            size={45}
            color={'#226cb3cf'}
            collapsable={true}
          />
        </View>
        <Text style={{color: '#FFFF', fontSize: 15, fontWeight: '700'}}>
          Loading...
        </Text>
      </View>
    </Overlay>
  );
};
export default Loading;
