import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
}

export default function RegistrationScreen({navigation}) {

  console.log(Platform.OS)

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState)

  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");

  // // const nameHandler = (text) => setName(text);
  // const passwordHandler = (text) => setPassword(text);

  // const onLogin = () => {
  //   Alert.alert("Credentials", `${name} + ${password}`);
  // };

  const loadScene =() =>{
    navigation.navigate("Login")
  }

  const keyboardHide = ()=>{
    setIsShowKeyboard(false)
    Keyboard.dismiss()
    console.log(state)
    setState(initialState)
  }

  return (
    <View style={styles.main_container}>
    <ImageBackground source={require("../../assets/photo_BG.jpg")} styles={styles.bg_image} >

    <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* <View style={styles.avatar}>

        </View> */}

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text component="h1" style={styles.h1} >Registration</Text>
          <TextInput
            value={state.login}
            // onChangeText={nameHandler}
            placeholder="Login"
            style={styles.input}
            onChangeText = {(value)=> setState((prevState) =>({...prevState, login: value}) )}
          />
          <TextInput
            value={state.email}
            // onChangeText={passwordHandler}
            placeholder="Email"
            style={styles.input}
            onChangeText = {(value)=> setState((prevState) =>({...prevState, email: value}) )}
          />
          <TextInput
            value={state.password}
            // onChangeText={passwordHandler}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            onChangeText = {(value)=> setState((prevState) =>({...prevState, password: value}) )}
          />

          <TouchableOpacity style = {styles.registaration_btn}>
            <Text style = {styles.registaration_btn__text} >Registration</Text>
          </TouchableOpacity>

            <TouchableOpacity onPress={loadScene} style = {styles.log_in_page_link}>
              <Text style = {styles.log_in_page_link__text}>Already have an account? Log In</Text>
            </TouchableOpacity> 
          
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
    </ImageBackground>
    </View> 
  );
}

const styles = StyleSheet.create({

  main_container:{
    // position:"absolute",/* добавили */

    // display:"flex",
  // min-height: 100vh;
  // flexDirection: "column",
    // position:"relative",
  },

  container: {
    // position:"absolute",/* добавили */
	  // top: 100,
    display: "flex",
    marginTop: 120,
    paddingBottom: 78,
    paddingTop:92,

    width: 360,
    // height: 520,
    
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderWidth: 1,
    borderColor: "black",
  },

  //////////////////////////////////////////////////////////////////

  input: {
    width: 290,
    height: 50,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,

    backgroundColor: "#F6F6F6",
    border: "1#E8E8E8",
    borderRadius: 8,
  },

  avatar:{
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  h1:{
    marginBottom: 33,

    fontFamily: "Roboto",
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
    paddingRight: 93.5,
    paddingLeft:93.5,
    paddingBottom: 16,
    

    borderRadius: 100,
    backgroundColor: "#FF6C00",

  },

  registaration_btn__text:{
    fontFamily: 'Roboto',
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
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    letterSpacing: 0,

    textAlign: "center",
    color: "#1B4371",
  },

  bg_image:{
    flex:1,
    resizeMode:"center",
    justifyContent:"center",
  },
});