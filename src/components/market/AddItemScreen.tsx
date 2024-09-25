import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import ItemCamera from '../../../assets/icons/market/ItemCamera';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../context/userContext';
import DownIcon from '../../../assets/icons/market/DownIcon';
import BigDownIcon from '../../../assets/icons/market/BigDownIcon';
import AddItem from '../../../assets/icons/market/AddItem';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

interface Category {
  _id: string;
  categoryName: string;
  type: string;
  childrens: string[];
}

interface ChildCategory {
  _id: string;
  categoryName: string;
  attributes: any;
}

type AddItemScreenStackProps = NativeStackScreenProps<RootStackParamList, 'AddItemScreen'>;

const AddItemScreen = ({navigation}:AddItemScreenStackProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState<Category | null>(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState<ChildCategory | null>(null);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
  const [token] = useRecoilState(tokenState);
  const [modalVisible, setModalVisible] = useState(false);
  const [isParentPicker, setIsParentPicker] = useState(true);
  const [attributeValues, setAttributeValues] = useState<any>({});
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [currentDropdownLabel, setCurrentDropdownLabel] = useState<string | null>(null);
  const [dropdownModalVisible, setDropdownModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [fileName, setFileName] = useState('');
  const [campus,setCampus]=useState('');
  const [building,setBuilding]=useState('');

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedParentCategory) {
      getChildCategories(selectedParentCategory._id);
    }
  }, [selectedParentCategory]);

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

  const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/parent-category`, {
        headers: {
          Authorization: token,
        },
      });
      setParentCategories(response?.data?.parentResponse || []);
    } catch (error) {
      console.error('Error fetching parent categories:', error);
    }
  };

  const getChildCategories = async (parentId: string) => {
    try {
      const response = await axios.get(`${baseUrl}/child-category/${parentId}`, {
        headers: {
          Authorization: token,
        },
      });
      setChildCategories(response?.data?.childResponse || []);
    } catch (error) {
      console.error('Error fetching child categories:', error);
    }
  };

  const handleChangePrice = (text: string) => {
    if (parseFloat(text) <= 0) {
      ToastAndroid.show('Price should be greater than 0', ToastAndroid.SHORT);
      setPrice('');
    }
    if (parseFloat(text) > 500000) {
      ToastAndroid.show('Price should be less than 500000', ToastAndroid.SHORT);
      setPrice('');
    }
    setPrice(text.replace(/[^0-9]/g, ''));
  };

  const handleChangeCampus = (text: string) => {
    setCampus(text);
  }

  const handleChangeBuilding = (text: string) => {
    setBuilding(text);
  }

  const openPicker = (isParent: boolean) => {
    setIsParentPicker(isParent);
    setModalVisible(true);
  };

  const selectItem = async (item: Category | ChildCategory) => {
    if (isParentPicker) {
      setSelectedParentCategory(item as Category);
      setSelectedChildCategory(null);
    } else {
      setSelectedChildCategory(item as ChildCategory);
      if ('attributes' in item) {
        setAttributeValues({});
      }
    }
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: Category | ChildCategory }) => (
    <TouchableOpacity style={styles.itemButton} onPress={() => selectItem(item)}>
      <Text style={styles.itemText}>{item.categoryName}</Text>
    </TouchableOpacity>
  );

  const handleAttributeChange = (label: string, value: any) => {
    setAttributeValues((prev: any) => ({
      ...prev,
      [label]: value,
    }));
  };

  const openDropdownModal = (label: string, options: string[]) => {
    setCurrentDropdownLabel(label);
    setDropdownOptions(options);
    setDropdownModalVisible(true);
  };

  const selectDropdownOption = (value: string) => {
    if (currentDropdownLabel) {
      handleAttributeChange(currentDropdownLabel, value);
      setDropdownModalVisible(false);
    }
  };

  const handleAddItem=async()=>{
    try {
      // console.log(
      //   title,
      //   description,
      //   price,
      //   selectedChildCategory._id,
      //   attributeValues,
      //   image,
      //   campus,
      //   building
      // );
      if (!title.trim()) {
        ToastAndroid.show('Please enter a title', ToastAndroid.SHORT);
        return;
      }
      if (!description.trim()) {
        ToastAndroid.show('Please enter a description', ToastAndroid.SHORT);
        return;
      }
      if (!price.trim()) {
        ToastAndroid.show('Please enter a price', ToastAndroid.SHORT);
        return;
      }
      if (!selectedParentCategory) {
        ToastAndroid.show('Please select a category', ToastAndroid.SHORT);
        return;
      }
      if (!selectedChildCategory) {
        ToastAndroid.show('Please select a subcategory', ToastAndroid.SHORT);
        return;
      }
      if (!image) {
        ToastAndroid.show('Please upload an image', ToastAndroid.SHORT);
        return;
      }

      if (selectedChildCategory.attributes) {
        for (const attribute of selectedChildCategory.attributes) {
          if (!attributeValues[attribute.label]) {
            ToastAndroid.show(`Please fill in ${attribute.label}`, ToastAndroid.SHORT);
            return;
          }
        }
      }

      //add for submit
      const formData = new FormData();
      formData.append('categoryId', selectedChildCategory._id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('attributes', JSON.stringify(attributeValues));
      formData.append('campus', campus);
      formData.append('building', building);
      formData.append('images', {
        uri: image,
        type: 'image/jpeg',
        name: fileName || 'image.jpg',
      });
      const response=await axios.post(`${baseUrl}/market`,formData,{
        headers:{
          Authorization:token,
          'Content-Type':'multipart/form-data'
        }
      })

      if(response.data.statusCode===200){
        ToastAndroid.show('Item added successfully', ToastAndroid.SHORT);
        setTitle('');
        setDescription('');
        setPrice('');
        setSelectedParentCategory(null);
        setSelectedChildCategory(null);
        setAttributeValues({});
        setImage('');
        setFileName('');
        setCampus('');
        setBuilding('');
        navigation.navigate('Market');	
      }else{
        ToastAndroid.show('An error occurred while adding the itemccc', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      ToastAndroid.show('An error occurred while adding the item', ToastAndroid.SHORT);
    }
  }

  const renderAttributes = () => {
    return selectedChildCategory?.attributes.map((attribute: any) => {
      const { label, datatype, value, unit } = attribute;

      if (datatype === 'String') {
        return (
          <TextInput
            key={label}
            style={styles.attributeInput}
            placeholder={unit?`${label} (${unit})`:label}
            placeholderTextColor="#888"
            value={attributeValues[label] || ''}
            onChangeText={(text) => handleAttributeChange(label, text)}
          />
        );
      } else if (datatype === 'Number') {
        return (
          <TextInput
            key={label}
            style={styles.attributeInput}
            placeholder={`${label} (${unit})`}
            placeholderTextColor="#888"
            value={attributeValues[label] || ''}
            keyboardType="numeric"
            onChangeText={(text) => handleAttributeChange(label, text)}
          />
        );
      } else if (datatype === 'dropdown') {
        return (
          <TouchableOpacity
            key={label}
            style={styles.dropdownContainer}
            onPress={() => openDropdownModal(label, value)}
          >
            <Text style={styles.dropdownLabel}>{label}</Text>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                {attributeValues[label] ? attributeValues[label] : 'Select'}
              </Text>
              <DownIcon />
            </View>
          </TouchableOpacity>
        );
      }
      return null;
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.cameraContainer} onPress={handleImagePress}>
            {image ? <Image source={{uri:image}} style={styles.previewImage}/>:<ItemCamera />}
          </TouchableOpacity>
          <Text style={styles.uploadImageText}>Upload Image</Text>
          <TextInput
            style={styles.titleConatiner}
            placeholder="Title"
            placeholderTextColor="#888"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.titleConatiner}
            placeholder="Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            style={styles.priceContainer}
            placeholder="Price (in ₹Rs)"
            placeholderTextColor="#888"
            value={price}
            keyboardType="numeric"
            onChangeText={handleChangePrice}
          />
          <TextInput
            style={styles.titleConatiner}
            placeholder="Campus"
            placeholderTextColor="#888"
            value={campus}
            onChangeText={handleChangeCampus}
          />
          <TextInput
            style={styles.titleConatiner}
            placeholder="Building"
            placeholderTextColor="#888"
            value={building}
            onChangeText={handleChangeBuilding}
          />
          <View style={styles.pickerContainer}>
            <TouchableOpacity style={styles.pickerButton} onPress={() => openPicker(true)}>
              <Text style={styles.pickerButtonText} numberOfLines={1} ellipsizeMode="tail">
                {selectedParentCategory ? selectedParentCategory.categoryName : 'Category'}
              </Text>
              <DownIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.pickerButton, !selectedParentCategory && styles.pickerButtonDisabled]}
              onPress={() => selectedParentCategory && openPicker(false)}
              disabled={!selectedParentCategory}
            >
              <Text style={styles.pickerButtonText} numberOfLines={1} ellipsizeMode="tail">
                {selectedChildCategory ? selectedChildCategory.categoryName : 'Subcategory'}
              </Text>
              <DownIcon />
            </TouchableOpacity>
          </View>
          {selectedChildCategory && (
            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Attributes</Text>
              {renderAttributes()}
            </View>
          )}
          <TouchableOpacity onPress={handleAddItem} style={styles.addItemStyle}>
            <Text style={styles.addItemTextStyle}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={dropdownModalVisible}
        onRequestClose={() => setDropdownModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setDropdownModalVisible(false)}>
              <BigDownIcon />
            </TouchableOpacity>
            <FlatList
              data={dropdownOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemButton} onPress={() => selectDropdownOption(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <BigDownIcon />
            </TouchableOpacity>
            <FlatList
              data={isParentPicker ? parentCategories : childCategories}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#141414',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  uploadImageText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },
  titleConatiner: {
    width: '80%',
    padding: 10,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },
  priceContainer: {
    width: '80%',
    padding: 10,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  pickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2A2A2A',
    borderRadius: 9,
    padding: 12,
    marginHorizontal: 3,
    height: 45,
  },
  pickerButtonDisabled: {
    opacity: 0.5,
  },
  pickerButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    flex: 1,
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#141414',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 10,
    padding: 10,
  },
  list: {
    flexGrow: 0,
  },
  itemButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  itemText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  attributeContainer: {
    width: '80%',
    marginTop: 20,
  },
  attributeTitle: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
  attributeInput: {
    width: '100%',
    padding: 10,
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    fontFamily: 'Montserrat-Medium',
    color: '#FFF',
    marginBottom: 15,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 15,
  },
  dropdownLabel: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 9,
    padding: 12,
    height: 45,
  },
  dropdownText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  previewImage:{
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  addItemStyle:{
    backgroundColor: '#B20000',
    width: 130,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  addItemTextStyle:{
    color: '#F4F4F4',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    lineHeight: 30,
  }
});

export default AddItemScreen;
