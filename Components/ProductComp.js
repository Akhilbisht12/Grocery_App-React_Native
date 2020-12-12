import React, { useState } from 'react'
import { View, Text,Image, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window')

export default function ProductComp({item, image}) {
    const AddToCartFunction = (data, image) =>{
        const temp = {
            name : data.name,
            image : image,
            price : data.price,
            key : data.id,
            quantity : 1

        }
        AsyncStorage.getItem('cart').then((cartData)=>{
            console.log(cartData)
            if(cartData!==null){
                if(cartData.find(element=>element.key===item.key)){
                    ToastAndroid.show('Already In Cart')
                    ToastAndroid.SHORT;
                }
                else{
                    const cart = JSON.parse(cartData);
                    cart.push(temp)
                    AsyncStorage.setItem('cart', JSON.stringify(cart))
                }
            }else{
                const initCart =[];
                initCart.push(temp);
                AsyncStorage.setItem('cart', JSON.stringify(initCart));
            }
            ToastAndroid.show('added Succesfluuy')
            ToastAndroid.SHORT;
        })
        .catch((err)=>console.log(err))
    }

    return (
        <View style={styles.main}>
            <Text style={styles.offer}>50% OFF</Text>
            <View style={styles.imageCont}>
                <Image style={styles.image} source={{uri : image}}/>
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.purchase}>
                <Text style={styles.price}>
                    ₹ {item.price}
                </Text>
                <TouchableOpacity onPress={()=>AddToCartFunction(item, image)}>
                    <Icon style={styles.icon} name='opencart'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   main : {
    width : width*0.45,
    height : height*0.43,
    margin : 5,
    backgroundColor : 'white',
    paddingHorizontal : 5,
    borderRadius : 5,
    justifyContent : 'space-evenly',
    shadowColor : '#000000',
    shadowOffset : {
        height : 1,
        width : 1
    },
    shadowOpacity : 1,
    shadowRadius : 10
   },
   offer : {
    backgroundColor : 'orange',
    width : 60,
    paddingVertical : 3,
    paddingHorizontal : 5,
    borderTopRightRadius : 10,
    borderBottomRightRadius : 10
   },
   imageCont : {
       alignItems : 'center'
   },
   image : {
       height : height*0.25,
       width : width*0.4,
   },
   name : {
       fontSize : 18,
       fontWeight : '600'
   },
   purchase : {
       flexDirection :'row',
       justifyContent : 'space-between'
   },
   price : {
       fontSize : 20,
       color : 'blue',
       fontWeight : "bold"
   },
   icon : {
       backgroundColor : 'blue',
       borderRadius : 20,
       color : 'white',
       padding : 10
   }
})
