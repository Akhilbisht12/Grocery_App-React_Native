import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native'
 export default function WebComp({url}) {
     const navigation = useNavigation();
     return(
         <View style = {styles.main}>
             <View style={styles.header}>
                <View style={{flexDirection : 'row'}}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                        <Text style={{color : 'white'}}>=</Text>
                    </TouchableOpacity>
                    <Text style={{color : 'white'}}>Ganesh Sup Mart</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                        <Text style={{color : 'white'}}>Cart</Text>
                    </TouchableOpacity>
                </View>
             </View>
            <WebView source={{ uri: url }}/>
        </View>
     )
 }

 const styles = StyleSheet.create({
     main : {
         flex : 1,
         marginTop : StatusBar.currentHeight
     },
     header : {
         flexDirection : 'row',
         justifyContent : 'space-between',
         height : 50,
         paddingHorizontal : 20,
         alignItems : 'center',
         backgroundColor : 'blue',
     }
 })

