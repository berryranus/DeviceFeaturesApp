import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button 
        title="Open Camera & Gallery" 
        onPress={() => navigation.navigate('Camera')} 
      />
      <View style={{ height: 20 }} />
      <Button 
        title="Open Location & Maps" 
        onPress={() => navigation.navigate('Location')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});