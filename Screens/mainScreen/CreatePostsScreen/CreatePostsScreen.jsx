import React, {useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"

import { Camera, CameraType } from "expo-camera";

import * as Location from 'expo-location'

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CreatePostsScreen = ({navigation}) => {

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [locationCoords, setLocationCoords] = useState("")

  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [permission, requestPermission] = Camera.useCameraPermissions();

  console.log("title", title)
  
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    takePhoto()
  }

  const takePhoto = async () => {
    await Camera.requestCameraPermissionsAsync()
    const photo = await camera.takePictureAsync()
    const location = await Location.getCurrentPositionAsync()
    console.log("location", location.coords)
    console.log("uri", photo.uri)
    setLocationCoords(location.coords)
    setPhoto(photo.uri)
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })()
  })
  
  const sendPhoto = () => {
    navigation.navigate("DefaultScreen", { photo, title,location, locationCoords})
  }
  
  // const goBack = () => {
  //   navigation.navigate("DefaultScreen")
  // }
  
  
  return ( 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
    <View style={styles.container}>
    
      <View style={{ ...styles.make_post_container, paddingBottom: isShowKeyboard ? 32 : 100 }}>
        

        <Camera style={styles.camera} ref={setCamera} >
          {photo && (
            <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={{width:100,height:100, borderRadius: 10} } />
          </View>
          )}
          
          <TouchableOpacity onPress={toggleCameraType} style= {styles.make_photo_btn}>
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
              onChangeText={(value) => setTitle(value)}
          />

          <TextInput
            // value={state.email}
            placeholder="Location..."
            style={styles.input}
            onFocus = {() => setIsShowKeyboard(true)}
            onChangeText={(value) => setLocation(value)}
          />
        </View>

          <View>
            <TouchableOpacity onPress={sendPhoto} style={styles.publicate_post_btn}>
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