import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React,{useState} from 'react';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '../App';
import {BottomTab, BottomTabWithModals} from './components/BottomTab';
import {HomeScreen} from './screens/HomeScreen';
import {Market} from './screens/Market';
import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import {AddPost} from './screens/AddPost';
import {Profile} from './screens/Profile';
import {Splash} from './screens/Splash';
import CommentSheet from './components/CommentSheet';
import { useRecoilState } from 'recoil';
import { visibleComment } from './context/userContext';
import MoodCalender from './screens/MoodCalender';
import MarketItem from './screens/MarketItem';

const Stack = createNativeStackNavigator<RootStackParamList>();
const InitialAuthStack = () => {
  const [viewComment,setViewComment]=useRecoilState(visibleComment);
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
          name="BottomTabWithModals"
          component={BottomTabWithModals}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {viewComment && <CommentSheet setViewComment={setViewComment} />}
    </>
  );
};

const HomeScreenNavigation = createNativeStackNavigator();
export const HomeScreenStack = () => {
  return (
    <HomeScreenNavigation.Navigator>
      <HomeScreenNavigation.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </HomeScreenNavigation.Navigator>
  );
};

const MarketScreenNavigation = createNativeStackNavigator();
export const MarketStack = () => {
  return (
    <MarketScreenNavigation.Navigator>
      <MarketScreenNavigation.Screen
        name="Market"
        component={Market}
        options={{headerShown: false}}
      />
    </MarketScreenNavigation.Navigator>
  );
};

export const AddPostScreenNavigation = createNativeStackNavigator();
export const AddPostStack = () => {
  return (
    <AddPostScreenNavigation.Navigator>
      <AddPostScreenNavigation.Screen
        name="AddPost"
        component={AddPost}
        options={{headerShown: false,}}
      />
    </AddPostScreenNavigation.Navigator>
  );
};

export const MoodCalenderScreenNavigation = createNativeStackNavigator();
export const MoodCalenderStack = () => {
  return (
    <MoodCalenderScreenNavigation.Navigator>
      <MoodCalenderScreenNavigation.Screen
        name="MoodCalender"
        component={MoodCalender}
        options={{headerShown: false}}
      />
    </MoodCalenderScreenNavigation.Navigator>
  );
};

export const ProfileScreenNavigation = createNativeStackNavigator();
export const ProfileStack = () => {
  return (
    <ProfileScreenNavigation.Navigator>
      <ProfileScreenNavigation.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </ProfileScreenNavigation.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  icon: {
    width: 40,
    height: 40,
  },
  largeIcon: {
    width: 55,
    height: 55,
    position: 'absolute',
  },
  tabBar: {
    height: 80,
    // borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: 'white',
  },
});

export default InitialAuthStack;
