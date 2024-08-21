/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RecoilRoot} from 'recoil';
import InitialAuthStack from './src/InitialAuthStack';

export type RootStackParamList = {
  BottomTabWithModals: undefined;
  BottomTab:undefined;
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  HomeScreen: undefined;
  TopBar: undefined;
  MoodCalender: undefined;
  Market:undefined;
  MarketItem:{_id:string,isLiked:boolean};
  AddPost:undefined;
};

function App() {
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
