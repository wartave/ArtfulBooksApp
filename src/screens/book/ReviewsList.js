import React, { useEffect, useState } from 'react';
import { Box, Text, Button, View, VStack } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

const ReviewsList = ({reviews}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);


  
  const [currentResenas, setCurrentResenas] = useState(null);
  const itemsPerPage = 4;

  useEffect(() => {
    setCurrentResenas(reviews);

    if (reviews.length > itemsPerPage) {
      setPagesCount(Math.ceil(reviews.length / itemsPerPage));
      const startIdx = (currentPage - 1) * itemsPerPage;
      const endIdx = startIdx + itemsPerPage;
      setCurrentResenas(reviews.slice(startIdx, endIdx));
    } else {
      setPagesCount(1);
      setCurrentPage(1);
    }
  }, [reviews, currentPage]);

  const handleNextPage = () => {
    if (currentPage < pagesCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View mt='2' height='460'>
      {currentResenas?.map((resena, idx) => {
        console.log('ddddd:',resena);
        return (
          <Box key={idx} p={2} mb={2} borderWidth='1' borderColor='gray.700'>
            <Text fontWeight="bold" mb={1} fontSize='md'>
              {resena?.usuario?.persona?.nombre}
            </Text>
            <Text>{resena?.resena}</Text>
            <Text alignSelf="flex-end" fontSize="sm" color="gray.500">
              {
                `${new Date(resena?.fecha).getDate()}/${new Date(resena?.fecha).getMonth() + 1}/${new Date(resena?.fecha).getFullYear()}`
              }
            </Text>
          </Box>
        )

      })}
      
      <VStack position='absolute' bottom='0' left='0' right='0' flexDirection="row" justifyContent="space-between" p={2}>
          <Button variant='ghost' disabled={currentPage === 1} onPress={handlePrevPage} >
            <Ionicons name="arrow-back-circle-outline" size={30} color="white" />
          </Button>


          <Text  top='4' left='0' right='0' >
            {currentPage} / {pagesCount}
          </Text>
          <Button variant='ghost' disabled={currentPage === pagesCount} onPress={handleNextPage}>
            <Ionicons name="arrow-forward-circle-outline" size={30} color="white" />
          </Button>
        </VStack>
    </View>
  );
};

export default ReviewsList;
