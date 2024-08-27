import React, {useEffect, useState} from 'react';
import {
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
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

const INPUT_ACCESSORY_VIEW_ID = '12e42ww44w2';

type AddPostStackProps = NativeStackScreenProps<RootStackParamList, 'AddPost'>;

export const AddPost = ({navigation}: AddPostStackProps): React.JSX.Element => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [titleHeight, setTitleHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);
  const [keyBoardVisible, setKeyBoardVisible] = useState(false);
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
  const handleImagePress = () => {
    console.log('Image pressed');
  };

  const handleVideoPress = () => {
    console.log('Video pressed');
  };

  const handlePollPress = () => {
    console.log('Poll pressed');
  };
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
        {renderInputAccessory()}
        {Platform.OS === 'ios' && (
          <InputAccessoryView nativeID={INPUT_ACCESSORY_VIEW_ID}>
            {renderInputAccessory()}
          </InputAccessoryView>
        )}
        {Platform.OS === 'android' &&
          (keyBoardVisible || !keyBoardVisible) &&
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
    marginTop: 5,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 8,
  },
  inputAccessoryContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
