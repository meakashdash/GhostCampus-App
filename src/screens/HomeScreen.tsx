import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Post} from '../components/Post';

const profileUrl = 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png';
const sampleUrl='https://cdn-icons-png.flaticon.com/128/1144/1144760.png'
const media = {
  images: [
    'https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww',
  ],
  videos: [
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  ],
};

export const HomeScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Post 
            username='Akash Dash'
            profileIcon={profileUrl?profileUrl:sampleUrl}
            timeAgo='5 minutes ago'
            title='A test title'
            tagColor='#ff0000'
            tagText='Confession'
            media={media}
            upvotes={56}
            comments={43}
            isLiked={true}
            isBookmarked={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});
