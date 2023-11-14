import React, { useRef, useState } from 'react';
import { useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { Progress, VStack, HStack, ScrollView, View, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import GradientBaground from '../../components/GradientBaground';
import { useAppState } from '../../context/AppContext';
import useGetRequest from '../../hooks/useGetRequest';
import CenterSpinner from '../../components/CenterSpinner';
import HttpClient from '../../utils/HttpClient';

export default EpubScreen = ({ navigation, route }) => {
    const { user } = useAppState();
    const { libro,reload } = route.params;
    const { data, loading } = useGetRequest(`/historial-lectura/usuario/${user?.usuario?.id_usuario}/libro/${libro.id_libro}`);

    const { data: libroFullData, loading: loadingLibroFullData } = useGetRequest(`/libros/${libro.id_libro}`);



    const { width, height } = useWindowDimensions();


    const [totalPages, setTotalPages] = useState(0);
    const [cfiActual, setCfiActual] = useState('');

    const [progressBook, setProgressBook] = useState(0);




    function handleLocationChange(progress, currentLocation, totalPages) {
        const porcentaje = currentLocation?.end?.percentage * 100;
        setProgressBook(porcentaje);
    }

   const acualizarVentana= React.useCallback(() => {
        console.log('useCallback:');
        reload();
    }, []);

    const saveHistorial = async () => {
        if (data != null) {
            const res = await HttpClient.put(`/historial-lectura/usuario/${user?.usuario?.id_usuario}/libro/${libro?.id_libro}`,{ cfi: cfiActual, paginas_vistas: progressBook } );
            if (res.data) {
                navigation.navigate('Lecturas');
                acualizarVentana();
            }
        } else {
            const res = await HttpClient.post(`/historial-lectura/usuario/${user?.usuario?.id_usuario}/libro/${libro?.id_libro}`, { cfi: cfiActual, paginas_vistas: progressBook });
            if (res.data) {
                navigation.goBack();
                acualizarVentana();
            }

        }

    }


    return (

        <GradientBaground padding={false}>

            <View maxWidth="100%" width="100%" >
                <HStack bg="black" py="4" justifyContent="space-between" alignItems="center" w="100%" >
                    <TouchableOpacity style={styles.backButtom} onPress={() => {
                        console.log('e');
                        saveHistorial();
                        //
                        //goToLocation("epubcfi(/6/2!/4/84/2/1:277)");

                    }}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <VStack >
                        <Text textAlign='center' color='white'>{libro?.nombre}</Text>
                    </VStack>

                    <Text textAlign='center' color='white'></Text>
                </HStack>

                <Progress value={progressBook} colorScheme="warning" />

                {loading || loadingLibroFullData ? (
                    <CenterSpinner />
                ) : (data == null ? (
                    <ScrollView height='95%'>
                        <View style={{ flex: 1 }}>
                            <ReaderProvider >
                                <Reader
                                    src={libroFullData?.PDFLibro?.url}
                                    width={width}
                                    height={height}
                                    fileSystem={useFileSystem}
                                    onStarted={() => {
                                        console.log("onStarted onStarted:");
                                    }}
                                    onDisplayError={(reason) => {

                                        console.log("onDisplayError onDisplayError:", reason);
                                    }}
                                    onRendered={(section, currentSection) => {

                                        console.log("onRendered section:", section);
                                        console.log("onRendered currentSection:", currentSection);
                                    }}
                                    onReady={(totalLocations, currentLocation) => {
                                        console.log("onReady totalLocations:", totalLocations);
                                        console.log("onReady currentLocation:", currentLocation);

                                    }}
                                    onLocationChange={(totalLocations, currentLocation, progress) => {

                                        setProgressBook(currentLocation.end.percentage * 100);
                                        console.log("onLocationChange totalLocations:", totalLocations);
                                        console.log("onLocationChange currentLocation:", currentLocation);

                                        console.log("onLocationChange progress:", progress);
                                        setCfiActual(currentLocation.end.cfi);

                                        console.log('currentLocation end cfi:', currentLocation.end.cfi);


                                    }}
                                />
                            </ReaderProvider>
                        </View>
                    </ScrollView>) : (
                    <ScrollView height='95%'>
                        <View style={{ flex: 1 }}>
                            <ReaderProvider >
                                <Reader
                                    src={data?.libro?.PDFLibro?.url}
                                    width={width}
                                    height={height}
                                    fileSystem={useFileSystem}
                                    initialLocation={data?.cfi}
                                    onStarted={() => {
                                        console.log("onStarted onStarted:");
                                    }}
                                    onDisplayError={(reason) => {

                                        console.log("onDisplayError onDisplayError:", reason);
                                    }}
                                    onRendered={(section, currentSection) => {

                                        console.log("onRendered section:", section);
                                        console.log("onRendered currentSection:", currentSection);
                                    }}
                                    onReady={(totalLocations, currentLocation) => {
                                        console.log("onReady totalLocations:", totalLocations);
                                        console.log("onReady currentLocation:", currentLocation);

                                    }}
                                    onLocationChange={(totalLocations, currentLocation, progress) => {

                                        console.log('currentLocation end cfi:', currentLocation.end.cfi);
                                        setProgressBook(currentLocation.end.percentage * 100);
                                        console.log("onLocationChange totalLocations:", totalLocations);
                                        console.log("onLocationChange currentLocation:", currentLocation.start);
                                        setCfiActual(currentLocation.end.cfi);
                                        console.log("onLocationChange progress:", progress);


                                    }}
                                />
                            </ReaderProvider>
                        </View>
                    </ScrollView>)

                )}


            </View>
        </GradientBaground>

    );
}


const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        position: 'absolute',
    }, backButtom: {
        paddingLeft: 10
    }

});