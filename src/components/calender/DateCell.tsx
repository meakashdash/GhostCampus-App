import React, { useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface DateCellProps {
  // date: string;
  day: number | string;
  // mood: string | null;
  // isToday: boolean;
  // isDisabled: boolean;
  // onSelectDate: (date: string) => void;
  // onSelectMood: (date: string, mood: string) => void;
}

const moodIcons = ['😊', '🤔', '😔', '😠', '🎉'];

const DateCell = ({ day }: DateCellProps): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectMood, setSelectMood] = useState<string | null>(null);

  const handleShowModal = () => setModalOpen(true);
  const handleMoodSelect = (mood: string) => {
    setSelectMood(mood);

    setModalOpen(false);
  };

  const handleCloseModal=()=>{
    setModalOpen(false);
  }

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.dayContainer} onPress={handleShowModal}>
        {selectMood ? <Text style={styles.moodStyle}>{selectMood}</Text> : <Text style={styles.dayText}>{day}</Text>}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.moodContainer}>
              {moodIcons.map((mood) => (
                <TouchableOpacity key={mood} onPress={() => handleMoodSelect(mood)}>
                  <Text style={styles.moodIcon}>{mood}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    height: 58,
    width: 58,
    borderRadius: 29,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Monsterrat-Bold'
  },
  moodStyle: {
    fontSize: 24
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