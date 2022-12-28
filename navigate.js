import React from 'react'
import {
  TouchableOpacity,
} from "react-native";

import LoginScreen from './Screens/auth/LoginScreen/LoginScreen'
import RegistrationScreen from "./Screens/auth/RegistrationScreen/RegistrationScreen"
import CreatePostsScreen from './Screens/mainScreen/CreatePostsScreen/CreatePostsScreen';
import ProfileScreen from './Screens/mainScreen/ProfileScreen/ProfileScreen';
import PostsScreen from "./Screens/mainScreen/PostsScreen/PostsScreen"

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialIcons } from '@expo/vector-icons';

import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// export const AuthContext = React.createContext({
//   isAuth: false,
//   // setIsAuth: auth => { },
//   }
// )



const useRoute = (isAuth) => {

  // const [isAuth, setIsAuth] = useState(false)

  const logOut = () =>{
    // navigation.navigate("AddPublication")
    isAuth(false)
    console.log("btn worked")
  }

  // const goBack = () => {
  //   navigate("DefaultScreen")
  // }

  // const goBack = () => {
  //   navigate("AddPublication")
  // }

  if (!isAuth) {
    return (
      <AuthStack.Navigator>

        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />

        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        />

      </AuthStack.Navigator>
    )
  }

    return(
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false}}>
        <Tab.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={({ route }) => ({
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Comments' || routeName === 'Map') {
              return { display: 'none' };
            }
            return { height: 80, paddingTop: 9 };
          })(route),
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
              ),
            })}
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
            options={({ route }) => ({
            tabBarStyle: (route => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              if (routeName === 'Comments' || routeName === 'Map') {
                return { display: 'none' };
              }
              return { height: 80, paddingTop: 9 };
              })(route),
              tabBarIcon: ({focused, size = 28, color}) => <Feather name="user" size={size} color={color} />
          })} 
        />

      </Tab.Navigator>
    )
  }

  export default useRoute;
