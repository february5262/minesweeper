import * as React from 'react';
import { View, StyleSheet,Text, Pressable } from 'react-native';


export default function Cell({ row, col, isBomb, isFlipped, value, handlePress }:any) {
    const [flag,setFlag] = React.useState(false);
    return (
        <Pressable 
        onPress={()=>handlePress(row,col)}
        onLongPress={()=>{setFlag(true)}}
        style={[styles.container, !isFlipped && styles.isFlipped]}>
            {flag ?
            <Text style={styles.text}>🚩</Text>:
            <Text style={styles.text}>{isFlipped && (isBomb?"💣":value)}</Text>
            }
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container:{
        width:35,
        height:35,
        borderWidth:1,
        borderColor:'gray',
        alignItems:'center',
        justifyContent:'center',
    },
    isFlipped:{
        backgroundColor:'#C0C0C0',
    },
    text:{
        fontSize:22,
        fontWeight:'800',
    }
})