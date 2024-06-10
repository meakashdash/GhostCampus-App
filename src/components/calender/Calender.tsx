import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DateCell from './DateCell';

const Calender = ():React.JSX.Element => {
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
