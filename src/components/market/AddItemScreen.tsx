import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import ItemCamera from '../../../assets/icons/market/ItemCamera';
import MarketPicker from './MarketPicker';
import { useRoute } from '@react-navigation/native';

const AddItemScreen = () => {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [price,setPrice]=useState('');
  const handleChangeTitle=(text:string)=>{
    setTitle(text);
  }
  const handleChangeDescription=(text:string)=>{
    setDescription(text);
  }
  const handleChangePrice=(text:string)=>{
    console.log(typeof parseFloat(text));
    console.log(parseFloat(text));
    if(parseFloat(text)<=0){
        ToastAndroid.show('Price should be greater than 0', ToastAndroid.SHORT);
        setPrice('');
    }
    if(parseFloat(text)>500000){
        ToastAndroid.show('Price should be less than 500000', ToastAndroid.SHORT);
        setPrice('');
    }
    setPrice(text.replace(/[^0-9]/g, ''));
  }
  const uploadImage = () => {};
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cameraContainer} onPress={uploadImage}>
          <ItemCamera />
        </TouchableOpacity>
        <Text style={styles.uploadImageText}>Upload Image</Text>
        <TextInput
          style={styles.titleConatiner}
          placeholder="Title"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="visible-password"
          value={title}
          onChangeText={text => handleChangeTitle(text)}
        />
        <TextInput
          style={styles.titleConatiner}
          placeholder="Description"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="visible-password"
          value={description}
          onChangeText={text => handleChangeDescription(text)}
        />
        <TextInput
          style={styles.priceContainer}
          placeholder="Price (in ₹Rs)"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="numeric"
          value={price}
          onChangeText={text => handleChangePrice(text)}
        />
        <View style={styles.pickerContainer}>
          <MarketPicker isAddButtonVisible={false} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  uploadImageText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom:10
  },
  titleConatiner:{
    width: '80%',
    padding: 10,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },
  priceContainer:{
    width: '80%',
    padding: 10,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },
  pickerContainer:{
    flexDirection: 'row'
  }
});

export default AddItemScreen;
