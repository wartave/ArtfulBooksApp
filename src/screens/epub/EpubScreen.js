import * as React from 'react';
import { useWindowDimensions,  StyleSheet,TouchableOpacity} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { Box, Button, HStack, ScrollView, View, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import GradientBaground from '../../components/GradientBaground';

export default function EpubScreen() {
    const { width, height } = useWindowDimensions();
    const [currentLocationPage, setCurrentLocationPage] = React.useState(1);

    const { currentLocation, totalLocations, goToLocation, goPrevious, goNext } = useReader();

    const [totalPages, setTotalPages] = React.useState(0);

  

    const handlePrevious = () => {
        goPrevious();
    };

    const handleNext = () => {
        goNext();
    };


    const handleGoToPage = (pageNumber) => {
        const newLocation = {
          start: {
            href: `/EPUB/xhtml/chapter${pageNumber}.xhtml`,
            index: pageNumber,
          },
        };
        goToLocation(newLocation);
      };

    const [locations, setLocations] = React.useState([]);

    const handleLocationsReady = (locations) => {
        setLocations(locations);
    };

    function handleLocationChange(totalLocations, currentLocation, progress) {
        // setCurrentPage(location.start.displayed.page);
        // setTotalPages(location.end.displayed.page);

        const totalPages = totalLocations;
        const currentPage = Math.ceil(currentLocation.end.percentage * totalPages);

        console.log("currentLocation.end.index:", currentPage);
        setCurrentLocationPage(currentPage);


        console.log("currentLocation:", currentLocation);

        console.log("pagina:", totalLocations);
        console.log("currentLocation.end.displayed.page:", currentLocation.end.displayed.page);
        console.log("currentLocation.start.displayed.page:", currentLocation.start.displayed.page);
    }

    return (

        <GradientBaground padding={false}>

            <View maxWidth="100%" width="100%" >
                <HStack bg="violet.800" py="4" justifyContent="space-between" alignItems="center" w="100%" >
                    <TouchableOpacity style={styles.backButtom}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text textAlign='center' color='white'>ARTFUL BOOKS</Text>

                    <Text textAlign='center' color='white'></Text>
                </HStack>



                <ScrollView zIndex={1} height='85%'>
                    <View style={{ flex: 1 }}>
                        <ReaderProvider >
                            <Reader 
                                src="https://firebasestorage.googleapis.com/v0/b/libroarte-72490.appspot.com/o/pdf%2FAlgunas_notas_sobre_algo_que_no_existe-H._P._Lovecraft%20(1).epub?alt=media&token=91cd6b56-d432-4c39-b143-ff8dff9c8f12"
                                width={width}
                                height={height}
                                fileSystem={useFileSystem}
                                theme={{bg: '#333', fg: '#fff'}}
                                defaultTheme={{'body': {
                                    'color': 'white',
                                    'background-color': 'black'
                                  }}}
                                onLocationChange={handleLocationChange}
                            />
                        </ReaderProvider>
                    </View>
                </ScrollView> 
                <Box bg="black" px='12'  safeAreaBottom width="100%" alignSelf="center" height='16'>
                    <HStack justifyContent="space-between" alignItems="center" safeAreaTop height='100%'>
                        <TouchableOpacity onPress={() => handleGoToPage(3)} style={styles.backButtom}>
                            <Ionicons name="arrow-back-circle-outline" size={45} color="white" />
                        </TouchableOpacity>
                        <Text textAlign='center' color='white'>ARTFUL BOOKS</Text>
                        <TouchableOpacity onPress={() => handleGoToPage(5)} style={styles.backButtom}>
                            <Ionicons name="arrow-forward-circle-outline" size={45} color="white" />
                        </TouchableOpacity>
                    </HStack>
                </Box>
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