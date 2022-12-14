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
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";

import { authLogInUser } from '../../../redux/auth/authOperations'

const initialFormData = {
  email: "",
  password: "",
}

  const LoginScreen = ({ navigation }) => {

  // console.log(Platform.OS)
  const [formData, setFormData] = useState(initialFormData);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const [dimensions, setDimensions] = useState(Dimensions.get('window').width - 35 * 2)


//////////////////////////////////////////////////////////////////////
  
  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 20 * 2;
      setDimensions(width);
    };
    const dimensionsSubscription = Dimensions.addEventListener('change', onChange);

    return () => {
      dimensionsSubscription?.remove();
    };
  }, []);
//////////////////////////////////////////////////////////////////////

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authLogInUser(formData));
    setFormData(initialFormData);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const toggleSecureEntry = () => setIsSecureEntry(!isSecureEntry);

  return (

    <TouchableWithoutFeedback onPress={keyboardHide}> 
      <View style={styles.wrapper}>
        <ImageBackground style={styles.bg_image} source={require("../../../assets/photo_BG.jpg")}  > 
          
          <View style={{ ...styles.container, paddingBottom: isShowKeyboard ? 32 : 100 }}>

            <View style={{width: dimensions}}> 
              
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >  

                <Text component="h1" style={styles.h1}>Login</Text>

                <TextInput
                  value={formData.email}
                  placeholder="Email"
                  style={styles.input}
                  onFocus = {() => setIsShowKeyboard(true)}
                  onChangeText={(value) => setFormData((prevFormData) => ({ ...prevFormData, email: value }))}
                />
                <View>

                
                  <TextInput
                    value={formData.password}
                    placeholder="Password"
                    style={styles.input}
                    onFocus = {() => setIsShowKeyboard(true)}
                    onChangeText={(value) => setFormData((prevFormData) => ({ ...prevFormData, password: value }))}
                    secureTextEntry={isSecureEntry}
                  />

                  <TouchableOpacity style={styles.hideShowPasswordBtn} onPress={toggleSecureEntry}>
                    {isSecureEntry?
                      <Text style = {styles.hideShowPasswordBtnText}>Show</Text> :
                      <Text style = {styles.hideShowPasswordBtn}>Hide</Text>
                    }
                  </TouchableOpacity>
                </View>

                {/* {isShowKeyboard != true &&  */}
                  <TouchableOpacity style = {styles.login_btn} onPress = {handleSubmit}>
                    <Text style = {styles.login_btn__text} >Login</Text>
                  </TouchableOpacity>
                {/* // } */}

                {/* {isShowKeyboard != true && */}
                  <TouchableOpacity onPress={() => navigation.navigate('Registration')} style={styles.log_in_page_link}>
                    <Text style={styles.registration_page_link__text}>Still don't have your personal account? Let's go!</Text>
                  </TouchableOpacity>
                {/* // }  */}

              </KeyboardAvoidingView>  
            </View> 
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: "transparent",
  },

  container: {
    alignItems: "center",

    width: "100%",
    paddingTop: 52,
    paddingBottom:78,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "white",
  },

  form_container:{
    // marginHorizontal: 20,
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

  //////////////////////////////////////////////

  login_btn: {
    marginHorizontal:20,
    
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