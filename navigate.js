import React,{ useState} from 'react'
import LoginScreen from './Screens/auth/LoginScreen/LoginScreen'
import RegistrationScreen from "./Screens/auth/RegistrationScreen/RegistrationScreen"
import Publication from "./Screens/PostsScreen/PostsScreen.jsx"

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

export const AuthContext = React.createContext({
  isAuth: false,
  setIsAuth: auth => { },
  }
)

export default function Navigate() {

  const [isAuth, setIsAuth] = useState(false)

  return (
  <NavigationContainer>
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
    
        {!isAuth ?
    
          <Stack.Navigator>

            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
      
          :
          <Stack.Navigator>

            <Stack.Screen
              name="Publication"
              component={Publication}
              options={title = "Publication"}
            />
          </Stack.Navigator>}
    
      </AuthContext.Provider>
      
    {/* <Stack.Navigator> */}
    
      {/* <Stack.Screen
          name = "Registration"
          component = {RegistrationScreen}
          options={{ headerShown: false}}
        />

        <Stack.Screen
          name = "Login"
          component = {LoginScreen}
          options = {{headerShown: false }}
        />

        <Stack.Screen
          name = "Publication"
          component = {LoginScreen}
          options = {title = "Publication"}
        /> */}

    {/* </Stack.Navigator> */}
  </NavigationContainer>)
}