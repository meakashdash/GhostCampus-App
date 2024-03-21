import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTab } from '../components/BottomTab';
import { HomeScreen } from './HomeScreen';

const Tab = createBottomTabNavigator();

export const Posts = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
        
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  icons:{
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center' 
  }
})
