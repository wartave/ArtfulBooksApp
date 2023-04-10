import React from 'react';
import { StyleSheet,SafeAreaView } from 'react-native';
import { Container, Box, Text, Button, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';
import CardSuscripcion from './CardSuscripcion';



const Suscripciones = () => {
  
  const navigation = useNavigation();

  const handleSubscription = () => {
  const user = {
    email: 'usuario@ejemplo.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    password: 'contraseña123',
  };

  navigation.navigate('SubscriptionForm', { user });

  const handleIniciarSesionPress = () => {
  };
};

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <LinearGradient colors={['#1D2331', '#000000']} style={styles.container}>
      <View >
        <Box mt={10} style={{alignItems:"center"}}>
        <Text fontWeight='bold' fontSize='2xl' mb='5' color='white' >Bienvenido a LibroArte</Text>
          <Text mb='5' color='white'>Por favor elige el tipo de suscripción que más se adapte a ti</Text>
          <CardSuscripcion
            tipo='Mensual'
            detalles='Acceso ilimitado a todos los libros por un mes'
            onPress={handleSubscription}
            precio='9.99'
          />
          <CardSuscripcion
            tipo='Anual'
            detalles='Acceso ilimitado a todos los libros por un año'
            onPress={() => console.log('Suscribirse anualmente')}
            precio='99.9'
          />
        </Box>
      </View>
      <View style={styles.footer}>
          <Button style={styles.button} variant="solid" bg='#2C3E50' color='white' size="lg">
            Iniciar sesión
          </Button>
        </View>
      </LinearGradient>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    borderRadius: 0,
    marginTop: 10,
    marginBottom:10
  }
});

export default Suscripciones;
