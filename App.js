import React, { useState, useEffect, useCallback } from "react";
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { LogBox } from 'react-native';

import { Provider } from "react-redux";
import { store } from "./redux/store"

import Main from './components/Main/Main';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
          'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Main />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}