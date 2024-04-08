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
  BottomTab: undefined;
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  HomeScreen: undefined;
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
