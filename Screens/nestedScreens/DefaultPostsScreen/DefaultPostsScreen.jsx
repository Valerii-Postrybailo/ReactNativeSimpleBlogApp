import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
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

import db from '../../../firebase/config';

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([])

  const [userLikes, setUserLikes] = useState('no');
  const [likeCount, setLikeCount] = useState(0);

  const { name, email, avatar } = useSelector(state => state.auth);
  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection('posts')
      .onSnapshot(data =>
        setPosts(
          data.docs
            .map(doc => ({ ...doc.data(), id: doc.id }))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        )
      );
  };

  const likeUnlike = async postId => {
    if (userLikes === 'no') {
      setUserLikes('yes');
      setLikeCount(+1);
      createLike(postId);
    } else {
      setUserLikes('no');
      setLikeCount(0 ? 0 : -1);
      createLike(postId);
    }
  };

  const createLike = async postId => {
    const data = await db.firestore().collection('posts').doc(postId).get();
    const { likes } = data.data();
    await db
      .firestore()
      .collection('posts')
      .doc(postId)
      .up
  }
  // useEffect(() => {
  //   if (route.params) {
  //     setPosts(prevState => [...prevState, route.params])
  //   }
  // }, [route.params])
  // console.log("params", route.params)
  // console.log("posts", posts)

  // const openComents = () => {
  //   navigation.navigate("Comments", { route})
  // }

  // const openMap = () => {
  //   const coordinate = route.params.locationCoords
  //   navigation.navigate("Map", { coordinate})
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post_container}>
            <Image source={{ uri: item.photo }} style={styles.post_img} />
            <Text>{item.description}</Text>

            <View>
              <TouchableOpacity onPress={() =>
                navigation.navigate('Comments', {
                  postId: item.id,
                  photo: item.photo,
                  allComments: item.comments,
                })
              }>
                <FontAwesome name="comment-o" size={24} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() =>
                  navigation.navigate('Map', {
                    location: item.location,
                  })}
              >
                <Text>
                  <AntDesign name="enviromento" size={24} color="black" />
                  {item.place}
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
