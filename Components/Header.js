import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import WooCommerce from '../Components/WooCommerce';

export default function Header() {
    const navigation = useNavigation();
    return (
        <View>
            <View style={styles.header}>
                <View style={{flexDirection : 'row'}}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                        <Icon style={styles.icon} name='bars'/>
                    </TouchableOpacity>
                    <Text style={styles.logo}>Ganesh Sup Mart</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                    <Icon style={styles.icon} name='opencart'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        height : 50,
        paddingHorizontal : 20,
        alignItems : 'center',
        backgroundColor : 'blue',
        marginTop : StatusBar.currentHeight
    },
    icon : {
        color : 'white',
        fontSize : 25
    },
    logo : {
        color : 'white',
        fontSize : 25,
        textAlignVertical : 'center',
        paddingHorizontal : 10
    }
})
