import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Cross from '../../assets/icons/add-post/Cross';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../components/toast/ToastConfig';
import InputAccessory from '../components/addpost/InputAccessory';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Video from 'react-native-video';
import axios from 'axios';
import {baseUrl} from '../URL';
import Tag from '../components/Tag';
import {useRecoilState} from 'recoil';
import {tokenState} from '../context/userContext';

const INPUT_ACCESSORY_VIEW_ID = '12e42ww44w2';

const {width, height} = Dimensions.get('window');

type AddPostStackProps = NativeStackScreenProps<RootStackParamList, 'AddPost'>;

export const AddPost = ({navigation}: AddPostStackProps): React.JSX.Element => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleHeight, setTitleHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [keyBoardVisible, setKeyBoardVisible] = useState(false);
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [fileName, setFileName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tags, setTags] = useState<any>();
  const [selectedTagText, setSelectedTagText] = useState<any>('');
  const [selectedTagColor, setSelectedTagColor] = useState<any>('');
  const [selectedTagId, setSelectedTagId] = useState<any>('');
  const [token, setToken] = useRecoilState(tokenState);
  const [loading, setLoading] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const keyBoardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyBoardVisible(true);
      },
    );
    const keyBoardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyBoardVisible(false);
      },
    );

    return () => {
      keyBoardDidShowListener.remove();
      keyBoardDidHideListener.remove();
    };
  }, []);
  const startSpinAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(animation => {
      if (animation.finished && loading) {
        startSpinAnimation();
      }
    });
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleChangeTitle = (text: string) => {
    if (text.length > 50) {
      Toast.show({
        type: 'success',
        text1: 'Warning',
        text2: 'Title cannot exceed 50 characters',
        position: 'top',
        visibilityTime: 4000,
        topOffset: 20,
      });
    } else {
      setTitle(text);
    }
  };
  const handleChangeBody = (text: string) => {
    setBody(text);
  };
  const handleImagePress = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setImage(response.assets[0].uri);
        setFileName(response.assets[0].fileName || '');
      }
    });
  };

  const handleVideoPress = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'video',
      includeBase64: false,
      videoQuality: 'medium',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.errorCode) {
        console.log('VideoPicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setVideo(response.assets[0].uri);
        setFileName(response.assets[0].fileName || '');
      }
    });
  };

  const handlePollPress = () => {
    console.log('Poll pressed');
  };

  const handleRemoveImage = () => {
    setImage('');
    setFileName('');
  };

  const handleRemoveVideo = () => {
    setVideo('');
    setFileName('');
  };

  const handlePostMedia = async () => {
    try {
      if (!title || !body || !selectedTagId) {
        Toast.show({
          type: 'error',
          text1: 'Missing Fields',
          text2: 'Please ensure the title, description, and tag are selected.',
          position: 'top',
          visibilityTime: 4000,
          topOffset: 20,
        });
        return;
      }
      const formData = new FormData();
      setLoading(true);
      startSpinAnimation();
      formData.append('title', title);
      formData.append('description', body);
      if (image) {
        formData.append('images', {
          uri: image,
          type: 'image/jpeg',
          name: fileName || 'image.jpg',
        });
      }
      if (video) {
        formData.append('videos', {
          uri: video,
          type: 'video/mp4',
          name: fileName || 'video.mp4',
        });
      }
      if (selectedTagId) {
        formData.append('tagId', selectedTagId);
      }
      const response = await axios.post(`${baseUrl}/post/create`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      if (response.data.statusCode === 200) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
        navigation.replace('BottomTabWithModals');
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error posting media:', error);
      ToastAndroid.show(
        'An error occurred while posting. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  const showModal = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tag`);
      if (response.data.statusCode === 200) {
        setTags(response?.data?.tags);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
      setModalVisible(true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleTagSelect = (tag: any) => {
    setSelectedTagColor(tag.color);
    setSelectedTagText(tag.text);
    setSelectedTagId(tag._id);
    setModalVisible(false);
  };

  const LoaderIcon = () => {
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <View style={styles.loaderIcon} />
      </Animated.View>
    );
  };

  const renderMediaPreview = () => (
    <View style={styles.mediaPreviewContainer}>
      {image ? (
        <View style={styles.previewItem}>
          <Image source={{uri: image}} style={styles.previewImage} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleRemoveImage}>
            <Text style={styles.deleteButtonText}>
              <Cross />
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {video ? (
        <View style={styles.previewItem}>
          <Video source={{uri: video}} style={styles.previewVideo} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleRemoveVideo}>
            <Text style={styles.deleteButtonText}>
              <Cross />
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

  const renderInputAccessory = () => (
    <View style={styles.inputAccessoryContainer}>
      <InputAccessory
        onImagePress={handleImagePress}
        onVideoPress={handleVideoPress}
        onPollPress={handlePollPress}
      />
    </View>
  );

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.moodContainer}>
              {tags?.map((tag: any) => (
                <TouchableOpacity
                  key={tag._id}
                  style={[styles.tagButton, {backgroundColor: tag.color}]}
                  onPress={() => handleTagSelect(tag)}>
                  <Text style={styles.tagButtonText}>{tag.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}>
        <View style={styles.crossContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Cross />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePostMedia} style={styles.postButton}>
            {loading ? (
              <LoaderIcon />
            ) : (
              <Text style={styles.postButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={[styles.titleContainer, {height: Math.max(35, titleHeight)}]}
            placeholder="Title"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="visible-password"
            value={title}
            onChangeText={text => handleChangeTitle(text)}
            multiline
            onContentSizeChange={event => {
              setTitleHeight(event.nativeEvent.contentSize.height);
            }}
            inputAccessoryViewID={
              Platform.OS === 'ios' ? INPUT_ACCESSORY_VIEW_ID : undefined
            }
          />
          <TextInput
            style={[
              styles.textInput,
              styles.bodyContainer,
              {height: Math.max(35, bodyHeight)},
            ]}
            placeholder="body text (optional)"
            placeholderTextColor="#888"
            keyboardType="visible-password"
            value={body}
            onChangeText={text => handleChangeBody(text)}
            multiline
            onContentSizeChange={event => {
              setBodyHeight(event.nativeEvent.contentSize.height);
            }}
            inputAccessoryViewID={
              Platform.OS === 'ios' ? INPUT_ACCESSORY_VIEW_ID : undefined
            }
          />
          <TouchableOpacity
            style={[
              styles.tagContainer,
              {
                backgroundColor: `${
                  selectedTagColor ? selectedTagColor : '#888'
                }`,
              },
            ]}
            onPress={showModal}>
            <Text style={styles.tagText}>
              {selectedTagText ? selectedTagText : 'Tags'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderMediaPreview()}
        {modalVisible && renderModal()}
        {!image && !video && renderInputAccessory()}
        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
            {!image && !video && renderInputAccessory()}
          </InputAccessoryView>
        )}
        {Platform.OS === 'android' &&
          (keyBoardVisible || !keyBoardVisible) &&
          !image &&
          !video &&
          renderInputAccessory()}
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    color: '#ffffff',
    fontSize: 23,
    padding: 10,
    fontFamily: 'Montserrat-Bold',
  },
  bodyContainer: {
    color: '#ffffff',
    fontSize: 13,
    paddingLeft: 10,
    paddingTop: 5,
    fontFamily: 'Montserrat-Medium',
  },
  textInput: {
    borderBottomWidth: 0,
  },
  crossContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 8,
  },
  inputAccessoryContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  mediaPreviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  previewItem: {
    width: 150,
    height: 150,
    margin: 5,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  previewVideo: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  postButton: {
    backgroundColor: '#B20000',
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: '#F4F4F4',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 30,
  },
  tagContainer: {
    backgroundColor: '#888',
    width: 100,
    height: 30,
    marginLeft: 10,
    borderRadius: 25,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: '#ffffff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#2C2C2E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: width * 0.044,
    paddingVertical: height * 0.021,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    borderRadius: 25,
    paddingHorizontal: 0.022,
    paddingVertical: 0.01,
    marginBottom: 20,
  },
  tagButton: {
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
  },
  tagButtonText: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  loaderIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F4F4F4',
    borderTopColor: 'transparent',
  },
});
