import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { AnimatedButton } from '../../animations/Button';
import { FadeInView } from '../../animations/FadeInView';
import { AuthContext } from '../../contexts/AuthContext';

export default function Signup({ navigation }) {
  const { signup, login } = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignup = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      if (Platform.OS === 'web') {
        alert('Por favor, preencha todos os campos');
      } else {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
      }
      return;
    }

    if (senha.length < 6) {
      if (Platform.OS === 'web') {
        alert('A senha deve ter pelo menos 6 caracteres');
      } else {
        Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      }
      return;
    }

    try {
      const dados = { nome, email, senha };
      await signup(dados);
      
      // Faz login automaticamente após cadastro
      await login(email, senha);
      navigation.navigate('Home');
    } catch (error) {
      if (Platform.OS === 'web') {
        alert('Erro ao cadastrar. Tente novamente.');
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.');
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
          <Text style={styles.title}>Criar Conta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />
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

          <AnimatedButton style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </AnimatedButton>

          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Já tem uma conta? Entrar
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

