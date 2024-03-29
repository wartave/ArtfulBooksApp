import React from "react";
import {
    NativeBaseProvider,
    extendTheme,

} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppState } from "../context/AppContext";
import MainScreen from "./main/MainScreen";
import SplashScreen from "../components/SplashScreen";
import LoginScreen from "./auth/Login";
import RegisterScreen from "./auth/RegisterScreen";
import Suscripciones from "../components/Suscripciones";
import NavigationTabScreen from "./main/NavigationTabScreen";
import BookDetailsScreen from "./book/BookDetailsScreen";
import EpubScreen from "./epub/EpubScreen";
import SubscriptionScreen from "../components/SuscripcionFormulario";
import PlanScreen from "./plans/PlanScreen";




const Stack = createStackNavigator();

export default function MainNavigation() {
    const { user } = useAppState();
    return (
        <>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Splash">
                {user.token ? (<>
                    <Stack.Screen name="MainScreen" component={NavigationTabScreen} />
                    
                    <Stack.Screen name="DetalleLibros" component={BookDetailsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Lectura" component={EpubScreen} options={{ headerShown: false }}  initialParams={{ libro: null }} />
                    <Stack.Screen name="Plan" component={PlanScreen} options={{ headerShown: false }} />
                </>
                    
                ) : (
                    <>
                        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Login" component={LoginScreen} initialParams={{ username: '' }} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                        <Stack.Screen name="Suscripciones" component={Suscripciones} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </>
    );
}