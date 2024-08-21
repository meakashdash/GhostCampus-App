import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Cross from '../../assets/icons/add-post/Cross';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/toast/ToastConfig';

type AddPostStackProps=NativeStackScreenProps<RootStackParamList,'AddPost'>

export const AddPost = ({navigation}:AddPostStackProps): React.JSX.Element => {
  const [title, setTitle] = useState('');
  const [body, setBody]=useState('');
  const handleGoBack=()=>{
    navigation.goBack();
  }
  const handleChangeTitle = (text: string) => {
    if(text.length>50){
      Toast.show({
        type: 'success',
        text1: 'Warning',
        text2: 'Title cannot exceed 10 characters',
        position: 'top',
        visibilityTime: 4000,
        topOffset: 20
      });
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
        <TouchableOpacity onPress={handleGoBack}>
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
          multiline
        />
        <TextInput
          style={[styles.textInput, styles.bodyContainer]}
          placeholder="body text (optional)"
          placeholderTextColor="#888"
          keyboardType="visible-password"
          value={body}
          onChangeText={(text)=>handleChangeBody(text)}
          multiline
        />
      </View>
      <Toast config={toastConfig} />
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
