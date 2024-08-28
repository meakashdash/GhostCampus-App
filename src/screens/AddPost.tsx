import React, {useEffect, useState} from 'react';
import {
  Image,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Cross from '../../assets/icons/add-post/Cross';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../components/toast/ToastConfig';
import InputAccessory from '../components/addpost/InputAccessory';
import {ImageLibraryOptions, launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

const INPUT_ACCESSORY_VIEW_ID = '12e42ww44w2';

type AddPostStackProps = NativeStackScreenProps<RootStackParamList, 'AddPost'>;

export const AddPost = ({navigation}: AddPostStackProps): React.JSX.Element => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleHeight, setTitleHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [keyBoardVisible, setKeyBoardVisible] = useState(false);
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [fileName,setFileName] = useState('');
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

    launchImageLibrary(options, (response) => {
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

    launchImageLibrary(options, (response) => {
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

  const handleRemoveImage= () => {
    setImage('');
    setFileName('');
  }

  const handleRemoveVideo= () => {
    setVideo('');
    setFileName('');
  }

  const renderMediaPreview=()=>(
      <View style={styles.mediaPreviewContainer}>
        {image ? (
          <View style={styles.previewItem}>
            <Image source={{uri:image}} style={styles.previewImage}/>
            <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveImage}>
              <Text style={styles.deleteButtonText}><Cross /></Text>
            </TouchableOpacity>
          </View>
        ):null}
        {video ? (
          <View style={styles.previewItem}>
            <Video source={{uri: video}} style={styles.previewVideo} />
            <TouchableOpacity style={styles.deleteButton} onPress={handleRemoveVideo}>
              <Text style={styles.deleteButtonText}><Cross /></Text>
            </TouchableOpacity>
          </View>
        ):null}
      </View>
    )

  const renderInputAccessory = () => (
    <View style={styles.inputAccessoryContainer}>
      <InputAccessory
        onImagePress={handleImagePress}
        onVideoPress={handleVideoPress}
        onPollPress={handlePollPress}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 40}
      >
        <View style={styles.crossContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Cross />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoBack} style={styles.postButton}>
            <Text style={styles.postButtonText}>Post</Text>
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
        </View>
        {renderMediaPreview()}
        {!image && !video && renderInputAccessory()}
        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
            {!image && !video && renderInputAccessory()}
          </InputAccessoryView>
        )}
        {Platform.OS === 'android' &&
          (keyBoardVisible || !keyBoardVisible) && !image && !video &&
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
  mediaPreviewContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  previewItem:{
    width: 150,
    height: 150,
    margin: 5,
    position: 'relative',
  },
  previewImage:{
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
  previewVideo:{
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  postButton:{
    backgroundColor: '#B20000',
    width: 60,
    height: 30,
    borderRadius: 15,
  },
  postButtonText:{
    color: '#F4F4F4',
    fontFamily:'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 30,
  }
});
