import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DateCell from './DateCell';

const Calender = ():React.JSX.Element => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let lastMonthDate = new Date(year, month, 0).getDate();
    console.log("dayone",dayone);
    console.log("lastdate",lastdate);
    console.log("dayend",dayend);
    console.log("lastMonthDate",lastMonthDate);
    return (
        <SafeAreaView>
            <DateCell
              day={"4"}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
})

export default Calender;
