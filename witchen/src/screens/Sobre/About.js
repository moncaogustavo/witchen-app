import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FadeInView } from '../../animations/FadeInView';
import { AnimatedButton } from '../../animations/Button';

export default function About({ navigation }) {
  const wizards = [
    {
      id: 1,
      name: 'Eric Yoshida',
      rm: '558763',
      description: 'Desenvolvedor Fullstack e Mago dos Códigos',
      Image: require('../../../assets/dev/eric.jpg')
    },
    {
      id: 2,
      name: 'Gustavo Monção',
      rm: '557515',
      description: 'Desenvolvedor Fullstack e Mago dos Códigos',
      Image: require('../../../assets/dev/gustavo-moncao.jpg')
    },
    {
      id: 3,
      name: 'Gustavo Matias',
      rm: '555010',
      description: 'Desenvolvedor Fullstack e Mago dos Códigos',
      Image: require('../../../assets/dev/gustavo-matias.jpg')
    }
  ];

  return (
    <LinearGradient
      colors={['#2D1B3D', '#4A2C5A', '#6B3D7A', '#8B5FA8']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView style={styles.fadeContainer}>
          {/* logo centro */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* título */}
          <Text style={styles.title}>Conheça os Magos</Text>

          {/* cards */}
          <View style={styles.cardsContainer}>
            {wizards.map((wizard) => (
              <View key={wizard.id} style={styles.wizardCard}>
                <View style={styles.iconCircle}>
                  <Image source={wizard.Image} style={styles.devPhoto} />
                </View>
                <Text style={styles.wizardName}>{wizard.name}</Text>
                <Text style={styles.wizardRM}>RM: {wizard.rm}</Text>
                <Text style={styles.wizardDescription}>{wizard.description}</Text>
              </View>
            ))}
          </View>

          {/* botoes */}
          <View style={styles.buttonsContainer}>
            <AnimatedButton 
              style={styles.backButton} 
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>Voltar para o Caldeirão</Text>
            </AnimatedButton>
          </View>
        </FadeInView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    minHeight: '100%'
  },
  fadeContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    width: 120,
    height: 120
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
    flexWrap: 'wrap'
  },
  wizardCard: {
    backgroundColor: '#F5E6D3',
    borderRadius: 20,
    padding: 20,
    width: Platform.OS === 'web' ? '28%' : '80%',
    minWidth: 170,
    maxWidth: 260,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#E8D5B7',
    marginBottom: 20,
    marginHorizontal: 10,
    overflow: 'hidden'
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4A2C5A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  wizardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D1B3D',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: 0.5
  },
  wizardRM: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A2C5A',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1
  },
  wizardDescription: {
    fontSize: 13,
    color: '#4A2C5A',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500'
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20
  },
  backButton: {
    backgroundColor: '#4A2C5A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5
  },
  devPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    resiceMode: 'cover'
  }
});
