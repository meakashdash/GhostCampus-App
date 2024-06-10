import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    const moodIcon=getMoodIcon('happy');
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.dayContainer}>
                {moodIcon?<Text style={styles.moodStyle}>{moodIcon}</Text>:<Text style={styles.dayText}>{day}</Text>}
            </TouchableOpacity>
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
    }
})

export default DateCell;
