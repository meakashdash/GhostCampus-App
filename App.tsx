/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './src/screens/Login';
import {Signup} from './src/screens/Signup';
import {BottomTab} from './src/components/BottomTab';
import {HomeScreen} from './src/screens/HomeScreen';
import {RecoilRoot} from 'recoil';
import { Splash } from './src/screens/Splash';
import InitialAuthStack from './src/InitialAuthStack';

export type RootStackParamList = {
  Splash:undefined
  Login:undefined
  Signup:undefined
  HomeScreen:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(){
  return (
    <RecoilRoot>
      <NavigationContainer>
          <InitialAuthStack />
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({});

export default App;
