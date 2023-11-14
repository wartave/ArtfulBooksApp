import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
    Container,
    Content,
    Header,
    Item,
    Input,
    Icon,
    List,
    ListItem,
    Text,
    View,
    HStack,
    ScrollView,
    VStack,
    Spacer,
    FlatList,
    FormControl,
    Box,
    Avatar,
    Divider,
    Button,
    Menu,
    Pressable,
    HamburgerIcon
} from 'native-base';
import { Image } from 'react-native';
import GradientBaground from '../../components/GradientBaground';
import Colors from '../../constants/Colors';
import CenterSpinner from '../../components/CenterSpinner';
import useGetRequest from '../../hooks/useGetRequest';

const data = [
    { id: 1, categoria: 'Romance Romance', titulo: 'El gran Gatsby', autor: 'F. Scott Fitzgerald', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro asi que ya sabes que hacer' },
    { id: 2, categoria: 'Ficcion', titulo: '1984', autor: 'George Orwell', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
    { id: 3, categoria: 'Accion', titulo: 'Matar a un ruiseñor', autor: 'Harper Lee', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
    { id: 4, categoria: 'Drama', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
    { id: 5, categoria: 'Historia', titulo: 'Orgullo y prejuicio', autor: 'Jane Austen', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
];

const SearchScreen = () => {
    const {data,loading} =useGetRequest('/libros');
    const {data:categoria,loading:loadingCategoria} =useGetRequest('/categorias');
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if(loading==false){
            console.log(data[0]);
            let results = data;
            if (searchText) {
                results = results.filter((item) =>
                  item?.nombre?.toLowerCase().includes(searchText.toLowerCase())
                );
              }
          
              if (selectedCategory) {
                results = results.filter((item) =>
                  item?.categoria?.toLowerCase().includes(selectedCategory.toLowerCase())
                );
              }
        
            setFilteredData(results);
        }
        
    }, [searchText, loading, selectedCategory]);

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.key}>
            <Box borderWidth="1" borderColor="gray.500" pl={["0", "4"]} pr={["0", "5"]} py="2" >
                <HStack space={[2, 3]} justifyContent="space-between" >
                    <View pl='2' style={{ flexDirection: 'row', }}>
                        <Image source={{ uri: item.portada }} style={{ width: 90, height: 140 }} />
                    </View>

                    <VStack width='86%'>
                        <Text color="white" fontSize='lg' width='87%'>
                            {item.nombre}
                        </Text>
                        <Text color='white'>
                            {item.autores[0]?.persona?.nombre +' '+item.autores[0]?.persona?.apellido}
                        </Text >
                        <HStack>
                            <Ionicons name="list" size={18} color="white" />
                            <Text px='2' fontSize='sm'>{item.num_paginas}</Text>
                            </HStack>
                        <Divider my='2' />
                        <View width='86%' mb='1' pr='5'>
                            <Text numberOfLines={2}>{item.sinopsis}</Text>
                        </View>
                        <HStack justifyContent="space-between" width='70%'>
                            <Box  borderWidth='1' borderColor={Colors.yellow} borderRadius={23} height='6'>

                                <Text px='2'>
                                    {item.categoria}
                                </Text>
                            </Box>
                            
                        </HStack>


                    </VStack>
                    <Spacer />

                </HStack>
            </Box>
        </TouchableOpacity>

    );

    function filterCategoryMenu() {
        return <Box w="90%" alignItems="flex-start" >
            <Menu closeOnSelect={false} w="190" onOpen={() => console.log("opened")} onClose={() => console.log("closed")} trigger={triggerProps => {
                return <Pressable {...triggerProps}>
                    <Ionicons name="filter-sharp" size={30} color="white" />
                </Pressable>;
            }}>
                <Menu.OptionGroup title="Categoria" type="radio" defaultValue={null} value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}>
                    <Menu.ItemOption key={0} value={null}>Borrar selección</Menu.ItemOption>
                    {categoria?.map((c,index) =>{
                         return <Menu.ItemOption key={index+1} value={c.categoria}>{c.categoria}</Menu.ItemOption>
                    })}
                </Menu.OptionGroup>
            </Menu>
        </Box>;
    }

    return (
        <GradientBaground padding={true} >
            <View style={styles.container}>
                <HStack py="3" justifyContent="space-between" alignItems="center"  >
                    <FormControl >
                        <Input borderRadius='0'
                            placeholder="Buscar por título"
                            placeholderTextColor='#ffffff'

                            onChangeText={text => setSearchText(text)}
                            borderColor='#909497'
                            backgroundColor="#1D2331"
                            _focus={{
                                borderColor: '#F0A500'
                            }}
                            value={searchText}
                        />
                    </FormControl>
                </HStack>
                {filterCategoryMenu()}
                <Divider my='2' />
                {searchText.length >= 0 ? (
                    (
                        loading?(<CenterSpinner/>):
                    ( <FlatList width='100%' data={filteredData} renderItem={renderItem} keyExtractor={item => item.id} />)
                    )
                   
                ) : (
                    <Text>TODO: mostrar los libros en tendencia</Text>
                )}
            </View>
            <Box height='20'>

            </Box>
        </GradientBaground>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SearchScreen;
