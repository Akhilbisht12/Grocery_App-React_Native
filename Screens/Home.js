import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {WebView} from 'react-native-webview';
 export default function Home() {
     return(
         <View style = {styles.main}>
            <WebView source={{ uri: 'https://gms.upgrate.in/' }}/>
        </View>
     )
 }

 const styles = StyleSheet.create({
     main : {
         flex : 1,
         marginTop : StatusBar.currentHeight
     }
 })

