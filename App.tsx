/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './src/screens/Login';
import {Signup} from './src/screens/Signup';
import {BottomTab} from './src/components/BottomTab';
import {HomeScreen} from './src/screens/HomeScreen';
import {RecoilRoot, useRecoilValue} from 'recoil';
import { tokenState } from './src/context/userContext';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const token=useRecoilValue(tokenState);
  return (
    <RecoilRoot>
      <NavigationContainer>
        <BottomTab>
          <Stack.Navigator initialRouteName={token ? 'HomeScreen' : 'Login'}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </BottomTab>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({});

export default App;
