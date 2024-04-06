import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../App';
import {Splash} from './screens/Splash';
import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import {HomeScreen} from './screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const InitialAuthStack = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default InitialAuthStack;
