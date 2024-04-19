import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Post} from '../components/Post';
import axios from 'axios';
import {baseUrl} from '../URL';
import { useRecoilState } from 'recoil';
import { tokenState } from '../context/userContext';

interface PostData {
  _id: string;
  userId: string;
  userName: string;
  profilePhoto: string;
  title: string;
  media: {
    images: string[];
    videos: string[];
  };
  likeCount: number;
  commentCount: number;
  tagColor: string;
  tagText: string;
  timeAgo: string;
}

const sampleUrl = 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png';

export const HomeScreen = (): React.JSX.Element => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token,setToken]=useRecoilState(tokenState);
  useEffect(() => {
    console.log('Homescreen');
    getAllPosts();
  }, [currentPage]);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/post?page=${currentPage}`);
      console.log(currentPage);
      if (response.data.statusCode === 200) {
        const newPosts = response.data.postWithDetails.data;
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setLoading(false);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred while fetching posts.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getLikedPosts=async()=>{
    try {
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const getBookmarkedPosts=async()=>{
    try {
      
    } catch (error) {
      console.log(error);
      throw error
    }
  }
   
  const renderItem = ({item}: any) => {
    return (
      <>
        <Post
          username={item.userName}
          profileIcon={item.profilePhoto ? item.profilePhoto : sampleUrl}
          timeAgo={item.timeAgo}
          title={item.title}
          tagColor={item.tagColor}
          tagText={item.tagText}
          media={item.media}
          upvotes={item.likeCount}
          comments={item.commentCount}
          isLiked={true}
          isBookmarked={true}
        /> 
      </>
    );
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

  const ItemSeparatorComponent=()=>{
    return(
      <View style={styles.itemSeparator}>

      </View>
    )
  }

  const renderError = () => {
    return error ? <Text style={styles.error}>{error}</Text> : null;
  };

  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(item, index) => item._id + index.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0.5}
      />
      {renderError()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  itemSeparator:{
    marginVertical:4
  },
  error:{
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  }
});
