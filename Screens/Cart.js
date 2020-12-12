import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Image, StatusBar } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import WooCommerce from '../Components/WooCommerce'

const {width,height} = Dimensions.get('window');

export default function Cart() {
    const [cart, setCart] = useState();
    const [loading, setLoading] = useState(true);
    const [ user, setUser] = useState();
    useEffect(()=>{
        AsyncStorage.getItem('cart')
        .then((cartData)=>{
            console.log(cartData)
            setCart(JSON.parse(cartData))
            AsyncStorage.getItem('user')
            .then((userdata)=>{
                setUser(JSON.parse(userdata));
                console.log(JSON.parse(userdata))
                setLoading(false)
            })
        })
        
    },[])

    const handleQuantityChange = (state, i)=>{
        console.log(state,i)
        if(state === true){
            const temp = [...cart];
            temp[i].quantity = temp[i].quantity+1;
            setCart(temp);
        }else if(state === false){
            const temp = [...cart];
            temp[i].quantity = temp[i].quantity-1;
            setCart(temp);        }
    }

    const calculateTotal = () => {
        var sum =0;
        cart.forEach(element => {
            sum = sum + (element.price*element.quantity)
        });
        return Math.round(sum)
    }

    const handleCheckout =()=>{
        const products =[];
        cart.map((item)=>products.push({
            product_id : item.key,
            quantity : item.quantity
        }))
        const data = {
            payment_method: "cod",
            payment_method_title: "Cash on delivery",
            set_paid: false,
            billing: user.billing,
            shipping: user.shipping,
            line_items: products,
            shipping_lines: [
              {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "0.00"
              }
            ]
          };
          
          WooCommerce.post("orders", data)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error.response);
            });
          
    }

    if(loading){
        return(
            <View style={styles.main}>
                <ActivityIndicator/>
            </View>
        )
    }
    return (
        <View style={styles.main}>
            <View>
                <Text style={{fontSize : 25}}>Cart Items</Text>
                <Text>You have {cart.length} items in your cart</Text>
            </View>
            <View>
                {cart.map((item,i)=>{
                    return(
                        <View style={styles.cartItem} key={item.key}>
                            <View>
                                <Image style={{width : width*0.18, height : 0.12*height, borderRadius : 10}} source={{uri : item.image}}/>
                            </View>
                            <View style={styles.nameView}>
                                <Text style={{fontSize : 16, fontWeight : '500'}}>{item.name}</Text>
                                <View style={styles.priceView}>
                                    <Text style={{fontSize : 18, fontWeight : 'bold'}}>{item.price*item.quantity}</Text>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity onPress={()=>handleQuantityChange(true,i)}>
                                            <Icon color='white' name='plus' style={styles.icon}/>
                                        </TouchableOpacity>
                                        <Text style={{textAlignVertical : 'center', marginHorizontal : 5}}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={()=>handleQuantityChange(false,i)}>
                                            <Icon color='white' name='minus' style={styles.icon}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>handleQuantityChange(false,i)}>
                                            <Icon color='white' name='trash' 
                                            style={{padding : 10, backgroundColor : 'red', borderRadius : 20, marginLeft : 5}}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })}
            </View>
            <View>
                <Text style={{fontSize : 25, color : 'lightgreen', textAlign : 'center'}}>₹ {calculateTotal()}</Text>
                <TouchableOpacity style={styles.btn} onPress={handleCheckout}>
                    <Text style={{color : 'white', fontSize : 20}}>Proceed To Checkout</Text>
                </TouchableOpacity>
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
    cartItem : {
        flexDirection : 'row',
        width : width-20,
        borderTopWidth : 0.5,
        borderRightWidth : 1,
        borderLeftWidth : 1,
        borderBottomWidth : 2,
        marginVertical : 5,
        borderRadius : 10,
        borderColor : 'grey'
    },
    priceView : {
        width : width*0.7,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    icon : {
        backgroundColor : 'blue',
        padding : 10,
        borderRadius : 20
    },
    nameView : {
        width : width*0.7,
        justifyContent : 'space-evenly',
        marginLeft : 5
    },
    btn : {
        backgroundColor : 'blue',
        paddingVertical : 15,
        paddingHorizontal : 40,
        borderRadius : 10
    }
})