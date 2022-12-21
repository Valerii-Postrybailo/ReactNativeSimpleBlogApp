import React from "react";
import { moduleName } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";

import DefaultPostsScreen from "../../nestedScreens/DefaultPostsScreen/DefaultPostsScreen";
import CommentsScreen from "../../nestedScreens/CommentsScreen/CommentsScreen";
import MapScreen from "../../nestedScreens/MapScreen/MapScreen";
const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
  <NestedScreen.Navigator>
    <NestedScreen.Screen name="DefaultScreen" components={DefaultPostsScreen} />
    <NestedScreen.Screen name="Comments" components = {CommentsScreen} />
    <NestedScreen.Screen name="Map" components = {MapScreen} />
    
  </NestedScreen.Navigator>
  )
}

export default PostsScreen