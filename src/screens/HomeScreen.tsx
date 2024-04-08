import React, {useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Post} from '../components/Post';
import axios from 'axios';
import {baseUrl} from '../URL';
import {BottomTab} from '../components/BottomTab';

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
  useEffect(() => {
    console.log('Homescreen');
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/post`);
      if (response.data.statusCode === 200) {
        setPosts(response.data.postWithDetails);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {posts.map(post => (
          <Post
            username={post.userName}
            profileIcon={post.profilePhoto ? post.profilePhoto : sampleUrl}
            timeAgo={post.timeAgo}
            title={post.title}
            tagColor={post.tagColor}
            tagText={post.tagText}
            media={post.media}
            upvotes={post.likeCount}
            comments={post.commentCount}
            isLiked={true}
            isBookmarked={true}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});
