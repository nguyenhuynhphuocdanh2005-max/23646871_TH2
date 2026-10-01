import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '@services/productApi';
import { PRICE_MULTIPLIER } from '@constants/student';
import { COLORS } from '@constants/theme';

interface Props {
  item: Product;
  onPress: () => void;
  onAdd: () => void;
}

export const formatCurrency = (price: number) => {
  return Math.round(price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';
};

// Khai báo 4 màu nền giống hệt bản thiết kế
const MOCK_BGS = ['#FEF3C7', '#E0F2FE', '#DCFCE7', '#FCE7F3'];

const ProductCard = ({ item, onPress, onAdd }: Props) => {
  // Trích xuất màu nền luân phiên dựa vào ID sản phẩm (khớp chính xác 4 màu theo mockup: Vàng, Xanh dương, Xanh lá, Hồng)
  const colorIndex = Math.abs((Number(item.id) - 1) % 4);
  const bgColor = MOCK_BGS[colorIndex] || MOCK_BGS[0];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      {/* Khối hình học mô phỏng ảnh */}
      <View style={[styles.mockImageContainer, { backgroundColor: bgColor }]}>
        <View style={styles.oval}>
          <View style={styles.rectangle} />
        </View>
      </View>
      
      {/* Thông tin chữ từ API */}
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>{formatCurrency(item.price)}</Text>
      
      {/* Nút thêm vào giỏ */}
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
  mockImageContainer: {
    height: 80, // Chiều cao vừa đủ như ảnh mẫu
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  oval: {
    width: '80%',
    height: 40,
    backgroundColor: '#93C5FD', // Xanh nhạt
    borderRadius: 40, // Bo tròn tuyệt đối để tạo hình oval
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: '70%',
    height: 14,
    backgroundColor: COLORS.primary, // Xanh đậm #1D4ED8
  },
  title: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: COLORS.text, 
    marginBottom: 4 
  },
  price: { 
    fontSize: 14, 
    color: COLORS.primary, 
    fontWeight: 'bold' 
  },
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
  addButtonText: { 
    color: COLORS.surface, 
    fontSize: 18, 
    fontWeight: 'bold', 
    lineHeight: 22 
  },
});

export default ProductCard;