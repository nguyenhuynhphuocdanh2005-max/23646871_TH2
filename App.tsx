import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { STUDENT } from '@constants/student';
import { COLORS } from '@constants/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>KTXGo - {STUDENT.mssv}</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default App;
