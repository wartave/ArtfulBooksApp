import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Divider, Avatar, View, Container, ScrollView, HStack, Flex, Modal, FormControl, Input, TextArea, Collapse, Alert, VStack, IconButton, CloseIcon, Box } from 'native-base';

import * as Animatable from 'react-native-animatable';

import GradientBaground from '../../components/GradientBaground';
import { Ionicons } from '@expo/vector-icons';
import Paddings from '../../constants/Paddings';
import useGetRequest from '../../hooks/useGetRequest';
import FullSpinner from '../../components/FullSpinner';
import BookList from './BookCarousel';
import ReviewsList from './ReviewsList';
import CenterSpinner from '../../components/CenterSpinner';
import HttpClient from '../../utils/HttpClient';
import { useAppState } from '../../context/AppContext';



const BookDetailsScreen = ({ navigation, route }) => {
  const { libro } = route.params;
  const { user } = useAppState();

  const title = 'Harry potter la piedra filosofal';
  const barRef = useRef(null);
  //console.log('/libros/:', libro.id_libro);
  const { data: libroFull, loading } = useGetRequest(`/libros-recomendacion/${libro.id_libro}`);

  const { data: tieneLibro, loading: loadingTieneLibro, reload } = useGetRequest(`/historial-lecturas/usuario/${user?.usuario?.id_usuario}/libro/${libro.id_libro}`);

  const { data: resenasData, loading: loadingResenasData, reload: reloadReviews } = useGetRequest(`/reviews/${libro.id_libro}`);

  //modal resenas
  const [showModalResena, setShowModalResena] = useState(false);

  //asignar resenas
  const [resenas, setResenas] = useState(null);
  const [textResena, setTextResena] = useState('');
  const [loadingResenas, setLoadingResenas] = useState(false);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loadingResenasData == false) {
      setLoadingResenas(false);
      setResenas(resenasData);
    } else {
      setLoadingResenas(true);
    }
  }, [loadingResenasData, resenasData]);


  const handleAddResena = async () => {
    // Agregar la nueva reseña al estado local
    setShowModalResena(false);
    //console.log(,user?.usuario?.id_usuario);
    const resena = textResena;
    const idUsuario = user?.usuario?.id_usuario;
    const res = await HttpClient.post(`/reviews/${libro.id_libro}`, { resena, fecha: new Date(), idUsuario });
    console.log('handleAddResena:', res.data);
    setResenas([res.data, ...resenas]);
  };


  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const maxOffsetY = contentHeight - visibleHeight;
    // console.log("offsetY:", offsetY);
    // console.log("maxOffsetY:", maxOffsetY);
    //console.log("(offsetY - 100) / 100:", (offsetY - 100) / 100);
    //  console.log("(maxOffsetY - 100) / 100:", (maxOffsetY - 100) / 100);
    //const opacity = offsetY <= 100 ? 0 : Math.min((offsetY - 100) / 100, (maxOffsetY - 100) / 100);
    const opacity = offsetY < 0 ? 0 : offsetY / maxOffsetY;
    barRef.current.setNativeProps({ style: { opacity: opacity } });
  }

  const goToLectura = () => {
    // navigation.navigate('DetalleLibros',{libro}); opcion funcional pero sin historial
    if (user?.usuario?.stripeStatus == 'desactivated') {
      setShow(true);
    } else {
      navigation.push('Lectura', { libro, reload });
    }
  }

  const onRefreshT = React.useCallback(() => {
    console.log('useCallback:');
    reload();
    reloadReviews();
  }, []);

  return (
    <GradientBaground padding={false} >


      {loading ? (<FullSpinner />) : (<>
        <View maxWidth="100%" width="100%" >
          <ScrollView refreshControl={
            <RefreshControl refreshing={loadingTieneLibro} onRefresh={onRefreshT} />
          } marshowsVerticalScrollIndicator={false} onScroll={handleScroll}>
            <ImageBackground
              source={{ uri: libro?.imagene?.url }}
              style={{ flex: 1, height: 240, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}
              blurRadius={5}
              resizeMode='cover'
            >
              <View style={{ flexDirection: 'row', }} marginTop='32'>
                <Image source={{ uri: libro.imagene.url }} style={{ width: 140, height: 200 }} />
              </View>
            </ImageBackground>
            <View paddingLeft={Paddings.main} paddingRight={Paddings.main}>
              <View marginTop='16' alignItems='center'>
                <Text fontSize='xl' fontWeight='semibold'>{libro.nombre}</Text>
                <View alignItems='center' style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                  <Avatar source={{ uri: loading ? '' : libroFull?.libros?.autores[0].persona.imagene.url }} size='md' />
                  <Text marginLeft='4' style={{ fontSize: 18, fontWeight: 'bold' }}>{loading ? '' : libroFull?.libros?.autores[0].persona.nombre + ' ' + libroFull?.libros?.autores[0].persona.apellido}</Text>
                </View>
              </View>

              <Button block borderRadius='0' width="100%" marginTop='10' p='3.5' bg='#F0A500' color='#A5A5A5' onPress={goToLectura}
                _pressed={{
                  bg: '#C88200'
                }}>

                {tieneLibro?.tieneLibro ? (<Text fontSize='xl' fontWeight='bold'>
                  Seguir Leyendo
                </Text>
                ) : (
                  <Text fontSize='xl' fontWeight='bold'>
                    Empezar lectura
                  </Text>
                )



                }
              </Button>
              <Collapse isOpen={show} mt='4'>
                <Alert maxW="400" status="info">
                  <TouchableOpacity onPress={() => { navigation.push('Plan'); }}>
                    <VStack space={1} flexShrink={1} w="100%">
                      <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                        <HStack flexShrink={1} space={2} alignItems="center">
                          <Alert.Icon />
                          <Text fontSize="md" fontWeight="medium" _dark={{
                            color: "coolGray.800"
                          }}>
                            Suscribete!
                          </Text>
                        </HStack>
                        <IconButton variant="unstyled" _focus={{
                          borderWidth: 0
                        }} icon={<CloseIcon size="3" />} _icon={{
                          color: "coolGray.600"
                        }} onPress={() => setShow(false)} />
                      </HStack>
                      <Box pl="6" _dark={{
                        _text: {
                          color: "coolGray.600"
                        }
                      }}>
                        Suscribete ahora para poder disfrutar de los libros.
                      </Box>
                    </VStack>
                  </TouchableOpacity>

                </Alert>
              </Collapse>
              <Divider my='4' />
              <View style={{ margin: 10 }} >
                <Text fontWeight='bold' fontSize='xl' marginBottom='2'>Sinopsis </Text>
                <Text fontSize='lg' marginBottom='6' textAlign='justify' minHeight='56' >{libro.sinopsis}</Text>
              </View>

              <Divider my='2' />
              <HStack justifyContent='center' my='2'>
                <Text fontSize='xl' >Reseñas</Text>
              </HStack>
              <View flexDirection='column'>
                <Button borderColor='white' bg='#1D2331' color='#A5A5A5' borderRadius="0"
                  _pressed={{
                    bg: '#000000',
                    borderColor: '#ffffff',
                    borderWidth: 1,
                  }} onPress={() => {
                    if (user?.usuario?.stripeStatus != "active") {

                    } else {
                      setShowModalResena(true)
                    }
                  }}>
                  <Text>Realizar Reseña</Text>
                </Button>

                {loadingResenas ? (<CenterSpinner />) : (

                  <ReviewsList reviews={resenas} />
                )}
              </View>
              <Modal isOpen={showModalResena} onPress={() => { setShowModalResena(false) }}>
                <Modal.Content maxWidth='400px'>
                  <Modal.CloseButton onPress={() => { setShowModalResena(false) }} />
                  <Modal.Header>Realizar Reseña</Modal.Header>
                  <Modal.Body>
                    <FormControl>
                      <FormControl.Label>Reseña</FormControl.Label>
                      <TextArea onChangeText={text => setTextResena(text)} />
                    </FormControl>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button variant='ghost' colorScheme='blueGray' onPress={() => {
                        setShowModalResena(false);
                      }}>Cancel</Button>

                      <Button onPress={handleAddResena}>Ok</Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
              <Divider my='2' />
              <HStack justifyContent='center' my='2'>
                <Text fontSize='xl' >Libros Similares</Text>
              </HStack>
              {loading ? (<FullSpinner />) : (libroFull?.recomendacion?.map((value, index) => {

                return (
                  <BookList key={index} categoria={libroFull?.libros?.categoria_libro?.categoria} libros={value.libros} />
                );
              }))}
              <Divider my='2' />
            </View>

          </ScrollView>

        </View>
        <Animatable.View ref={barRef} style={styles.tabBar} backgroundColor='#000000' alignItems='center' height={70}>

          <View style={{ flex: 1 }}>
            <Text textAlign='center' color='white'>DESCUBRIR NUEVOS LIBROS</Text>
          </View>
        </Animatable.View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtom}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>


      </>)}

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
  }
});

export default BookDetailsScreen;
