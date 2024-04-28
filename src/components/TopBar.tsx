import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

const sampleUrl = 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png';
const isMessageExist = false;

const TopBar = () => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image source={{uri: sampleUrl}} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require('../../assets/LOGO.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Image
            source={
              isMessageExist
                ? require('../../assets/color-message.png')
                : require('../../assets/gray-message.png')
            }
            style={styles.messageicon}
          />
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
    backgroundColor:'#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  profileIcon: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginLeft:15
  },
  logo: {
    
  },
  messageicon: {
    width: 28,
    height: 28,
    marginRight:15
  },
});


export default TopBar;
