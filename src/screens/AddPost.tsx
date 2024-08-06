import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Cross from '../../assets/icons/add-post/Cross';

export const AddPost = (): React.JSX.Element => {
  const [title, setTitle] = useState('');
  const [body, setBody]=useState('');
  const handleChangeTitle = (text: string) => {
    if(text.length>10){
      //show a tooltip with a message
      
    }else{
      setTitle(text);
    }
  };
  const handleChangeBody = (text: string) =>{
    setBody(text);
  }
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.crossContainer}>
        <TouchableOpacity>
          <Cross />
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.titleContainer}
          placeholder="Title"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="visible-password"
          value={title}
          onChangeText={(text)=>handleChangeTitle(text)}
          maxLength={10}
        />
        <TextInput
          style={[styles.textInput, styles.bodyContainer]}
          placeholder="body text (optional)"
          placeholderTextColor="#888"
          keyboardType="visible-password"
          value={body}
          onChangeText={(text)=>handleChangeBody(text)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  titleContainer: {
    color: '#ffffff',
    fontSize: 23,
    padding: 10,
    marginTop: 5,
    fontFamily: 'Montserrat-Bold',
  },
  bodyContainer: {
    color: '#ffffff',
    fontSize: 13,
    paddingLeft: 10,
    paddingTop: 5,
    fontFamily: 'Montserrat-Medium',
  },
  textInput: {
    borderBottomWidth: 0,
  },
  crossContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 8,
  },
});
