import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Vibration } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import { Product, fetchProductById } from '@services/productApi';
import { useCartStore } from '@stores/cartStore';
import { formatCurrency } from '@components/ProductCard';
import { COLORS } from '@constants/theme';
import { VARIANT } from '@constants/student';

const MOCK_BGS = ['#FEF3C7', '#E0F2FE', '#DCFCE7', '#FCE7F3'];

export default function DetailScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { id } = route.params; // Lấy ID từ Stack truyền sang

  const addToCart = useCartStore((state) => state.add);

  // Fetch chi tiết 1 sản phẩm
  const { data: item, isLoading, isError } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (isError || !item) {
    return (
      <View style={styles.center}>
        <Text style={{ color: COLORS.error }}>Lỗi tải chi tiết món.</Text>
      </View>
    );
  }

  const handleAdd = () => {
    if (VARIANT.hapticOnAdd === 'selection') Vibration.vibrate(50);
    addToCart({
      id: item.id.toString(),
      title: item.title,
      price: item.price,
      quantity: 1,
    });
  };

  const colorIndex = Math.abs((Number(item.id) - 1) % 4);
  const bgColor = MOCK_BGS[colorIndex] || MOCK_BGS[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Chi tiết món</Text>
      </TouchableOpacity>

      <View style={[styles.imageCard, { backgroundColor: bgColor }]}>
        <View style={styles.oval}>
          <View style={styles.rectangle} />
        </View>
      </View>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{formatCurrency(item.price)}</Text>
      <Text style={styles.subtitle}>Giao nội khu · nhận tận phòng</Text>

      {/* Ràng buộc: Mô tả ngắn từ API (tối đa 3 dòng) */}
      <Text style={styles.desc} numberOfLines={3}>
        {item.description}
      </Text>
      <Text style={styles.idText}>Giữ nguyên id từ route.params: {id}</Text>

      <View style={styles.spacer} />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Thêm vào giỏ · Haptic</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backBtn: { marginBottom: 16, alignSelf: 'flex-start' },
  backText: { fontSize: 16, color: COLORS.primary, fontWeight: 'bold' },
  imageCard: { height: 160, borderRadius: 16, padding: 24, marginBottom: 16, alignItems: 'center', justifyContent: 'center' },
  oval: { width: 160, height: 60, backgroundColor: '#93C5FD', borderRadius: 60, justifyContent: 'center', alignItems: 'center' },
  rectangle: { width: 110, height: 22, backgroundColor: COLORS.primary },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 8 },
  price: { fontSize: 20, color: COLORS.primary, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginBottom: 16 },
  desc: { fontSize: 14, color: COLORS.textLight, textAlign: 'center', marginBottom: 8, paddingHorizontal: 12 },
  idText: { fontSize: 12, color: COLORS.textLight, textAlign: 'center', fontStyle: 'italic' },
  spacer: { flex: 1 },
  addButton: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16 },
  addButtonText: { color: COLORS.surface, fontSize: 16, fontWeight: 'bold' },
});
