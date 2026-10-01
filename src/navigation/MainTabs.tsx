import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';
import { useCartStore } from '@stores/cartStore';
import { COLORS } from '@constants/theme';

const Tab = createBottomTabNavigator();
export default function MainTabs() {
  const totalQuantity = useCartStore((state) => state.totalQuantity());

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: COLORS.primary }}>
      <Tab.Screen name="Cửa hàng" component={ShopStack} />
      <Tab.Screen
        name="Giỏ"
        component={CartScreen}
        options={{ tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined, tabBarBadgeStyle: { backgroundColor: COLORS.secondary } }}
      />
      <Tab.Screen name="Tôi" component={MeScreen} />
    </Tab.Navigator>
  );
}
