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

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }}/>
    </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
