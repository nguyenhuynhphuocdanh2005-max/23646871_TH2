import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { STUDENT, examStamp } from '@constants/student';
import { COLORS } from '@constants/theme';

const Watermark = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.border,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default Watermark;
