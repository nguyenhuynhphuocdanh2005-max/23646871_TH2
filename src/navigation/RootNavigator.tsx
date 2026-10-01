import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import { useAuthStore } from '@stores/authStore';

const Stack = createNativeStackNavigator();
export default function RootNavigator() {
  const token = useAuthStore((state) => state.token);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {token ? <Stack.Screen name="MainTabs" component={MainTabs} /> : <Stack.Screen name="AuthStack" component={AuthStack} />}
    </Stack.Navigator>
  );
}
