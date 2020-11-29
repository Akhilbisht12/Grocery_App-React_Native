import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
 export default function Login() {
     return(
         <View style={styles.main}>
         <Text>hello</Text>
         </View>
     )
 }

 const styles = StyleSheet.create({
     main : {
         flex : 1,
         justifyContent : 'center',
         alignItems : 'center'
     }
 })