import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import Loader from '../Components/Loader';
import WooCommerce from '../Components/WooCommerce'

export default function MyOrders({navigation}) {
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        AsyncStorage.getItem('user')
        .then((userdata)=>{
            const data = JSON.parse(userdata)
            console.log(data.id)
            WooCommerce.get("orders",{
                customer : data.id
            })
            .then((response) => {
                setOrders(response)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        })
    }, [])

    const identifyStatus = ({item}) =>{
        if(item.status === 'pending' || item.status==='on-hold') return <Text style={[styles.btn, {backgroundColor : 'orange'}]}>{item.status}</Text>
        else if(item.status === 'processing' || item.status==='refunded') return <Text style={[styles.btn, {backgroundColor : '#3399ff'}]}>{item.status}</Text>
        else if(item.status === 'completed') return <Text style={[styles.btn, {backgroundColor : '#62BA03'}]}>{item.status}</Text>
        else if(item.status === 'failed' || item.status === 'cancelled') return <Text style={[styles.btn, {backgroundColor : '#ff3300'}]}>{item.status}</Text>
    }
    if(loading){
        return <Loader/>
    }else{
        return (
            <View style={{backgroundColor : '#ebebeb', flex : 1, paddingBottom : 5}}>
                <View style={{height : 60, alignItems : 'center', backgroundColor : 'white', flexDirection :'row'}}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                        <Icon name='arrow-left' size={20} style={{marginHorizontal : 20}}/>
                    </TouchableOpacity>
                    <Text style={{textAlign : 'center', fontSize : 30, fontWeight : '600'}}>My Orders</Text>
                </View>
                <ScrollView>
                {orders.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('SingleOrder', {item})}>
                            <View style={styles.order}>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Order ID</Text>
                                    <Text style={styles.green}>#{item.id}</Text>
                                </View>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Order Count</Text>
                                    <Text style={{fontSize : 18, fontWeight : 'bold'}}>{item.line_items.length}</Text>
                                </View>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Total</Text>
                                    <Text style={styles.green}>{item.total}</Text>
                                </View>
                                <View style={styles.in}>
                                    <Text style={styles.txt}>Status</Text>
                                    {identifyStatus({item})}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <TouchableOpacity style={{alignItems : 'center'}} onPress={()=>navigation.navigate('Home')}>
                <Text style={styles.gbtn}>Go To Shopping</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
 order : {
     borderWidth : 1,
     margin : 20,
     borderRadius : 10,
     borderColor : 'lightgrey',
     backgroundColor : 'white'
 },
 in : {
     flexDirection : 'row',
     justifyContent : 'space-between',
     borderBottomWidth : 1,
     padding : 10,
     borderColor : 'lightgrey'
 },
 green : {
     color : '#62BA03',
     fontSize : 18
 },
 btn : {
     paddingVertical : 5,
     paddingHorizontal : 15,
     color : 'white',
     fontWeight : 'bold',
     borderRadius : 5,
     fontSize : 16
 },
 txt : {
     fontSize : 16,
     color : 'grey'
 },
 gbtn : {
     textAlign : 'center',
     fontSize : 20,
     backgroundColor : '#62BA03',
     width : Dimensions.get('window').width - 20,
     paddingVertical : 5,
     borderRadius : 10,
     color : 'white'
 }
})