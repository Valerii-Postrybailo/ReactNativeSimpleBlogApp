import React, { useState } from 'react'
import {
  TouchableOpacity,
} from "react-native";

import LoginScreen from './Screens/auth/LoginScreen/LoginScreen'
import RegistrationScreen from "./Screens/auth/RegistrationScreen/RegistrationScreen"
import PostsScreen from "./Screens/mainScreen/PostsScreen/PostsScreen"
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen/ProfileScreen';

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = React.createContext({
  isAuth: false,
  // setIsAuth: auth => { },
  }
)



export default function Navigate() {

  const [isAuth, setIsAuth] = useState(false)

  const loadScene = () =>{
    // navigation.navigate("AddPublication")
    setIsAuth(false)
    console.log("btn worked")
  }

  return (
  <NavigationContainer>
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
    
        {!isAuth ?
    
          <Stack.Navigator>

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
      
          :
          
          <Tab.Navigator screenOptions={{ tabBarShowLabel: false}}>
            <Tab.Screen
              name="Publications"
              component={PostsScreen}
              options={{
                title: "Publications",
                headerTitleAlign: 'center',
                tabBarIcon: ({focused, size, color}) => <AntDesign name="appstore-o" size={size} color= {color} /> ,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={loadScene}
                    title="Press me"
                    color="red"
                  >
                    <MaterialIcons name="logout" size={28} color="grey" style= {{marginRight:20}} />
                  </TouchableOpacity>
                )
              }}
            />


            <Tab.Screen name="AddPublication" component={CreatePostsScreen}
              options={{ tabBarIcon: ({ focused, size, color }) => <Fontisto name="plus-a" size={size} color= {color}/>}} 
            />
            

            <Tab.Screen name="UserProfile" component={ProfileScreen}
              options={{ tabBarIcon: ({ focused, size = 28, color }) => <Feather name="user" size={size} color={color}/>}} 
            />

          </Tab.Navigator>}

      </AuthContext.Provider>
  </NavigationContainer>)
}

