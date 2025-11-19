import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { FadeInView } from '../../animations/FadeInView';
import { AnimatedButton } from '../../animations/Button';


export default function Signup({ navigation }) {
const { signup } = useContext(AuthContext);
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');


return (
<FadeInView style={styles.container}>
<Text style={styles.title}>Criar Conta</Text>


<TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
<TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />


<AnimatedButton style={styles.button} onPress={() => signup({ email, senha })}>
<Text style={styles.buttonText}>Registrar</Text>
</AnimatedButton>


<Text style={styles.link} onPress={() => navigation.navigate('Login')}>
Já tenho conta
</Text>
</FadeInView>
);
}


const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e2baee' },
title: { fontSize: 28, fontWeight: 'bold', color: '#46075f', marginBottom: 20, textAlign: 'center' },
input: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8 },
button: { backgroundColor: '#5e2b69', padding: 12, borderRadius: 10, marginTop: 10 },
buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
link: { marginTop: 18, textAlign: 'center', color: '#46075f', fontWeight: 'bold' }
});