import React, { useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Divider, Avatar, View, Container, ScrollView, HStack, Flex } from 'native-base';

import * as Animatable from 'react-native-animatable';

import GradientBaground from '../../components/GradientBaground';
import { Ionicons } from '@expo/vector-icons';
import Paddings from '../../constants/Paddings';
import useGetRequest from '../../hooks/useGetRequest';
import FullSpinner from '../../components/FullSpinner';



const BookDetailsScreen = ({navigation, route }) => {
  const {libro} =route.params;
  const title = 'Harry potter la piedra filosofal';
  const barRef = useRef(null);
console.log('/libros/:',libro.id_libro);
  const {data:libroFull, loading} =useGetRequest(`/libros/${libro.id_libro}`);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const maxOffsetY = contentHeight - visibleHeight;
    console.log("offsetY:", offsetY);
    console.log("maxOffsetY:", maxOffsetY);
    console.log("(offsetY - 100) / 100:", (offsetY - 100) / 100);
    console.log("(maxOffsetY - 100) / 100:", (maxOffsetY - 100) / 100);
    //const opacity = offsetY <= 100 ? 0 : Math.min((offsetY - 100) / 100, (maxOffsetY - 100) / 100);
    const opacity = offsetY < 0 ? 0 : offsetY / maxOffsetY;
    barRef.current.setNativeProps({ style: { opacity: opacity } });
  }


  return (
    <GradientBaground padding={false} >


    {loading?(<><FullSpinner/></>):(<>
      <View maxWidth="100%" width="100%" >
        <ScrollView  marshowsVerticalScrollIndicator={false} onScroll={handleScroll}>
          <ImageBackground
            source={{ uri: libro.imagene.url}}
            style={{ flex: 1, height: 240, justifyContent: 'center', alignItems: 'center', justifyContent: 'center' }}
            blurRadius={5}
            resizeMode='cover'
          >
            <View style={{ flexDirection: 'row', }} marginTop='32'>
              <Image source={{ uri:libro.imagene.url}} style={{ width: 140, height: 200 }} />
            </View>
          </ImageBackground>
          <View paddingLeft={Paddings.main} paddingRight={Paddings.main}>
            <View marginTop='16' alignItems='center'>
              <Text fontSize='xl' fontWeight='semibold'>{libro.nombre}</Text>
              <View  alignItems='center' style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
              <Avatar source={{ uri: loading?'': libroFull?.autores[0].persona.imagene.url }} size='md'/>
              <Text marginLeft='4' style={{ fontSize: 18, fontWeight: 'bold' }}>{loading?'': libroFull?.autores[0].persona.nombre +' '+libroFull?.autores[0].persona.apellido}</Text>
            </View>
            </View>
            
            <Button block borderRadius='0' width="100%" marginTop='10' p='3.5' bg='#F0A500' color='#A5A5A5'
              _pressed={{
                bg: '#C88200'
              }}>
              <Text fontSize='xl' fontWeight='bold'>Empezar Lectura</Text>
            </Button>
            <Divider my='4' />
            <View style={{ margin: 10 }} >
              <Text fontWeight='bold' fontSize='3xl' marginBottom='2'>Sinopsis </Text>
              <Text fontSize='lg' marginBottom='6' textAlign='justify' minHeight='56' >{libro.sinopsis}</Text>
            </View>

            <Divider my='2' />


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
    opacity:0,
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
