import { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Galeri İzni ve Resim Seçme
  const pickImage = async () => {
    // İzin iste
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera roll permissions are needed!');
      return;
    }

    // Galeriyi aç
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />

      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      ) : (
        <Text style={styles.text}>No image selected yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 },
  image: { width: 300, height: 200, borderRadius: 10, marginTop: 20 },
  text: { marginTop: 20, color: '#888' }
});