import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, View, ScrollView } from 'native-base';
import CardLibro from './CardLibro';
import SearchBarBook from './SearchBarBook';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoriaLibros from './CategoriaLibros';



const librosPorCategoria = [
  {
    categoria: 'Novedades',
    libros: [
      { titulo: 'Titulo Novedades' },
      { titulo: 'Titulo Novedades' },
      { titulo: 'Titulo Novedades' },
    ],
  },
  {
    categoria: 'Libros que estás leyendo',
    libros: [
      { titulo: 'Titulo leyendo' },
      { titulo: 'Titulo leyendo' },
      { titulo: 'Titulo leyendo' },
    ],
  },
  {
    categoria: 'Categoría de libros',
    libros: [
      { titulo: 'Titulo Categoría' },
      { titulo: 'Titulo Categoría' },
      { titulo: 'Titulo Categoría' },
    ],
  },
];

const Home = () => {
  const [search, setSearch] = useState('');

  return (
    <View>
      <View marginTop='12' marginBottom='2' style={{ marginLeft: 16, marginRight: 16 }}>
        <SearchBarBook />
      </View>
      <ScrollView marginBottom='32' marshowsVerticalScrollIndicator={false}>
        {librosPorCategoria.map((categoria, index) => (
          <CategoriaLibros
            key={index}
            categoria={categoria.categoria}
            libros={categoria.libros}
          />
        ))}
      </ScrollView>

    </View>
  );
};

export default Home;
