import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { Camera, CameraType } from "expo-camera";

import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import { FontAwesome } from '@expo/vector-icons';

import db from '../../../firebase/config';

const initialPostData = {
  photo: '',
  description: '',
  place: '',
};

const CreatePostsScreen = ({navigation}) => {
  const [postData, setPostData] = useState(initialPostData);

  const [isPostDataReady, setIsPostDataReady] = useState(true);
  const [isDisableTrash, setIsDisableTrash] = useState(true);

  const { userId, name } = useSelector(state => state.auth);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [locationCoords, setLocationCoords] = useState("")

  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const postDataReady = Object.values(postData).every(value => value !== '');
    setIsPostDataReady(!postDataReady);

    const isPostDataToRemove = Object.values(postData).some(value => value !== '');
    setIsDisableTrash(!isPostDataToRemove);
  }, [postData]);

  const handleInput = (type, value) => {
    setPostData(prevState => ({ ...prevState, [type]: value }));
  };

  const takePhoto = async () => {
    try {
      await Camera.requestCameraPermissionsAsync()
      const location = await Location.getCurrentPositionAsync()
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri)

      // setLocationCoords(location)
      setPostData(prevState => ({ ...prevState, photo: photo.uri }));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(postData.photo);
    const file = await response.blob();
    const postId = Date.now().toString();
    await db.storage().ref(`postImages/${postId}`).put(file);
    const processedPhoto = await db.storage().ref('postImages').child(postId).getDownloadURL();
    return processedPhoto;
  };

  const createPost = async () => {
    const createdAt = new Date();
    const photo = await uploadPhotoToServer();
    await db.firestore().collection('posts').add({
      photo,
      description: postData.description,
      place: postData.place,
      location: location.coords,
      userId,
      name,
      createdAt: createdAt.toLocaleString(),
    });
  };

  const sendPost = () => {
    createPost();
    navigation.navigate('DefaultScreen');
    setPostData(initialPostData);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  
  return ( 
    <TouchableWithoutFeedback onPress={keyboardHide}>
      
    <View style={styles.container}>
    
      <View style={{ ...styles.make_post_container, paddingBottom: isShowKeyboard ? 32 : 100 }}>
        

          <Camera style={styles.camera} type={type} flashMode="auto" ref={ref => setCamera(ref)} >
          {photo && (
            <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={{width:100,height:100, borderRadius: 10} } />
          </View>
          )}
          
          <TouchableOpacity onPress={takePhoto} style= {styles.make_photo_btn}>
            <FontAwesome name="camera" size={35} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>

        <Text style={styles.under_photo_text}>Download your image</Text>
          
        
        <View style={styles.input_container}>
            
          <TextInput
            // value={state.email}
              placeholder="Title..."
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={value => handleInput('description', value)}
          />

          <TextInput
            // value={state.email}
            placeholder="Location..."
            style={styles.input}
            onFocus = {() => setIsShowKeyboard(true)}
            onChangeText={value => handleInput('place', value)}
          />
        </View>

          <View>
            <TouchableOpacity onPress={sendPost} style={styles.publicate_post_btn}>
              <Text style={styles.publicate_post_btn_text}>Publicate</Text>
            </TouchableOpacity>
          </View>
  
      </View>
    </View>
        
  </TouchableWithoutFeedback>
      )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",

    backgroundColor:"white"
  },

  make_post_container: {
    marginTop:35,
    marginHorizontal:20,
  },

  camera: {
    height:240,
    width: "100%",

    justifyContent: "center",
    alignItems: "center",
    
    borderRadius:10,
    borderColor: "#E8E8E8",
    borderWidth:1,
    backgroundColor:"#F6F6F6",
  },

  make_photo_btn:{
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    
    borderRadius: 50,

    backgroundColor: "white",
  },

  under_photo_text: {
    marginTop: 8,

    fontFamily: 'Roboto-Regular',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,

    color: "#BDBDBD",
  },

  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "white",
    borderWidth: 1,
  },

  input_container: {
    marginTop:50,
  },

  input: {
    marginTop:20,
    borderBottomWidth: 1,
  },

  publicate_post_btn: {
    marginHorizontal:20,
    
    marginTop:43,
    marginBottom: 16,
    paddingTop: 16, 
    paddingBottom: 16,
    

    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },

  publicate_post_btn_text: {
    fontFamily: 'Roboto-Regular',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",
    color: "#FFFFFF",
  },

})

export default CreatePostsScreen