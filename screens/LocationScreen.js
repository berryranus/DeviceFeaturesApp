import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';

// Bildirimlerin ön planda görünmesi için ayar
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
    // Konum İzni İste
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission required', 'Location permission is needed.');
      return;
    }

    // Konumu Al
    const location = await Location.getCurrentPositionAsync({});
    setCoords(location.coords);

    // Titreşim Ver (Başarılı)
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Bildirim Gönder
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Location Retrieved 📍',
        body: `Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`,
      },
      trigger: null, // Hemen gönder
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Get Current Location" onPress={getLocation} />

      {coords && (
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Latitude: {coords.latitude}</Text>
          <Text style={styles.text}>Longitude: {coords.longitude}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20, padding: 20, justifyContent: 'center', alignItems: 'center' },
  infoContainer: { marginTop: 20, padding: 20, backgroundColor: '#f0f0f0', borderRadius: 10 },
  text: { fontSize: 16, marginBottom: 5 }
});