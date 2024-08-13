import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Liked from '../../../assets/icons/market/Liked';
import DisLiked from '../../../assets/icons/market/DisLiked';

interface ItemCardProps {
  _id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  date: string;
  isLiked: boolean;
  navigation:any;
}

const uri="https://images.unsplash.com/photo-1717684566059-4d16b456c72a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8"

const ItemCard = ({
  _id,
  image,
  title,
  category,
  price,
  date,
  isLiked,
  navigation
}: ItemCardProps) => {
  const handleChangeScreen=async()=>{
    try {
      navigation.push('MarketItem',{_id:_id});
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleChangeScreen}>
      {image?<Image source={{uri: uri}} style={styles.imageCss} />:<Image source={{uri: uri}} style={styles.imageCss} />}
      <TouchableOpacity style={styles.likeButton}>
        {isLiked ? <Liked style={styles.icon} /> : <DisLiked style={styles.icon} />}
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>Rs {price}</Text>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    width: '48%',
    margin: '1%',
  },
  imageCss: {
    width: '100%',
    height: 164,
    borderRadius: 8,
  },
  contentContainer: {
    marginTop: 9,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#F4F4F4',
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#F4F4F4',
    marginTop: 4,
    marginLeft: 4,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  categoryContainer: {
    backgroundColor: '#B20000',
    padding: 3,
    borderRadius: 4,
    marginLeft: 4,
  },
  category: {
    color: '#F4F4F4',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
  },
  date: {
    color: '#B7B1B1',
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    marginRight: 5,
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 15,
    zIndex: 1,
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default ItemCard;
