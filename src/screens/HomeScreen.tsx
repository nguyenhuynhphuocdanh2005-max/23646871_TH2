import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Vibration } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { fetchProducts, Product } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import ProductCard from '@components/ProductCard';
import { ShopStackParamList } from '@navigation/ShopStack';
import { STUDENT, DEBOUNCE_MS, STALE_TIME_MS, ROOM_LABEL, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';

type NavigationProp = NativeStackNavigationProp<ShopStackParamList, 'Home'>;
const TypedFlashList = FlashList as React.ComponentType<any>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');

  // Dùng hook debounce với thời gian DEBOUNCE_MS được tính từ MSSV
  const debouncedSearch = useDebouncedValue(search, DEBOUNCE_MS);

  const addToCart = useCartStore((state) => state.add);

  // Lấy dữ liệu với React Query
  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: STALE_TIME_MS,
  });

  // Lọc dữ liệu theo từ khoá tìm kiếm đã debounce
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!debouncedSearch) return data;
    return data.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [data, debouncedSearch]);

  const handleAdd = (item: Product) => {
    // Kích hoạt Haptic (dùng Vibration native mô phỏng selection nhẹ)
    if (VARIANT.hapticOnAdd === 'selection') Vibration.vibrate(50);

    // Thêm vào giỏ hàng
    addToCart({
      id: item.id.toString(),
      title: item.title,
      price: item.price,
      quantity: 1,
    });
  };

  // Trạng thái 1: Đang tải
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.text }}>Đang tải món...</Text>
      </View>
    );
  }

  // Trạng thái 2: Lỗi mạng (Yêu cầu hiển thị MSSV màu đỏ)
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{STUDENT.mssv}</Text>
        <Text style={styles.errorSubText}>Không tải được dữ liệu món.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Trạng thái 3: Có dữ liệu
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KTXGO</Text>
        <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      {/* Tuyệt đối không bọc FlashList bằng ScrollView dọc */}
      <View style={{ flex: 1 }}>
        <TypedFlashList
          data={filteredData}
          numColumns={2}
          estimatedItemSize={200}
          // Key bắt buộc ghép từ mssv
          keyExtractor={(item: Product) => `${STUDENT.mssv}-${item.id}`}
          onRefresh={refetch}
          refreshing={isRefetching}
          contentContainerStyle={{ padding: 6 }}
          renderItem={({ item }: { item: Product }) => (
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('Detail', { id: item.id.toString() })}
              onAdd={() => handleAdd(item)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.surface },
  headerSubtitle: { fontSize: 14, color: COLORS.border, marginTop: 4 },
  searchContainer: { padding: 12, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderColor: COLORS.border },
  searchInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, padding: 10, color: COLORS.text, backgroundColor: COLORS.surface },
  errorText: { fontSize: 24, fontWeight: 'bold', color: COLORS.error, marginBottom: 8 },
  errorSubText: { fontSize: 16, color: COLORS.text, marginBottom: 24 },
  retryButton: { backgroundColor: COLORS.error, paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  retryText: { color: COLORS.surface, fontWeight: 'bold', fontSize: 16 },
});
