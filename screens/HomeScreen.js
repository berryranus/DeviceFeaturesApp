import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Device Features</Text>

      {/* Kamera Butonu */}
      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('Camera')}
      >
        <Ionicons name="camera" size={50} color="#fff" />
        <Text style={styles.cardText}>Camera & Gallery</Text>
      </Pressable>

      {/* Konum Butonu */}
      <Pressable 
        style={({ pressed }) => [styles.card, styles.cardLocation, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('Location')}
      >
        <Ionicons name="location" size={50} color="#fff" />
        <Text style={styles.cardText}>Location & Maps</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f5f5f5',
    gap: 20
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  card: {
    width: 250,
    height: 150,
    backgroundColor: '#6c5ce7', // Mor renk
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android gölge
    shadowColor: '#000', // iOS gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardLocation: {
    backgroundColor: '#00cec9', // Turkuaz renk
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }]
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  }
});