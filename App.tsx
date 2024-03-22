/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet, Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { Signup } from './src/screens/Signup';
import { BottomTab } from './src/components/BottomTab';
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  return (
   <NavigationContainer>
    <BottomTab>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}/>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </BottomTab>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
