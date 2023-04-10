import React from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';

export default function LoadingPage() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#231f1e',
      }}>
      <StatusBar backgroundColor="#231f1e" />
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
