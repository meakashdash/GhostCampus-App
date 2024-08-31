import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { tokenState } from '../../context/userContext';
import { useRecoilState } from 'recoil';
import DownIcon from '../../../assets/icons/market/DownIcon';
import BigDownIcon from '../../../assets/icons/market/BigDownIcon';
import AddItem from '../../../assets/icons/market/AddItem';

interface Category {
  _id: string;
  categoryName: string;
  type: string;
  childrens: string[];
}

interface ChildCategory {
  _id: string;
  categoryName: string;
}

const MarketPicker = ({ setSelectedCategory, navigation, isAddButtonVisible }:any) => {
  const [selectedParentCategory, setSelectParentCategory] = useState<Category | null>(null);
  const [selectedChildCategory, setSelectChildCategory] = useState<ChildCategory | null>(null);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
  const [token] = useRecoilState(tokenState);
  const [modalVisible, setModalVisible] = useState(false);
  const [isParentPicker, setIsParentPicker] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedParentCategory) {
      getChildCategories(selectedParentCategory._id);
    }
  }, [selectedParentCategory]);

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

  const openPicker = (isParent: boolean) => {
    setIsParentPicker(isParent);
    setModalVisible(true);
  };

  const selectItem = (item: Category | ChildCategory) => {
    if (isParentPicker) {
      setSelectParentCategory(item as Category);
      setSelectChildCategory(null);
    } else {
      setSelectChildCategory(item as ChildCategory);
      setSelectedCategory((item as ChildCategory)._id);
    }
    setModalVisible(false);
  };

  const handleChangeScreen=()=>{
    navigation.navigate('AddItemScreen');
  }

  const renderItem = ({ item }: { item: Category | ChildCategory }) => (
    <TouchableOpacity style={styles.itemButton} onPress={() => selectItem(item)}>
      <Text style={styles.itemText}>{item.categoryName}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerRow}>
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
        {isAddButtonVisible?<TouchableOpacity style={styles.addItemButton} onPress={handleChangeScreen}>
          <AddItem />
        </TouchableOpacity>:null}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <BigDownIcon />
            </TouchableOpacity>
            <FlatList
              data={isParentPicker ? parentCategories : childCategories}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              style={styles.list}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addItemButton: {
    width: 45,
    height: 45, 
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 9,
  },
});

export default MarketPicker;