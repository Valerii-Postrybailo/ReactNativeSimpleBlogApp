import React from 'react'
import LoginScreen from './Screens/auth/LoginScreen/LoginScreen'
import RegistrationScreen from "./Screens/auth/RegistrationScreen/RegistrationScreen"

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

export default function Navigate() {
  return (
  <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen
          name = "Registration"
          component = {RegistrationScreen}
          options={{ headerShown: false}}
        />

        <Stack.Screen
          name = "Login"
          component = {LoginScreen}
          options = {{headerShown: false }}
        />

    </Stack.Navigator>
  </NavigationContainer>)
}