import React, { useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
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
    HamburgerIcon,
    Progress,
} from 'native-base';

import { Image } from 'react-native';
import GradientBaground from '../../components/GradientBaground';
import Colors from '../../constants/Colors';
import CenterSpinner from '../../components/CenterSpinner';
import useGetRequest from '../../hooks/useGetRequest';
import { useAppState } from '../../context/AppContext';
import { format } from 'date-fns';
import { useFocusEffect, useNavigation } from '@react-navigation/native';




const data = [
    { id: 1, portada: 'https://us.123rf.com/450wm/yevgenijd/yevgenijd1708/yevgenijd170800031/83476776-fotogramas-de-collage-de-fotos-vintage-álbum-de-fotos-plantilla-de-aplicación-vector.jpg', progreso: 0.5, categoria: 'Romance Romance', nombre: 'El gran Gatsby', autor: 'F. Scott Fitzgerald', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro asi que ya sabes que hacer' },
    { id: 2, portada: 'https://us.123rf.com/450wm/yevgenijd/yevgenijd1708/yevgenijd170800031/83476776-fotogramas-de-collage-de-fotos-vintage-álbum-de-fotos-plantilla-de-aplicación-vector.jpg', progreso: 1, categoria: 'Ficcion', nombre: '1984', autor: 'George Orwell', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
    { id: 3, portada: 'https://us.123rf.com/450wm/yevgenijd/yevgenijd1708/yevgenijd170800031/83476776-fotogramas-de-collage-de-fotos-vintage-álbum-de-fotos-plantilla-de-aplicación-vector.jpg', progreso: 0.2, categoria: 'Accion', nombre: 'Matar a un ruiseñor', autor: 'Harper Lee', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
    { id: 4, portada: 'https://firebasestorage.googleapis.com/v0/b/libroarte-72490.appspot.com/o/image%2Fgustavo_adolfo_becquer_obras_mas_importantes_3649_600.jpg?alt=media&token=520eb041-3a3c-4ce7-919a-f40903f8bf3e', progreso: 1, categoria: 'Drama', nombre: 'Cien años de soledad', autor: 'Gabriel García Márquez', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
    { id: 5, portada: 'https://fastly.picsum.photos/id/439/500/500.jpg?hmac=lj2SoYqYGC6Qd5qEW2YmgyD0qdxf5usiTeuC0RuGemo', progreso: 1, categoria: 'Historia', nombre: 'Orgullo y prejuicio', autor: 'Jane Austen', sinopsis: 'esta es la sinopsis del libroo que describe de que trata el libro' },
];

const Readcreen = () => {
    const navigation = useNavigation();
    const { user } = useAppState();
    const { data: historiaLecturaData, loading:loadingHistorialLectura,reload } = useGetRequest(`/historial-lecturas/${user?.usuario?.id_usuario}`);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if(loadingHistorialLectura==false){
            const results = historiaLecturaData?.filter(item =>
                item?.libro?.nombre?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredData(results);
        }
       


    }, [searchText,loadingHistorialLectura]);

    const onRefreshT = React.useCallback(() => {
        console.log('useCallback:');
        reload();
    }, []);
    useFocusEffect(
        React.useCallback(()=>{
            if(loadingHistorialLectura==false){

                reload();
            }
        },[])

      );

    const seguirLeyendo = (libro) => {

            navigation.navigate('Lectura', { libro, reload});
        
        console.log('seguirleyendo',libro);
    }

    const renderItem = ({ item }) => (
        <Box key={item.key} borderWidth="1" borderColor="gray.500" pl={["0", "4"]} pr={["0", "5"]} py="2" height='56' >
            <VStack>
                <HStack space={[2, 3]} justifyContent="space-between" pb='3'>
                    <View pl='2' style={{ flexDirection: 'row', }}>
                        <Image source={{ uri: item?.libro?.imagene?.url }} style={{ width: 90, height: 140 }} />
                    </View>

                    <VStack width='86%'>
                        <Text color="white" fontSize='lg'>
                            {item?.libro?.nombre?.slice(0, 22) + (item?.libro?.nombre?.length > 22 ? "..." : "")}
                        </Text>

                        <HStack justifyContent="space-between" width='70%' mt='2'>
                            <Box borderWidth='1' borderColor={Colors.yellow} borderRadius={23} height='6'>

                                <Text px='2'>
                                    {item?.libro?.categoria_libro?.categoria}
                                </Text>
                            </Box>

                        </HStack>

                        <Divider my='2' />
                        <HStack alignItems='center' space={[2, 0]}>
                            <Text>Progreso:</Text>
                            <Progress colorScheme="warning" value={Math.floor((item?.paginas_vistas / item?.libro?.num_paginas) * 100)} width='32' />
                        </HStack>
                        <HStack alignItems='center' space={[2, 0]} mt='2'>
                            <Text>Ultima Lectura:</Text>
                            <Text>{format(new Date(item?.fecha_ultimaLectura), "d 'de' MMMM 'del' yyyy")}</Text>
                        </HStack>


                    </VStack>
                    <Spacer />

                </HStack>
                <Button block borderRadius='0' p='3.5' bg='#F0A500' color='#A5A5A5' onPress={
                    () =>seguirLeyendo(item?.libro)
                }
                    _pressed={{
                        bg: '#C88200'
                    }}>Seguir leyendo</Button>
            </VStack>

        </Box>

    );



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
                {loadingHistorialLectura==false ? (
                    (
                        <FlatList refreshControl={
                            <RefreshControl refreshing={loadingHistorialLectura} onRefresh={onRefreshT} />
                        }
                            width='100%' data={filteredData} renderItem={renderItem} keyExtractor={item => item.id} />)

                ) : (
                    <CenterSpinner/>
                )}
                <Box height='16'></Box>
            </View>
        </GradientBaground>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Readcreen;
