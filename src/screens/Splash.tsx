import {useNavigation} from '@react-navigation/native'; 
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import {StackActions} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type SplashProps={navigation: any;}

export const Splash: React.FC<SplashProps> = ({navigation}:SplashProps) => {
  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log(storedToken);

      if (storedToken === null) {
        console.log('Go to login');
        // navigation.dispatch(StackActions.replace('Login',{user:'test'}));
        navigation.replace('Login')
      } else {
        // navigation.dispatch(StackActions.replace('HomeScreen',{user:'test'}));
        navigation.replace('HomeScreen')
      }
    } catch (error) {
      console.error('Error checking token:', error);
      // navigation.dispatch(StackActions.replace('Login'));
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    // setTimeout(() => {
      checkToken();
    // }, 2000);
  }, []);

  return <View>{/* <ActivityIndicator /> */}</View>;
};
