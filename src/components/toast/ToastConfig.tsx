// App.jsx
import React from 'react';
import {Text, View} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#B20000'}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#252526',
      }}
      text1Style={{
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        color: '#F4F4F4',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: 'Montserrat-Italic',
        color: '#F4F4F4',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` componentds
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: '#B20000'}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#252526',
      }}
      text1Style={{
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBoldItalic',
        color: '#F4F4F4',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: 'Montserrat-Italic',
        color: '#F4F4F4',
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({text1, props}: any) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
