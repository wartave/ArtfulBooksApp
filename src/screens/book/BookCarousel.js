import React, { useRef, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { LinearGradient } from 'expo-linear-gradient';
import { Box, Button, Divider, HStack, Text, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

const books = [
  {
    id: 1,
    title: 'Libro 1',
    synopsis: 'Sinopsis del libro 1https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Español.PNG/revision/latest?cb=20151020165725',
    coverImage: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    title: 'Libro 2',
    synopsis: 'Sinopsis del libro 2',
    coverImage: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    title: 'Libro 3',
    synopsis: 'Sinopsis del libro 3',
    coverImage: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    title: 'Libro 4',
    synopsis: 'Sinopsis del libro 4',
    coverImage: 'https://via.placeholder.com/150',
  },
];

const img = 'https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Español.PNG/revision/latest?cb=20151020165725';


const BookList = ({categoria, libros}) => {

  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [libro,setLibroActual] =useState(0);

  const carouselRef = useRef(null);
  const handleItemPress = (index,item) => {
    try{
      setLibroActual(item);
      
    carouselRef.current.snapToItem(index);
      setActiveIndex(index);
    }catch(e){
      console.log('error:',e);
    }
  }
  
  //setLibroActual(libros[activeIndex]);
  const renderItem = ({ item, index  }) => {

    //console.log('item:', item);
    return (
      <View key={index}>
        <TouchableOpacity onPress={() => handleItemPress(index,item)}>
          <Image source={{ uri: item?.imagene?.url }} style={{ width: 80, height: 130 }} />
        </TouchableOpacity>
      </View>
    );
  }
   const goToDetails = () =>{
   // navigation.navigate('DetalleLibros',{libro}); opcion funcional pero sin historial
    
    navigation.push('DetalleLibros', { libro});
   }

  return (
    
    <LinearGradient
      colors={['transparent', '#000000']}>
        {libros==null?(
          <Text fontSize='2xl' color='amber.400'>Bienvenido a Artful Books</Text>
          ):(
            <Box my='10' alignContent='flex-start' height='80' >
            <View marginBottom='3'>
              <Text fontSize='xl' fontWeight='bold'>{categoria}</Text>
            </View>
            
            <Carousel
    
              ref={carouselRef}
              data={libros}
              renderItem={renderItem}
              onSnapToItem={(index) =>{
                
                setLibroActual(libros[index]);
                setActiveIndex(index); } }
              sliderWidth={600}
    
              sliderHeight={100} // establecer la altura deseada
              itemWidth={100}
              layout={'default'}
              loop={false}
              loopClonesPerSide={3}
              inactiveSlideOpacity={0.5}
              inactiveSlideScale={0.9}
    
              activeSlideAlignment={'start'}
              activeSlideOffset={10}
              removeClippedSubviews={false}
              firstItem={activeIndex}
    
            />
            <View style={{}} height='32' padding='2' paddingLeft='4' paddingRight='4'>
              <Divider />
              <Text fontSize='lg' fontWeight='bold' marginBottom='4'>{libros[activeIndex]?.nombre}</Text>
              <Text textAlign='justify' height='16' numberOfLines={2}>{libros[activeIndex]?.sinopsis}</Text>
              <View style={{ alignSelf: 'flex-end' }} marginTop='1'>
                <TouchableOpacity style={{ alignSelf: 'flex-end', flexDirection: 'row' }} onPress={goToDetails}>
                  <Text color='white'>Mas detalles</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </Box>
          )}
      
    </LinearGradient>

  );
};

export default BookList;
