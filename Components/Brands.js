import React from 'react'
import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window')
const data = [
    {
        id : 1,
        name : 'Amul',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/1-150x150.png'
    },
    {
        id : 2,
        name : 'dal',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/2-1-150x150.png'
    },
    {
        id : 3,
        name : 'dabur',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/3-150x150.png'
    },
    {
        id : 4,
        name : 'catch',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/4-150x150.png'
    },
    {
        id : 5,
        name : 'act II',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/5-150x150.png'
    },
    {
        id : 6,
        name : 'haldiram',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/6-150x150.png'
    },
    {
        id : 7,
        name : 'johnson',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/7-150x150.png'
    },
    {
        id : 8,
        name : 'patanjali',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/8-150x150.png'
    },
    {
        id : 9,
        name : 'britania',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/9-150x150.png'
    },
    {
        id : 10,
        name : 'parle',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/10-150x150.png'
    },
    {
        id : 11,
        name : 'bambino',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/11-150x150.png'
    },
    {
        id : 12,
        name : 'cadbury',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/12-150x150.png'
    },
    {
        id : 13,
        name : 'cremica',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/13-150x150.png'
    },
    {
        id : 14,
        name : 'himalaya',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/14-150x150.png'
    },
    {
        id : 15,
        name : 'dettol',
        img : 'http://grocers.upgrate.in/wp-content/uploads/2021/04/15-150x150.png'
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
                                <Image style={{width : width*0.28, height : height*0.14, resizeMode : 'contain', objectFit : 'contain'}} source={{uri : item.img}}/>
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
