import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { tokenState } from '../../context/userContext';
import { useRecoilState } from 'recoil';
import DownIcon from '../../../assets/icons/market/DownIcon';

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

const MarketPicker = ({ setSelectedCategory }: any) => {
  const [selectedParentCategory, setSelectParentCategory] = useState<Category | null>(null);
  const [selectedChildCategory, setSelectChildCategory] = useState<ChildCategory | null>(null);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
  const [token, setToken] = useRecoilState(tokenState);
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
      const data = response?.data?.parentResponse;
      setParentCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChildCategories = async (parentId: string) => {
    try {
      const response = await axios.get(`${baseUrl}/child-category/${parentId}`, {
        headers: {
          Authorization: token,
        },
      });
      const data = response?.data?.childResponse;
      setChildCategories(data);
    } catch (error) {
      console.log(error);
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

  const renderItem = ({ item }: { item: Category | ChildCategory }) => (
    <TouchableOpacity style={styles.itemButton} onPress={() => selectItem(item)}>
      <Text style={styles.itemText}>{item.categoryName}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerRow}>
        <TouchableOpacity style={styles.pickerButton} onPress={() => openPicker(true)}>
          <Text style={styles.pickerButtonText}>
            {selectedParentCategory ? selectedParentCategory.categoryName : 'Select Category'}
          </Text>
          <DownIcon />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pickerButton, !selectedParentCategory && styles.pickerButtonDisabled]} 
          onPress={() => selectedParentCategory && openPicker(false)}
          disabled={!selectedParentCategory}
        >
          <Text style={styles.pickerButtonText}>
            {selectedChildCategory ? selectedChildCategory.categoryName : 'Select Subcategory'}
          </Text>
          <DownIcon />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <DownIcon />
            </TouchableOpacity>
            <FlatList
              data={isParentPicker ? parentCategories : childCategories}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              style={styles.list}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    padding: 10,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2A2A2A',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 4,
  },
  pickerButtonDisabled: {
    opacity: 0.5,
  },
  pickerButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalView: {
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
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  itemButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  itemText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default MarketPicker;