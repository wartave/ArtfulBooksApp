import React from 'react';
import { Box, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const SearchBarBook = () => {
  return (
    <Box
      bg="white"
      shadow={2}
      rounded="md"
      maxWidth="90%"
      alignSelf="center"
      px={2}
      py={1}
      flexDirection="row"
      alignItems="center"
    >
      <MaterialIcons name="search" size={24} color="gray" />
      <Input
        placeholder="Buscar"
        fontSize="md"
        variant="unstyled"
        _placeholder={{ color: 'gray.400' }}
        px={2}
        py={1}
      />
    </Box>
  );
};

export default SearchBarBook;
