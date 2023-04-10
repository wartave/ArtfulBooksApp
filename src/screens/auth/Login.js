import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Content, Form, Item, Input, Label, Text, Button, CheckBox, FormControl, Stack, Container, Checkbox, Divider, Image, Center } from 'native-base';
import GradientBaground from '../../components/GradientBaground';
import { useNavigation } from '@react-navigation/native';
import HttpClient from '../../utils/HttpClient';
import { useAppState } from '../../context/AppContext';


const LoginScreen = ({navigation, route}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  const [isBussy, setIsBussy] = useState(false);
  const {login} = useAppState();

    useEffect(() => {
        if (route.params?.email) {
            setEmail(route.params?.email);
        }
      }, [route.params?.email]);


      const handleLogin = async () => {
        setIsBussy(true);
        try {
          const res = await HttpClient.post('/usuario-login', {email, password});
          console.log("data:",res.data);
          setIsBussy(false);
          login(res.data);
        } catch (error) {
          alert(error);
          console.log(error);
          setIsBussy(false);
        }
      };
    const handleRegister=()=>{
    navigation.navigate('Register');
    }

    return (
        <GradientBaground>
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


                <Text fontSize='lg' marginTop='12' my='4'>Iniciar Sesion</Text>
                <FormControl >
                    <Stack >
                        <Stack>
                            <Input borderRadius='0' variant="filled" p='3' placeholderTextColor='#7F7F7F' size='lg' placeholder="Correo electrónico" autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={(text) => setEmail(text)}
                                borderColor='#909497'
                                value={email} border backgroundColor="#1D2331" _focus={{
                                    borderColor: '#F0A500'
                                }} />
                        </Stack>
                        <Stack>
                            <Input borderRadius='0' variant="filled" p='3' placeholderTextColor='#7F7F7F' size='lg' placeholder="Contrasena" secureTextEntry={!showPassword}
                                onChangeText={(text) => setPassword(text)}
                                value={password} backgroundColor="#1D2331" borderColor='#909497' _focus={{
                                    borderColor: '#D35400'
                                }} />
                        </Stack>
                    </Stack>

                    <View style={styles.checkboxContainer}>
                        <Checkbox isChecked={showPassword} onChange={() => setShowPassword(!showPassword)} >

                            <Text>Mostrar contraseña</Text>
                        </Checkbox>
                    </View>
                    <Button block borderRadius='0' isLoading={isBussy} disabled={isBussy} marginTop='10' p='3.5' bg='#F0A500' color='#A5A5A5' onPress={handleLogin}
                        _pressed={{
                            bg: '#C88200'
                        }}>
                        <Text>Iniciar sesión</Text>
                    </Button>
                </FormControl>

                <Divider my="4" />
                <View maxWidth="100%" width="100%" alignItems='center' >
                    <Text fontSize='md'>¿Eres nuevo en Artful Books?</Text>

                </View>
                <Button marginTop='4' width="100%" p='3.5' borderColor='white' bg='#1D2331' color='#A5A5A5' borderRadius="0"
                    _pressed={{
                        bg: '#000000',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                    }} onPress={handleRegister}>
                    <Text>Crear cuenta</Text>
                </Button>
            </Container>
        </GradientBaground>
    );
};


const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    form: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        backgroundColor: '#0097D8',
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    signupText: {
        color: 'white',
        marginRight: 10,
    },
    signupButton: {
        borderColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});


export default LoginScreen;