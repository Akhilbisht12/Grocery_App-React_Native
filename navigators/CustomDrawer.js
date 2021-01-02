import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../Components/Loader';

export default function CustomDrawer(props) {
    const [ user, setUser] = useState({username : 'user',email : 'email'});
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        AsyncStorage.getItem('user')
        .then((res)=>{
            console.log(res)
            if(res!==null){
                setUser(JSON.parse(res))
            }
            setLoading(false)
        })
    },[])
    if(loading){
        return <Loader/>
    }else{
    return (
        <View style={{flex : 1}}>
            <DrawerContentScrollView>
                <View style={{justifyContent :'space-between', height : Dimensions.get('window').height-StatusBar.currentHeight*2}}>
                    <View>
                        <View style={styles.userPanel}>
                            <View style={styles.avatarView}>
                                <Image style={styles.avatar} source={{uri : 'http://gms.upgrate.in/wp-content/uploads/2020/12/user.png'}}/>
                            </View>
                            <Text style={styles.username}>{user.username}</Text>
                            <Text style={{color : 'grey'}}>{user.email}</Text>
                        </View>
                        <View>
                            <DrawerItem
                            icon={()=>(
                                <Icon name='home' color='#62BA03' size={20}/>
                            )}
                            label='Home'
                            onPress={()=>{props.navigation.navigate('Home')}}
                            />
                            <DrawerItem
                            icon={()=>(
                                <Icon name='box' color='#62BA03' size={20}/>
                            )}
                            label='My Orders'
                            onPress={()=>{props.navigation.navigate('MyOrders')}}
                            />
                            <DrawerItem
                            icon={()=>(
                                <Icon name='shopping-cart' color='#62BA03' size={20}/>
                            )}
                            label='Cart'
                            onPress={()=>{props.navigation.navigate('Cart')}}
                            />
                        </View>
                    </View>
                    <View style={{alignItems : 'center'}}>
                        <Text>Developed By Upgrate.in</Text>
                    </View>
                </View>
            </DrawerContentScrollView>
        </View>
    )
        }
}

const styles = StyleSheet.create({
    avatar : {
        height : 60,
        width : 40
    },
    avatarView : {
        paddingVertical : 10,
        paddingHorizontal : 20,
        backgroundColor : 'lightgrey',
        width : 80,
        borderRadius : 50,
    },
    userPanel : {
        alignItems : 'center',
        marginVertical : 20
    },
    username : {
        fontSize : 20,
        fontWeight : 'bold'
    }
})