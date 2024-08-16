import React = require("react");
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Profile=():React.JSX.Element=>{
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Profile Screen</Text>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#ffffff"
    }
})