import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Image from '../../../assets/icons/add-post/Image';
import Video from '../../../assets/icons/add-post/Video';
import Poll from '../../../assets/icons/add-post/Poll';

interface InputAccessoryProps {
    onImagePress: () => void;
    onVideoPress: () => void;
    onPollPress: () => void;
}

const InputAccessory = ({onImagePress,onVideoPress,onPollPress}:InputAccessoryProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.iconButton} onPress={onImagePress}>
                <Image />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onVideoPress}>
                <Video />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onPollPress}>
                <Poll />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
      iconButton: {
        
      },
})

export default InputAccessory;
