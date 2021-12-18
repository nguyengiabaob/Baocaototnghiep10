/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';
import {reponsiveheight, reponsivewidth} from '../theme/Metric';

type Props = {
  textStyle?: StyleProp<TextStyle>;
  viewstyle?: StyleProp<ViewStyle>;
  icon?: any;
  onpress?: () => void;
  title?: string;
  viewContainer?: StyleProp<ViewStyle>;
};
const CustomButton: React.FC<Props> = ({
  textStyle,
  viewstyle,
  onpress,
  icon,
  title,
  viewContainer
}: Props) => {
  return (
    <View style={[style.container, viewContainer]}>
      <TouchableOpacity
        onPress={onpress ? onpress : undefined}
        style={[style.button, viewstyle]}>
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {icon}
          <Text style={[style.title, textStyle]}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#ECECEC',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 17,
  },
  button: {
    borderRadius: 30,
    width: reponsivewidth(180),
    height: reponsiveheight(150),
  },
});
export default CustomButton;
