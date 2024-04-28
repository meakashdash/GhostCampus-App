import React,{useRef,useEffect} from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';
import { useRecoilState } from 'recoil';
import { checkCommentPostId } from '../context/userContext';

const CommentSheet = ({setViewComment}:any) => {
    const [postCommentId,setPostCommentId]=useRecoilState(checkCommentPostId);
    const slide=useRef(new Animated.Value(300)).current;

    const slideUp=()=>{
        Animated.spring(slide,{
            toValue:0,
            useNativeDriver:false
        }).start();
    }

    const slideDown=()=>{
        Animated.spring(slide,{
            toValue:300,
            useNativeDriver:false
        }).start();
    }

    useEffect(()=>{
        slideUp();
    },[])

    const closeModal=()=>{
        slideDown();

        //setTimeout to show the slidedown the animation
        // setTimeout(()=>{
            setViewComment(false);
        // },500)
    }

    useEffect(()=>{
        console.log(postCommentId);
        
    },[postCommentId])

    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            <Pressable style={{width:'100%',height:'70%'}}>
                <Animated.View style={[styles.bottomSheet,{ transform:[{translateY:slide}]}]}>
                    <Text style={styles.textComment}>Comments</Text>
                    <View style={styles.border}></View>
                </Animated.View>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    backdrop:{
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'
    },
    bottomSheet:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
    },
    textComment:{
        fontSize:20,
        fontFamily:'Montserrat-SemiBold',
        color:'black',
        paddingTop:15,
        paddingLeft:160,
        paddingBottom: 5,
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
})

export default CommentSheet;
