import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import axios from 'axios';
import Calender from '../components/calender/Calender';

const sampleUrl = 'https://images.unsplash.com/photo-1717684566059-4d16b456c72a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8';

const MoodCalender = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Mood Calender</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: sampleUrl}} style={styles.imageCSS} />
        </View>
        <View style={styles.calender}>
          <Calender />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    paddingTop: 74,
    paddingLeft: 17,
    backgroundColor: '#000000',
  },
  heading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: '#FFA72B',
  },
  imageContainer: {
    paddingTop: 40,
  },
  imageCSS:{
    width:415,
    height:250,
    borderRadius:18
  },
  calender: {
    paddingTop:100
  },
});

export default MoodCalender;