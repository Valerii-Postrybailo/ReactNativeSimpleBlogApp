import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";

import { authSignUpUser, authAvatarChangeUser  } from '../../../redux/auth/authOperations'
import db from '../../../firebase/config';

const initialFormData = {
  name: "",
  email: "",
  password: "",
}

  const RegistrationScreen = ({navigation}) => {

  // console.log(Platform.OS)
  const [formData, setFormData] = useState(initialFormData);
  const [avatar, setAvatar] = useState(null);
  
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 35 * 2)

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 16 * 2;
      setDimensions(width);
    };
    const dimensionsSubscription = Dimensions.addEventListener('change', onChange);

    return () => {
      dimensionsSubscription?.remove();
    };
  }, []);


  const uploadAvatarToServer = async photo => {
    const response = await fetch(photo);
    const file = await response.blob();
    const avatarId = Date.now().toString();
    await db.storage().ref(`avatars/${avatarId}`).put(file);

    const processedAvatar = await db.storage().ref('avatars').child(avatarId).getDownloadURL();
    return processedAvatar;
  };

  const handleSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(formData));
    setFormData(initialFormData);

    if (avatar) {
      const avatarUri = await uploadAvatarToServer(avatar);
      dispatch(authAvatarChangeUser(avatarUri));
    }
  };

  const toggleSecureEntry = () => setIsSecureEntry(!isSecureEntry);


/////////////////////////////////////////////////////////////////////////////////

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main_container}>
        <ImageBackground source={require("../../../assets/photo_BG.jpg")} style={styles.bg_image} >
          <View style={styles.container}>

            <View style={{width: dimensions}}>
            
              <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
              >

                <View style={styles.avatar}>
                  <TouchableOpacity style = {StyleSheet.addImage}>
                    <Image source={require('../../../assets/avatar_add_icon.png')} style={styles.addImage}/>
                  </TouchableOpacity>
                </View>
                
                <Text component="h1" style={styles.h1}>Registration</Text>

                <TextInput
                  value={formData.name}
                  placeholder="Login"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setFormData((prevFormData) => ({ ...prevFormData, name: value }))}
                />

                <TextInput
                  value={formData.email}
                  placeholder="Email"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText = {(value)=> setFormData((prevFormData) => ({ ...prevFormData, email: value }))}
                />

                <View>
                  <TextInput
                    value={formData.password}
                    placeholder="Password"
                    style={styles.input}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) => setFormData(prevFormData => ({ ...prevFormData, password: value }))}
                    secureTextEntry={isSecureEntry}
                  />

                  <TouchableOpacity style={styles.hideShowPasswordBtn} onPress={toggleSecureEntry}>
                    {isSecureEntry?
                      <Text style = {styles.hideShowPasswordBtnText}>Show</Text> :
                      <Text style = {styles.hideShowPasswordBtn}>Hide</Text>
                    }
                  </TouchableOpacity>
                </View>
                

                <TouchableOpacity style = {styles.registaration_btn} onPress = {handleSubmit}>
                  <Text style = {styles.registaration_btn__text} >Registration</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {styles.log_in_page_link}>
                  <Text style = {styles.log_in_page_link__text}>Already have an account? Log In!</Text>
                </TouchableOpacity> 

              </KeyboardAvoidingView>
            </View>
            </View>
        </ImageBackground>
      </View> 
    </TouchableWithoutFeedback>
  );
}

export default RegistrationScreen;

const styles = StyleSheet.create({

  main_container: {
    flex: 1,
  },

  container: {
    alignItems: "center",
    
    width: "100%",
    paddingTop:92,
    paddingBottom: 78,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#FFFFFF",

  },

  form_container: {    
    // marginHorizontal: 20,
  },

  //////////////////////////////////////////////////////////////////

  input: {
    width: "100%",
    height: 50,
    padding: 10,
    marginBottom: 10,

    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    borderRadius: 8,

    border: "1#E8E8E8",
  },

  hideShowPasswordBtn: {
    position: "absolute",
    top: "25%",
    right: "7%",
  },

  hideShowPasswordBtnText: {
    fontFamily: 'Roboto-Regular',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },

  avatar:{
    position: "absolute",
    top: "-25%",
    left: "50%",
    transform: ([{translateX:-57},{translateY:-55}]),
    
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  addImage: {
    width: 25,
    height:25,
    borderRadius: 50,
    left: "90%", 
    top: "280%",

    backgroundColor: "white",
  },
  
  h1: {    
    marginBottom: 33,

    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",

    color: "#212121",
  },

  ////////////////////////////////////////////

  registaration_btn: {
    marginHorizontal:20,
    marginTop:43,

    paddingTop: 16, 
    paddingBottom: 16,

    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },

  registaration_btn__text:{
    fontFamily: 'Roboto-Regular',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",
    color: "#FFFFFF",
  },

  ////////////////////////////////////////////////////////

  log_in_page_link:{
    marginTop: 16,
  },

  log_in_page_link__text:{
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,

    textAlign: "center",
    color: "#1B4371",
  },

  bg_image: {
    flex:1,
    resizeMode:"cover",
    justifyContent: "flex-end",
  },
});