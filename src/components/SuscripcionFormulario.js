import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StripeProvider, CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { Container, Stack, FormControl, Input, Button } from 'native-base';
import GradientBaground from './GradientBaground';
import createPaymentIntent from '../utils/CreatePaymentIntent';





const SubscriptionScreen = ({ navigation }) => {
  const { createPaymentMethod, initPaymentSheet, presentPaymentSheet } = useStripe();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [cardDetails, setCardDetails] = useState(null);


  const [processing, setProcessing] = useState(false);
  const { confirmPayment } = useConfirmPayment();

  const [clientSecret, setClientSecret] = useState('');

  const [token, setToken] = useState(null);

  const handleCardFieldChange = (event) => {

    if (event.complete) {
      setToken(event.tokenId);
      console.log(`token ${JSON.stringify(token)}`)
    }
  };

  const handleSubmit = async () => {
    
    setProcessing(true);
    console.log("handleSubmit");
    const response = await fetch('http://192.168.0.105:3001/crear-suscripcion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuarioId:2, planId:'prod_NkG3m7nIzfNrtA', token })
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
  };





  return (
    <GradientBaground >
      <StripeProvider publishableKey="pk_test_51Mi4X9HlcUhpnikzIBqwVGix8UvcgMC9PGXlJT2ogW4TxMttn5WXY0rN21Pvh2BFF9sJlbUquxuqGkQLXTAv5qB7007WHN1KD7">
        <View maxWidth="100%" width="100%" style={{ marginTop: 36 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title} fontWeight='bold' fontSize='2xl' mb='5' color='white'>Suscripción</Text>
          <Container maxWidth="100%" width="100%">
            <View maxWidth="100%" width="100%">
              <FormControl width="100%" height='100%'>
                <Stack space={5}>
                  <Stack>
                    <FormControl.Label>/nombre</FormControl.Label>
                    <Input variant="underlined" p={2} placeholder="Nombre" onChangeText={setFirstName} value={firstName} />
                  </Stack>
                  <Stack>
                    <FormControl.Label>Apellido</FormControl.Label>
                    <Input variant="underlined" p={2} placeholder="Apellido" onChangeText={setLastName} value={lastName} />
                  </Stack>
                  <Stack>
                    <FormControl.Label>Correo electrónico</FormControl.Label>
                    <Input variant="underlined" p={2} placeholder="Correo electrónico" onChangeText={setEmail} value={email} />
                  </Stack>

                  <Stack>
                    <FormControl.Label>Contraseña</FormControl.Label>
                    <Input variant="underlined" p={2} placeholder="Contraseña" onChangeText={setPassword} value={password} />
                  </Stack>
                  <Stack>
                    <CardField
                      onCardChange={cardDetails=>{
                        
                        setToken(cardDetails);
                      }}
                      postalCodeEnabled={false}
                      style={styles.cardField}
                      placeholders={{ number: '4343 4343 4343 4343' }}
                    />
                  </Stack>
                </Stack>

                <Button isLoading={processing} marginTop='48' bg='#F0A500' color='#A5A5A5' borderRadius="0" block={true} onPress={handleSubmit} disabled={false}>
                  <Text style={styles.buttonText}>Suscribirse</Text>
                </Button>
              </FormControl>
            </View>
          </Container>
        </View>

      </StripeProvider>
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

export default SubscriptionScreen;











