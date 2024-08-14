import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ToastAndroid, View} from 'react-native';
import {baseUrl} from '../../URL';
import {tokenState} from '../../context/userContext';
import {useRecoilState} from 'recoil';

interface Category {
  _id: string;
  categoryName: string;
  type: string;
  childrens: string[];
}

interface ChildCategory{
    _id:string;
    categoryName:string;
}

const MarketPicker = ({items,setItems}:any) => {
  const [selectedParentCategory, setSelectParentCategory] = useState<string>('');
  const [selectedChildCategory, setSelectChildCategory] = useState<string>('');
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(()=>{
    console.log("Parent Category",selectedParentCategory);
    getChildCategories(selectedParentCategory);
  },[selectedParentCategory])

  useEffect(()=>{
    getChildCategoryItems(selectedChildCategory);
  },[selectedChildCategory])

  const getChildCategoryItems=async(categoryId:string)=>{
    try {
      const response=await axios.get(`${baseUrl}/market/category/${categoryId}`,{
        headers:{
          Authorization:token
        }
      })
      const data=response?.data;
      if(data.statusCode===200){
        setItems(data.items);
      }else{
        ToastAndroid.show(data.message,ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

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

  const getChildCategories=async(parentId:string)=>{
    try {
        const response=await axios.get(`${baseUrl}/child-category/${parentId}`,{
            headers:{
                Authorization:token
            }
        })
        const data=response?.data?.childResponse;
        setChildCategories(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.pickerRow}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedParentCategory}
            onValueChange={(itemValue: string) =>
              setSelectParentCategory(itemValue)
            }
            dropdownIconColor={'#f4f4f4'}
            style={styles.picker}>
            <Picker.Item label="Categories" value={selectedParentCategory} />
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
            selectedValue={selectedChildCategory}
            onValueChange={(itemValue: string) =>
                setSelectChildCategory(itemValue)
            }
            dropdownIconColor={'#f4f4f4'}
            style={styles.picker}>
            <Picker.Item label="Categories" value={selectedChildCategory} />
            {childCategories.map(categories => (
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
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 4,
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

export default MarketPicker;
