import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AddPostStack, HomeScreenStack, NotificationStack, ProfileStack, TrendingStack } from '../InitialAuthStack';

const Tab = createBottomTabNavigator();

export const BottomTab = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => {
          let iconSource;

          if (route.name === 'HomeScreenStack') {
            iconSource = focused
              ? require('../../assets/color-home-icon.png')
              : require('../../assets/gray-home-icon.png');
          }

          if (route.name === 'ProfileStack') {
            iconSource = focused
              ? require('../../assets/color-profile-circle.png')
              : require('../../assets/gray-profile-circle.png');
          }

          if (route.name === 'TrendingStack') {
            iconSource = focused
              ? require('../../assets/color-trending-icon.png')
              : require('../../assets/gray-trending-icon.png');
          }

          if (route.name === 'NotificationStack') {
            iconSource = focused
              ? require('../../assets/color-notification-icon.png')
              : require('../../assets/gray-notification-icon.png');
          }

          if (route.name === 'AddPostStack') {
            iconSource = focused
              ? require('../../assets/add-post-icon.png')
              : require('../../assets/add-post-icon.png');
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.icon,
                route.name === 'AddPostStack' && styles.largeIcon,
              ]}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: styles.tabBar,
      })}
      tabBarOptions={{
        showLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="TrendingStack"
        component={TrendingStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="AddPostStack"
        component={AddPostStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="NotificationStack"
        component={NotificationStack}
        options={{
          headerShown: false,
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: '#b20000'},
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
