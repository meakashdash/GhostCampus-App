import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Liked from '../../assets/icons/market/Liked';
import DisLiked from '../../assets/icons/market/DisLiked';
import ShoppingCart from '../../assets/icons/market/ShoppingCart';
import axios from 'axios';
import {baseUrl} from '../URL';
import {useRecoilState} from 'recoil';
import {tokenState, userWishlistItemId} from '../context/userContext';
import {ActivityIndicator} from 'react-native';

type MarketItemProps = NativeStackScreenProps<RootStackParamList, 'MarketItem'>;

interface ItemDetails {
  title: string;
  description: string;
  price: number;
  categoryId: string;
  attributes: Attribute[];
  location: {campus: string; building: string};
  selledid: string;
  createdAt: string;
  category: Category[];
}

interface Attribute {
  label: string;
  value: string;
  datatype: string;
}

interface Category {
  _id: string;
  categoryName: string;
}

const MarketItem = ({navigation, route}: MarketItemProps) => {
  const {_id} = route.params;
  const [token, setToken] = useRecoilState(tokenState);
  const [itemDetails, setItemDetails] = useState<ItemDetails>();
  const [wishList, setWishList] = useRecoilState(userWishlistItemId);
  const uri =
    'https://images.unsplash.com/photo-1717684566059-4d16b456c72a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8';
  const [loading, setLoading] = useState(false);
  const getItemDetails = async (_id: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/market/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      setItemDetails(response.data.item);
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleWishList = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/market/wishlist`,
        {
          itemId: _id,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.data.statusCode === 200) {
        if (response.data.message === 'Wishlisted the item successfully') {
          setWishList(prevWishList => [...prevWishList, _id]);
        } else if (response.data.message === 'Unsave the item successfully') {
          setWishList(prevWishList =>
            prevWishList.filter(item => item !== _id),
          );
        }
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const renderLoader = () => {
    return (
      <View style={styles.fullScreenLoader}>
        <ActivityIndicator size="large" color="#B20000" />
      </View>
    );
  };
  const isLiked = wishList.includes(_id);
  useEffect(() => {
    getItemDetails(_id);
  }, [_id]);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        renderLoader()
      ) : (
        <>
          <View style={styles.imageContainer}>
            <Image source={{uri: uri}} style={styles.imageCSS} />
            <TouchableOpacity
              style={styles.likeButton}
              onPress={handleWishList}>
              {isLiked ? (
                <Liked style={styles.icon} />
              ) : (
                <DisLiked style={styles.icon} />
              )}
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.detailsContainer}>
              <Text style={styles.itemName}>{itemDetails?.title}</Text>
              <Text style={styles.itemType}>
                {itemDetails?.category[0].categoryName}
              </Text>
              <Text style={styles.description}>{itemDetails?.description}</Text>

              <View style={styles.divider} />

              <View style={styles.detailsSection}>
                {itemDetails?.attributes.map((attribute, index) => (
                  <View style={styles.detailRow} key={index}>
                    <Text style={styles.detailLabel}>{attribute.label}</Text>
                    <Text style={styles.detailValue}>{attribute.value}</Text>
                  </View>
                ))}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Campus</Text>
                  <Text style={styles.detailValue}>
                    {itemDetails?.location.campus}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Building</Text>
                  <Text style={styles.detailValue}>
                    {itemDetails?.location.building}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.buyButton}>
                <View>
                  <ShoppingCart />
                </View>
                <View>
                  <Text style={styles.buyButtonText}>
                    ₹ {itemDetails?.price}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default MarketItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  imageContainer: {
    padding: 10,
  },
  imageCSS: {
    width: '100%',
    height: 380,
    borderRadius: 16,
  },
  likeButton: {
    position: 'absolute',
    top: 20,
    right: 25,
    zIndex: 1,
  },
  icon: {
    width: 28,
    height: 28,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
  },
  itemName: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  itemType: {
    fontSize: 16,
    color: '#d1d1d6',
    marginBottom: 8,
    fontFamily: 'Montserrat-Regular',
  },
  description: {
    fontSize: 14,
    color: '#d1d1d6',
    marginBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#3a3a3c',
    marginVertical: 10,
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#d1d1d6',
    fontFamily: 'Montserrat-Regular',
  },
  detailValue: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-Regular',
  },
  buyButton: {
    flexDirection: 'row',
    backgroundColor: '#67000B',
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 16,
  },
  queryButton: {
    flexDirection: 'row',
    backgroundColor: '#2C5E98',
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
  },
  buyButtonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
    paddingLeft: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  fullScreenLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
