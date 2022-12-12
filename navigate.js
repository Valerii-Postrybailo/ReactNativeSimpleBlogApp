import React from 'react'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen"

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

export default function Navigate() {
  return <NavigationContainer>
    <Stack.Navigator>

      <Stack.Screen
          name = "Registration"
          component = {RegistrationScreen}
          options = {{title: "Registration page"}}
        />

        <Stack.Screen
          name = "Login"
          component = {LoginScreen}
          options = {{title: "Login page"}}
        />

    </Stack.Navigator>
  </NavigationContainer>;
}