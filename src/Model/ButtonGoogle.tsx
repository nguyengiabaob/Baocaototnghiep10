/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react'
import { Image, View, ViewStyle } from 'react-native';
import IconGoogle from '../asset/svg/google-symbol.svg';
import { reponsiveheight, reponsivewidth } from '../theme/Metric';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useAppDispatch } from '../redux/hook';
import { updateStatus } from '../redux/reducer/authslice';
type props ={
    onpress?:()=>void
    style?:ViewStyle
}
const ButtonGoogle: React.FC <props> = ({
    style,
    onpress,
})=>{
 const dispatch = useAppDispatch();
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '599323136996-rgalkduppp3j628s3nmqq0egorp1d9d7.apps.googleusercontent.com',
        });
    },[]);
    async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    //  Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //   // Sign-in the user with the credential
     await auth().signInWithCredential(googleCredential);
     dispatch(
         updateStatus({isLoggedIn:true, isLoggedGoogle:true, userToken: auth().currentUser?.uid })
     );
    } catch (error)
        {
             console.log(error);
        }
    }
     return (
        <TouchableHighlight style={[style]} onPress={async()=>{onGoogleButtonPress();}}>
            <IconGoogle width={reponsivewidth(40)} height={reponsiveheight(40)}/>
        </TouchableHighlight>
    );
};
export default ButtonGoogle;