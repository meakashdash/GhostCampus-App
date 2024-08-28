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

const InputAccessory = ({onImagePress, onVideoPress, onPollPress}: InputAccessoryProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.iconButton} 
                onPress={onImagePress}
                activeOpacity={0.7}
            >
                <Image />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.iconButton} 
                onPress={onVideoPress}
                activeOpacity={0.7}
            >
                <Video />
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.iconButton} 
                onPress={onPollPress}
                activeOpacity={0.7}
            >
                <Poll />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
    },
    iconButton: {
        padding: 10,
        backgroundColor: '#888',
        borderRadius: 25,
        width: 50,
        height: 50,
    },
})

export default InputAccessory;