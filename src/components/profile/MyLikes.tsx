import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { useRecoilState } from 'recoil';
import { likedPostsState, tokenState } from '../../context/userContext';
import { Post } from '../Post';

const sampleUrl = 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png';

export const MyLikes = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token] = useRecoilState(tokenState);
  const [likes, setLikes] = useRecoilState(likedPostsState);

  useEffect(() => {
    fetchLikedPosts();
  }, []);

  const fetchLikedPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/post/get-user-likes-posts`, {
        headers: { Authorization: token },
      });
      if (response.data.statusCode === 200) {
        setPosts(response.data.likedPosts);
        setLikes(response.data.likedPosts.map(post => post._id));
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching liked posts.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }:any) => (
    <View style={styles.postContainer}>
      <Post
        username={item.userName}
        profileIcon={item.profilePhoto || sampleUrl}
        timeAgo={item.timeAgo}
        title={item.title}
        tagColor={item.tagColor}
        tagText={item.tagText}
        media={item.media}
        upvotes={item.likeCount}
        comments={item.commentCount}
        isLiked={likes.includes(item._id)}
        postId={item._id}
      />
    </View>
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Liked Posts</Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={styles.container}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#FF4500" />}
        ListEmptyComponent={!loading && <Text style={styles.emptyText}>No liked posts found.</Text>}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 10,
      },
  header: {
    backgroundColor: '#121212',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF4500',
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'Montserrat-Bold',
  },
  postContainer: {
    flex: 1,
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
