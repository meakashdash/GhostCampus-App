import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AddPost = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View>
        <Text>AddPost Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
