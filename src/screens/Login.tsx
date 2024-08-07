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
import axios from 'axios';
import {baseUrl} from '../URL';
import {getToken, storeToken} from '../utils/storage';
import { useSetRecoilState } from 'recoil';
import { tokenState, userIdState } from '../context/userContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type LoginProps=NativeStackScreenProps<RootStackParamList,'Login'>

export const Login = ({navigation}:LoginProps): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const currentYear = new Date().getFullYear();
  const setToken=useSetRecoilState(tokenState);
  const setUserId=useSetRecoilState(userIdState);

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
      setUserId(response.data.userId);
      ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      navigation.replace('BottomTab');
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
          placeholderTextColor="#FFFFFF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => handleEmailChange(text)}
        />
        <InputField
          placeholder="Enter Your Password"
          width={340}
          placeholderTextColor="#FFFFFF"
          secureTextEntry={true}
          value={password}
          onChangeText={text => handlePasswordChange(text)}
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity style={styles.signup} onPress={handleChangeScreen}>
          <Text style={styles.signupText}>Don't have any account? Create one</Text>
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
    backgroundColor:"#000000"
  },
  logo: {
    marginTop: 30,
    marginBottom: 120,
  },
  signup: {
    marginBottom: 240,
  },
  signupText:{
    fontFamily: 'Montserrat-Medium',
  },
  footer: {
    fontFamily: 'Montserrat-Medium'
  },
});
