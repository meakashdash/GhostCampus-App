import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Post } from '../Post';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { useRecoilState } from 'recoil';
import { bookmarkedPostsState, downVotePostState, likedPostsState, tokenState } from '../../context/userContext';

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

export const MyPosts = (): React.JSX.Element => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useRecoilState(tokenState);
  const [likes, setLikes] = useRecoilState(likedPostsState);
  const [bookMarks, setBookMarks] = useRecoilState(bookmarkedPostsState);
  const [downvotes, setDownVotes] = useRecoilState(downVotePostState);

  useEffect(() => {
    console.log('My Posts');
    getLikedPosts();
    getBookmarkedPosts();
    getDownvotedPosts();
    getAllPosts();
  }, [currentPage]);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/post/get-user-posts?page=${currentPage}`,{
        headers:{
          Authorization:token
        }
      });
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

  const getLikedPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/post/get-user-likes`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.statusCode === 200) {
        setLikes(response.data.likes);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDownvotedPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/post/get-user-downvote`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.statusCode === 200) {
        setDownVotes(response.data.downvotes);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookmarkedPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/post/get-user-bookmarks`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.statusCode === 200) {
        setBookMarks(response.data.bookmarks);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }: any) => {
    const isLiked = likes.includes(item._id);
    const isBookmarked = bookMarks.includes(item._id);
    const isDownvoted = downvotes.includes(item._id);
    return (
      <View style={styles.postContainer}>
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
          isLiked={isLiked}
          isBookmarked={isBookmarked}
          isDownvoted={isDownvoted}
          postId={item._id}
        />
      </View>
    );
  };

  const renderLoader = () => {
    return loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#FF4500" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderError = () => {
    return error ? <Text style={styles.error}>{error}</Text> : null;
  };

  return (
    <>
      <View style={{
        backgroundColor: '#121212',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF4500',
      }}>
        <Text style={{ 
            color: 'white', 
            textAlign: 'center', 
            fontSize: 20, 
            marginVertical: 10,
            fontFamily: 'Montserrat-Bold',
        }}>
          My Posts
        </Text>
      </View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        style={styles.container}
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
    backgroundColor: '#121212',
    paddingHorizontal: 10,
  },
  postContainer: {
    flex: 1,
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#1F1F1F',
    borderRadius: 8,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  itemSeparator: {
    height: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
