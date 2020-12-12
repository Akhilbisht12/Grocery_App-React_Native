import React, { useEffect, useState } from 'react'
import {  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

 export function AddToCartFunction(data) {
     console.log(AsyncStorage.getItem('cart'))
    const [cartProducts, setCartProducts] = useState([]);
    useEffect(()=>{
        setCartProducts(AsyncStorage.getItem('cart'));
        cartProducts.push(data);
        AsyncStorage.setItem('cart', JSON.stringify(cartProducts));
        console.log(cartProducts);
    },[]);
}

export function ShowCartFunction(){
    const [Cart, SetCart] = useState([]);
    useEffect(()=>{
        SetCart(AsyncStorage.getItem('cart'));
    },[])
}