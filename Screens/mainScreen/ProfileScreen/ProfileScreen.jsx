import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons } from '@expo/vector-icons';

import UserScreen from '../../nestedScreens/UserScreen/UserScreen';
import CommentsScreen from '../../nestedScreens/CommentsScreen/CommentsScreen';
import MapScreen from '../../nestedScreens/MapScreen/MapScreen';

const NestedStack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <NestedStack.Navigator>
      <NestedStack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
      <NestedStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => ({
          title: 'Comments',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => navigation.goBack()}>
              <Octicons name="arrow-left" size={27} color="#8F8F8F" />
            </TouchableOpacity>
          ),
        })}
      />
      <NestedStack.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => ({
          title: 'Map',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => navigation.goBack()}>
              <Octicons name="arrow-left" size={27} color="#8F8F8F" />
            </TouchableOpacity>
          ),
        })}
      />
    </NestedStack.Navigator>
  );
};

export default ProfileScreen;