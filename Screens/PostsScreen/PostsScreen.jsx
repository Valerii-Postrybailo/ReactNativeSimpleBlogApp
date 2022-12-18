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
  Dimensions,
  Image
} from "react-native";




export default function LoginScreen({ navigation }) {

  return (

    <View>
      <TouchableOpacity>
        <Image source={require('../../assets/bottom_post_gallery_btn.png')} />
      </TouchableOpacity>

      <TouchableOpacity style = {styles.add_post_btn}>
        <Image source={require('../../assets/bottom_add_post_btn_icon.png')}  />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image source={require('../../assets/bottom_tab_user_icon.png')}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  add_post_btn:{
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
    alignContent: "center",
  }
})