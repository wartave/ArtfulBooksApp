import React, { useEffect, useRef } from 'react'
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import HomeScreen from "./HomeScreen";
import Colors from "../../constants/Colors";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BookDetailsScreen from '../book/BookDetailsScreen';
import SearchScreen from '../search/SearchScreen';
import Readcreen from '../lecturas/Readcreen';
import { Text } from 'native-base';
import PerfilScreen from '../perfil/PerfilScreen';

const TabArr = [
  { route: 'Home', label: 'Inicio', activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen },
  { route: 'Busquedas', label: 'Busquedas',  activeIcon: 'search', inActiveIcon: 'search-outline', component: SearchScreen },
  { route: 'Lecturas', label: 'Lecturas',  activeIcon: 'book', inActiveIcon: 'book-outline', component: Readcreen },
  { route: 'Settings', label: 'Perfil',  activeIcon: 'person-circle', inActiveIcon: 'person-circle-outline', component: PerfilScreen },
];


const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: {scale: 1.5,}, 1: {scale: 2.5, }});
    } else {
      viewRef.current.animate({0: {scale: 2.5,}, 1: {scale: 1.5, }});
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
              
      <Animatable.View
        ref={viewRef}
        duration={250}
        style={styles.container}>
        <Ionicons
         name={focused ? item.activeIcon : item.inActiveIcon} 
         color={focused ? '#F0A500' : '#A5A5A5'}/>
      </Animatable.View>
      <Text  color={focused ? '#F0A500' : '#A5A5A5'}>{item.label}</Text>

    </TouchableOpacity>
  )
}

export default function NavigationTabScreen() {
  return (
    <Tab.Navigator initialRouteName='Home'
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60,
        position: 'absolute',
        bottom: 0,
        right: 16,
        left: 16,
        backgroundColor:'#000000',
        borderColor:'#ffffff'

      }
    }}
  >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={index} name={item.route} component={item.component}
          
          options={{tabBarLabel:'index',
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton {...props} item={item} />
          }}
          />
        )
      })}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})