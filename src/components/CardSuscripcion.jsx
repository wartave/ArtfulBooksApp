import React from 'react';
import { Box, Text, Button } from 'native-base';

const CardSuscripcion = ({ tipo, detalles, precio, onPress }) => {
  return (
    <Box
      p="4"
      borderRadius="0"
      borderWidth={1}
      borderColor="gray.500"
      width="100%"
      mb="4"
      style={{
        backgroundColor: 'transparent'}}
    >
      <Text fontWeight="bold" fontSize="2xl" color='white' mb="2">
        {tipo}
      </Text>
      <Text mb="10" color='white'>{detalles}</Text>
      <Text color="white" fontWeight="bold" fontSize="2xl" mb="3">
        {"$"+precio}  
          <Text fontWeight="normal" color='white' mb="2">
          {"/"+tipo}
        </Text>
      </Text>
      <Button onPress={onPress}  bg='#F0A500' color='#A5A5A5' borderRadius="0">
        Suscribirse
      </Button>
    </Box>
  );
};

export default CardSuscripcion;
