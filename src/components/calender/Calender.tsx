import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import DateCell from './DateCell';

const Calender = (): React.JSX.Element => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  let dayone = new Date(year, month, 1).getDay();
  let lastdate = new Date(year, month + 1, 0).getDate();
  let dayend = new Date(year, month, lastdate).getDay();
  let lastMonthDate = new Date(year, month, 0).getDate();
  console.log('dayone', dayone);
  console.log('lastdate', lastdate);
  console.log('dayend', dayend);
  console.log('lastMonthDate', lastMonthDate);
  const renderWeekdayHeaders = () => {
    return weekdays.map((day, index) => (
      <Text key={index} style={styles.weekdayHeader}>{day}</Text>
    ));
  };
  const renderInactiveDateCells = () => {
    let inactiveCells = [];
    for (let i = dayone; i > 0; i--) {
      inactiveCells.push(<DateCell day={lastMonthDate - i + 1} isDisabled={true}/>);
    }
    return inactiveCells;
  };
  const renderNextMonthDateCells = () => {
    let nextMonthCells = [];
    for (let i = dayend; i < 6; i++) {
      nextMonthCells.push(
        <DateCell day={i - dayend + 1} isDisabled={true} />
      );
    }
    return nextMonthCells;
  };
  const renderCurrentDateCells=()=>{
    let activeCells=[];
    for(let i=1;i<=lastdate;i++){
        activeCells.push(<DateCell day={i} isDisabled={false}/>)
    }
    return activeCells;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.weekdayHeaderContainer}>
        {renderWeekdayHeaders()}
      </View>
      <View style={styles.calenderContainer}>
        {renderInactiveDateCells()}
        {renderCurrentDateCells()}
        {renderNextMonthDateCells()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    calenderContainer:{
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'space-between'
    },
    weekdayHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    weekdayHeader:{
        width: 50,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    }
});

export default Calender;
