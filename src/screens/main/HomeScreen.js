import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, View, ScrollView, HStack, Text, Divider } from 'native-base';
import CategoriaLibros from '../../components/CategoriaLibros';
import SearchBarBook from '../../components/SearchBarBook';
import BookList from '../book/BookCarousel';
import useGetRequest from '../../hooks/useGetRequest';
import FullSpinner from '../../components/FullSpinner';
import CenterSpinner from '../../components/CenterSpinner';
import { useAppState } from '../../context/AppContext';




const HomeScreen = ({ navigation }) => {
    const { user } = useAppState();
    const { data, loading, reload } = useGetRequest('/categoria-libros');

    const {userId, setUserId} =useState(null);

    const { data: recomendacionData, loading: loadingRecomendacion, reload:reloadRecomendacion } = useGetRequest(`/recomendaciones15minutos/${user?.usuario?.id_usuario}`);

    const { refreshing, setRefreshing } = React.useState(false);



    console.log('useruseruseruser:', user);
    const refreshPage = () => {
        try {

            setRefreshing(true);
            setTimeout(() => {


                setRefreshing(false);
            }, 4000);
        } catch (e) {
            console.log('error:', e);
        }
    };
    const onRefreshT = React.useCallback(() => {
        console.log('useCallback:');
        reload();
        reloadRecomendacion();
    }, []);


    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1D2331', '#000000']}
                style={styles.linearGradient}
            >
                <View style={styles.content}>
                    <HStack mb='2'>
                        <Text fontSize='2xl'>Inicio</Text>
                    </HStack>

                    <Divider mb='3' />
                    <View>
                        <ScrollView refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={onRefreshT} />
                        } marginBottom='32' marshowsVerticalScrollIndicator={false}>
                            {loadingRecomendacion  ?
                                <CenterSpinner /> : <BookList key={0} categoria={"Recomendados para ti"} libros={recomendacionData} />
                                
                            }
                            {loading ? (
                                <FullSpinner />
                            ) : (
                                data?.map((value, index) => {
                                    console.log("FullSpinner:", index);
                                    if (!value.libros || value.libros.length === 0) {
                                        return null;
                                    }
                                    return (
                                        <BookList key={index} categoria={value.categoria} libros={value.libros} />
                                    );
                                })
                            )}
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