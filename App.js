import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import RegistrationScreenStack from "./navigate"


export default function App() {
  return (
      <RegistrationScreenStack/>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 375,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image:{
    flex:1,
    resizeMode:"center",
    justifyContent:"center",
  }
});
