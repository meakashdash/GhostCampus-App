import React, {useState,useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {InputField} from '../components/InputField';
import {Button} from '../components/Button';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../URL';
import {getToken, storeToken} from '../utils/storage';
import { useSetRecoilState } from 'recoil';
import { tokenState, userIdState } from '../context/userContext';

export const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const currentYear = new Date().getFullYear();
  const isFocused=useIsFocused();
  const [setToken]=useSetRecoilState(tokenState);

  useEffect(() => {
    if(isFocused){
      checkIfLoggedIn();
    }
  },[isFocused]);

  const checkIfLoggedIn = async () => {
    try {
      const token = getToken();
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
  const handleLogin = async () => {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password,
    });
    JSON.stringify(response);
    if (response.data.statusCode === 200) {
      storeToken(response.data.token);
      setToken(response.data.token);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      navigation.navigate('HomeScreen');
    }
    else{
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      setEmail('')
      setPassword('')
    }
  };
  const handleChangeScreen = () => {
    navigation.navigate('Signup');
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
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity style={styles.signup} onPress={handleChangeScreen}>
          <Text>Don't have any account? Create one</Text>
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
    marginBottom: 120,
  },
  signup: {
    marginBottom: 240,
  },
  footer: {
    fontFamily: 'Arata-Regular',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
