import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions, StatusBar} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const { height, width} = Dimensions.get('window');

export default function OnBoardingScreen({data}){
  const navigation = useNavigation();
      return(
          <View style={styles.main}>
            <View style={{width : width}}>
              <TouchableOpacity style={{padding : 10}} onPress={()=>navigation.navigate('Home')}>
                <Text style={{textAlign : 'right', color : '#62BA03'}}>Skip</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.submain}>
              <Image source={data.image}
              style={styles.image}/>
              <Text style={styles.mainHead}>{data.title}</Text>
              <Text style={styles.subHead}>{data.subTitle}</Text>
            </View>
            <View style={{flexDirection : 'row', justifyContent : 'space-between', width : width, paddingHorizontal : 20}}>
              <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <TouchableOpacity
                 style={{backgroundColor : '#62BA03', padding : data.a, borderRadius : 20 , width : data.a, marginHorizontal : 2}}/>
                 <TouchableOpacity
                 style={{backgroundColor : '#62BA03', padding : data.b, borderRadius : 20 , width : data.b, marginHorizontal : 2}}/>
                 <TouchableOpacity
                 style={{backgroundColor : '#62BA03', padding : data.c, borderRadius : 20 , width : data.c, marginHorizontal : 2}}/>
              </View>
              <View>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate(data.navigate)}>
                  <Text style={{color : 'white', fontSize : 40, textAlignVertical : 'center'}}>></Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
      )
}

const styles = StyleSheet.create({
  main : {
    flex : 1,
    justifyContent : 'space-between',
    alignItems : 'center',
    marginTop : StatusBar.currentHeight
  },
  submain : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  image : {
    width : width-100
    },
  mainHead : {
    fontSize : 32,
    marginTop : 50,
    marginBottom : 5,
    color : '#62BA03',
    fontWeight : '600'
  },
  subHead : {
    fontSize : 20,
    textAlign : 'center',
    paddingHorizontal : 10,
    color : 'grey'
  },
  btn : {
    borderRadius : 100,
    backgroundColor : '#62BA03',
    paddingHorizontal : 15,
    paddingVertical : 2
  }
})