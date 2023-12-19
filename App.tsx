import { StyleSheet,View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Board from './src/components/Board';
import LevelBtn from './src/components/BottomSheet';
import React from 'react';

export default function App(){
  return (
    <RecoilRoot>
      <ActionSheetProvider>
        <SafeAreaProvider>
          <View style={styles.container}>
            <LevelBtn/>
            <Board/>
          </View>
        </SafeAreaProvider>
      </ActionSheetProvider>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
