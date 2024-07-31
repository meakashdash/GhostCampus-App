import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import {useRecoilState} from 'recoil';
import {tokenState} from '../context/userContext';
import axios from 'axios';
import {baseUrl} from '../URL';
import Search from '../../assets/icons/market/Search';

interface Category {
  _id: string;
  categoryName: string;
  type: string;
  childrens: string[];
}

export const Market = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [token, setToken] = useRecoilState(tokenState);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/parent-category`, {
        headers: {
          Authorization: token,
        },
      });
      const data = response?.data?.parentResponse;
      setParentCategories(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerRow}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue: string) =>
              setSelectedCategory(itemValue)
            }
            dropdownIconColor={'#f4f4f4'}
            style={styles.picker}>
            <Picker.Item label="Categories" value={selectedCategory} />
            {parentCategories.map(categories => (
              <Picker.Item
                key={categories._id}
                label={categories.categoryName}
                value={categories._id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue: string) =>
              setSelectedCategory(itemValue)
            }
            dropdownIconColor={'#f4f4f4'}
            style={styles.picker}>
            <Picker.Item label="Categories" value={selectedCategory} />
            {parentCategories.map(categories => (
              <Picker.Item
                key={categories._id}
                label={categories.categoryName}
                value={categories._id}
              />
            ))}
          </Picker>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 12,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 9,
    borderWidth: 1,
    borderColor: '#f4f4f4',
    borderRadius: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
    borderRadius: 15,
    color: 'white',
  },
});