import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useCartStore } from '@stores/cartStore';
import { formatCurrency } from '@components/ProductCard';
import { COLORS } from '@constants/theme';
import { ROOM_LABEL, PRICE_MULTIPLIER } from '@constants/student';

export default function CartScreen() {
  const { items, remove, changeQty, totalAmount, shipFee } = useCartStore();

  const totalItemVnd = Math.round(totalAmount() * (PRICE_MULTIPLIER || 1));
  const formatVndNumber = (val: number) => Math.round(val).toLocaleString('vi-VN') + ' đ';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>

              <View style={styles.qtyRow}>
                <TouchableOpacity onPress={() => changeQty(item.id, -1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>x{item.quantity}</Text>
                <TouchableOpacity onPress={() => changeQty(item.id, 1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.itemPrice}>
                  {formatCurrency(item.price * item.quantity)}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => remove(item.id)} style={styles.delBtn}>
              <Text style={styles.delBtnText}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Giỏ hàng đang trống.</Text>}
      />

      <View style={styles.footerCard}>
        <Text style={styles.roomText}>Giao đến {ROOM_LABEL}</Text>

        <Text style={styles.shipText}>
          {shipFee > 0 ? `Phí ship: ${formatVndNumber(shipFee)} (công thức B)` : 'Phí ship: (Đang chờ tính...)'}
        </Text>

        <View style={styles.divider} />
        <Text style={styles.totalText}>Tổng cộng: {formatVndNumber(totalItemVnd + shipFee)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.surface },
  itemRow: { flexDirection: 'row', backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  itemInfo: { flex: 1, marginRight: 12 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { backgroundColor: COLORS.border, width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
  qtyText: { marginHorizontal: 12, fontSize: 16, color: COLORS.textLight },
  itemPrice: { marginLeft: 'auto', fontSize: 16, color: COLORS.textLight },
  delBtn: { backgroundColor: COLORS.error, width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  delBtnText: { color: COLORS.surface, fontSize: 18 },
  emptyText: { textAlign: 'center', marginTop: 40, color: COLORS.textLight, fontSize: 16 },
  footerCard: { backgroundColor: COLORS.surface, margin: 16, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: COLORS.secondary },
  roomText: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  shipText: { fontSize: 16, color: COLORS.secondary, marginTop: 4, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
});
