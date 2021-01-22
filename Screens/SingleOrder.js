import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import WooCommerce from '../Components/WooCommerce'
import Loader from '../Components/Loader'

export default function SingleOrder({route}) {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const item = route.params.item;
    const statusBtn = () => {
        if(item.status === 'pending' || item.status==='on-hold') return <Text style={[styles.btn, {backgroundColor : 'orange'}]}>{item.status}</Text>
        else if(item.status === 'processing' || item.status==='refunded') return <Text style={[styles.btn, {backgroundColor : '#3399ff'}]}>{item.status}</Text>
        else if(item.status === 'completed') return <Text style={[styles.btn, {backgroundColor : '#62BA03'}]}>{item.status}</Text>
        else if(item.status === 'failed' || item.status === 'cancelled') return <Text style={[styles.btn, {backgroundColor : '#ff3300'}]}>{item.status}</Text>
    }

    const handleCancelOrder = () => {
        setLoading(true)
        const data = {
            status: "cancelled"
          };
          
          WooCommerce.put(`orders/${item.id}`, data)
            .then((response) => {
                Alert.alert('Order Update', 'Your Order has been cancelled');
                navigation.navigate('MyOrders')
                setLoading(false)
            })
            .catch((error) => {
              console.log(error.response);
              setLoading(false)
            });
          
    }

    const cancelOrderbtn = () => {
        if(item.status==='pending' || item.status=== 'on-hold' || item.status === 'processing'){
            return(
                <TouchableOpacity onPress={()=>handleCancelOrder()}>
                    <Text style={[styles.btn, {backgroundColor : '#ff3300'}]}>Cancel Order</Text>
                </TouchableOpacity>
            )
        }
    }

    if(loading) return <Loader/>
    else{
    return (
        <View style={{flex : 1,backgroundColor : '#ebebeb'}}>
            <View style={{flexDirection : 'row', alignItems : 'center', backgroundColor : 'white', paddingVertical : 5}}>
                <TouchableOpacity onPress={()=>navigation.navigate('MyOrders')}>
                    <Icon name='arrow-left' size={25} style={{marginHorizontal : 20}}/>
                </TouchableOpacity>
                <Text style={{fontSize : 40, fontWeight : 'bold'}}>#{item.id}</Text>
            </View>
            <View style={{ margin : 20, flex :2}}>
                <View style={{flexDirection : 'row', justifyContent : 'space-between',}}>
                    <Text>Order Date</Text>
                    <Text>{item.date_created}</Text>
                </View>
                <ScrollView style={{marginVertical : 1}}>
                    {item.line_items.map((item)=>{
                        return(
                            <View key={item.id} style={{marginVertical : 10}}>
                                <Text style={{fontSize : 22, fontWeight : 'bold'}}>{item.name}</Text>
                                <View style={{flexDirection : 'row', justifyContent : 'space-between'}}>
                                    <Text>{item.quantity}qty * {item.price}price</Text>
                                    <Text style={{fontWeight : 'bold', color:'#62BA03'}}>Total : {item.total}</Text>
                                </View>
                            </View>
                        )
                    })}
                    <View style={{flexDirection : 'row', alignItems : 'center', justifyContent : 'space-between'}}>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>Status</Text>
                        {statusBtn()}
                    </View>
                {cancelOrderbtn()}
                </ScrollView>
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
    btn : {
        textAlign : 'center',
        marginVertical : 20,
        paddingHorizontal : 20,
        paddingVertical : 10,
        color : 'white',
        fontWeight : 'bold',
        borderRadius : 10
    }
})