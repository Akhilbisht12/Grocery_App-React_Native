import React, { useState } from 'react'
import { View, Text,Image, StyleSheet, Dimensions, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
const {height, width} = Dimensions.get('window')

export default function ProductComp({item, image}) {
    const[disabled, setDisabled] = useState(false)
    const [color, setColor] = useState('#62BA03')
    const AddToCartFunction = () =>{
        if(!disabled){
            var temp = {
                name : item.name,
                image : image,
                price : item.price,
                id : item.id,
                quantity : 1,
                regular_price : item.regular_price,
                sale_price : item.sale_price
            }
            AsyncStorage.getItem('cart')
            .then((cartString)=>{
                var cart = JSON.parse(cartString);
                if(cart===null || cart === [] || cart === ''){
                    cart = [];
                    cart.push(temp)
                    AsyncStorage.setItem('cart', JSON.stringify(cart))
                    .then(()=>{
                            ToastAndroid.showWithGravityAndOffset(
                            "Added To Cart",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                          );
                    })
                    setDisabled(true)
                    setColor('orange')
                }else{
                    if(cart.includes((cartItem)=>cartItem.id===item.id)){
                        ToastAndroid.showWithGravityAndOffset(
                            "Already In Cart",
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                          );
                    }else{
                        cart.push(temp);
                        AsyncStorage.setItem('cart', JSON.stringify(cart))
                        .then(()=>{
                                ToastAndroid.showWithGravityAndOffset(
                                "Added To Cart",
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50
                              );
                        })
                        setDisabled(true)
                        setColor('orange')
                    }
                }
            })
        }
        
    }

    const calculateDiscount = () => {
        if(item.sale_price){
            return((Math.round(((item.regular_price-item.sale_price)/item.regular_price)*100) + '% OFF')
            )
        }else{
            return 'On MRP'
        }
    }

    const displaySalePrice = () => {
        if(item.sale_price){
            return <Text style={{textDecorationLine : 'line-through'}}>₹ {item.regular_price}</Text>
        }
    }

    const styles = StyleSheet.create({
        main : {
         width : width*0.45,
         height : height*0.38,
         margin : 5,
         backgroundColor : 'white',
         paddingHorizontal : 5,
         borderRadius : 5,
         justifyContent : 'space-evenly',
         borderColor : 'lightgrey',
         borderWidth : 1
        },
        offer : {
         backgroundColor : 'orange',
         width : 60,
         paddingVertical : 2,
         paddingHorizontal : 5,
         borderTopRightRadius : 10,
         borderBottomRightRadius : 10,
         color : 'white'
        },
        imageCont : {
            alignItems : 'center'
        },
        image : {
            height : height*0.15,
            width : width*0.3,
        },
        name : {
            fontSize : 18,
            fontWeight : 'bold'
        },
        purchase : {
            flexDirection :'row',
            justifyContent : 'space-between'
        },
        price : {
            fontSize : 20,
            color : '#62BA03',
            fontWeight : "bold"
        },
        icon : {
            backgroundColor : color,
            borderRadius : 10,
            color : 'white',
            padding : 10
        },
        cat : {
            fontSize : 15,
            color : 'grey'
        }
     })
     

    return (
        <SafeAreaView>
            <View style={styles.main}>
                <View style={styles.imageCont}>
                    <Image style={styles.image} source={{uri : image}}/>
                </View>
                    <Text style={styles.offer}>{calculateDiscount()}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.cat}>{item.categories[0].name}</Text>
                <View style={styles.purchase}>
                    <View>
                        {displaySalePrice()}
                        <Text style={styles.price}>
                            ₹ {item.price}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>AddToCartFunction()}>
                        <Icon style={styles.icon} name='opencart'/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        
    )
}