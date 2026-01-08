import { View, Text, StyleSheet, Alert, Pressable, Linking, Platform } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function LocationScreen() {
  const [coords, setCoords] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') { Alert.alert('Permission denied'); return; }

    const location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Location Found! 📍',
        body: 'Tap to view on map.',
      },
      trigger: null,
    });
  };

  // Haritada Açma Fonksiyonu
  const openInMaps = () => {
    if (!coords) return;
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${coords.latitude},${coords.longitude}`;
    const label = 'My Location';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      
      {/* Koordinat Kartı */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="navigate-circle" size={40} color="#00cec9" />
          <Text style={styles.cardTitle}>GPS Coordinates</Text>
        </View>
        
        {coords ? (
          <View style={styles.coordsContainer}>
            <View style={styles.coordItem}>
              <Text style={styles.coordLabel}>LATITUDE</Text>
              <Text style={styles.coordValue}>{coords.latitude.toFixed(4)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.coordItem}>
              <Text style={styles.coordLabel}>LONGITUDE</Text>
              <Text style={styles.coordValue}>{coords.longitude.toFixed(4)}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.waitingText}>Waiting for location...</Text>
        )}
      </View>

      {/* Butonlar */}
      <Pressable style={styles.btn} onPress={getLocation}>
        <Ionicons name="locate" size={24} color="#fff" />
        <Text style={styles.btnText}>Get Location</Text>
      </Pressable>

      {coords && (
        <Pressable style={[styles.btn, styles.btnMap]} onPress={openInMaps}>
          <Ionicons name="map" size={24} color="#fff" />
          <Text style={styles.btnText}>View on Map</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  coordsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  coordItem: { alignItems: 'center', flex: 1 },
  coordLabel: { fontSize: 12, color: '#888', fontWeight: 'bold', marginBottom: 5 },
  coordValue: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  divider: { width: 1, height: '100%', backgroundColor: '#eee' },
  waitingText: { fontSize: 16, color: '#aaa', fontStyle: 'italic', padding: 20 },
  btn: {
    flexDirection: 'row',
    backgroundColor: '#333',
    width: '100%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10
  },
  btnMap: { backgroundColor: '#00cec9' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});