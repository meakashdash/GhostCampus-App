import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ToastAndroid,
  Dimensions
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

interface MoodProps{
  _id:string,
  date:string,
  mood:string,
  userId:string
}

interface DateCellProps {
  day: number | string;
  isToday?: boolean;
  isDisabled: boolean;
  month: number | string;
  year: number | string;
  moods?:Array<MoodProps>;
}

const {width,height}=Dimensions.get('window');

const moodEmojis = [
  {name: 'happy', component: Happy},
  {name: 'confused', component: Confused},
  {name: 'sad', component: Sad},
  {name: 'angry', component: Angry},
  {name: 'celebration', component: Celebrate},
];

const DateCell = ({day, isDisabled, month, year, moods, isToday}: DateCellProps): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectMood, setSelectMood] = useState<string | null>(null);
  const token=useRecoilValue(tokenState);
  useEffect(() => {
    const currentMood = moods?.find(mood => mood.date === `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    if (currentMood) {
      setSelectMood(currentMood.mood);
    }
  }, [moods]);
  const handleShowModal = () => setModalOpen(true);
  const handleMoodSelect = async(mood: string) => {
    try {
      const moodItem={
        mood:mood,
        date:`${year}-${month}-${day}`
      }
      const response=await axios.post(`${baseUrl}/mood/create-mood`,moodItem,{
        headers:{
          Authorization:token
        }
      });
      if(response.data.statusCode===200){
        setSelectMood(mood);
        ToastAndroid.show(response.data.message,ToastAndroid.SHORT)
      }else{
        ToastAndroid.show(response.data.message,ToastAndroid.SHORT)
      }
      setModalOpen(false);
    } catch (error) {
      setModalOpen(false);
      console.log(error);
      throw error;
    }
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
        style={[styles.dayContainer, isDisabled && styles.disabledContainer, isToday && styles.todayContainer]}
        onPress={handleShowModal}
        activeOpacity={0.8}>
        {MoodEmoji ? (
          <MoodEmoji width={width*0.111} height={height*0.043} />
        ) : (
          <Text style={[styles.dayText, isDisabled && styles.disabledText, isToday && styles.todayText]}>
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
                    <emoji.component width={width*0.111} height={height*0.054} />
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
    height: height*0.054,
    width: width*0.111,
    borderRadius: 25,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width*0.017,
    marginBottom: height*0.008,
  },
  disabledContainer: {
    borderColor: '#5D5D6D',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: width*0.053,
    fontFamily: 'Monsterrat-Bold',
  },
  disabledText: {
    color: '#5D5D6D',
  },
  moodStyle: {
    fontSize: width*0.078,
  },
  moodButton: {
    marginTop:height*0.010,
    marginBottom:height*0.010,
    marginLeft:width*0.022,
    marginRight:width*0.022,
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
    paddingHorizontal:width*0.044,
    paddingVertical:height*0.021
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3A3A3C',
    borderRadius: 25,
    paddingHorizontal:0.022,
    paddingVertical:0.010,
    marginBottom: 20,
  },
  moodIcon: {
    fontSize: width*0.053,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#3A3A3C',
    borderRadius: 25,
    width: width*0.111,
    height: height*0.054,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width*0.040,
    fontWeight: 'bold',
  },
  todayContainer:{
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  todayText:{
    color: '#000000',
  }
});

export default DateCell;
