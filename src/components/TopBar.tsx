import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Calender from '../../assets/icons/Calender.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
const sampleUrl = 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png';


const TopBar = ({navigation}:any): React.JSX.Element => {
  const handleNavigate=()=>{
    navigation.navigate('MoodCalender')
  }
  return (
    <View style={styles.container}>
      {/* <View>
        <TouchableOpacity>
          <Image source={{uri: sampleUrl}} style={styles.profileIcon} />
        </TouchableOpacity>
      </View> */}
      <View>
        {/* <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../../assets/LOGO.png')}
          />
        </TouchableOpacity> */}
      </View>
      <View>
        <TouchableOpacity style={styles.calender} onPress={handleNavigate}>
          <Calender />
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 11,
    paddingBottom:10,
    backgroundColor:'#000000',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 3
  },
  profileIcon: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginLeft:15
  },
  logo: {
    width:30,
    height:30
  },
  calender: {
    marginRight:15
  }
});


export default TopBar;
