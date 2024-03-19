import React, { useState } from 'react';
import {Image, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export const Login = (): React.JSX.Element => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigation = useNavigation();
  const currentYear=new Date().getFullYear();
  const handleEmailChange=(text:string)=>{
    setEmail(text)
  }
  const handlePasswordChange=(text:string)=>{
    setPassword(text)
  }
  const handleLogin=()=>{
    console.log("Clicked")
    console.log(email,password)
  }
  const handleChangeScreen=()=>{
    navigation.navigate('Signup')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/LOGO.png')} />
        <InputField 
            placeholder='Enter Your Email'
            width={340}
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={(text)=>handleEmailChange(text)} 
         />
        <InputField 
            placeholder='Enter Your Password' 
            width={340} 
            secureTextEntry={true}
            value={password}
            onChangeText={(text)=>handlePasswordChange(text)}
        />
        <Button 
            title="Login"
            onPress={handleLogin}
        />
        <TouchableOpacity style={styles.signup} onPress={handleChangeScreen}>
            <Text>Don't have any account? Create one</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Copyright @{currentYear}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:190
  },
  logo: {
    marginTop: 30,
    marginBottom:120,
  },
  signup:{
    marginBottom:240
  },
  footer:{
    fontFamily:'Arata-Regular',
    fontSize:15,
    fontWeight:'bold'
  }
});
