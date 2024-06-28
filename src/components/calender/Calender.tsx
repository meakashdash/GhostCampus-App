import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import DateCell from './DateCell';
import LeftSlide from '../../../assets/icons/LeftSlide';
import RightSlideInactive from '../../../assets/icons/RightSlideInactive';
import RightSlideActive from '../../../assets/icons/RightSlideActive';
import axios from 'axios';
import {baseUrl} from '../../URL';
import {useRecoilValue} from 'recoil';
import {tokenState} from '../../context/userContext';

const Calender = (): React.JSX.Element => {
  const [date, setDate] = useState(new Date());
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(false);
  let year = date.getFullYear();
  let month = date.getMonth();
  const currentMonth = new Date().getMonth();
  const today = new Date();
  const isToday = (day: number) => 
    today.getDate() === day && 
    today.getMonth() === month && 
    today.getFullYear() === year;
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
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    getAllMoods();
  }, [month, year]);
  const getAllMoods = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/mood/get-mood?month=${month + 1}&year=${year}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.data.statusCode === 200) {
        setMoods(response.data.moods);
        setLoading(false);
      } else {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      throw error;
    }
  };
  const renderLoader = () => {
    return loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#FFA72B" />
      </View>
    ) : null;
  };
  const goToPreviousMonth = () => {
    setDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(year, month + 1, 1));
  };
  const renderWeekdayHeaders = () => {
    return weekdays.map((day, index) => (
      <Text key={index} style={styles.weekdayHeader}>
        {day}
      </Text>
    ));
  };
  const renderInactiveDateCells = () => {
    let inactiveCells = [];
    for (let i = dayone; i > 0; i--) {
      inactiveCells.push(
        <DateCell
          key={lastMonthDate - i + 1}
          day={lastMonthDate - i + 1}
          month={month + 1}
          year={year}
          isDisabled={true}
        />,
      );
    }
    return inactiveCells;
  };
  const renderNextMonthDateCells = () => {
    let nextMonthCells = [];
    for (let i = dayend; i < 6; i++) {
      nextMonthCells.push(
        <DateCell
          key={i - dayend + 1}
          day={i - dayend + 1}
          month={month + 1}
          year={year}
          isDisabled={true}
        />,
      );
    }
    return nextMonthCells;
  };
  const renderCurrentDateCells = () => {
    let activeCells = [];
    for (let i = 1; i <= lastdate; i++) {
      activeCells.push(
        <DateCell
          key={`${year}-${month + 1}-${i}`}
          day={i}
          month={month + 1}
          year={year}
          isDisabled={false}
          moods={moods}
          isToday={isToday(i)}
        />,
      );
    }
    return activeCells;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.monthYearText}>
          {months[month]} {year}
        </Text>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={goToPreviousMonth}>
            <LeftSlide style={styles.leftSlide} />
          </TouchableOpacity>
          {currentMonth === month ? (
            <TouchableOpacity>
              <RightSlideInactive style={styles.rightSlide} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={goToNextMonth}>
              <RightSlideActive style={styles.rightSlide} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.weekdayHeaderContainer}>
        {renderWeekdayHeaders()}
      </View>
      {loading ? (
        renderLoader()
      ) : (
        <View style={styles.calenderContainer}>
          {renderInactiveDateCells()}
          {renderCurrentDateCells()}
          {renderNextMonthDateCells()}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  calenderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthYearText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  navigationButtons: {
    flexDirection: 'row',
  },
  navButtonText: {
    fontSize: 20,
    marginHorizontal: 10,
    color: '#FFFFFF',
  },
  leftSlide: {
    paddingRight: 40,
  },
  rightSlide: {
    marginRight: 10,
  },
  weekdayHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginRight: 10.5,
    marginTop: 20,
  },
  weekdayHeader: {
    width: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  loaderStyle: {
    alignItems: 'center',
    marginVertical:100
  },
});

export default Calender;
