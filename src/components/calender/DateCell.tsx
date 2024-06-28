import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ToastAndroid
} from 'react-native';
import Happy from '../../../assets/icons/moods/Happy';
import Sad from '../../../assets/icons/moods/Sad';
import Angry from '../../../assets/icons/moods/Angry';
import Celebrate from '../../../assets/icons/moods/Celebrate';
import Confused from '../../../assets/icons/moods/Confused';
import axios from 'axios'
import { baseUrl } from '../../URL';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../context/userContext';
import { months } from 'moment';

interface DateCellProps {
  day: number | string;
  // isToday: boolean;
  isDisabled: boolean;
  month: number | string;
  year: number | string;
}

const moodEmojis = [
  {name: 'happy', component: Happy},
  {name: 'confused', component: Confused},
  {name: 'sad', component: Sad},
  {name: 'angry', component: Angry},
  {name: 'celebration', component: Celebrate},
];

const DateCell = ({day, isDisabled, month, year}: DateCellProps): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectMood, setSelectMood] = useState<string | null>(null);
  const token=useRecoilValue(tokenState);

  const handleShowModal = () => setModalOpen(true);
  const handleMoodSelect = async(mood: string) => {
    const moodItem={
      mood:mood,
      date:`${year}-0${month}-${day}`
    }
    console.log(moodItem);
    const response=await axios.post(`${baseUrl}/mood/create-mood`,moodItem,{
      headers:{
        Authorization:token
      }
    });
    console.log("response",response.data);
    if(response.data.statusCode===200){
      setSelectMood(mood);
      ToastAndroid.show(response.data.message,ToastAndroid.SHORT)
    }else{
      ToastAndroid.show(response.data.message,ToastAndroid.SHORT)
    }
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const MoodEmoji = selectMood
    ? moodEmojis.find(emoji => emoji.name === selectMood)?.component
    : null;

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[styles.dayContainer, isDisabled && styles.disabledContainer]}
        onPress={handleShowModal}
        activeOpacity={0.8}>
        {MoodEmoji ? (
          <MoodEmoji width={50} height={40} />
        ) : (
          <Text style={[styles.dayText, isDisabled && styles.disabledText]}>
            {day}
          </Text>
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen && !isDisabled}
        onRequestClose={() => setModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.moodContainer}>
                {moodEmojis.map(emoji => (
                  <TouchableOpacity
                    key={emoji.name}
                    onPress={() => handleMoodSelect(emoji.name)}
                    style={styles.moodButton}>
                    <emoji.component width={50} height={50} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    marginBottom: 5,
  },
  disabledContainer: {
    borderColor: '#5D5D6D',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Monsterrat-Bold',
  },
  disabledText: {
    color: '#5D5D6D',
  },
  moodStyle: {
    fontSize: 35,
  },
  moodButton: {
    margin: 10,
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
    padding: 20,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3A3A3C',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  moodIcon: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#3A3A3C',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DateCell;
