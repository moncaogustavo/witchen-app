import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { AnimatedButton } from '../../animations/Button';
import { FadeInView } from '../../animations/FadeInView';

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      if (Platform.OS === 'web') {
        alert('Por favor, preencha email e senha');
      } else {
        Alert.alert('Erro', 'Por favor, preencha email e senha');
      }
      return;
    }
    
    try {
      await login(email, senha);
      navigation.navigate('Home');
    } catch (error) {
      if (Platform.OS === 'web') {
        alert('Erro ao fazer login. Tente novamente.');
      } else {
        Alert.alert('Erro', 'Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <FadeInView style={styles.fadeContainer}>
          <Text style={styles.title}>Smart Restaurant</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <AnimatedButton style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </AnimatedButton>

          <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
            Criar Conta
          </Text>
        </FadeInView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e2baee'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  fadeContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#46075f', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15,
    fontSize: 16,
    minHeight: 50
  },
  button: { 
    backgroundColor: '#9b4cba', 
    padding: 15, 
    borderRadius: 10, 
    marginTop: 10 
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  },
  link: { 
    color: '#46075f', 
    textAlign: 'center', 
    marginTop: 20, 
    textDecorationLine: 'underline',
    fontSize: 14
  }
});

