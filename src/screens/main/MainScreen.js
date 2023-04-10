import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Home from '../../components/Home';

const MainScreen = ({navigation}) => {
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
          {section === 'inicio' && (<Home />
          )}
          {/*
          {section === 'busqueda' && (
            // Aquí mostrarías los componentes de la sección 'Búsqueda'
          )}
          {section === 'leyendo' && (
            // Aquí mostrarías los componentes de la sección 'Leyendo'
          )}
          {section === 'settings' && (
            // Aquí mostrarías los componentes de la sección 'Settings'
          )}*/}
        </View>
        <HStack marginTop='1' bg='#000000' style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.bottomNavItem, { flex: 1 }]}
            onPress={() => handleSectionChange('inicio')}
          >
            <Ionicons
              name="home-outline"
              size={24}
              color={section === 'inicio' ? '#F0A500' : '#A5A5A5'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomNavItem, { flex: 1 }]}
            onPress={() => handleSectionChange('busqueda')}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={section === 'busqueda' ? '#F0A500' : '#A5A5A5'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomNavItem, { flex: 1 }]}
            onPress={() => handleSectionChange('leyendo')}
          >
            <Ionicons
              name="book-outline"
              size={24}
              color={section === 'leyendo' ? '#F0A500' : '#A5A5A5'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomNavItem, { flex: 1 }]}
            onPress={() => handleSectionChange('settings')}
          >
            <Ionicons
              name="settings-outline"
              size={24}
              color={section === 'settings' ? '#F0A500' : '#A5A5A5'}
            />
          </TouchableOpacity>
        </HStack>
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

export default MainScreen;