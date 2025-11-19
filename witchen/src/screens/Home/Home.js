import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FadeInView } from '../../animations/FadeInView';
import { AnimatedButton } from '../../animations/Button';


export default function Home({ navigation }) {
return (
<FadeInView style={styles.container}>
<Text style={styles.title}>Bem-vindo!</Text>


<AnimatedButton style={styles.button} onPress={() => navigation.navigate('Mesas')}>
<Text style={styles.buttonText}>Status das Mesas</Text>
</AnimatedButton>


<AnimatedButton style={styles.button} onPress={() => navigation.navigate('Pedidos')}>
<Text style={styles.buttonText}>Pedidos</Text>
</AnimatedButton>


<AnimatedButton style={styles.button} onPress={() => navigation.navigate('Metrics')}>
<Text style={styles.buttonText}>Métricas</Text>
</AnimatedButton>


<AnimatedButton style={styles.buttonSecondary} onPress={() => navigation.navigate('About')}>
<Text style={styles.buttonText}>Sobre o App</Text>
</AnimatedButton>
</FadeInView>
);
}


const styles = StyleSheet.create({
container: { flex: 1, padding: 20, backgroundColor: '#e2baee', justifyContent: 'center' },
title: { fontSize: 28, fontWeight: 'bold', color: '#46075f', marginBottom: 30, textAlign: 'center' },
button: { backgroundColor: '#9b4cba', padding: 15, borderRadius: 10, marginBottom: 12 },
buttonSecondary: { backgroundColor: '#5e2b69', padding: 15, borderRadius: 10, marginTop: 20 },
buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});