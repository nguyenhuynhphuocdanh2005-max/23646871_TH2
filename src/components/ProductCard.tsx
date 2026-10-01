import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Product } from '@services/productApi';
import { PRICE_MULTIPLIER } from '@constants/student';
import { COLORS } from '@constants/theme';

interface Props {
  item: Product;
  onPress: () => void;
  onAdd: () => void;
}

// Hàm format giá đúng chuẩn VNĐ theo công thức của đề
export const formatCurrency = (price: number) => {
  return Math.round(price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';
};

const ProductCard = ({ item, onPress, onAdd }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>{formatCurrency(item.price)}</Text>

      <TouchableOpacity style={styles.addButton} onPress={onAdd}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    margin: 6,
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageContainer: {
    height: 100,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
  },
  image: { flex: 1, width: '100%' },
  title: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  price: { fontSize: 14, color: COLORS.primary, fontWeight: 'bold' },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { color: COLORS.surface, fontSize: 18, fontWeight: 'bold', lineHeight: 22 },
});

export default ProductCard;
