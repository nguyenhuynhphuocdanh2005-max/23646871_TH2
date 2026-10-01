import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthStore } from '@stores/authStore';
import { STUDENT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    // Yêu cầu: lưu token giả ktxgo-{mssv}-{stamp} rồi vào Main Tabs
    const fakeToken = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
    login(fakeToken);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KTXGO</Text>
      <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Phone — ${STUDENT.mssv}`}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Vào cửa hàng</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Auth Stack · chưa có token</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, justifyContent: 'center' },
  title: { fontSize: 40, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
  subtitle: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', marginBottom: 40 },
  inputContainer: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, backgroundColor: COLORS.surface, marginBottom: 20 },
  input: { padding: 16, fontSize: 16, color: COLORS.text },
  button: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: COLORS.surface, fontSize: 16, fontWeight: 'bold' },
  footerText: { textAlign: 'center', marginTop: 20, color: COLORS.textLight, fontSize: 12 },
});
