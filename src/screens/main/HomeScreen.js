import React, { useState } from 'react';
import {  StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, View, ScrollView } from 'native-base';
import CategoriaLibros from '../../components/CategoriaLibros';
import SearchBarBook from '../../components/SearchBarBook';
import BookList from '../book/BookCarousel';
import useGetRequest from '../../hooks/useGetRequest';
import FullSpinner from '../../components/FullSpinner';


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

const HomeScreen = ({ navigation }) => {

    const {data,loading} =useGetRequest('/categoria-libros');
    const [section, setSection] = useState('inicio');

    const handleSectionChange = (newSection) => {
        setSection(newSection);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1D2331', '#000000']}
                style={styles.linearGradient}
            >
                
                
                <View style={styles.content}>
                    <View>
                        <View marginTop='12' marginBottom='2' style={{ marginLeft: 16, marginRight: 16 }}>
                            <SearchBarBook />
                        </View>
                        <ScrollView marginBottom='32' marshowsVerticalScrollIndicator={false}>
                            {loading?(<FullSpinner/>):(data?.map(index =>{
                                console.log("FullSpinner:",index);
                                return (
                                    <BookList categoria={index.categoria} libros={index.libros}/>
                                );
                            }))}
                        </ScrollView>

                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'transparent',
    },
    bottomNavItem: {
        flex: 1,
        alignItems: 'center',
    },
});

export default HomeScreen;