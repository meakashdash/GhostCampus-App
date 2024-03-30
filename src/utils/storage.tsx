import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token:any) => {
  await AsyncStorage.setItem('token', JSON.stringify(token));
};

export const getToken = async () => {
  const token=await AsyncStorage.getItem('token');
  return JSON.parse(token);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};
