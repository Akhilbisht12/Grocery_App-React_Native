import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react'
import { View, Text } from 'react-native';
import WooCommerce from '../Components/WooCommerce'

export default function MyOrders() {
    useEffect(() => {
        AsyncStorage.getItem('user')
        .then((userdata)=>{
            const data = JSON.parse(userdata)
            console.log(data.id)
            WooCommerce.get(`/wp-json/wc/v2/orders?customer=${data.id}`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        })
    }, [])
    return (
        <View>
            <Text>hello</Text>
        </View>
    )
}
