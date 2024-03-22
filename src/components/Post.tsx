import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Tag from './Tag';
import {VideoComponent} from './VideoComponent';
import Swiper from 'react-native-swiper';
import Video, {VideoRef} from 'react-native-video';

// interface PostProps {
//   username: string;
//   profileIcon: string;
//   timeAgo: string;
//   title: string;
//   tags: string[];
//   media: string[]; // Array of image or video URLs
//   upvotes: number;
//   comments: number;
//   bookmarked: boolean;
// }

const profileUrl = 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png';
const media = {
  images: [
    'https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww',
  ],
  videos: [
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  ],
};

export const Post = (): React.JSX.Element => {
  const swiperRef = useRef(null);
  const videoRef = useRef<VideoRef>(null);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: profileUrl}} style={styles.profileIcon} />
          <View>
            <Text style={styles.userName}>Akash Dash</Text>
          </View>
          <Text style={styles.timeAgo}>5 minutes ago</Text>
        </View>
        <Text style={styles.title}>
          Have a great day with my amazing client all the way from new york
        </Text>
        <View style={styles.tagContainer}>
          <Tag color={`#FF9500`} text={`Confession`} />
        </View>
      </View>
      {/* <View style={styles.imageContainer}>
        {media.images.map((image, index) => {
          return (
            <Image key={index} source={{uri: image}} style={styles.image} />
          );
        })}
      </View>
      <View>
        {media.videos.map((video, index) => {
          return (
            <VideoComponent
              key={index} 
              video={video}
            />
          );
        })}
      </View> */}
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
    fontWeight: 'bold',
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginRight: 5,
  },
  backgroundVideo: {
    width: '100%',
    height: 303,
  },
  swiper: {},
  swiperContainer: {
    height: 350,
  }
});
