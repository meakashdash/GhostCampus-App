import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import BackButton from '../../../assets/icons/profile/BackButton';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../../context/userContext';
import { removeToken } from '../../utils/storage';

type ChangePasswordStackProps = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;

const ChangePassword = ({navigation}: ChangePasswordStackProps) => {
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useRecoilState(tokenState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  const handleResetPassword=async()=>{
    if(password.length<8){
      ToastAndroid.show("Password must be atleast 8 characters", ToastAndroid.SHORT);
      return;
    }
    if(password!==confirmPassword){
      ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
      return;
    }

    // Reset Password API Call
    const response=await axios.post(`${baseUrl}/user/change-password`,{
        newPassword:password
    },{
        headers:{
            Authorization: token
        }
    })

    if(response.data.statusCode===200){
        ToastAndroid.show("Password Changed Successfully", ToastAndroid.SHORT);
        await removeToken();
        setToken('');
        setUserId('');
        navigation.navigate('Login');
    }else{
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
    }
  }
  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
        <View style={styles.crossContainer}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <BackButton style={{marginRight: 10}} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.changePasswordContainer}>
          <Text style={styles.changePasswordTitleText}>Change Password</Text>
          <Text style={styles.changePasswordDescriptionText}>
            Your new password must be different from previous used passwords
          </Text>
          {/* <Text style={{marginBottom:5}}>Password</Text> */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="#EEEEEE"
            style={styles.passwordContainer}
            secureTextEntry={true}
            value={password}
            onChangeText={text => handlePasswordChange(text)}
          />
          <Text style={{marginBottom: 25}}>Must be atleast 8 characters</Text>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#EEEEEE"
            style={styles.passwordContainer}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={text => handleConfirmPasswordChange(text)}
          />
          <Text style={{marginBottom: 25}}>Both passwords must match</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  },
  crossContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#B20000',
  },
  backText: {
    color: '#eeeeee',
    fontFamily: 'Montserrat-Regular',
  },
  changePasswordContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  changePasswordTitleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: '#eeeeee',
    marginBottom: 10,
  },
  changePasswordDescriptionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: '#eeeeee',
    marginBottom: 25,
  },
  passwordContainer: {
    height: 45,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    fontFamily: 'Montserrat-Light',
    color: '#eeeeee',
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#B20000',
    padding: 15,
    borderRadius: 10,
  },
  resetButtonText:{
    color: '#eeeeee',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  }
});

export default ChangePassword;
