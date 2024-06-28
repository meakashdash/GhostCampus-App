import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import axios from 'axios';
import {baseUrl} from '../URL';
import { useSetRecoilState } from 'recoil';
import { tokenState, userIdState } from '../context/userContext';

type SplashProps = NativeStackScreenProps<RootStackParamList,'Splash'>;

export const Splash: React.FC<SplashProps> = ({navigation}: SplashProps) => {
  const setToken=useSetRecoilState(tokenState);
  const setUserId=useSetRecoilState(userIdState)
  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      console.log(storedToken);
      console.log(`${baseUrl}/auth/token/user`);
      const response = await axios.get(`${baseUrl}/auth/token/user`, {
        headers: {
          Authorization: storedToken,
        },
      });
      console.log(response.data)
      if (response.data.statusCode != 200) {
        navigation.replace('Login')
      }else{
        setToken(storedToken)
        setUserId(response.data.data.userId)
        navigation.replace('BottomTab')
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    checkToken();
  }, []);

  return <View></View>;
};
