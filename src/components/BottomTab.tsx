import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AddPostStack, HomeScreenStack, MoodCalenderStack, ProfileStack, MarketStack } from '../InitialAuthStack';
import TopBar from './TopBar';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import HomeColor from '../../assets/icons/bottombar/HomeColor';
import HomeGray from '../../assets/icons/bottombar/HomeGray';
import ProfileColor from '../../assets/icons/bottombar/ProfileColor';
import ProfileGray from '../../assets/icons/bottombar/ProfileGray';
import MarketColor from '../../assets/icons/bottombar/MarketColor';
import MarketGray from '../../assets/icons/bottombar/MarketGray';
import AddColor from '../../assets/icons/bottombar/AddColor';
import AddGray from '../../assets/icons/bottombar/AddGray';
import MoodColor from '../../assets/icons/bottombar/MoodColor';
import MoodGray from '../../assets/icons/bottombar/MoodGray';
import MarketItem from '../screens/MarketItem';
import { AddPost } from '../screens/AddPost';
import AddItemScreen from './market/AddItemScreen';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

type BottomTabProps=NativeStackScreenProps<RootStackParamList,'BottomTab'>

export const BottomTab = ({navigation}:BottomTabProps): React.JSX.Element => {
  return (
    <Tab.Navigator
  screenOptions={({route}) => ({
    tabBarIcon: ({focused}: {focused: boolean}) => {
      let IconComponent: React.ComponentType;
      
      switch (route.name) {
        case 'HomeScreenStack':
          IconComponent = focused ? HomeColor : HomeGray;
          break;
        case 'ProfileStack':
          IconComponent = focused ? ProfileColor : ProfileGray;
          break;
        case 'MarketStack':
          IconComponent = focused ? MarketColor : MarketGray;
          break;
        case 'MoodCalenderStack':
          IconComponent = focused ? MoodColor : MoodGray;
          break;
        default:
          IconComponent = () => null;
          break;
      }
      return <View style={styles.iconWrapper}><IconComponent /></View>;
    },
    tabBarStyle: styles.tabBar,
    header: () => <TopBar navigation={navigation}/>
  })}
  tabBarOptions={{
    showLabel: false,
    headerShown: false,
  }}
>
  <Tab.Screen name="HomeScreenStack" component={HomeScreenStack} />
  <Tab.Screen name="MarketStack" component={MarketStack} />
  <Tab.Screen
    name="AddPostStack"
    component={EmptyComponent}
    options={{
      tabBarButton: (props) => (
        <AddPostButton {...props} onPress={() => navigation.navigate('AddPost')} />
      ),
    }}
  />
  <Tab.Screen name="MoodCalenderStack" component={MoodCalenderStack} />
  <Tab.Screen name="ProfileStack" component={ProfileStack} />
</Tab.Navigator>

  );
};

const EmptyComponent = () => null;

const AddPostButton = ({ onPress }:any) => (
  <TouchableOpacity
    style={styles.addButton}
    onPress={onPress}
  >
    <AddColor />
  </TouchableOpacity>
);

const RootStack = createNativeStackNavigator();

type BottomTabWithModalProps=NativeStackScreenProps<RootStackParamList,'BottomTabWithModals'>

export const BottomTabWithModals = ({navigation}:BottomTabWithModalProps) => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="BottomTab"
      component={BottomTab}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="MarketItem"
      component={MarketItem}
      options={{
        headerShown: false,
        presentation: 'modal',
      }}
    />
    <RootStack.Screen
      name="AddPost"
      component={AddPost}
      options={{
        headerShown: false,
        presentation: 'modal'
      }}
    />
    <RootStack.Screen
        name='AddItemScreen'
        component={AddItemScreen}
        options={{headerShown:false,presentation: 'modal'}}
    />
  </RootStack.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    borderTopWidth: 0,
    elevation: 10,
    backgroundColor: '#1f1f1f',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconWrapper: {
    width: 20,
    height: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6B6B',
    marginTop: -20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

