import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputField} from '../components/InputField';
import {Button} from '../components/Button';
import {useNavigation,useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../URL';
import {getToken, storeToken} from '../utils/storage';

export const Signup = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if(isFocused){
      checkIfLoggedIn();
    }
  },[isFocused]);

  const checkIfLoggedIn = async () => {
    try {
      const token = await getToken();
      console.log("1")
      console.log(token)
      if (token) {
        navigation.navigate('HomeScreen');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };
  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/create`, {
        email,
        password,
        confirmPassword,
      });
      JSON.stringify(response);
      if (response.data.statusCode === 200) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        navigation.navigate('Login');
      }else{
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };
  const handleChangeScreen = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/LOGO.png')} />
        <InputField
          placeholder="Enter Your Email"
          width={340}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => handleEmailChange(text)}
        />
        <InputField
          placeholder="Enter Your Password"
          width={340}
          secureTextEntry={true}
          value={password}
          onChangeText={text => handlePasswordChange(text)}
        />
        <InputField
          placeholder="Confirm Your Password"
          width={340}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => handleConfirmPasswordChange(text)}
        />
        <Button title="Signup" onPress={handleSignUp} />
        <TouchableOpacity style={styles.login} onPress={handleChangeScreen}>
          <Text>Already have an account? Login</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Copyright @{currentYear}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 190,
  },
  logo: {
    marginTop: 30,
    marginBottom: 100,
  },
  login: {
    marginBottom: 180,
  },
  footer: {
    fontFamily:'Montserrat-Bold',
    fontSize: 15,
  },
});
