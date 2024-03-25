import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TagProps {
  color: string;
  text: string;
}

const Tag: React.FC<TagProps> = ({color, text}) => {
  return (
    <View style={[styles.tagContainer, {backgroundColor: color}]}>
      <Text style={styles.tagText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 20,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tagText: {
    color: '#000000',
    fontFamily:'Montserrat-SemiBold',
    flexShrink: 1, 
    flexWrap: "wrap"
  },
});

export default Tag;
