import React, { useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {

    AlertDialog,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    FlatList,
    HStack,
    Progress,
    ScrollView,
    Spacer,
    Text,
    VStack,
    View,

} from 'native-base';
import { Image } from 'react-native';
import GradientBaground from '../../components/GradientBaground';
import Colors from '../../constants/Colors';
import CenterSpinner from '../../components/CenterSpinner';
import useGetRequest from '../../hooks/useGetRequest';
import { useAppState } from '../../context/AppContext';
import BookList from '../book/BookCarousel';
import { format } from 'date-fns';
import { useFocusEffect } from '@react-navigation/native';



const PerfilScreen = ({ navigation }) => {
    const { user, logout } = useAppState();
    const { data, loading,reload } = useGetRequest(`/historial-lecturas/${user?.usuario?.id_usuario}`);
    const {data:estadisticas, loading:loadingEstadistica, reload:reloadStadisticas}=useGetRequest(`/${user?.usuario?.id_usuario}/libros`);
    const { data: recomendacionData, loading: loadingRecomendacion, reload:reloadRecomendacion} = useGetRequest(`/recomendaciones15minutos/${user?.usuario?.id_usuario}`);
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => {

        setIsOpen(false);
        
    }

    const cerrarSesion =()=>{
        
        setIsOpen(false);
        logout();
    }
    const cancelRef = React.useRef(null);

    const seguirLeyendo = (libro) => {

        navigation.navigate('Lectura', { libro, reload});

        console.log('seguirleyendo', libro);
    };

    const onRefreshT = React.useCallback(() => {
        console.log('useCallback:');
        reload();
      }, []);

      useFocusEffect(
        React.useCallback(()=>{
            reload();
            reloadRecomendacion();
            reloadStadisticas();
        },[])

      );

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item?.id} onPress={
            () => seguirLeyendo(item?.libro)
        }>

            <Box borderWidth="1" borderColor="gray.500" pl={["0", "4"]} pr={["0", "5"]} py="2" height='48' width='100%' >
                <HStack space={[2, 3]} justifyContent="space-between"  >
                    <View pl='2' style={{ flexDirection: 'row', }}>
                        <Image source={{ uri: item?.libro?.imagene?.url }} style={{ width: 100, height: 170 }} />
                    </View>

                    <VStack pr='2'>
                        <View >
                            <Text color="white" fontSize="lg" numberOfLines={2}>
                                {item?.libro?.nombre?.slice(0, 17) + (item?.libro?.nombre?.length > 17 ? "..." : "")}
                            </Text>
                        </View>


                        <HStack justifyContent="space-between" width='70%' mt='2'>
                            <Box borderWidth='1' borderColor={Colors.yellow} borderRadius={23} height='6'>

                                <Text px='2'>
                                    {item?.libro?.categoria_libro?.categoria}
                                </Text>
                            </Box>

                        </HStack>

                        <Divider my='2' />
                        <HStack alignItems='center' space={[2, 0]}>
                            <Text>Progreso:</Text>
                            <Progress colorScheme="warning" value={Math.floor((item?.paginas_vistas / item?.libro?.num_paginas) * 100)} width='32' />
                        </HStack>
                        <HStack alignItems='center' space={[2, 0]} mt='2' mb='2'>
                            <Text>Ultima Lectura:</Text>
                            <Text>{format(new Date(item?.fecha_ultimaLectura), "d 'de' MMMM 'del' yyyy")}</Text>
                        </HStack>


                        <Spacer />
                    </VStack>

                </HStack>
            </Box>
        </TouchableOpacity>

    );


    return (
        <GradientBaground padding={true} >
            <ScrollView refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefreshT} />
          } marshowsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <VStack space={2} mt='24' alignItems={{
                        base: "center",
                        md: "flex-start"
                    }}>
                        
                        <Text color='white' fontSize='lg'>{user?.usuario?.persona?.nombre ?? ''} {user?.usuario?.persona?.apellido ?? ''}</Text>

                        
                    </VStack>
                    <Container maxWidth="100%" width="100%" marginTop='1'>
                        {user?.usuario?.stripeStatus != 'active' ? (
                            <Button w="100%" bg='#F0A500' color='#A5A5A5'
                                _pressed={{
                                    bg: '#C88200'
                                }}>Suscribirse</Button>
                        ) : (
                            <>
                                <HStack>
                                    <Text>Status Suscripcion: </Text>
                                    <Text color='green.300'>Activa</Text>
                                </HStack>

                            </>


                        )

                        }
                        <Divider my='3' />
                        
                        {user?.usuario?.stripeStatus =="active" && loadingEstadistica==false?(
                            <>
                            <HStack justifyContent='space-between' width='100%' px='16'>
                            <VStack alignItems='center'>
                                <Text>{estadisticas?.librosCompletados}</Text>
                                <Text color='amber.400'>Completos</Text>
                            </VStack>
                            <VStack alignItems='center'>
                                <Text>{estadisticas?.librosPendientes}</Text>
                                <Text color='amber.400'>Activos</Text>
                            </VStack>
                            <VStack alignItems='center'>
                                <Text>{estadisticas?.totalResenas}</Text>
                                <Text color='amber.400'>Resenas</Text>
                            </VStack>
                        </HStack>
                    <Divider my='3' color='gray.800' />
                            </>
                            
                        
                        ):(
                            <Divider my='3' color='gray.800' />
                        )

                        }
                        
                    </Container>
                    <View alignItems='flex-start'>
                        <Text fontSize='xl'>Lista de lectura</Text>
                        {loading ? <CenterSpinner /> :
                            <FlatList horizontal ItemSeparatorComponent={() => {
                                return (
                                    <View
                                        style={{
                                            height: "100%",
                                            width: 20,

                                        }}
                                    />
                                );
                            }}
                                data={data} renderItem={renderItem} keyExtractor={item => item.id} />}

                    </View>
                    {loadingRecomendacion && recomendacionData == null ? <CenterSpinner /> : <BookList key={0} categoria={"Recomendados para ti"} libros={recomendacionData} />}
                    <Box height='32'>

                    </Box>
                </View>
            </ScrollView>

            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.backButtom}>
                <Ionicons name="log-out-outline" size={34} color="white" />
            </TouchableOpacity>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Cerrar sesión</AlertDialog.Header>
                    <AlertDialog.Body>
                        Estas seguro de salir de la cuenta?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} >
                                Cancelar
                            </Button>
                            <Button bg='#F0A500' color='#A5A5A5'
                                _pressed={{
                                    bg: '#C88200'
                                }} onPress={cerrarSesion}>
                                cerrar sesión
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </GradientBaground>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, backButtom: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 20,
    }
});

export default PerfilScreen;
