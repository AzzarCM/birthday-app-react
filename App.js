/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  YellowBox,
  LogBox,
} from 'react-native';
import firebase from "./src/utils/firebase";
import "firebase/auth";
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Auth from "./src/components/Auth"
import ListBirthday from "./src/components/ListBirthday"

LogBox.ignoreAllLogs();
YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App(){

  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((response)=>{
      setUser(response);
      console.log(`response: ${response}`);
    })
  }, []);

  if(user === undefined) return null;
  

  return (
    <>
    <StatusBar barStyle={"dark-content"}/>
    <SafeAreaView style={styles.background}>
      {user ? <ListBirthday user={user}/>: <Auth/>}
    </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({
  background:{
    backgroundColor: "#15212b",
    height: "100%",
  }
});


