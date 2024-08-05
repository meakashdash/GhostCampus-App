import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import {useRecoilState} from 'recoil';
import {tokenState} from '../context/userContext';
import axios from 'axios';
import {baseUrl} from '../URL';
import ItemCard from '../components/market/ItemCard';
import moment from 'moment';

interface Category {
  _id: string;
  categoryName: string;
  type: string;
  childrens: string[];
}

interface Item {
  _id: string;
  image: string;
  title: string;
  categoryName: string;
  price: number;
  createdAt: string;
  isLiked: boolean;
}

export const Market = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [token, setToken] = useRecoilState(tokenState);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
  }, [currentPage]);

  useEffect(() => {
    getCategories();
  }, []);

  const getItems=async()=>{
    try {
      setLoading(true);
      const response=await axios.get(`${baseUrl}/market?page=${currentPage}&limit=20`,{
        headers:{
          Authorization:token
        }
      })
      const newItems=response?.data?.items;
      setItems(prevItems => [...prevItems, ...newItems]);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

  const renderLoader = () => {
    return loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#B20000" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderItem=({item}: {item: Item})=>(
    <ItemCard 
      image={item.image?item.image:''}
      title={item.title}
      category={item.categoryName}
      price={item.price}
      date={moment(item.createdAt).format('DD MMM YY')}
      isLiked={true}
    />
  )
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
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 9,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:10
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
  list: {
    paddingBottom: 10,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});
