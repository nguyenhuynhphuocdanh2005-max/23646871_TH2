// TH2 | 23646871 | NGUYEN HUYNH PHUOC DANH | #278798
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@navigation/RootNavigator';
import Watermark from '@components/Watermark';
import { VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          {VARIANT.watermarkAtTop && <Watermark />}

          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>

          {/* Vì số cuối MSSV là 1 -> Watermark sẽ hiển thị ở đây */}
          {!VARIANT.watermarkAtTop && <Watermark />}
        </SafeAreaView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
