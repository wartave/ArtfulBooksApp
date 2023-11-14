import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import LoadingPage from '../utils/LoadingPage';

const AppContext = createContext();

function AppCtxProvider({children}) {
  const [user, setUser] = useState(null);

  /*const saveData = async data => {
    console.error('data stripe status:',data);
    setUser({...user, ...data});
    try {
      const user_info = await AsyncStorage.getItem('user_info');
      const newData = {
        ...JSON.parse(user_info),
        ...data,
      };
      await AsyncStorage.setItem('user_info', JSON.stringify(newData));
      console.error('data stripe user:',user);
    } catch (error) {
      console.log(error);
    }
  };
*/

const saveData = async (data) => {
  console.error('data stripe status:', data.usuario.stripeStatus);
  const { usuario } = user;
  const newUsuario = { ...usuario, stripeStatus: data.usuario.stripeStatus };
  const newUser = { ...user, usuario: newUsuario };
  setUser(newUser);
  try {
    const user_info = await AsyncStorage.getItem('user_info');
    const newData = {
      ...JSON.parse(user_info),
      ...data,
      usuario: newUsuario,
    };
    await AsyncStorage.setItem('user_info', JSON.stringify(newData));
    console.error('data stripe user:', newUser);
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    const getData = async () => {
      try {
        const data = await AsyncStorage.getItem('user_info');
        const info = JSON.parse(data);
        let user = {};
        if (info !== null) {
          const diffInMs = new Date(info.expires_at) - new Date();
          const diffInHours = diffInMs / 1000 / 60 / 60;
          // token is valid only for more than an six hours
          //if (diffInHours > 6) {
            user = info;
          //} else {
            //Alert.alert(
              //'Error',
              //'La session ha expirado. Inicia sesión nuevamente',
            //);
          //}
        }
        setUser(user);
      } catch (error) {
        // setUser({});
        console.log(error);
      }
    };
    getData();
  }, []);

  const login = async data => {
    try {
      setUser(data);
      await AsyncStorage.setItem('user_info', JSON.stringify(data));
    } catch (error) {
      alert('Error guardando datos');
      console.log(error);
    }
  };
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setUser({});
    } catch (error) {
      console.log(error);
    }
  };
  // TODO: loading screen
  if (user === null) return <LoadingPage />;
  return (
    <AppContext.Provider
      value={{user, saveData, logout, login}}
      children={children}
    />
  );
}

function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('Provider no definido');
  }
  return context;
}

export {useAppState, AppCtxProvider};
