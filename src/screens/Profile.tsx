import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {baseUrl} from '../URL';
import {useRecoilState} from 'recoil';
import {tokenState} from '../context/userContext';
import RightArrow from '../../assets/icons/profile/RightArrow';
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

  const handleProfileScreenChange = () => {
    // Logic for profile screen change
  };

  // const navigateToPosts = () => {
  //   navigation.navigate("Posts");  // Assume "Posts" is a defined route
  // };

  // const navigateToComments = () => {
  //   navigation.navigate("Comments");  // Assume "Comments" is a defined route
  // };

  const getFirstLetter = (name: string) => name.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
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
        <RightArrow
          style={styles.arrowContainer}
          onPress={handleProfileScreenChange}
        />
      </View>
      <ScrollView>
      {/* Section with clickable list items */}
      <View style={styles.listSection}>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconLabelContainer}>
            <Photos />
            <Text style={styles.listText}>Posts</Text>
          </View>
          <RightNav />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconLabelContainer}>
            <Comment />
            <Text style={styles.listText}>Comments</Text>
          </View>
          <RightNav />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconLabelContainer}>
            <Liked />
            <Text style={styles.listText}>Liked Posts</Text>
          </View>
          <RightNav />
        </TouchableOpacity>

        <TouchableOpacity style={styles.lastListItem}>
          <View style={styles.iconLabelContainer}>
            <Lock />
            <Text style={styles.listText}>Change Password</Text>
          </View>
          <RightNav />
        </TouchableOpacity>
      </View>

      <View style={styles.listSection}>
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconLabelContainer}>
            <GhostCampus />
            <Text style={styles.listText}>About GhostCampus</Text>
          </View>
          <RightNav />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconLabelContainer}>
            <TC />
            <Text style={styles.listText}>Terms and Conditions</Text>
          </View>
          <RightNav />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.iconLabelContainer}>
            <Privacy />
            <Text style={styles.listText}>Privacy Policy</Text>
          </View>
          <RightNav />
        </TouchableOpacity>

        <TouchableOpacity style={styles.lastListItem}>
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

        <TouchableOpacity style={styles.lastListItem}>
          <View style={styles.iconLabelContainer}>
            <Delete />
            <Text style={styles.listText}>Delete Account</Text>
          </View>
          <RightNav />
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
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
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textContainer: {
    marginLeft: 15,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
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
    paddingVertical: 15,
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
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});
