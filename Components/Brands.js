import React from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window')
const data = [
    {
        id : 1,
        name : 'Amul',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/1.jpg'
    },
    {
        id : 2,
        name : 'dal',
        img : 'http://gms.upgrate.in/wp-content/uploads/2020/12/Ganesh-Logo-01.png'
    },
    {
        id : 3,
        name : 'dabur',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/3.jpg'
    },
    {
        id : 4,
        name : 'catch',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/4.jpg'
    },
    {
        id : 5,
        name : 'act II',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/5.jpg'
    },
    {
        id : 6,
        name : 'haldiram',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/6.jpg'
    },
    {
        id : 7,
        name : 'johnson',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/7.jpg'
    },
    {
        id : 8,
        name : 'patanjali',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/8.png'
    },
    {
        id : 9,
        name : 'britania',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/9.png'
    },
    {
        id : 10,
        name : 'parle',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/10.jpg'
    },
    {
        id : 11,
        name : 'bambino',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/11.jpg'
    },
    {
        id : 12,
        name : 'cadbury',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/12.jpg'
    },
    {
        id : 13,
        name : 'cremica',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/13.jpg'
    },
    {
        id : 14,
        name : 'himalaya',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/14.jpg'
    },
    {
        id : 15,
        name : 'dettol',
        img : 'http://gms.upgrate.in/wp-content/uploads/2021/01/15.jpg'
    }
];

export default function Brands() {
    const navigation = useNavigation()
    return (
        <View>
            <Text style={{textAlign : 'center', fontSize : 30, fontWeight : 'bold', marginVertical : 20}}>Shop By Brands</Text>
            <View style={styles.main}>
                {data.map((item)=>{
                    return(
                        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('BrandScreen', {item})}>
                            <View style={styles.box} key={item.id}>
                                <Image style={{width : width*0.28, height : height*0.14, resizeMode : 'contain'}} source={{uri : item.img}}/>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : 'space-evenly',
    },
    box : {
        width : width*0.3,
        height : width*0.3,
        borderWidth : 0.5,
        padding : 1,
        margin : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        borderColor : '#62BA03'
    }
})
