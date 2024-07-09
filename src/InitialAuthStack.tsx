import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React,{useState} from 'react';
import {StyleSheet} from 'react-native';
import {RootStackParamList} from '../App';
import {BottomTab} from './components/BottomTab';
import {HomeScreen} from './screens/HomeScreen';
import {Trending} from './screens/Trending';
import {Login} from './screens/Login';
import {Signup} from './screens/Signup';
import {AddPost} from './screens/AddPost';
import {Notification} from './screens/Notification';
import {Profile} from './screens/Profile';
import {Splash} from './screens/Splash';
import CommentSheet from './components/CommentSheet';
import { useRecoilState } from 'recoil';
import { visibleComment } from './context/userContext';
import TopBar from './components/TopBar';
import MoodCalender from './screens/MoodCalender';

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
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MoodCalender"
          component={MoodCalender}
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

const TrendingScreenNavigation = createNativeStackNavigator();
export const TrendingStack = () => {
  return (
    <TrendingScreenNavigation.Navigator>
      <TrendingScreenNavigation.Screen
        name="Trending"
        component={Trending}
        options={{headerShown: false}}
      />
    </TrendingScreenNavigation.Navigator>
  );
};

export const AddPostScreenNavigation = createNativeStackNavigator();
export const AddPostStack = () => {
  return (
    <AddPostScreenNavigation.Navigator>
      <AddPostScreenNavigation.Screen
        name="AddPost"
        component={AddPost}
        options={{headerShown: false}}
      />
    </AddPostScreenNavigation.Navigator>
  );
};

export const NotificationScreenNavigation = createNativeStackNavigator();
export const NotificationStack = () => {
  return (
    <NotificationScreenNavigation.Navigator>
      <NotificationScreenNavigation.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
    </NotificationScreenNavigation.Navigator>
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
    backgroundColor: 'black',
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
