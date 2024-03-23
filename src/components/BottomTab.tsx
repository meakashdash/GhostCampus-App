import React = require('react');
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { Profile } from '../screens/Profile';
import { Trending } from '../screens/Trending';
import { Notification } from '../screens/Notification';
import { AddPost } from '../screens/AddPost';

const Tab = createBottomTabNavigator();

export const BottomTab = (): React.JSX.Element => {
  return (
  <SafeAreaView style={styles.container}>
    <Tab.Navigator
        screenOptions={
            ({route})=>({
                tabBarIcon:({focused})=>{
                    let iconSource;

                    if(route.name==="HomeScreen"){
                        iconSource=focused
                        ? require('../../assets/color-home-icon.png')
                        : require('../../assets/gray-home-icon.png')
                    }

                    if(route.name==="Profile"){
                        iconSource=focused
                        ? require('../../assets/color-profile-circle.png')
                        : require('../../assets/gray-profile-circle.png')
                    }

                    if(route.name==="Trending"){
                        iconSource=focused
                        ? require('../../assets/color-trending-icon.png')
                        : require('../../assets/gray-trending-icon.png')
                    }

                    if(route.name==="Notification"){
                        iconSource=focused
                        ? require('../../assets/color-notification-icon.png')
                        : require('../../assets/gray-notification-icon.png')
                    }

                    if(route.name==="AddPost"){
                        iconSource=focused
                        ? require('../../assets/add-post-icon.png')
                        : require('../../assets/add-post-icon.png')
                    }

                    return (
                        <Image source={iconSource} style={[styles.icon, route.name === "AddPost" && styles.largeIcon]} resizeMode="contain" />
                    );
                },
                tabBarStyle: styles.tabBar,
            })}
        tabBarOptions={{
            showLabel: false,
            headerShown:false,
        }}
    >
       <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
       <Tab.Screen name="Trending" component={Trending} options={{ headerShown: false }}/>
       <Tab.Screen name="AddPost" component={AddPost} options={{ headerShown: false }}/>
       <Tab.Screen name="Notification" component={Notification} options={{ headerShown: false, tabBarBadge: 3, tabBarBadgeStyle: { backgroundColor: '#b20000' }  }}/>
       <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },
  icon: {
    width: 40,
    height: 40,
  },
  largeIcon: {
    width: 55,  
    height: 55,
    position:'absolute',
  },
  tabBar:{
    height: 80,
    // borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: 'white',
  }
});
