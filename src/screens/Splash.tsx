import {useNavigation, NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useRecoilValue} from 'recoil';
import {tokenState} from '../context/userContext';
import {getToken} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

type RootStackParamList = {
    HomeScreen: undefined;
    Login: undefined;
};

export const Splash = () => {
    const navigation = useNavigation();
  //   const token = useRecoilValue(tokenState);

  const checkToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    
    console.log(storedToken);
    if (storedToken === null) {
      navigation.navigate('Login');
    } else {
      navigation.navigate('HomeScreen');
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
        checkToken()
    }, 2000);
  }, []);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};
