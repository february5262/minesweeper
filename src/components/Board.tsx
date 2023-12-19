import * as React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { createBoard } from '../utils/createBoard';
import { gameReducer } from '../reducers/gameReducer';
import Cell from './Cell';
import { useRecoilValue } from 'recoil';
import { btSheetState } from '../services/btsheet-controller';
import { useEffect } from 'react';


export default function Board() { 
    const [time,setTime] = React.useState(200);
    const level = useRecoilValue(btSheetState);
    const [gameState, dispatch] = React.useReducer(gameReducer, {
        board:createBoard(level.width,level.height,level.bomb),
        isGameOver:false,
    });

    function handlePress(row:number,col:number){
        dispatch({type:"HANDLE_CELL",row,col})
    }
    useEffect(()=>{
        const timer = setInterval(() => {
            if(time===0){
                dispatch({type:"TIME_OUT",time});
                return;
            }else{
                setTime((prev) => prev - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    },[time])

    React.useMemo(()=>{
        // dispatch({type:"SET_LEVEL",level})
    },[level])
    return (<View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.text}>BOMBS:{level.bomb}</Text>
            <Text style={styles.text}>{gameState.isGameOver?"Game Over":""}</Text>
            <Text style={styles.text}>{time}</Text>
        </View>
        <View style={styles.main}>
        {gameState.board.map((row:any,rowIdx:number)=>(
            <View key={rowIdx} style={styles.row}>
                {row.map((cell:any,cellIdx:number)=>(
                    <Cell key={cellIdx} handlePress={handlePress} {...cell}/>
                ))}
            </View>
        ))}
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    main:{
        flexShrink: 1,
    },
    info:{
        width:250,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    row:{
        flexDirection:"row",
    },
    text:{
        fontSize:14,
        fontWeight:'800'
    }
})