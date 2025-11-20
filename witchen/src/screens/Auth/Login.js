import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient
        colors={['#2D1B3D', '#4A2C5A', '#6B3D7A']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <FadeInView style={styles.fadeContainer}>
            {/* Logo/Ícone */}
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../../assets/logo.png')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            {/* Título */}
            <Text style={styles.title}>Witchen</Text>

            {/* Campos de entrada */}
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

            {/* Botão Entrar */}
            <AnimatedButton style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </AnimatedButton>

            {/* Link Criar Conta */}
            <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
              Criar Conta
            </Text>
          </FadeInView>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
    minHeight: '100%'
  },
  fadeContainer: {
    width: '100%',
    alignItems: 'center'
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    width: 120,
    height: 120
    // Se quiser que a imagem fique branca, adicione: tintColor: '#FFFFFF',
  },
  title: { 
    fontSize: 42, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    marginBottom: 50, 
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 14, 
    marginBottom: 22,
    fontSize: 18,
    height: 64,
    width: '98%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  button: { 
    backgroundColor: '#4A2C5A', 
    paddingVertical: 20,
    paddingHorizontal: 48,
    borderRadius: 14, 
    marginTop: 18,
    minHeight: 64,
    width: '98%',
    maxWidth: 600,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },
  buttonText: { 
    color: '#FFFFFF', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 19,
    letterSpacing: 0.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
    flexShrink: 0
  },
  link: { 
    color: '#B19CD9', 
    textAlign: 'center', 
    marginTop: 30, 
    fontSize: 16,
    fontWeight: '500'
  }
});

