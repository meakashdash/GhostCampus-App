import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Post } from '../components/Post';

export const HomeScreen=():React.JSX.Element=>{
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Post />
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#ffffff"
    }
})