import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Container, Box, Text, Button, View, Modal, FormControl, Input, Stack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';
import GradientBaground from '../../components/GradientBaground';
import CardSuscripcion from '../../components/CardSuscripcion';
import useGetRequest from '../../hooks/useGetRequest';
import CenterSpinner from '../../components/CenterSpinner';
import stripe,{ CardField, StripeProvider, useStripe,useConfirmPayment } from '@stripe/stripe-react-native';
import { useAppState } from '../../context/AppContext';
import HttpClient from '../../utils/HttpClient';



const PlanScreen = () => {
    const {confirmPayment,loading:loadingConfirm}=useConfirmPayment();
    const { createPaymentMethod } = useStripe();
    const { user, saveData } = useAppState();
    const { data: planes, loading } = useGetRequest(`/planes`);
    const [modalVisible, setModalVisible] = useState(false);

    const [token, setToken] = useState(null);
    const [formData, setData] = React.useState({});
    const [planData, setPlanData] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const [processing, setProcessing] = useState(false);
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

    const validate = () => {
        if (formData.card === undefined) {
            setErrors({
                ...errors,
                card: 'La tarjeta es requerida'
            });
            return false;
        } else if (formData.card.complete) { // Verifica si el error ya existe
            setErrors({
                ...errors,
                card: undefined // Elimina el error sobrescribiéndolo con "undefined"
            });
            return true;
        }

        return true;
    };

    const submit = async () => {
        try{
            if (validate()) {
                if (formData.card.complete) {
                    setProcessing(true);


                    const paymentMethod = await createPaymentMethod({
                        paymentMethodType: 'Card',
                    });
                   
                    console.log("paymentMethod:", paymentMethod);
                    const id_usuario = user?.usuario?.id_usuario;
    
                    const res = await HttpClient.post(`/crear-suscripcion/${id_usuario}`, { paymentMethod, id_usuario, id_plan: planData });
                    if (res.data) {
                        setProcessing(false);
                        saveData(res.data);
                        setModalVisible(false);
                        Alert.alert('Suscripcion realizada con exito!');
                        navigation.navigate('Home');
                    }
    
    
                } else {
    
                }
            }
        }catch(e){
            console.error('error:',e);
        }


        //setModalVisible(false);
    }
    const susModal = (id_planStripe) => {
        console.log('id_planStripe:', id_planStripe);
        setPlanData(id_planStripe);
        setModalVisible(true);

    }

    return (
        <GradientBaground padding={true} >
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Realizar pago</Modal.Header>
                    <Modal.Body>
                        <FormControl mt="3" isRequired isInvalid={'card' in errors}>
                            <Stack>

                                <FormControl.Label>Datos de tarjeta</FormControl.Label>
                                <CardField 
                                    onCardChange={cardDetails => {
                                        console.log('cardDetails:',cardDetails);
                                        setData({
                                            ...formData,
                                            card: cardDetails
                                        })

                                    }}
                                    postalCodeEnabled={false}
                                    style={styles.cardField}
                                    placeholders={{ number: '4343 4343 4343 4343' }}
                                />
                                {'card' in errors ? <FormControl.ErrorMessage>{errors.card}</FormControl.ErrorMessage> : <FormControl.HelperText></FormControl.HelperText>}
                            </Stack>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={submit} isLoading={processing}>
                            Procesar
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <View mt='6'>
                <Box mt={10} style={{ alignItems: "center" }}>
                    <Text mb='5' color='white' fontSize='lg'>Por favor elige el tipo de suscripción que más se adapte a ti</Text>
                    {loading ? (<CenterSpinner />) : (
                        planes.map((plan, index) => {
                            return (
                                <CardSuscripcion key={index}
                                    tipo={plan.nombre}
                                    detalles={plan.descripcion}
                                    onPress={() => { susModal(plan.id_plan) }}
                                    precio={plan.precio}
                                />
                            )
                        })
                    )}

                </Box>
            </View>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtom}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>



        </GradientBaground>


    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        opacity: 0,
        top: 0,
        left: 0,
        right: 0
    }, backButtom: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 20,
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
});



export default PlanScreen;
