import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StripeProvider, CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { Container, Stack, FormControl, Input, Button, Text, Image, Divider, Icon } from 'native-base';

import GradientBaground from '../../components/GradientBaground';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import HttpClient from '../../utils/HttpClient';




const RegisterScreen = ({ navigation }) => {
  const { createPaymentMethod, initPaymentSheet, presentPaymentSheet } = useStripe();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    fecha_nacimiento: ''
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateText, setdateText] = useState('Fecha de nacimiento');


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    const formattedDate = date.toISOString().slice(0, 10);
    console.warn("A date has been picked: ", formattedDate);

    setForm({
      ...form,
      fecha_nacimiento: formattedDate,
    });
    setdateText(formattedDate);
    hideDatePicker();
  };


  const [processing, setProcessing] = useState(false);
  const { confirmPayment } = useConfirmPayment();

  const [clientSecret, setClientSecret] = useState('');

  const [token, setToken] = useState(null);


  const handleSubmit = async () => {
    try {
      setProcessing(true);
      const res = await HttpClient.post('/crear-usuario', form);
      if (res.data) {
        setProcessing(false);
        Alert.alert('Registro completado exitosamente, puedes iniciar sesión ahora.!');
        navigation.navigate('Login', { email: form.email });
      }
    } catch (error) {
      setProcessing(false);
      console.log(error);
      Alert.alert(`registro erroneo ${error}`);
    }
  };

  const handleChange = (value, name) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  /*const handleSubmit = async () => {

    setProcessing(true);

    const response = await fetch('http://192.168.0.110:3001/crear-suscripcion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuarioId: 1, planId: 'price_1Mj3T9HlcUhpnikzURHAOHzm', token })
    });

    if (response.ok) {
      Alert.alert('Suscripcion realizada');
      // La suscripción se creó exitosamente
      // Puedes hacer algo aquí, como mostrar un mensaje al usuario
    } else {
      // Hubo un error al crear la suscripción
      // Puedes mostrar un mensaje de error al usuario
      console.log(JSON.stringify(response));
      Alert.alert(`Suscripcion erronea${response}`);
    }

    setProcessing(false);
  };*/





  return (
    <GradientBaground >
      <Container maxWidth="100%" width="100%" marginTop='10'>
        <View maxWidth="100%" width="100%" alignItems='center' >
          <Image
            source={require('../../assets/logoB.png')}
            alt='logo'
            resizeMode="stretch"
            alignSelf="center"
            width='64'
            height='24'
            justifyContent="center"
          />

        </View>
        <View style={{ position: 'absolute', top: 10, left: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text fontWeight='bold' fontSize='xl' marginTop='12' my='4'>Crear cuenta</Text>

        <FormControl >
          <Stack space='2'>
            <Stack>
              <Input borderRadius='0'
                variant="filled" p='3'
                placeholderTextColor='#7F7F7F'
                size='lg' placeholder="Nombre"
                autoCapitalize="none"
                borderColor='#909497'
                backgroundColor="#1D2331" _focus={{
                  borderColor: '#F0A500'
                }}

                onChangeText={e => handleChange(e, 'firstName')} value={form.firstName} />
            </Stack>
            <Stack>
              <Input borderRadius='0'
                variant="filled" p='3'
                placeholderTextColor='#7F7F7F'
                size='lg' placeholder="Apellido" autoCapitalize="none"
                borderColor='#909497'
                backgroundColor="#1D2331"
                _focus={{
                  borderColor: '#F0A500'
                }} onChangeText={e => handleChange(e, 'lastName')} value={form.lastName} />
            </Stack>
            <Stack>
              <Input borderRadius='0'
                variant="filled" p='3'
                placeholderTextColor='#7F7F7F'
                size='lg' placeholder="Correo electrónico"
                autoCapitalize="none"
                borderColor='#909497'
                backgroundColor="#1D2331"
                _focus={{
                  borderColor: '#F0A500'
                }} onChangeText={e => handleChange(e, 'email')} value={form.email} />
            </Stack>
            <Stack >

              <TouchableOpacity style={{
                width: '100%',
                height: 50,
                borderColor: '#909497',
                borderWidth: 1,
                backgroundColor: "#1D2331",
                justifyContent: 'center'
              }} onPress={showDatePicker}>
                <Text ml='3' color='#7F7F7F' fontSize='md'>{dateText}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                
              />
            </Stack>


            <Stack>
              <Input borderRadius='0'
                variant="filled" p='3'
                placeholderTextColor='#7F7F7F'
                size='lg' placeholder="Contraseña" autoCapitalize="none"
                borderColor='#909497'
                backgroundColor="#1D2331"
                _focus={{
                  borderColor: '#F0A500'
                }}
                onChangeText={e => handleChange(e, 'password')} value={form.password} />
            </Stack>

          </Stack>


          <Button isLoading={processing} block borderRadius='0' marginTop='10' p='3.5' bg='#F0A500' color='#A5A5A5'
            onPress={handleSubmit}
            _pressed={{
              bg: '#C88200'
            }}>
            <Text>Crear cuenta</Text>
          </Button>
        </FormControl>

        <Divider my="4" />
        <View maxWidth="100%" width="100%" alignItems='center' >
          <Text fontSize='md'>¿Tienes cuenta en Artful Books?</Text>

        </View>
        <Button marginTop='4' width="100%" p='3.5' borderColor='white' bg='#1D2331' color='#A5A5A5' borderRadius="0"
          _pressed={{
            bg: '#000000',
            borderColor: '#ffffff',
            borderWidth: 1,
          }}>
          <Text>Iniciar sesion</Text>
        </Button>
      </Container>
    </GradientBaground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cardField: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;











