import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AddPostStack, HomeScreenStack, NotificationStack, ProfileStack, TrendingStack } from '../InitialAuthStack';
import TopBar from './TopBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import HomeColor from '../../assets/icons/bottombar/HomeColor';
import HomeGray from '../../assets/icons/bottombar/HomeGray';
import ProfileColor from '../../assets/icons/bottombar/ProfileColor';
import ProfileGray from '../../assets/icons/bottombar/ProfileGray';
import MarketColor from '../../assets/icons/bottombar/MarketColor';
import MarketGray from '../../assets/icons/bottombar/MarketGray';
import NotificationColor from '../../assets/icons/bottombar/NotificationColor';
import NotificationGray from '../../assets/icons/bottombar/NotificationGray';
import AddColor from '../../assets/icons/bottombar/AddColor';
import AddGray from '../../assets/icons/bottombar/AddGray';

const Tab = createBottomTabNavigator();

type BottomTabProps=NativeStackScreenProps<RootStackParamList,'BottomTab'>

export const BottomTab = ({navigation}:BottomTabProps): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}: {focused: boolean}) => {
          let IconComponent:React.ComponentType;

          switch (route.name) {
            case 'HomeScreenStack':
              IconComponent = focused ? HomeColor : HomeGray;
              break;
            case 'ProfileStack':
              IconComponent = focused ? ProfileColor : ProfileGray;
              break;
            case 'TrendingStack':
              IconComponent = focused ? MarketColor : MarketGray;
              break;
            case 'NotificationStack':
              IconComponent = focused ? NotificationColor : NotificationGray;
              break;
            case 'AddPostStack':
              IconComponent = focused ? AddColor : AddGray;
              break;
            default:
              IconComponent = () => null;
              break;
          }

          return <IconComponent />;
        },
        tabBarStyle: styles.tabBar,
        header: () => <TopBar navigation={navigation}/>,
      })}
      tabBarOptions={{
        showLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{
          headerTitle: () => <TopBar navigation={navigation}/>,
          headerStyle: { height: 50, borderBottomWidth: 0 },
          headerTitleContainerStyle: { paddingBottom: 20 }
        }}
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
          // tabBarBadge: 3,
          // tabBarBadgeStyle: {backgroundColor: '#F4B0B0'},
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
    backgroundColor: '#252525',
  },
});
