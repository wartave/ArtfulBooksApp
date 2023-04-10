import React, { useState } from 'react';
import {  TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HStack ,View} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Paddings from '../constants/Paddings';

const GradientBaground = ({ children,padding=true }) => {
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
                <View style={styles.content} paddingLeft={padding?Paddings.main:'0'} paddingRight={padding?Paddings.main:'0'}>
                    {children}
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
        paddingVertical: 0,
        flex: 1,
    }
});

export default GradientBaground;