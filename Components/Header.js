import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';


export default function Header() {
    const navigation = useNavigation();
    return (
        <View>
            <StatusBar backgroundColor='#62BA03'/>
            <View style={styles.header}>
                <View style={{flexDirection : 'row', alignItems : 'center'}}>
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                        <Icon style={styles.icon} name='bars'/>
                    </TouchableOpacity>
                    <Text style={styles.logo}>Ganesh Supermarket</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Cart')}>
                    <Icon style={styles.icon} name='opencart'/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <View style={styles.parentSearch}>
                <View style={styles.searchBox}>
                    <Text style={{paddingLeft : 5, color : 'grey'}}>Find Something</Text>
                    <View style={styles.searchIcon}>
                        <Icon color='white' size={20} name='search'/>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
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
        backgroundColor : '#62BA03',
    },
    icon : {
        color : 'white',
        fontSize : 30
    },
    logo : {
        color : 'white',
        fontSize : 25,
        textAlignVertical : 'center',
        paddingHorizontal : 10,
        fontWeight : 'bold'
    },
    search : {
        paddingHorizontal : 10,
    },
    searchBox : {
        borderWidth : 2,
        padding : 2,
        borderRadius : 10,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderColor : '#62BA03',
    },
    parentSearch : {
        backgroundColor : 'white',
        width : Dimensions.get('window').width,
        padding : 5,
    },
    searchIcon : {
        backgroundColor : '#62BA03',
        paddingVertical : 5,
        paddingHorizontal : 10,
        borderRadius : 10
    }
})
