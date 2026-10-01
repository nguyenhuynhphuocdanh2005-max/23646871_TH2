import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@stores/authStore';
import { useCartStore } from '@stores/cartStore';
import { STUDENT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { formatCurrency } from '@components/ProductCard';

export default function MeScreen() {
  const logout = useAuthStore((state) => state.logout);
  const shipFee = useCartStore((state) => state.shipFee);
  const { status, distance, checkAndRequestPermission, openSettings } = useCampusLocation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.name}>{STUDENT.hoTen}</Text>
        <Text style={styles.mssv}>{STUDENT.mssv} · #{examStamp()}</Text>
      </View>

      <View style={styles.locationCard}>
        <Text style={[styles.statusText, status === 'granted' ? { color: COLORS.success } : { color: COLORS.error }]}>
          Quyền: {status}
        </Text>

        {distance !== null && (
          <Text style={styles.distanceText}>≈ {distance.toFixed(2)} km tới cổng KTX</Text>
        )}

        <Text style={styles.shipLabel}>Phí ship ước tính</Text>
        <Text style={styles.shipFee}>{shipFee > 0 ? formatCurrency(shipFee) : '---'}</Text>

        {status === 'blocked' ? (
          <TouchableOpacity style={styles.outlineButton} onPress={openSettings}>
            <Text style={styles.outlineButtonText}>Mở Cài đặt (blocked)</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.primaryButton} onPress={checkAndRequestPermission}>
            <Text style={styles.primaryButtonText}>Lấy vị trí ước tính ship</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.surface },
  infoCard: { alignItems: 'center', marginTop: 24, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  mssv: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },
  locationCard: { backgroundColor: COLORS.surface, margin: 16, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  statusText: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  distanceText: { fontSize: 14, color: COLORS.textLight, marginBottom: 12 },
  shipLabel: { fontSize: 14, color: COLORS.text },
  shipFee: { fontSize: 24, fontWeight: 'bold', color: COLORS.secondary, marginBottom: 20, marginTop: 4 },
  primaryButton: { backgroundColor: COLORS.primary, width: '100%', padding: 14, borderRadius: 8, alignItems: 'center' },
  primaryButtonText: { color: COLORS.surface, fontWeight: 'bold', fontSize: 16 },
  outlineButton: { backgroundColor: 'transparent', borderWidth: 1, borderColor: COLORS.primary, width: '100%', padding: 14, borderRadius: 8, alignItems: 'center' },
  outlineButtonText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16 },
  logoutButton: { backgroundColor: COLORS.error, marginHorizontal: 16, marginTop: 'auto', marginBottom: 24, padding: 16, borderRadius: 8, alignItems: 'center' },
  logoutButtonText: { color: COLORS.surface, fontWeight: 'bold', fontSize: 16 },
});
