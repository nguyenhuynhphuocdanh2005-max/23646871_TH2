import { useState } from 'react';
import { PermissionsAndroid, Platform, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { BASE_SHIP_FEE, VARIANT } from '@constants/student';
import { useCartStore } from '@stores/cartStore';

export type LocationStatus = 'idle' | 'granted' | 'denied' | 'blocked';

// Tọa độ giả định cổng KTX (Ví dụ: Trường ĐH Công Nghiệp TP.HCM)
const CAMPUS_COORDS = { lat: 10.822158, lon: 106.686824 };

// Thuật toán Haversine tính khoảng cách (km)
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useCampusLocation() {
  const [status, setStatus] = useState<LocationStatus>('idle');
  const [distance, setDistance] = useState<number | null>(null);
  const setShipFee = useCartStore((state) => state.setShipFee);

  const checkAndRequestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setStatus('granted');
          getLocation();
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          setStatus('blocked');
        } else {
          setStatus('denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // iOS
      Geolocation.requestAuthorization();
      setStatus('granted');
      getLocation();
    }
  };

  const calculateAndSetFee = (lat: number, lon: number) => {
    const km = getDistanceFromLatLonInKm(lat, lon, CAMPUS_COORDS.lat, CAMPUS_COORDS.lon);
    setDistance(km);

    // Áp dụng đúng cấu hình tính phí của biến thể (Công thức B)
    let fee = 0;
    if ((VARIANT.shipFormula as string) === 'A') {
      fee = BASE_SHIP_FEE + Math.round(km * 2000);
    } else {
      fee = BASE_SHIP_FEE + Math.round(km * 1500) + 2000;
    }
    setShipFee(fee);
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        calculateAndSetFee(latitude, longitude);
      },
      (error) => {
        console.log('Location error/timeout, using fallback coords:', error);
        // Mock tọa độ gần KTX theo quy định phòng thi
        calculateAndSetFee(10.835000, 106.695000);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };

  const openSettings = () => {
    Linking.openSettings();
  };

  return { status, distance, checkAndRequestPermission, openSettings };
}
