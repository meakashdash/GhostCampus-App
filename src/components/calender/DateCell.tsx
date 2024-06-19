import React, { useState } from 'react';
import { Button, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DateCellProps {
    // date: string;
    day: number | string;
    // mood: string | null;
    // isToday: boolean;
    // isDisabled: boolean;
    // onSelectDate: (date: string) => void;
    // onSelectMood: (date: string, mood: string) => void;
}

const getMoodIcon = (mood: string | null) => {
    switch (mood) {
      case 'happy':
        return '😊';
      case 'neutral':
        return '😐';
      case 'sad':
        return '😢';
      case 'angry':
        return '😠';
      case 'celebration':
        return '🎉';
      default:
        return '';
    }
};

const DateCell = ({day}:DateCellProps):React.JSX.Element => {
    const [isModalOpen,setModalOpen]=useState(false);
    const [selectMood,setSelectMood]=useState<string|null>(null);
    const handleShowModal=()=>{
      setModalOpen(true)
    }
    const handleMoodSelect = (mood: string) => {
      setSelectMood(mood);
      setModalOpen(false);
  };
    const moodIcon=getMoodIcon(selectMood);
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.dayContainer} onPress={handleShowModal}>
                {moodIcon?<Text style={styles.moodStyle}>{moodIcon}</Text>:<Text style={styles.dayText}>{day}</Text>}
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalOpen}
              onRequestClose={() => {
                setModalOpen(!isModalOpen);
              }}
            >
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      {['happy', 'neutral', 'sad', 'angry', 'celebration'].map((mood) => (
                          <Button key={mood} title={getMoodIcon(mood)} onPress={() => handleMoodSelect(mood)} />
                      ))}
                      <Button title="Close" onPress={() => setModalOpen(false)} />
                  </View>
              </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dayContainer:{
        height:58,
        width:58,
        borderRadius:58/2,
        borderWidth:2.5,
        borderColor:'#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText:{
        color:'#FFFFFF',
        fontSize:24,
        fontFamily:'Monsterrat-Bold'
    },
    moodStyle:{
        fontSize:24
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
})

export default DateCell;
