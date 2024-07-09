import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Tag from './Tag';
import Swiper from 'react-native-swiper';
import Video, {VideoRef} from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { bookmarkedPostsState, checkCommentPostId, downVotePostState, likedPostsState, tokenState, visibleComment } from '../context/userContext';
import axios from 'axios';
import { baseUrl } from '../URL';

interface PostProps {
  username: string;
  profileIcon: string;
  timeAgo: string;
  title: string;
  tagColor: string;
  tagText: string;
  media: Media;
  upvotes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isDownvoted: boolean;
  postId: string;
}

interface Media {
  images: string[];
  videos: string[];
}

export const Post = ({
  username,
  profileIcon,
  timeAgo,
  title,
  tagColor,
  tagText,
  media,
  upvotes,
  comments,
  isLiked,
  isBookmarked,
  isDownvoted,
  postId
}: PostProps): React.JSX.Element => {
  const hasMedia = media && (media.images?.length > 0 || media.videos?.length > 0);
  const swiperRef = useRef(null);
  const videoRef = useRef<VideoRef>(null);
  const token=useRecoilValue(tokenState);
  const setLikes = useSetRecoilState(likedPostsState);
  const [upvoteCount,setUpvoteCount]=useState(upvotes);
  const setBookmarks=useSetRecoilState(bookmarkedPostsState);
  const setDownVotes=useSetRecoilState(downVotePostState);
  const [viewComment,setViewComment]=useRecoilState(visibleComment);
  const [postCommentId,setPostCommentId]=useRecoilState(checkCommentPostId);

  const handleChange=async()=>{
    AsyncStorage.removeItem('token')
  }

  const handleLikeToggle=async()=>{
    try {
      const response=await axios.post(
        `${baseUrl}/post/like`,
        {postId},
        {
          headers:{
            Authorization:token
          }
        }
      )
      console.log(upvoteCount,postId);
      if(response.data.statusCode===200){
        if (response.data.message === 'Liked the post successfully') {
          setLikes((prevLikes) => [...prevLikes, postId]);
          setUpvoteCount((prevCount) => prevCount + 1);
          setDownVotes((prevDownvotes) => prevDownvotes.filter((id) => id !== postId));
        } else if (response.data.message === 'Disliked the post successfully') {
          setLikes((prevLikes) => prevLikes.filter((id) => id !== postId));
          setUpvoteCount((prevCount) => prevCount - 1);
        }
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }else{
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const handleBookmarkToggle=async()=>{
    try {
      const response=await axios.post(
        `${baseUrl}/post/bookmark`,
        {postId},
        {
          headers:{
            Authorization:token
          }
        }
      )
      if(response.data.statusCode===200){
        if (response.data.message === 'Bookmarked the post successfully') {
          setBookmarks((prevBookmarks) => [...prevBookmarks, postId]);
        } else if (response.data.message === 'Unsave the post successfully') {
          setBookmarks((prevBookmarks) => prevBookmarks.filter((id) => id !== postId));
        }
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }else{
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const handleDownvoteToggle=async()=>{
    try {
      const response=await axios.post(
        `${baseUrl}/post/downvote`,
        {postId},
        {
          headers:{
            Authorization:token
          }
        }
      )
      console.log(postId);
      if(response.data.statusCode===200){
        if (response.data.message === 'Downvote the post successfully') {
          setDownVotes((prevDownvotes) => [...prevDownvotes, postId]);
          setLikes((prevLikes) => prevLikes.filter((id) => id !== postId));
          if(upvoteCount!==0){
            setUpvoteCount((prevCount) => prevCount - 1);
          }
        } else if (response.data.message === 'Remove downvote from the post successfully') {
          setDownVotes((prevDownvotes) => prevDownvotes.filter((id) => id !== postId));
        }
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }else{
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const openCommentSection=()=>{
    setViewComment(true);
    setPostCommentId(postId);
  }
  return (
    <View style={styles.upperContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: profileIcon}} style={styles.profileIcon} />
          <View>
            <Text style={styles.userName}>{username}</Text>
          </View>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.tagContainer}>
          <Tag color={tagColor} text={tagText} />
        </View>
      </View>
      <View style={hasMedia?styles.swiperContainer:{}}>
        {hasMedia && (<Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={true}
          style={styles.swiper}>
          {media?.images &&
            media?.images?.map((image, index) => (
              <Image key={index} source={{uri: image}} style={styles.image} />
            ))}
          {media.videos &&
            media.videos.map((video, index) => (
              <View>
                <Video
                  key={index}
                  ref={videoRef}
                  source={{uri: video}}
                  paused={true}
                  muted={false}
                  repeat={false}
                  controls={true}
                  style={styles.backgroundVideo}
                  resizeMode="contain"
                />
              </View>
            ))}
        </Swiper>)}
        <View style={styles.bottomBar}>
          <View style={styles.leftButton}>
            <TouchableOpacity onPress={handleLikeToggle}>
              <Image
                source={
                  isLiked
                    ? require('../../assets/color-arrow-up.png')
                    : require('../../assets/gray-arrow-up.png')
                }
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
            <Text style={styles.bottomCount}>{upvoteCount>=0?upvoteCount:0}</Text>
            <TouchableOpacity  onPress={handleDownvoteToggle}>
              <Image
                source={
                  isDownvoted
                    ? require('../../assets/color-arrow-down.png')
                    : require('../../assets/gray-arrow-down.png')
                }
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.middleButton}>
            <TouchableOpacity onPress={openCommentSection}>
              <Image
                source={require('../../assets/gray-message.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
            <Text style={styles.bottomCount}>{comments}</Text>
          </View>
          <View style={styles.rightButton}>
            <TouchableOpacity style={styles.bookMark} onPress={handleBookmarkToggle}>
              <Image
                source={
                  isBookmarked
                    ? require('../../assets/color-archive-add.png')
                    : require('../../assets/gray-archive-add.png')
                }
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChange}>
              <Image
                source={require('../../assets/gray-share.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperContainer: {
    backgroundColor: '#252526',
    padding: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius:18,
    borderColor: '#000000',
  },
  container: {
    backgroundColor: '#252526',
    padding: 8,
    // marginBottom: 10,
  },
  userName: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileIcon: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginRight: 10,
  },
  timeAgo: {
    marginLeft: 'auto',
    fontFamily: 'Montserrat-Medium',
    color: '#ffffff',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 303,
  },
  backgroundVideo: {
    width: '100%',
    height: 303,
  },
  swiper: {},
  swiperContainer: {
    height: 350,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 7,
    paddingHorizontal: 15
  },
  bottomIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  bottomCount: {
    fontSize: 17,
    fontFamily: 'Montserrat-Regular',
    color: '#ffffff',
  },
  leftButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  rightButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookMark: {
    paddingRight: 20,
  },
});
