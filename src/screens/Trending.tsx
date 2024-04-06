import * as React from 'react'
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Trending=()=>{
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Trending Screen</Text>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#ffffff"
    }
})