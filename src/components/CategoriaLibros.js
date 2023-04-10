import React from 'react';
import { Box, Text, ScrollView, Button, HStack, Stack } from 'native-base';
import CardLibro from './CardLibro';

const img='https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Español.PNG/revision/latest?cb=20151020165725';


const CategoriaLibros = ({ categoria, libros }) => {
  return (
    <Box my={4} alignContent='flex-start' bg='coolGray.900'>
      <Text fontSize="lg" fontWeight="bold" mb={2} color="white">
        {categoria}
      </Text>
      <ScrollView horizontal >
        <HStack width="100%" overflow="scroll">
          {libros.map((libro, index) => (
            <CardLibro key={index} title={libro.titulo} imageSrc={img} progress={50}/>
          ))}
        </HStack>
      </ScrollView>
      <Button variant='ghost' color='white'>
      <HStack space='full' alignItems="center" justifyContent='space-around'>
          <Text color='white'>ver mas</Text>
          <Text color='white'>{'>'}</Text>
          </HStack>
      </Button>
    </Box>
  );
};

export default CategoriaLibros;

