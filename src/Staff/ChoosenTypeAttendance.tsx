import React from 'react';
import {SafeAreaView, TextStyle, ViewStyle} from 'react-native';
import {Overlay} from 'react-native-elements';
import { styles } from 'react-native-fbsdk-next/types/FBLoginButton';
type props = {
  visible: boolean;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
};
const ChooosenTypeAttendance: React.FC<props> = ({
  visible,
  viewStyle,
  textStyle,
}) => {
  
  return (
    <Overlay isVisible={visible}>
      <SafeAreaView style={[viewStyle]}>

      </SafeAreaView>
    </Overlay>
  );
};
export default ChooosenTypeAttendance;
