import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import {useRecoilState} from 'recoil';
import {tokenState, userWishlistItemId} from '../context/userContext';
import axios from 'axios';
import {baseUrl} from '../URL';
import ItemCard from '../components/market/ItemCard';
import moment from 'moment';
import MarketPicker from '../components/market/MarketPicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type MarketProps=NativeStackScreenProps<RootStackParamList,'Market'>

interface Item {
  _id: string;
  image: string;
  title: string;
  categoryName: string;
  price: number;
  createdAt: string;
  isLiked: boolean;
  navigation: MarketProps;
}

export const Market = ({navigation}:MarketProps) => {
  const [token, setToken] = useRecoilState(tokenState);
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishList, setWishList] = useRecoilState(userWishlistItemId);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(()=>{
    if (selectedCategory) {
      setCurrentPage(1);
      setItems([]);
      getChildCategoryItems(selectedCategory);
    }else {
      setCurrentPage(1);
      setItems([]);
      getItems();
    }
  },[selectedCategory])

  useEffect(() => {
    if (currentPage > 1) {
      if (selectedCategory) {
        getChildCategoryItems(selectedCategory);
      } else {
        getItems();
      }
    }
  }, [currentPage]);

  const getChildCategoryItems = async (categoryId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/market/category/${categoryId}?page=${currentPage}&limit=${20}`, {
        headers: {
          Authorization: token
        }
      });
      const data = response?.data;
      if (data.statusCode === 200) {
        setItems(prevItems => [...prevItems, ...data.items]);
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      throw error;
    }
  };

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

  const renderLoader = () => {
    return loading && items.length > 0 ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#B20000" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    if (!loading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No items found in this category</Text>
    </View>
  );

  const renderItem=({item}: {item: Item})=>{
    const isLiked=wishList.includes(item._id);
    return(
      <ItemCard
        _id={item._id} 
        image={item.image?item.image:''}
        title={item.title}
        category={item.categoryName}
        price={item.price}
        date={moment(item.createdAt).format('DD MMM YY')}
        isLiked={isLiked}
        navigation={navigation}
      />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <MarketPicker setSelectedCategory={setSelectedCategory} />
      {loading && items.length === 0 ? (
        <View style={styles.fullScreenLoader}>
          <ActivityIndicator size="large" color="#B20000" />
        </View>
      ) : items.length > 0 ? (
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
      ) : (
        <EmptyState />
      )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  fullScreenLoader:{
    flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  }
});
