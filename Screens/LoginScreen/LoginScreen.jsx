import React, { useState,useEffect} from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

const initialState = {
  email: "",
  password: "",
}

export default function LoginScreen({ navigation }) {

  console.log(Platform.OS)

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState)

  const keyboardHide = () =>{
    setIsShowKeyboard(false)
    Keyboard.dismiss()
    console.log(state)
    setState(initialState)
  }

  const loadScene = () =>{
    navigation.navigate("Registration")
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

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <View style={styles.wrapper}>
        <ImageBackground style={styles.bg_image} source={require("../../assets/photo_BG.jpg")}  > 
          
          <View style={{ ...styles.container, paddingBottom: isShowKeyboard ? 32 : 100 }}>

            <View style={styles.form_container}> 
              
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              > 

                <Text component="h1" style={styles.h1}>Login</Text>

                <TextInput
                  value={state.email}
                  placeholder="Email"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}
                />

                <TextInput
                  value={state.password}
                  placeholder="Password"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
                  secureTextEntry={true}
                />

                {isShowKeyboard != true && 
                  <TouchableOpacity style = {styles.login_btn} onPress = {keyboardHide}>
                    <Text style = {styles.login_btn__text} >Login</Text>
                  </TouchableOpacity>
                }

                {isShowKeyboard != true &&
                  <TouchableOpacity onPress={loadScene} style={styles.log_in_page_link}>
                    <Text style={styles.registration_page_link__text}>Still don't have your personal account? Let's go!</Text>
                  </TouchableOpacity>
                } 

              </KeyboardAvoidingView> 
            </View> 
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: "transparent",
  },

  container: {
    width: "100%",
    paddingTop: 32,
    paddingBottom:78,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "white",
  },

  form_container:{
    marginHorizontal: 20,
  },

  bg_image: {
    flex:1,
    resizeMode: "cover",
    justifyContent: "flex-end"
  },

  h1:{
    marginBottom: 33,

    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",

    color: "#212121",
  },

  input: {
    width: "100%",
    height: 50,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,

    backgroundColor: "#F6F6F6",
    border: "1#E8E8E8",
    borderRadius: 8,
  },

  //////////////////////////////////////////////

  login_btn: {
    marginTop:43,
    marginBottom: 16,
    paddingTop: 16, 
    paddingBottom: 16,
    

    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },

  login_btn__text: {
    fontFamily: 'Roboto-Regular',
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,

    textAlign: "center",
    color: "#FFFFFF",
  },
  
  registration_page_link__text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,

    textAlign: "center",
    color: "#1B4371",
  },

});