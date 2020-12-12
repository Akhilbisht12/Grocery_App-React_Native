import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartComp from '../Components/CartComp';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WooCommerce from '../Components/WooCommerce'

export default function Cart() {
    var sum =0;
    const [user, setUser] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading]= useState(true);
    const Cart = [];
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        AsyncStorage.getItem('cart').then((cartData)=>{
            const temp = JSON.parse(cartData)
            setCart(temp);
            cart.map((item)=>setTotal(total+parseInt(item.price)))
            setLoading(false)
        })
        AsyncStorage.getItem('user')
        .then((data)=>setUser(JSON.parse(data)))
        AsyncStorage.getItem('isLoggedIn')
    },[]);

    const handleChangeSum = (price, state) => {
        const p = Math.round(parseInt(price))
        if(state){
            setTotal(total+p)
        }else if (state===false){
            setTotal(total-p)
        }
    }

    const handleCheckout =()=>{
        const products =[];
        cart.map((item)=>products.push({
            product_id : item.key,
            quantity : 1
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
                total: "10.00"
              }
            ]
          };
          
          WooCommerce.post("orders", data)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
          
    }

    if(loading){
        return <ActivityIndicator/>
    }else{
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.head}>My Shopping Cart</Text>
                <Text style={styles.sub}>Total {cart.length} items</Text>
                <View>
                    {cart.map((item)=>{
                        Cart.push(<CartComp key={item.key} item={item} onChangeSum={(price,state)=>{handleChangeSum(price,state)}}/>)
                    })}
                    {Cart}
                <Text>{total}</Text>
                <TouchableOpacity onPress={handleCheckout}>
                    <Text>Proceed To Checkout</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll : {
        marginTop : StatusBar.currentHeight,
        paddingHorizontal : 20
    },
    head : {
        fontSize : 30,
        fontWeight : '600'
    },
    sub : {
        fontSize : 20
    }
})


import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartComp from '../Components/CartComp';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WooCommerce from '../Components/WooCommerce'

export default function Cart() {
    var sum =0;
    const [user, setUser] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading]= useState(true);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        AsyncStorage.getItem('cart').then((cartData)=>{
            const temp = JSON.parse(cartData)
            setCart(temp);
            setLoading(false)
        })
    },[]);

    const handleChangeSum = (price, state) => {
        const p = Math.round(parseInt(price))
        if(state){
            setTotal(total+p)
        }else if (state===false){
            setTotal(total-p)
        }
    }

    const handleCheckout =()=>{
        const products =[];
        AsyncStorage.getItem('user')
        .then((data)=>setUser(JSON.parse(data)))
        cart.map((item)=>products.push({
            product_id : item.key,
            quantity : 1
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
                total: "10.00"
              }
            ]
          };
          
          WooCommerce.post("orders", data)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
          
    }

    if(loading){
        return <ActivityIndicator/>
    }else{
        return (
            <ScrollView style={styles.scroll}>
                <Text style={styles.head}>My Shopping Cart</Text>
                <Text style={styles.sub}>Total {cart.length} items</Text>
                <View>
                    {cart.map((item)=>{
                        return <CartComp item={item} key={item.key} onChangeSum={(price,state)=>{handleChangeSum(price,state)}}/>
                    })}
                <Text>jj</Text>
                <TouchableOpacity onPress={handleCheckout}>
                    <Text>Proceed To Checkout</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scroll : {
        marginTop : StatusBar.currentHeight,
        paddingHorizontal : 20
    },
    head : {
        fontSize : 30,
        fontWeight : '600'
    },
    sub : {
        fontSize : 20
    }
})
