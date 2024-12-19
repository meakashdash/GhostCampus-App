import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { useRecoilState } from 'recoil';
import { tokenState, userIdState } from '../../context/userContext';
import { removeToken } from '../../utils/storage';
import Toast from 'react-native-toast-message';

const {width} = Dimensions.get('window');

type DeleteAccountStackProps = NativeStackScreenProps<RootStackParamList, 'DeleteAccount'>;

const DeleteAccount = ({navigation}: DeleteAccountStackProps) => {
  const [token, setToken] = useRecoilState(tokenState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const handleDeleteAccount = async() => {
    try {
      const response=await axios.post(`${baseUrl}/user/delete`,{},{
        headers:{
          Authorization: token
        }
      })
      console.log(response.data);
      await removeToken();
      setToken('');
      setUserId('');
      navigation.replace('Login');
      ToastAndroid.show("Account Deleted Successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.log("Error while deleting account: ", error);
      throw new Error("Error while deleting account");
      ToastAndroid.show("Error while deleting account", ToastAndroid.SHORT);
    }
  };

  const handleCancelDelete = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.warning}>
        This action will permanently delete all your data associated with this account.
      </Text>
      <View style={styles.dataDetails}>
        <Text style={styles.detailText}>
          • All your posts, comments, and likes will be deleted.
        </Text>
        <Text style={styles.detailText}>
          • Marketplace items you posted will be removed.
        </Text>
        <Text style={styles.detailText}>
          • Mood calendar records will be erased.
        </Text>
        <Text style={styles.consignment}>
          By proceeding, you agree that this action is irreversible and all your
          data will be lost.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#B20000'}]} // Red Button
          onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Yes, Delete My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#666666'}]} // Gray Button
          onPress={handleCancelDelete}>
          <Text style={styles.buttonText}>No, Keep My Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  warning: {
    color: '#FF6347', // Warning Red
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginVertical: 10,
    textAlign: 'center',
  },
  dataDetails: {
    marginVertical: 20,
  },
  detailText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    marginVertical: 4,
    textAlign: 'left',
  },
  consignment: {
    color: '#FFD700', // Gold Color
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginTop: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    width: width * 0.8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default DeleteAccount;
