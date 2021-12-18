/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

//  import {
//    StyleSheet,
//  } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import DashboardScreen from './src/Screens/Dashboard/DashboardScreen';

//  import {
//    Colors,
//    DebugInstructions,
//    Header,
//    LearnMoreLinks,
//    ReloadInstructions,
//  } from 'react-native/Libraries/NewAppScreen';
// import { Provider } from 'react-redux';
import LoginScreen from './src/Screens/login/LoginScreen';
import DashboardNavigator from './src/navigation/DashboardNavigation';
import LoginNavigator from './src/navigation/LoginNavigation';
import RootNavigator from './src/navigation/MainNavigation';
import { AuthContext } from './src/redux/reducer/authslice';
import { store } from './src/redux/store';



 const App = () => {
  //  useEffect(()=>{
  //   Toast.show({
  //     type:'error',
  //     text1: 'Hello',
  //     text2: 'This is some something 👋',
  //   })
  //  },[])
   return (
     <Provider store={store}>
    <NavigationContainer>
      <RootNavigator/>
     <Toast style={{zIndex: 1, elevation:1}} ref={ref=>{Toast.setRef(ref)}}/>
     </NavigationContainer>
     </Provider>
   );
 };

//  const styles = StyleSheet.create({
//    sectionContainer: {
//      marginTop: 32,
//      paddingHorizontal: 24,
//    },
//    sectionTitle: {
//      fontSize: 24,
//      fontWeight: '600',
//    },
//    sectionDescription: {
//      marginTop: 8,
//      fontSize: 18,
//      fontWeight: '400',
//    },
//    highlight: {
//      fontWeight: '700',
//    },
//  });

 export default App;
