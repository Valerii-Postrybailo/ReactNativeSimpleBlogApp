import React, { useState,useEffect} from "react";
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
  Image
} from "react-native";

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

const initialState = {
  login: "",
  email: "",
  password: "",
}

export default function RegistrationScreen({navigation}) {

  console.log(Platform.OS)


  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState)

  const loadScene = () =>{
    navigation.navigate("Login")
  }

  const keyboardHide = () =>{
    setIsShowKeyboard(false)
    Keyboard.dismiss()
    console.log(state)
    setState(initialState)
  }

  const [fontsLoaded] = Font.useFonts({
    "Roboto-Regular":require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium":require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold":require("../../assets/fonts/Roboto-Bold.ttf")
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
      prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
      <View style={styles.main_container}>
        <ImageBackground source={require("../../assets/photo_BG.jpg")} style={styles.bg_image} >

          <View style={styles.container}>

            <View style={styles.form_container}>
            
              <KeyboardAvoidingView
                  behavior={Platform.OS == "ios" ? "padding" : "height"}
              >

                <View style={styles.avatar}>
                  <TouchableOpacity style = {{backgroundColor:"red", width:25, borderRadius:50, left: "90%", top: "65%"}}>
                    <Image source={require('../../assets/add.png')} style={styles.addImage}/>
                  </TouchableOpacity>
                </View>
                
                <Text component="h1" style={styles.h1}>Registration</Text>

                <TextInput
                  value={state.login}
                  placeholder="Login"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, login: value }))}
                />

                <TextInput
                  value={state.email}
                  placeholder="Email"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText = {(value)=> setState((prevState) =>({...prevState, email: value}) )}
                />

                <TextInput
                  value={state.password}
                  placeholder="Password"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
                  secureTextEntry={true}
                />

                

                <TouchableOpacity style = {styles.registaration_btn} onPress = {keyboardHide}>
                  <Text style = {styles.registaration_btn__text} >Registration</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={loadScene} style = {styles.log_in_page_link}>
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

const styles = StyleSheet.create({

  main_container: {
    flex:1,
  },

  container: {

    width: "100%",
    paddingTop:92,
    paddingBottom: 78,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#FFFFFF",
  },

  form_container: {
    marginHorizontal: 20,
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
    // position: "relative",
    // left: 0,
    // width: 25,
    // height: 25,
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

  registaration_btn:{
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
    justifyContent:"flex-end",
  },
});