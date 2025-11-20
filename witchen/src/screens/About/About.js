import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FadeInView } from '../../animations/FadeInView';

export default function About({ navigation }) {
  return (
    <FadeInView style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.text}>
        Smart Restaurant - Sistema de gerenciamento para restaurantes
      </Text>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e2baee', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#46075f', marginBottom: 30, textAlign: 'center' },
  text: { fontSize: 16, color: '#46075f', textAlign: 'center' }
});
