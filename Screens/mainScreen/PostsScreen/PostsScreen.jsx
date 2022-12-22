import React, {useState} from "react";
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostsScreen from "../../nestedScreens/DefaultPostsScreen/DefaultPostsScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";

import { MaterialIcons } from '@expo/vector-icons';

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const [isAuth, setIsAuth] = useState(false)

  const logOut = () =>{
    // navigation.navigate("AddPublication")
    setIsAuth(false)
    console.log(isAuth)
    console.log("btn worked")
  }

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{
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

      <NestedScreen.Screen name="Comments" component = {CommentsScreen} />
      <NestedScreen.Screen name="Map" component = {MapScreen} />
      
    </NestedScreen.Navigator>
  )
}

export default PostsScreen