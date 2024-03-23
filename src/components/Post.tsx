import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Tag from './Tag';
import Swiper from 'react-native-swiper';
import Video, {VideoRef} from 'react-native-video';

interface PostProps {
  username: string;
  profileIcon: string;
  timeAgo: string;
  title: string;
  tagColor:string,
  tagText:string,
  media: Media;
  upvotes: number;
  comments: number;
  isLiked:boolean,
  isBookmarked: boolean;
}

interface Media{
  images:string[],
  videos:string[]
}
 
export const Post = ({username,profileIcon,timeAgo,title,tagColor,tagText,media,upvotes,comments,isLiked,isBookmarked}:PostProps): React.JSX.Element => {
  const swiperRef = useRef(null);
  const videoRef = useRef<VideoRef>(null);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: profileIcon}} style={styles.profileIcon} />
          <View>
            <Text style={styles.userName}>{username}</Text>
          </View>
          <Text style={styles.timeAgo}>{timeAgo}</Text>
        </View>
        <Text style={styles.title}>
          {title}
        </Text>
        <View style={styles.tagContainer}>
          <Tag color={tagColor} text={tagText} />
        </View>
      </View>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          loop={false}
          showsPagination={true}
          style={styles.swiper}>
          {media.images.map((image, index) => (
            <Image key={index} source={{uri: image}} style={styles.image} />
          ))}
          {media.videos.map((video, index) => (
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
        </Swiper>
        <View style={styles.bottomBar}>
          <View style={styles.leftButton}>
            <TouchableOpacity>
              <Image
                source={isLiked?require('../../assets/color-arrow-up.png'):require('../../assets/gray-arrow-up.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
            <Text style={styles.bottomCount}>{upvotes}</Text>
            <TouchableOpacity>
              <Image
                source={require('../../assets/gray-arrow-down.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.middleButton}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/gray-message.png')}
                style={styles.bottomIcon}
              />
              </TouchableOpacity>
              <Text style={styles.bottomCount}>{comments}</Text>
            </View>
          <View style={styles.rightButton}>
            <TouchableOpacity style={styles.bookMark}>
              <Image
                source={isBookmarked?require('../../assets/color-archive-add.png'):require('../../assets/gray-archive-add.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/gray-share.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
    marginBottom: 10,
  },
  userName: {
    fontFamily:'Montserrat-SemiBold',
    color:'#000000'
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
    fontFamily:'Montserrat-Medium',
    color:'#000000'
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily:'Montserrat-Bold',
    color:"#000000"
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
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  bottomIcon: {
    width: 28,
    height: 28,
    marginRight: 5,
  },
  bottomCount: {
    fontSize: 17,
  },
  leftButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight:15  
  },
  rightButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookMark:{
    paddingRight:20
  }
});
