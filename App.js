import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "./src/components/SplashScreen";
import Suscripciones from "./src/components/Suscripciones.js";
import SubscriptionScreen from "./src/components/SuscripcionFormulario";
import { AppCtxProvider } from "./src/context/AppContext";
import LoginScreen from "./src/screens/auth/Login";
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import MainNavigation from "./src/screens";
import NavigationTabScreen from "./src/screens/main/NavigationTabScreen";
import EpubScreen from "./src/screens/epub/EpubScreen";
import { StripeProvider } from "@stripe/stripe-react-native";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
  components: {
    Button: {
      variants: {
        custom: {
          bg: 'blue.500',

        },
      },
      defaultProps: {
        variant: 'custom',
      },
    },
  },
};

// extend the theme
const customTheme = extendTheme({ config });

const Stack = createStackNavigator();


export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <StripeProvider publishableKey="pk_test_51Mi4X9HlcUhpnikzIBqwVGix8UvcgMC9PGXlJT2ogW4TxMttn5WXY0rN21Pvh2BFF9sJlbUquxuqGkQLXTAv5qB7007WHN1KD7">
        <NavigationContainer>
          <AppCtxProvider>
            <MainNavigation />
          </AppCtxProvider>
        </NavigationContainer>
      </StripeProvider>



    </NativeBaseProvider>
  );
}


