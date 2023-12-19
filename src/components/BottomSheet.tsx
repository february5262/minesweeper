import { useActionSheet } from '@expo/react-native-action-sheet';
import { Entypo } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { btSheetState } from '../services/btsheet-controller';

export default function LevelBtn() {
  const { showActionSheetWithOptions } = useActionSheet();
  const setLevel = useSetRecoilState(btSheetState);

  const onPress = () => { 
    const options = ['Beginner', 'Intermediate', 'Expert'];
    const destructiveButtonIndex = 5;
    const cancelButtonIndex = 5;
    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex: any) => {
      switch (selectedIndex) {
        case 0: setLevel({width:8,height:8,bomb:4}); break;
        case 1: setLevel({width:10,height:14,bomb:6}); break;
        case 2: setLevel({width:14,height:32,bomb:8}); break;
        case destructiveButtonIndex:break;
        // case cancelButtonIndex:
      }});
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>😊</Text>
    </TouchableOpacity>
  )
};