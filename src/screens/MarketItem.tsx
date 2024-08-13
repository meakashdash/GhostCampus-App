import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Liked from '../../assets/icons/market/Liked';
import DisLiked from '../../assets/icons/market/DisLiked';
import ShoppingCart from '../../assets/icons/market/ShoppingCart';
import axios from 'axios';
import { baseUrl } from '../URL';
import { useRecoilState } from 'recoil';
import { tokenState } from '../context/userContext';

type MarketItemProps = NativeStackScreenProps<RootStackParamList, 'MarketItem'>;

const MarketItem = ({navigation, route}: MarketItemProps) => {
  const {_id, isLiked} = route.params;
  const [token,setToken]=useRecoilState(tokenState);
  const [itemDetails,setItemDetails]=useState({});
  const uri =
    'https://images.unsplash.com/photo-1717684566059-4d16b456c72a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8';
  const getItemDetails=async(_id:string)=>{
    try {
      console.log(_id)
      const response=await axios.get(`${baseUrl}/market/${_id}`,{
        headers:{
          Authorization:token
        }
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  useEffect(()=>{
    getItemDetails(_id);
  },[_id])
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: uri}} style={styles.imageCSS} />
          <TouchableOpacity style={styles.likeButton}>
            {isLiked ? (
              <Liked style={styles.icon} />
            ) : (
              <DisLiked style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView  style={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>Calculator</Text>
          <Text style={styles.itemType}>Electronic</Text>
          <Text style={styles.description}>
            Projection size and distance By moving the projector farther to the
            screen, the screen will become larger. You could get as large as 300
            inches screen. The optimum projection distance is 3.5m with 100
            inches screen.
          </Text>

          <View style={styles.divider} />

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>Electronic</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Listed by</Text>
              <Text style={styles.detailValue}>Navesh Kesari</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Used</Text>
              <Text style={styles.detailValue}>2yrs</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.buyButton}>
            <View>
              <ShoppingCart />
            </View>
            <View>
              <Text style={styles.buyButtonText}>₹ 800.00</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontFamily:'Montserrat-Bold',
    color: '#ffffff',
  },
  itemType: {
    fontSize: 16,
    color: '#d1d1d6',
    marginBottom: 8,
    fontFamily:'Montserrat-Regular',
  },
  description: {
    fontSize: 14,
    color: '#d1d1d6',
    marginBottom: 10,
    fontFamily:'Montserrat-Regular',
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
    fontFamily:'Montserrat-Regular',
  },
  detailValue: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily:'Montserrat-Regular',
  },
  buyButton: {
    flexDirection: 'row',
    backgroundColor: '#67000B',
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
  },
  buyButtonText: {
    fontSize: 18,
    fontFamily:'Montserrat-Bold',
    color: '#ffffff',
    paddingLeft: 8,
  },
  scrollContainer:{
    flex:1
  }
});
