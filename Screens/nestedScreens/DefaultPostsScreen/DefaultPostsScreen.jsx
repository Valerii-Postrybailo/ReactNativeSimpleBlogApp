import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native"

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const   DefaultPostsScreen = ({ navigation,route }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (route.params) {
      setPosts(prevState => [...prevState, route.params])
    }
  }, [route.params])
  console.log("params", route.params)
  console.log("posts", posts)

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.post_container}>
            <Image source={{ uri: item.photo }} style={styles.post_img} />
            <Text>{route.params.title}</Text>

            <View>
              <TouchableOpacity onPress={()=> navigation.navigate("Map")}>
                <FontAwesome name="comment-o" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity>
                <Text>
                  <AntDesign name="enviromento" size={24} color="black" />
                  {route.params.location}
                </Text>
              </TouchableOpacity>
            </View>
            
          </View>
        )}
      />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },

  post_container: {
    marginTop: 15,
    marginBottom:15,
    marginHorizontal:30,

  },

  post_img: {
    height:200,
  }
})


export default DefaultPostsScreen
