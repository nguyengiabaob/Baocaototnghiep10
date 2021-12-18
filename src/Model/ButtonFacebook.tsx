/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Image, View, ViewStyle } from 'react-native';
import Iconfacebook from '../asset/svg/facebook.svg';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { TouchableHighlight } from 'react-native-gesture-handler';
type props ={
    onpress?:()=>void
    style?:ViewStyle
}
const ButtonFacebook: React.FC<props> = ({
    style,
    onpress,
}:props)=>{

async function onFacebookButtonPress() {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
{
  if (result.isCancelled) {
    console.log( 'User cancelled the login process');
  }

  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
}
     return (
        <TouchableHighlight style={[style]} onPress={async ()=>{ onFacebookButtonPress()}}>
            <Iconfacebook width={reponsivewidth(40)} height={reponsiveheight(40)}/>
        </TouchableHighlight>
    );
};
export default ButtonFacebook;