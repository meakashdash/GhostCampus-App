import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {baseUrl} from '../URL';
import {useRecoilState} from 'recoil';
import {tokenState} from '../context/userContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import Photos from '../../assets/icons/profile/Photos';
import RightNav from '../../assets/icons/profile/RightNav';
import Comment from '../../assets/icons/profile/Comment';
import Liked from '../../assets/icons/profile/Liked';
import Lock from '../../assets/icons/profile/Lock';
import GhostCampus from '../../assets/icons/profile/GhostCampus';
import TC from '../../assets/icons/profile/TC';
import Privacy from '../../assets/icons/profile/Privacy';
import Contact from '../../assets/icons/profile/Contact';
import Delete from '../../assets/icons/profile/Delete';
import SignOut from '../../assets/icons/profile/SignOut';

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const Profile = ({navigation}: ProfileProps): React.JSX.Element => {
  const [token, setToken] = useRecoilState(tokenState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data.statusCode === 200) {
        setName(response.data.name);
        setEmail(response.data.email);
        setProfilePhoto(response.data.profilePhoto || null);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log('Error in getting user details', error);
      throw error;
    }
  };

  const handleChangeScreen = (options:string) => {
    switch(options){
      case 'Posts':
        navigation.navigate('MyPosts');
        break;
      case 'Comments':
        navigation.navigate('MyComments');
        break;
      case 'Liked':
        navigation.navigate('MyLikes');
        break;
      case 'ChangePassword':
        navigation.navigate('ChangePassword');
        break;
      case 'About':
        navigation.navigate('About');
        break;
      case 'TermsAndConditions':
        navigation.navigate('TermsAndConditions');
        break;
      case 'PrivacyPolicy':
        navigation.navigate('PrivacyPolicy');
        break;
      case 'ContactUs':
        navigation.navigate('ContactUs');
        break;
      case 'DeleteAccount':
        navigation.navigate('DeleteAccount');
        break;
      default:
        break;
    }
  };

  const getFirstLetter = (name: string) => name.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={[styles.container, {flex: 1}]}>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.nameContainer}>
          {profilePhoto ? (
            <Image source={{uri: profilePhoto}} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>{getFirstLetter(name)}</Text>
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          {/* <RightArrow
            style={styles.arrowContainer}
            onPress={handleProfileScreenChange}
          /> */}
        </View>
        <View style={styles.listSection}>
          <TouchableOpacity style={styles.listItem} onPress={()=>handleChangeScreen('Posts')}>
            <View style={styles.iconLabelContainer}>
              <Photos />
              <Text style={styles.listText}>Posts</Text>
            </View>
            <RightNav />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={()=>handleChangeScreen('Comments')}>
            <View style={styles.iconLabelContainer}>
              <Comment />
              <Text style={styles.listText}>Comments</Text>
            </View>
            <RightNav />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={()=>handleChangeScreen('Liked')}>
            <View style={styles.iconLabelContainer}>
              <Liked />
              <Text style={styles.listText}>Liked Posts</Text>
            </View>
            <RightNav />
          </TouchableOpacity>

          <TouchableOpacity style={styles.lastListItem} onPress={()=>handleChangeScreen('ChangePassword')}>
            <View style={styles.iconLabelContainer}>
              <Lock />
              <Text style={styles.listText}>Change Password</Text>
            </View>
            <RightNav />
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <TouchableOpacity style={styles.listItem} onPress={()=>handleChangeScreen('About')}>
            <View style={styles.iconLabelContainer}>
              <GhostCampus />
              <Text style={styles.listText}>About GhostCampus</Text>
            </View>
            <RightNav />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={()=>handleChangeScreen('TermsAndConditions')}>
            <View style={styles.iconLabelContainer}>
              <TC />
              <Text style={styles.listText}>Terms and Conditions</Text>
            </View>
            <RightNav />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={()=>handleChangeScreen('PrivacyPolicy')}>
            <View style={styles.iconLabelContainer}>
              <Privacy />
              <Text style={styles.listText}>Privacy Policy</Text>
            </View>
            <RightNav />
          </TouchableOpacity>

          <TouchableOpacity style={styles.lastListItem} onPress={()=>handleChangeScreen('ContactUs')}>
            <View style={styles.iconLabelContainer}>
              <Contact />
              <Text style={styles.listText}>Contact Us</Text>
            </View>
            <RightNav />
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.iconLabelContainer}>
              <SignOut />
              <Text style={styles.listText}>Sign out</Text>
            </View>
            <RightNav />
          </TouchableOpacity>

          <TouchableOpacity style={styles.lastListItem} onPress={()=>handleChangeScreen('DeleteAccount')}>
            <View style={styles.iconLabelContainer}>
              <Delete />
              <Text style={styles.listText}>Delete Account</Text>
            </View>
            <RightNav />
          </TouchableOpacity>
        </View>
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>© {new Date().getFullYear()} GhostCampus</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  nameContainer: {
    backgroundColor: '#2E2C2C',
    padding: 20,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontFamily:'Montserrat-SemiBold',
    color: '#FFFFFF',
    fontSize: 24,
  },
  textContainer: {
    marginLeft: 15,
  },
  name: {
    fontFamily:'Montserrat-SemiBold',
    color: '#FFFFFF',
    fontSize: 18
  },
  email: {
    fontFamily:'Montserrat-ExtraLightItalic',
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 4,
  },
  arrowContainer: {
    marginLeft: 40,
    top: 10,
  },
  listSection: {
    backgroundColor: '#2E2C2C',
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444444',
  },
  lastListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listText: {
    fontFamily:'Montserrat-Medium',
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  copyrightSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  copyrightText: {
    fontFamily:'Montserrat-Light',
    color: '#CCCCCC',
    fontSize: 14,
  },
});
