import React from 'react';
import { Box, VStack, HStack, Text, Progress, Image } from 'native-base';

const CardLibro = ({ imageSrc, title, progress }) => {
  return (
    <Box
      borderRadius="0"
      shadow={2}

      width="32"
      height="64"
      marginRight='3'
      overflow="hidden"
    >
      <Image source={{ uri: imageSrc }} alt={title} height='48' maxHeight='48' resizeMode="cover" />

      <VStack p='1'>
        {progress !== undefined && (
          <Progress mt={2} value={progress} colorScheme="green" />
        )}
        <HStack justifyContent="space-between" width="100%">
          <Text fontSize="sm" fontWeight="normal" color='white'>
            {title}
          </Text>
        </HStack>


      </VStack>
    </Box>
  );
};

export default CardLibro;
