import React, { useState } from 'react'
import {
  TouchableOpacity,
} from "react-native";

import LoginScreen from './Screens/auth/LoginScreen/LoginScreen'
import RegistrationScreen from "./Screens/auth/RegistrationScreen/RegistrationScreen"
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen/ProfileScreen';
import PostsScreen from "./Screens/mainScreen/PostsScreen/PostsScreen"

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import DefaultPostsScreen from './Screens/nestedScreens/DefaultPostsScreen/DefaultPostsScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AuthContext = React.createContext({
  isAuth: false,
  // setIsAuth: auth => { },
  }
)



export default function Navigate() {

  const [isAuth, setIsAuth] = useState(false)

  const logOut = () =>{
    // navigation.navigate("AddPublication")
    setIsAuth(false)
    console.log("btn worked")
  }

  // const goBack = () => {
  //   navigate("DefaultScreen")
  // }

  // const goBack = () => {
  //   navigate("AddPublication")
  // }

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
              name="PostsScreen"
              component={PostsScreen}
              options={{
                headerShown: false,
                title: "Publications",
                headerTitleAlign: 'center',
                tabBarIcon: ({focused, size, color}) => <AntDesign name="appstore-o" size={size} color= {color} /> ,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={logOut}
                    title="Log out"
                  >
                    <MaterialIcons name="logout" size={28} color="grey" style= {{marginRight:20,marginTop:5}} />
                  </TouchableOpacity>
                )
              }}
            />

            <Tab.Screen name="AddPublication" component={CreatePostsScreen}
              options={{
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused, size, color }) => <Fontisto name="plus-a" size={size} color={color} />,
                headerLeft: () => (
                  <TouchableOpacity 
                    // onPress={goBack}
                    title="Go back"
                  >
                    <AntDesign name="arrowleft" size={28} color="grey" style= {{marginLeft:20, marginTop:5}}/>
                  </TouchableOpacity>
                )
              }} 
            />

            <Tab.Screen name="UserProfile" component={ProfileScreen}
              options={{ tabBarIcon: ({ focused, size = 28, color }) => <Feather name="user" size={size} color={color}/>}} 
            />

          </Tab.Navigator>}
        
          {/* <Stack.Navigator>
            <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{ headerShown: true }}
            />
          </Stack.Navigator> */}

      </AuthContext.Provider>
  </NavigationContainer>)
}

