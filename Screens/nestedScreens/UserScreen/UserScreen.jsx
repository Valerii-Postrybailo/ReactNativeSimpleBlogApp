import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import db from '../../../firebase/config';
import { authAvatarChangeUser, authLogoutUser } from '../../../redux/auth/authOperations';

export default function UserScreen({ navigation }) {
  const { userId, name, avatar } = useSelector(state => state.auth);

  const [posts, setPosts] = useState([]);
  const [userLikes, setUserLikes] = useState('no');
  const [likeCount, setLikeCount] = useState(0);

  const dispatch = useDispatch();

  const logout = () => dispatch(authLogoutUser());

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .onSnapshot(data =>
        setPosts(
          data.docs
            .map(doc => ({ ...doc.data(), id: doc.id }))
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        )
      );
  };

  const deletePost = async (postId, url) => {
    await db.firestore().collection('posts').doc(postId).delete();
    await db.storage().refFromURL(url).delete();
  };

  const likeUnlike = async postId => {
    if (userLikes === 'no') {
      setUserLikes('yes');
      setLikeCount(+1);
      createLike(postId);
    } else {
      setUserLikes('no');
      setLikeCount(-1);
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
      .update({ likes: (likes ? likes : 0) + likeCount });
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0,
    });

    if (!result.cancelled) {
      const avatar = await uploadAvatarToServer(result.uri);
      dispatch(authAvatarChangeUser(avatar));
    }
  };

  const uploadAvatarToServer = async photo => {
    const response = await fetch(photo);
    const file = await response.blob();
    const avatarId = Date.now().toString();
    await db.storage().ref(`avatars/${avatarId}`).put(file);

    const processedAvatar = await db.storage().ref('avatars').child(avatarId).getDownloadURL();

    return processedAvatar;
  };

  const deleteAvatar = async () => {
    dispatch(authAvatarChangeUser(null));
    await db.storage().refFromURL(avatar).delete();
  };

  return (
    <ImageBackground
      style={styles.bgImage}
      source={require('../../../assets/photo_BG.jpg')}
    >
      <View style={styles.avatarWrapper}>
        <View style={{ overflow: 'hidden', borderRadius: 16 }}>
          <ImageBackground
            style={styles.avatar}
          >
            {avatar && <Image style={styles.avatar} source={{ uri: avatar }} />}
          </ImageBackground>
        </View>
        {avatar ? (
          <TouchableOpacity
            style={{ ...styles.avatarBtn, borderColor: '#BDBDBD' }}
            onPress={deleteAvatar}
          >
            <MaterialIcons name="close" size={26} color="#BDBDBD" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.avatarBtn} onPress={pickAvatar}>
            <MaterialIcons name="add" size={26} color="#FF6C00" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profileWrapper}>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Octicons name="sign-out" size={26} color="#8F8F8F" />
        </TouchableOpacity>
        <View style={styles.profileNameWrapper}>
          <Text style={styles.profileName}>{name}</Text>
        </View>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <TouchableOpacity
                style={styles.deletePostBtn}
                onPress={() => deletePost(item.id, item.photo)}
              >
                <MaterialIcons name="close" size={26} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('Comments', {
                    postId: item.id,
                    photo: item.photo,
                    allComments: item.comments,
                  })
                }
              >
                <Image style={styles.postImage} source={{ uri: item.photo }} />
              </TouchableOpacity>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.postImageTitle}>{item.description}</Text>
              </View>
              <View style={styles.postInfoContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ ...styles.postInfoBtn, marginRight: 25 }}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('Comments', {
                        postId: item.id,
                        photo: item.photo,
                        allComments: item.comments,
                      })
                    }
                  >
                    <Octicons
                      name="comment-discussion"
                      size={24}
                      color={item.comments?.length ? '#FF6C00' : '#BDBDBD'}
                    />
                    <Text style={styles.postInfoText}>{item.comments?.length || 0}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.postInfoBtn}
                    activeOpacity={0.8}
                    onPress={() => likeUnlike(item.id)}
                  >
                    <Octicons name="heart" size={24} color={item.likes ? '#FF6C00' : '#BDBDBD'} />
                    <Text style={styles.postInfoText}>{item.likes || 0}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.postInfoBtn}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('Map', {
                      location: item.location,
                    })
                  }
                >
                  <Octicons name="location" size={24} color="#BDBDBD" />
                  <Text style={styles.postInfoText}>{item.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  // avatarWrapper: {
  //   position: 'absolute',
  //   alignSelf: 'center',
  //   top: '12%',
  //   zIndex: 100,
  // },
  // avatar: {
  //   width: 120,
  //   height: 120,
  //   resizeMode: 'cover',
  //   backgroundColor: "grey",
  // },
  // avatarBtn: {
  //   position: 'absolute',
  //   bottom: 18,
  //   right: -15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: 30,
  //   height: 30,
  //   backgroundColor: '#fff',
  //   borderWidth: 2,
  //   borderColor: '#FF6C00',
  //   borderRadius: 50,
  // },
  profileWrapper: {
    height: 665,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoutBtn: {
    position: 'absolute',
    top: 100,
    right: 16,
  },
  profileNameWrapper: {
    marginTop: 92,
    marginBottom: 27,
  },
  profileName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    color: '#212121',
    textAlign: 'center',
  },
  postContainer: {
    marginHorizontal: 16,
  },
  deletePostBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 27,
    height: 27,
    backgroundColor: '#fff',
    borderRadius: 50,
    opacity: 0.3,
  },
  postImage: {
    height: 240,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  postImageTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#212121',
    marginBottom: 8,
  },
  postInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  postInfoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postInfoText: {
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#656565',
  },
});