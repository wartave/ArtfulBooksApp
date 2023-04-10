import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import logo from '../assets/icon.png';

const SplashScreen = () => {
  const navigation = useNavigation();

  const isSubscribed=false;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isSubscribed) {

      } else {
        navigation.navigate('Login');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isSubscribed, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default SplashScreen;
