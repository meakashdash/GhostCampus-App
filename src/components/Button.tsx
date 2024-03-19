import React from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonInterface{
    title:string
    onPress:(event: GestureResponderEvent) => void;
}

export const Button=({title,onPress}:ButtonInterface):React.JSX.Element=>{
    return(
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.buttontext}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#B20000',
        paddingHorizontal:50,
        paddingVertical:15,
        borderRadius:20,
        marginBottom:10
    },
    buttontext:{
        color:'#ffffff',
        fontFamily:'Arata-Regular',
        fontSize:16,
        fontWeight: 'bold'
    }
})