import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'


const { height, width}= Dimensions.get('window')


export default function Category({url,title}) {
    return (
        <View style={{alignItems : 'center', width : width*0.3}}>
            <Image style={{height : height*0.1, width : width*0.19}}
                    source={{uri : url}}/>
            <Text style={{textAlign : 'center'}}>{title}</Text>
        </View>
    )
}
